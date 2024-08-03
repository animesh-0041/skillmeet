// MainRouter.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../page/Home/Home';
import { Notification } from '../page/Notification/Notification';
import { WritePost } from '../page/WritePost/WritePost';
import { Login } from '../page/Login/Login';
import { Register } from '../page/Register/Register';
import { Profile } from '../page/Profile/Profile';
import { IndividualPost } from '../page/IndividualPost/IndividualPost';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute.jsx';
import { SearchPage } from '../page/SearchPage/SearchPage';
import { EditPost } from '../page/EditPost/EditPost';
import { Books } from '../page/Books/Books.jsx';
import { MessagesHome } from '../page/Messages/MessagesHome.jsx';

export const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/:author/:url" element={<IndividualPost />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:url" element={<Books />} />
        <Route path="/:user" element={<Profile />} />


        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/write" element={<WritePost />} />
          <Route path="/edit/:url" element={<EditPost />} />
          <Route path="/messages" element={<MessagesHome />} />
        </Route>

        {/* Catch-all route to handle unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
