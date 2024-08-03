import { apiService, apiServiceWithToken } from "../api/apiService";

export const UserAuth = async (userData) => {
  const { data } = await apiService.post("/user/signup", userData);
  return data;
};

export const UserLogin = async (userData) => {
  const { data } = await apiService.post("/user/login", userData);
  return data;
};

export const BlogWrite = async (write) => {
  const { data } = await apiServiceWithToken.post("/post/create", write);
  return data;
};

export const GetPostData = async () => {
  const { data } = await apiService.get("/post/allposts");
  return data;
};

export const GetIndividualPostData = async (url) => {
  const { data } = await apiServiceWithToken.get(`/post/individual/${url}`);
  return data;
};

export const likedPost = async (url) => {
  const { data } = await apiServiceWithToken.post(`/post/like/${url}`);
  return data;
};

export const getComment = async (url) => {
  const { data } = await apiService.get(`/blog/comments?${url}`);
  return data;
};

export const postComment = async (comment) => {
  const { data } = await apiServiceWithToken.post(`/blog/comment`, comment);
  return data;
};

export const getSearch = async (search) => {
  const { data } = await apiService.get(`/post/search?${search}`);
  return data;
};

export const getProfile = async (url) => {
  const { data } = await apiServiceWithToken.get(`/user/profile?${url}`);
  return data;
};

export const getProfileBlog = async (url) => {
  const { data } = await apiService.get(`/user/profile/post?${url}`);
  return data;
};

export const postFollow = async (id) => {
  const { data } = await apiServiceWithToken.post(`/user/follow-unfollow`, id);
  return data;
};

export const editBlog = async (edit) => {
  const { data } = await apiServiceWithToken.patch(
    `post/update/${edit?.params}`,
    edit?.body
  );
  return data;
};

export const updateProfile = async (edit) => {
  const { data } = await apiServiceWithToken.patch(`/user/update`, edit);
  return data;
};

export const createBooks = async (books) => {
  const { data } = await apiServiceWithToken.post(`/books/create`, books);
  return data;
};

export const getIndividualBook = async (url) => {
  const { data } = await apiService.get(`/books/individual/${url}`);
  return data?.data;
};

export const getBookList = async (user) => {
  const { data } = await apiService.get(`/books/booklist/${user}`);
  return data?.data;
};

export const updateBook = async (update) => {
  const { data } = await apiService.patch(`/books/update/${update?.url}`, update?.body);
  return data;
};

export const getIndividualPage = async (url) => {
  const { data } = await apiService.get(`/books/page/individual/${url}`);
  return data?.data;
};

export const updatePage = async (update) => {
  const { data } = await apiServiceWithToken.patch(`/books/page/update/${update?.url}`, update);
  return data;
};

export const deletePage = async (deleteData) => {
  const { data } = await apiServiceWithToken.patch(`/books/page/delete`, deleteData);
  return data;
};

export const getfirendList = async () => {
  const { data } = await apiServiceWithToken.get(`/chat/friends-contact`);
  return data;
};

export const getFirendHistory = async (url) => {
  const { data } = await apiServiceWithToken.get(`/chat/history?${url}`);
  return data;
};