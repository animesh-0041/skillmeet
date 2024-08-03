import Cookies from "js-cookie";

export const IsAuth = () => {
  const storedToken = Cookies.get("token");
  return storedToken;
};

export const BlogUser = () => {
  const blogUserCookie = Cookies.get("blog_user");

  if (!blogUserCookie) {
    return {};
  }

  try {
    const user = JSON.parse(blogUserCookie);
    return user;
  } catch (error) {
    return {};
  }
};

export const validMyprofile = (props) => {
  const blogUserCookie = Cookies.get("blog_user");

  if (!blogUserCookie) {
    return false;
  }

  try {
    const user = JSON.parse(blogUserCookie);
    return user.username === props;
  } catch (error) {
    return false;
  }
};
