import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { Breaker } from '../Breaker/Breaker';
import { PageNavigation } from '../PageNavigation/PageNavigation';
import { GoShare } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

const feedmenulist = [
    { title: "Recommend more stories like this to me.", icon: <IoIosAddCircleOutline size={"22px"} className='text-black-75' /> },
    { title: "Recommend fewer stories like this to me.", icon: <IoIosAddCircleOutline size={"22px"} className='text-black-75' /> },
    { title: "BREAK", icon: "" },
    { title: "Follow Author", icon: "" },
    { title: "Copy Link", icon: "" },
];

const profilemenulist = [
    { title: "edit", icon: <LiaEditSolid size={"22px"} className='text-black-75' /> },
    { title: "share", icon: <GoShare size={"22px"} className='text-black-75' /> },
    { title: "delete", icon: <MdOutlineDelete size={"22px"} className='text-red-400' />, color: 'text-red-400 active:text-red-300' },
];

const bookMenuList = [
    { title: "rename", icon: <LiaEditSolid size={"22px"} className='text-black-75' /> },
    { title: "delete", icon: <MdOutlineDelete size={"22px"} className='text-red-400' />, color: 'text-red-400 active:text-red-300' },
];

const ListHandler = ({ props }) => {
    const { title, icon, color } = props;

    if (title === 'BREAK') {
        return (<Breaker />)
    } else {
        return (
            <div className='w-ful py-2 flex flex-row justify-between items-center gap-3 cursor-pointer text-black-500 active:text-black-300 transform transition duration-200'>
                {icon && <div>{icon}</div>}
                <p className={`w-full font-Golos font-normal text-xs capitalize ${color && color}`}>{title}</p>
            </div>
        )
    }

}


export const PopupDropDown = (props) => {
    const { children, type, icon, name, followers = '1.2k', username, blogUrl, onClick } = props;
    const navigation = useNavigate();

    const handleRedirect = (typeOf) => {
        switch (typeOf) {
            case 'edit':
                return navigation(`/edit/${blogUrl}`);
            default:
                return null
        }
    }


    const PopupContent = (open) => {
        switch (type) {
            case 'UserProfile':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[280px] origin-top flex flex-col gap-2 rounded px-4 py-3 bg-white shadow-header shadow-black-100 [--anchor-gap:8px]"
                                anchor="bottom"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='w-full flex flex-row justify-between items-center'>
                                        {icon ?
                                            <img
                                                src={icon}
                                                className="w-12 h-12 rounded-full flex flex-row justify-center items-center"
                                                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                            />
                                            :
                                            <div className="w-12 h-12 rounded-full flex flex-row justify-center items-center bg-green-50 text-xl font-Golos text-semibold text-black-500">
                                                {name[0] || '@'}
                                            </div>
                                        }
                                        <PageNavigation url={`/${username}`}>
                                            <button
                                                className='w-fit px-5 py-2 font-Golos font-normal text-base bg-black-900 hover:bg-black-500 active:bg-black-700 rounded-full text-black-25'
                                            >
                                                Profile
                                            </button>
                                        </PageNavigation>
                                    </div>
                                    <div className='w-full flex flex-col gap-1'>
                                        <p className='w-full font-Golos font-semibold text-sm text-black-500 capitalize'>{name || 'Author'}</p>
                                        <p className='w-full font-Golos font-sm text-sm text-black-500'>{followers || 0} Followers</p>
                                    </div>
                                </div>
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                );
            case 'feedMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[250px] origin-top flex flex-col gap-1 rounded px-4 py-3 bg-white shadow-header shadow-black-100 [--anchor-gap:8px]"
                                anchor="bottom"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {feedmenulist && feedmenulist?.map((item, index) => (
                                    <div key={index} className='w-full flex flex-col px-2'>
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                )
            case 'profileMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[200px] origin-top flex flex-col gap-1 rounded px-4 py-2 bg-white shadow-header shadow-black-100 [--anchor-gap:8px]"
                                anchor="bottom"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {profilemenulist && profilemenulist?.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleRedirect(item?.title)}
                                        className='w-full flex flex-col px-2'
                                    >
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                )
            case 'bookMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[140px] origin-top flex flex-col gap-2 rounded px-1 py-2 bg-white shadow-header shadow-black-100 [--anchor-gap:8px]"
                                anchor="bottom"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {bookMenuList && bookMenuList?.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={onClick[index] || null}
                                        className='w-full flex flex-col px-2'
                                    >
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                )
            default:
                return null;
        }
    }


    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <PopoverButton className="flex items-center gap-2">{children}</PopoverButton>
                    {PopupContent(open)}
                </>
            )}
        </Popover>
    )
}