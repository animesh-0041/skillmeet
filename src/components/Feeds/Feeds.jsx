import { FeedContent } from "./FeedContent";
import { Breaker } from '../common/Breaker/Breaker';
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetPostData } from '../../service/quiries/UserAuth'
import { useNavigate } from "react-router-dom";
import { Loading } from "../common/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
export const Feeds = () => {
    const navigation = useNavigate();
    const [hasMore, setHasMore] = useState(true);

    const {
        isLoading: PostLoading,
        data: PostData,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["getpostdata"],
        initialPageParam: 1,
        staleTime: Infinity,
        queryFn: ({ pageParam = 1 }) => GetPostData(`?page=${pageParam}&limit=10`),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.length === 10) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        },
    });

    const stories = PostData?.pages?.reduce((acc, page) => {
        return [...acc, ...page]
    }, []);


    const formatString = (str) => {
        if (typeof str !== 'string' || !str) {
            return 'author';
        }
        return str.toLowerCase().trim().replace(/\s+/g, '-');
    };

    useEffect(() => {
        if (PostData) {
            const lastPage = PostData.pages[PostData.pages.length - 1];
            if (lastPage?.length < 10) {
                setHasMore(false);
            }
        }
    }, [PostData]);

    if (PostLoading) {
        return <div className="w-full text-center m-auto">Loading...</div>
    }


    return (
        <div id="hide_scrollbar" className="w-full h-full flex flex-col gap-6 px-2 overflow-scroll">
            {stories &&
                <InfiniteScroll
                    hasMore={hasMore}
                    next={() => fetchNextPage()}
                    dataLength={stories?.length}
                    scrollableTarget="hide_scrollbar"
                    style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
                >
                    {stories?.map((el, ind) => (
                        <div
                            key={ind}
                            onClick={() => navigation(`/${formatString(el?.user[0].username) || 'author'}/${el?.url}`)}
                            className="flex flex-col gap-10"
                        >
                            <FeedContent
                                icon={el?.user[0]?.photoURL}
                                name={el?.user[0]?.name || 'UNKNOWN'}
                                blogUrl={el?.url}
                                username={el?.user[0]?.username || 'UNKNOWN'}
                                title={el?.blogHeader?.header?.data?.text || ''}
                                desc={el?.blogHeader?.paragraph?.data?.text || ''}
                                followers={"5"}
                                image={el?.blogHeader?.image?.data?.url || el?.blogHeader?.image?.data?.file?.url || ''}
                                queryType={["getpostdata"]}
                                date={el?.createdAt}
                                read={el?.view}
                            />
                            <Breaker />
                        </div>
                    ))}
                </InfiniteScroll>
            }

            {/* Pagination Loader */}
            {(isFetchingNextPage) &&
                <div className="w-full"><Loading type={'loading-feed'} /></div>
            }
        </div>
    )
}