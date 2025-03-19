import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRegister } from '../../services/apiServices';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';


const Register = (props) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const navigate = useNavigate()

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowRePassword, setIsShowRePassword] = useState(false)

    const handleRegister = async () => {
        // console.log('register');
        if (email === "" || username === "" || password === "" || rePassword === "") {
            toast.error("Please fill all black field");
            return;
        }

        if (password !== rePassword) {
            toast.error("Password not match!")
            return;
        }

        let data = await postRegister(email, username, password)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate('/')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => { navigate('/login') }}>Log in</button>
            </div>
            <div className='title col-4 mx-auto'>
                REGISTER
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, new user!
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' className='form-control' onChange={(event) => setUsername(event.target.value)} />
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
                <div className='form-group pass-group'>
                    <label>Confirm password</label>
                    <input type={isShowRePassword ? "text" : "password"} className='form-control' onChange={(event) => setRePassword(event.target.value)} />
                    {isShowRePassword ?
                        <span className='icons-eye' onClick={() => setIsShowRePassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye' onClick={() => setIsShowRePassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <span className='option' onClick={() => { navigate('/login') }}>Back to login</span>
                <div>
                    <button className='btn-submit' onClick={() => handleRegister()}>Sign up</button>
                </div>
                <div className='back text-center'>
                    <span className='back-to-home' onClick={() => { navigate('/') }}> &#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Register;