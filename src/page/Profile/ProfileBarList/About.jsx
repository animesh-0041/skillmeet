import { Projects } from "./Projects";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaSchool } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { FaBirthdayCake } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const AboutList = [
    {
        name: "skills",
        label: "skills",
        value: [],
    },
    {
        name: "work",
        label: "work",
        value: [
            { name: 'company', label: 'company', icon: <HiOfficeBuilding size={'18px'} className="text-black-75" /> },
        ]
    },
    {
        name: "projects",
        label: 'projects'
    },
    {
        name: "education",
        label: "education",
        value: [
            { name: 'school', label: 'school', icon: <FaSchool size={'18px'} className="text-black-75" /> },
            { name: 'collage', label: 'collage', icon: <IoSchool size={'18px'} className="text-black-75" /> },
        ]
    },
    {
        name: "place lived",
        label: "place lived",
        value: [
            { name: 'current_city', label: 'current city', icon: <MdLocationPin size={'18px'} className="text-black-75" /> },
            { name: 'add_hometown', label: 'add hometown', icon: <IoHome size={'18px'} className="text-black-75" /> },
        ]
    },
    {
        name: "contant info",
        label: "contant info",
        value: [
            { name: 'email', label: 'email', icon: <HiOutlineMail size={'18px'} className="text-black-75" /> },
            { name: 'phoneNumber', label: 'phone', icon: <HiDevicePhoneMobile size={'18px'} className="text-black-75" /> },
        ]
    },
    {
        name: "basic info",
        label: "basic info",
        value: [
            { name: 'gender', label: 'gender', icon: <FaUser size={'18px'} className="text-black-75" /> },
            { name: 'birthday', label: 'birthday', icon: <FaBirthdayCake size={'18px'} className="text-black-75" /> },
        ]
    },
];

export const About = ({ profileData }) => {

    const aboutListManage = (about) => {

        switch (about.name) {
            case "skills":
                return <>
                    {profileData && profileData[about.name]?.map((item, ind) => (
                        <div key={ind} className="w-fit py-1 px-3 hover:bg-black-50 bg-black-25 rounded-full font-Golos font-normal text-xs leading-4 text-black-500 cursor-pointer">{item}</div>
                    ))}
                </>
            case 'projects':
                return <Projects />
            default:
                return <>
                    {about?.value?.map((item, ind) => (
                        <div key={ind} className="w-full flex flex-row items-center gap-4">
                            <span>{item.icon}</span>
                            <p className={`font-Golos font-normal text-sm leading-4 text-black-500 ${item.name !== 'email' && "capitalize"}`}>{profileData && profileData[item.name] || '---'}</p>
                        </div>
                    ))}
                </>
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {AboutList && AboutList?.map((about, index) => (
                <div key={index} className="w-full flex flex-col gap-4 px-2 py-4">
                    <h2 className="font-Golos font-semibold text-base leading-5 text-black-700 capitalize">{about.name}</h2>

                    <div className={`w-full flex ${about.name === 'skills' ? 'flex-row gap-2' : 'flex-col gap-4'}`}>
                        {aboutListManage(about)}
                    </div>
                </div>
            ))}

        </div>
    )
}