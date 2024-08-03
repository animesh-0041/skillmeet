import { FeedContent } from "./FeedContent";
import { Breaker } from '../common/Breaker/Breaker';
import { useQuery } from "@tanstack/react-query";
import { GetPostData } from '../../service/quiries/UserAuth'
import { useNavigate } from "react-router-dom";
export const Feeds = () => {
    const navigation = useNavigate();

    const {
        isLoading: PostLoading,
        // isError: PostisError,
        data: PostData,
    } = useQuery({
        queryKey: ["getpostdata"],
        queryFn: GetPostData,
        retry: 3,
        staleTime: Infinity,
    });

    if (PostLoading) {
        return <div className="w-full text-center m-auto">Loading...</div>
    }

    const formatString = (str) => {
        if (typeof str !== 'string' || !str) {
            return 'author';
        }
        return str.toLowerCase().trim().replace(/\s+/g, '-');
    };

    return (
        <div id="hide_scrollbar" className="w-full h-content flex flex-row justify-center overflow-scroll">
            <div className="w-full flex flex-col gap-6 px-2">
                {PostData && PostData?.map((el, ind) => (
                    <div
                        key={ind}
                        onClick={() => navigation(`/${formatString(el?.user[0].username) || 'author'}/${el?.url}`)}
                        className="flex flex-wrap gap-3"
                    >
                        <FeedContent
                            icon={el?.user[0]?.photoURL}
                            name={el?.user[0]?.name || 'UNKNOWN'}
                            blogUrl={el?.url}
                            username={el?.user[0]?.username || 'UNKNOWN'}
                            title={el?.blogHeader?.header?.data?.text || ''}
                            desc={el?.blogHeader?.paragraph?.data?.text || ''}
                            image={el?.blogHeader?.image?.data?.url || el?.blogHeader?.image?.data?.file?.url || ''}
                            date={el?.createdAt}
                            read={el?.view}
                        />
                        <Breaker />
                    </div>
                ))}
            </div>
        </div>
    )
}