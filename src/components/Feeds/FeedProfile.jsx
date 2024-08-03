import { GoKebabHorizontal } from "react-icons/go"
import { Paragraph } from "../common/Paragraph/Paragraph"
import { PopupDropDown } from "../common/PopupDropDown/PopupDropDown"
import { FormatDate } from "../common/FormatDate/FormatDate"
import { validMyprofile } from "../Helper/Helper"


export const FeedProfile = (props) => {
    const { icon, name, username, date, blogUrl } = props;

    const validMenuType = () => {
        if (validMyprofile(username)) {
            return 'profileMenu'
        } else {
            return "feedMenu"
        }
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-fit flex flex-row items-center gap-3">
                <div>
                    <PopupDropDown type={'UserProfile'} icon={icon} name={name} username={username}>
                        {icon ?
                            <img
                                src={icon || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                className="w-8 h-8 rounded-full flex flex-row justify-center items-center"
                            />
                            :
                            <div className="w-8 h-8 rounded-full flex flex-row justify-center items-center bg-green-50 text-base font-Golos text-semibold text-black-500">
                                {name[0] || '@'}
                            </div>
                        }
                    </PopupDropDown>
                </div>
                <div className="w-fit h-fit">
                    <Paragraph className="font-Golos text-xs font-bold text-black-700 capitalize">{name || 'Author'} • {date && FormatDate({ dateString: date })}</Paragraph>
                </div>
            </div>

            <PopupDropDown type={validMenuType()} blogUrl={blogUrl}>
                <div className="px-3">
                    <GoKebabHorizontal size={'15px'} className="text-black-75" />
                </div>
            </PopupDropDown>

        </div>
    )

}