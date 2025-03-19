import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/apiServices';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner3 } from 'react-icons/im'

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleLogin = async () => {

        if (email === "" || password === "") {
            toast.error("Please fill all field")
            return;
        }
        // console.log('login');
        setIsLoading(true)
        let data = await postLogin(email, password)
        if (data && +data.EC === 0) {
            dispatch(doLogin(data))
            setIsLoading(false)
            toast.success(data.EM)
            navigate('/')
        }
        if (data && +data.EC !== 0) {
            setIsLoading(false)
            toast.error(data.EM)
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                LOGIN
            </div>
            <div className='welcome col-4 mx-auto'>
                Welcome, who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group pass-group'>
                    <label>Password</label>
                    <input type={isShowPassword ? "text" : "password"} className='form-control' onChange={(event) => setPassword(event.target.value)} />
                    {isShowPassword ?
                        <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <span className='option'>Forgot password ?</span>
                <div>
                    <button className='btn-submit' disabled={isLoading} onClick={() => handleLogin()}>
                        {isLoading ? <ImSpinner3 className='loader-icon' /> : <></>}
                        Login
                    </button>
                </div>
                <div className='back text-center'>
                    <span className='back-to-home' onClick={() => { navigate('/') }}> &#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Login;