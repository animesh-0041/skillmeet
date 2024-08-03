import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button/Button"
import { Layout } from "../../components/layout/Layout"
import Cookies from 'js-cookie';

export const Notification = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('blog_user');
        Cookies.remove('token');

        navigate('/login');
    };

    return (
        <Layout>
            Notification
            <Button onClick={handleLogout} type={'outline'}>Logout</Button>
        </Layout>
    )
}