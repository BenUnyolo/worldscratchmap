import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import UserContext from '../../context/UserContext'

const Login = () => {
    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const [error, setError] = useState(null);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async formData => {
        const authToken = Buffer.from(`${formData["username"]}:${formData["password"]}`, 'utf8').toString('base64')

        try {
            const loginRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/login`,
                {
                    headers: {
                        'Authorization': `Basic ${authToken}`
                    }
                }
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/map");
        } catch (err) {
            console.log(err.response.data)
        }
    };

    const inputClass = "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg m-2">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input name="username" ref={register({ required: true })} className={"border-gray-200 mb-3 focus:border-gray-500" + inputClass} id="username" placeholder="Username" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input name="password" ref={register({ required: true })} className={"border-gray-200 mb-3 focus:border-gray-500" + inputClass} id="password" type="password" placeholder="******************" />
                    </div>
                </div>
                <input type="submit" className="button bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline" />
            </form>
        </>
    )
}

export default Login