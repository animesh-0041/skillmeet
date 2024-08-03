import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { useUser } from "../../Providers/UseContent";
import { AuthorizeModel } from "../AuthorizeModel/AuthorizeModel";
import { PiChatCircleText } from "react-icons/pi";
import { PageNavigation } from "../common/PageNavigation/PageNavigation";
import { useLocation } from "react-router-dom";


export const Layout = (props) => {
  const { isAuthorizeModel } = useUser();
  const location = useLocation();

  const {
    children,
    isFooter = false,
    isNavbar = true,
    search = true,
    isWrite = false,
    handlePost,
    homePage,
    writeType,
  } = props;


  const ChatManagement = () => {
    switch (location.pathname) {
      case '/write':
        return null;
      default:
        return (
          <PageNavigation url='/messages'>
            <div className="w-12 h-12 fixed bottom-8 right-6 rounded-full flex flex-row justify-center items-center cursor-pointer bg-black-900 shadow-header">
              <PiChatCircleText size={25} className="text-white" />
            </div>
          </PageNavigation>
        )
    }
  }

  return (
    <div className="w-full max-w-[1600px] h-screen mx-auto flex flex-col justify-between">
      <div className="relative">
        {isNavbar &&
          <Navbar
            search={search}
            isWrite={isWrite}
            writeType={writeType}
            homePage={homePage}
            handlePost={handlePost}
          />
        }
        {children}
      </div>
      <div>

        {ChatManagement()}
        {isAuthorizeModel && <AuthorizeModel />}
        {isFooter && <Footer />}
      </div>
    </div>
  );
};
