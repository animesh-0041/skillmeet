import { Paragraph } from "../common/Paragraph/Paragraph"
import { ellipsisType } from '../Helper/Tools.jsx'
import { FeedFunc } from "./FeedFunc.jsx"
import { FeedProfile } from "./FeedProfile.jsx"



export const FeedContent = (props) => {
    const { title, desc, image, name, username, icon, date, blogUrl, read } = props;

    return (
        <div className="w-full flex flex-col gap-5 cursor-pointer">

            <div className="w-full flex flex-row gap-4">
                {image && <div className="w-[300px] h-[160px]">
                    <img
                        src={image}
                        loading="lazy"
                        alt="POST-IMG"
                        className="w-full h-full rounded"
                    />
                </div>}


                <div className="w-full flex flex-col justify-between gap-3">
                    <div className="w-full flex flex-col gap-3">
                        <FeedProfile
                            name={name}
                            icon={icon}
                            date={date}
                            username={username}
                            blogUrl={blogUrl}
                        />
                        <Paragraph type={'heading'}>{title}</Paragraph>
                        <div
                            style={ellipsisType({ line: 3, height: '60px' })}
                            className='font-Golos text-[11px] tracking-wide leading-5 font-normal text-[#666]'
                            dangerouslySetInnerHTML={{ __html: desc }}
                        />
                    </div>

                    <div>
                        <FeedFunc read={read} />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}