import Cookies from "js-cookie";
import { getToken, messaging } from "../../config/firebase.config";

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

// GET FCM token
export const requestNotificationPermission = async () => {
  console.log("Requesting notification permission...");

  try {
    const token = await getToken(messaging, {
      // eslint-disable-next-line no-undef
      vapidKey: process.env.REACT_APP_VAPIDKEY,
    });
    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.error(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("Error while getting token:", error);
  }
};
