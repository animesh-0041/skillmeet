import { Feeds } from "../../components/Feeds/Feeds"
import { SideBar } from "../../components/SideBar/SideBar"
import { Layout } from "../../components/layout/Layout"

export const Home = () => {

    return (
        <Layout>
            <div className="w-full h-content m-auto px-12 pt-8 flex flex-row gap-10 justify-between">
                <div className="w-full">
                    <Feeds />
                </div>

                <div className="w-[1px] h-content border border-black-50"></div>

                <div className="w-[400px]">
                    <SideBar />
                </div>
            </div>
        </Layout>
    )
}