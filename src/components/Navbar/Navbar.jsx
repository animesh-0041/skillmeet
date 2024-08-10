import { PageNavigation } from "../common/PageNavigation/PageNavigation";
import { Button } from "../common/Button/Button";
import { Loading } from "../common/Loading/Loading";
import { PiBellSimpleLight } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { ListBoxOption } from "../common/ListBoxOption/ListBoxOption";
import { BlogUser, IsAuth } from '../Helper/Helper.js'
import { FaUserAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useErrorHandler } from "../Helper/StatusManager.jsx";
import { useNavigate } from "react-router-dom";


export const Navbar = (props) => {
    const { isWrite = false, handlePost, homePage, writeType } = props;
    const handleError = useErrorHandler();
    const navigate = useNavigate()

    const authProfileList = [
        { name: 'profile', url: `/${BlogUser().username}` },
        { name: 'saved', url: '' },
        { name: 'About',  url: '/about' },
        { name: 'Privacy',  url: '/privacypolicy' },
        { name: 'settings', url: '' },
        { name: 'logout', icon: <IoLogOutOutline size={'25px'} className="text-red-400" />, url: '' },

    ]

    const profileList = [
        { name: 'login', icon: '', url: '/login' },
        { name: 'register', icon: '', url: '/register', },
        { name: 'About',  url: '/about' },
        { name: 'Privacy',  url: '/privacypolicy' },
        { name: 'settings', url: '' },
    ]

    const profileListCheck = () => {
        if (IsAuth()) {
            return authProfileList;
        } else {
            return profileList;
        }
    }

    const userNavigate = () => {
        if (IsAuth()) {
            navigate(`/${BlogUser()?.username}`)
        } else {
            handleError(401);
        }
    }

    if (homePage) {
        return (
            <div className={`w-full pb-3 pt-4 px-4 md:px-8 relative flex flex-row gap-4 justify-between items-center bg-white`}>
                <div className="w-fit flex flex-row gap-2 md:gap-3 items-center justify-center">
                    <ListBoxOption listoptions={profileListCheck() || []} >
                        <RxHamburgerMenu className="text-black-75 size-5 md:size-6" />
                    </ListBoxOption>

                    <div className="hidden sm:block">
                        <PageNavigation url="/search">
                            <div className="w-[150px] py-2 pl-3 bg-black-25 rounded-51 font-Golos text-xs font-normal capitalize text-black-500">search</div>
                        </PageNavigation>
                    </div>

                    <PageNavigation url={'/'}>
                        <h1 className="block sm:hidden text-xl leading-8 font-Golos font-bold text-black-700">Blogg</h1>
                    </PageNavigation>
                </div>

                <div className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:flex flex-row items-end gap-5">
                    <PageNavigation url={'/'}>
                        <h1 className="text-2xl leading-8 font-Golos font-bold text-black-700">Blogg</h1>
                    </PageNavigation>
                </div>

                <div className="w-fit flex flex-row justify-between items-center gap-4 md:gap-6">
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
                                <GoSearch className="text-black-75 size-5 md:size-6 md:hidden block" />
                            </PageNavigation>

                            <PageNavigation url="/notification">
                                <PiBellSimpleLight className="text-black-75 size-5 md:size-6" />
                            </PageNavigation>

                            <button onClick={() => userNavigate()}>
                                <img
                                    className={`w-6 h-6 md:w-7 md:h-7`}
                                    src={'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                />
                            </button>
                        </>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={`w-full pb-3 pt-4 px-4 md:px-8 flex flex-row gap-4 justify-between items-center ${homePage && "absolute top-0 z-10 bg-opacity-55"}`}>
            <div className="w-fit flex flex-row gap-2 md:gap-3 items-center justify-center">
                <ListBoxOption listoptions={profileListCheck() || []} >
                    <RxHamburgerMenu className="text-black-75 size-5 md:size-6" />
                </ListBoxOption>

                <PageNavigation url={'/'}>
                    <h1 className="text-xl leading-8 md:text-2xl font-Golos font-bold text-black-700">Blogg</h1>
                </PageNavigation>
            </div>

            <div className="w-fit flex flex-row justify-between items-center gap-4 md:gap-6">
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
                            <GoSearch className="text-black-75 size-5 md:size-6 md:hidden block" />
                        </PageNavigation>

                        <PageNavigation url="/notification">
                            <PiBellSimpleLight className="text-black-75 size-5 md:size-6" />
                        </PageNavigation>

                        <button onClick={() => userNavigate()}>
                            <img
                                className={`w-6 h-6 md:w-7 md:h-7`}
                                src={'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}