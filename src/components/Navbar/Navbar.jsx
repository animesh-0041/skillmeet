import { PageNavigation } from "../common/PageNavigation/PageNavigation";
import { Button } from "../common/Button/Button";
import { Loading } from "../common/Loading/Loading";
import { PiBellSimpleLight } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { ListBoxOption } from "../common/ListBoxOption/ListBoxOption";
import { BlogUser, IsAuth } from '../Helper/Helper.js'
import { FaRegUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";

export const Navbar = (props) => {
    const { isWrite = false, handlePost, homePage, writeType } = props;

    const authProfileList = [
        { name: 'profile', icon: <FaRegUser size={'16px'} className="text-black-75" />, url: `/${BlogUser().username}` },
        { name: 'saved', icon: <IoBookmarks size={'18px'} className="text-black-75" />, url: '' },
        { name: 'Privacy', icon: <MdOutlinePrivacyTip size={'22px'} className="text-black-75" />, url: '' },
        // { name: 'About', icon: '', url: '' },
        { name: 'settings', icon: <IoIosSettings size={'22px'} className="text-black-75" />, url: '', },
        { name: 'logout', icon: <IoLogOutOutline size={'22px'} className="text-red-400" />, url: '' },

    ]

    const profileList = [
        { name: 'login', icon: '', url: '/login' },
        { name: 'register', icon: '', url: '/register', },
    ]

    const profileListCheck = () => {
        if (IsAuth()) {
            return authProfileList;
        } else {
            return profileList;
        }
    }

    // console.log(IsAuth(),'IsAuth')

    return (
        <div className={`w-full py-2 px-8 flex flex-row gap-4 justify-between items-center bg-white ${homePage && "absolute top-0 z-10 bg-opacity-55"}`}>
            <div className="flex flex-row items-end gap-5">
                <PageNavigation url={'/'}>
                    <h1 className="text-2xl font-bold text-black-900">Blog.</h1>
                </PageNavigation>
            </div>

            <div className="w-fit flex flex-row justify-between items-center gap-6">
                {isWrite ?
                    <Button
                        type="primary"
                        className={`w-fit min-w-24 h-7 px-2 flex flex-row justify-center items-center whitespace-nowrap bg-green-500`}
                        color={"text-white"}
                        onClick={() => handlePost()}
                    >
                        {writeType === 'edit' ? 'Update' : 'Publish'}
                    </Button>
                    :
                    <>
                        <PageNavigation url="/search">
                            <CiSearch size={'23px'} className="text-black-75" />
                        </PageNavigation>


                        <PageNavigation url="/notification">
                            <PiBellSimpleLight size={'23px'} className="text-black-75" />
                        </PageNavigation>

                        <ListBoxOption listoptions={profileListCheck() || []} >
                            <img className={`w-6 h-6 md:w-6 md:h-6`} src={'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'} alt={'profile'} />
                        </ListBoxOption>

                        <PageNavigation url="/write">
                            <div className="w-fit py-[6px] pr-3 pl-[10px] flex flex-row justify-center items-center gap-2 rounded bg-black-900">
                                <CiCirclePlus size={'18px'} className="text-black-25" />
                                <p className="font-Golos font-normal text-xs leading-4 text-black-25">Write</p>
                            </div>
                        </PageNavigation>
                    </>
                }
            </div>
        </div>
    )
}