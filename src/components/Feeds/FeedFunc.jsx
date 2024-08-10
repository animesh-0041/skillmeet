import { Paragraph } from "../common/Paragraph/Paragraph"
import { BsBookmarkPlus } from "react-icons/bs";



export const FeedFunc = ({ read }) => {


    return (
        <div className="w-full flex flex-row justify-between">
            <div className="w-fit flex flex-row items-center gap-3">
                <p className={`font-Golos text-xs tracking-wide leading-4 font-normal text-black-500`}>View • {read || 0}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
                <BsBookmarkPlus size={'15px'} className="text-black-75" />
            </div>
        </div>

    )
}