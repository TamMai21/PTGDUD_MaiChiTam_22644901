import React from 'react';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './components/user/User';
import Admin from './components/admin/Admin';
import Homepage from './components/Home/Homepage';
import ManageUser from './components/admin/content/ManageUser';
import DashBoard from './components/admin/content/DashBoard';
import Login from './components/auth/Login';
import 'react-toastify/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify';
import Register from './components/auth/Register';
import ListQuiz from './components/user/ListQuiz';
import DetailQuiz from './components/user/DetailQuiz';
import ManageQuiz from './components/admin/content/quiz/ManageQuiz';
import Questions from './components/admin/content/question/Questions';

const NotFound = () => {
    return (
        <div className='container mt-5 alert alert-danger'>
            NOT FOUND
        </div>
    )
}

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Homepage />} />
                    <Route path='user' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='admin' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000} // Thời gian tự đóng (5 giây)
                hideProgressBar={false} // Hiển thị thanh tiến trình
                newestOnTop={false} // Toast mới không đẩy toast cũ xuống dưới
                closeOnClick={true} // Cho phép đóng toast khi click
                rtl={false} // Không bật chế độ đọc từ phải sang trái
                pauseOnFocusLoss={false} // Không dừng khi mất tiêu điểm
                draggable={false} // Không cho phép kéo toast
                pauseOnHover={false} // Không dừng khi di chuột vào
                theme="light" // Giao diện sáng
            />
        </>
    );
}

export default Layout;