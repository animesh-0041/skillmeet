import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { useUser } from "../../Providers/UseContent";
import { AuthorizeModel } from "../AuthorizeModel/AuthorizeModel";
import { PageNavigation } from "../common/PageNavigation/PageNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useErrorHandler } from "../Helper/StatusManager";
import { IsAuth } from "../Helper/Helper";


export const Layout = (props) => {
  const { isAuthorizeModel } = useUser();
  const handleError = useErrorHandler();
  const location = useLocation();
  const navigate = useNavigate();

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

  const userNavigate = () => {
    if (IsAuth()) {
      navigate(`/write`)
    } else {
      handleError(401);
    }
  }


  const ChatManagement = () => {
    switch (location.pathname) {
      case '/write':
      case '/messages':
        return null;
      default:
        return (
          <button
            onClick={() => userNavigate()}
            className="w-11 h-11 md:w-14 md:h-14 fixed bottom-4 right-4 md:bottom-6 md:right-6 rounded-full flex flex-row justify-center items-center cursor-pointer bg-black-900 shadow-header"
          >
            <IoCreateOutline className="text-white ml-[3px] mb-[2px] size-5 md:size-7" />
          </button>
        )
    }
  }

  return (
    <div id="hide_scrollbar" className="w-full max-w-[1600px] h-screen mx-auto flex flex-col justify-between">
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
