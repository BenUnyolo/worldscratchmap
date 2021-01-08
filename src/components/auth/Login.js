import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import UserContext from '../../context/UserContext'

const Login = () => {
    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const [error, setError] = useState(null);

    const [loader, setLoader] = useState(false);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async formData => {
        setLoader(true)
        setError(null)
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
            setLoader(false)
            history.push("/map");
        } catch (err) {
            setLoader(false)
            if (err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An error occured, please try again or let us know the issue")
            }
        }
    };

    const renderError = () => {
        if (error) {
            return (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative" role="alert">
                    {/* <strong class="font-bold">Oops!</strong> */}
                    <span class="block sm:inline">{error}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg onClick={() => setError(null)} class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
            )
        }
    }

    const inputClass = "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg m-2">
                {renderError()}
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
                {loader ? <span>Loading...</span> : ""}
            </form>
        </>
    )
}

export default Login