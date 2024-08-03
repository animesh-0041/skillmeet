import { Paragraph } from "../common/Paragraph/Paragraph"
import { BsBookmarkPlus } from "react-icons/bs";



export const FeedFunc = ({ read }) => {


    return (
        <div className="w-full flex flex-row justify-between">
            <div className="w-fit flex flex-row items-center gap-3">
                <Paragraph type={'title'}>View • {read || 0}</Paragraph>
            </div>
            <div className="flex flex-row items-center gap-4">
                <BsBookmarkPlus size={'15px'} className="text-black-75" />
            </div>
        </div>

    )
}