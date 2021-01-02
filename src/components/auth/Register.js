import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import UserContext from '../../context/UserContext'

const Register = () => {
    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const [error, setError] = useState(null);

    const { register, handleSubmit, errors, watch } = useForm({
        mode: 'onTouched'
    });
    const onSubmit = async formData => {
        setError(null)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/`, formData);
            const loginRes = await axios.get('/login/', {
                username: formData["username"],
                password: formData["password"]
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/map/");
        } catch (err) {
            if (err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An error occured, please try again or let us know the issue")
            }
            console.log(err.response)
        }

    };

    const watchFields = watch(["password"])

    const renderField = (name, label, refObject, type, placeholder) => {
        const inputClass = "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        const whichInputBorder = (field) => {
            return (errors[field] ? "border-red-500 mb-3" : "border-gray-200 focus:border-gray-500")
        }

        return (
            <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                    {label}
                </label>
                <input name={name} defaultValue="" ref={register(refObject)} className={whichInputBorder(name) + inputClass} id={name} type={type} placeholder={placeholder} />
                {errors?.[name]?.type === "required" && <p className="text-red-500 text-xs italic">Field required</p>}
                {errors?.[name]?.type === "passCheck" && <p className="text-red-500 text-xs italic">Password doesn't match</p>}
                {errors?.[name]?.type === "pattern" && <p className="text-red-500 text-xs italic">Invalid Email Format</p>}
                {errors?.[name]?.type === "minLength" && <p className="text-red-500 text-xs italic">Too short</p>}
                {errors?.[name]?.type === "maxLength" && <p className="text-red-500 text-xs italic">Too long</p>}
            </div>
        )
    }

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

    const passVerifyRef = ({
        required: true,
        validate: {
            passCheck: value => value == watchFields.password
        }
    })

    const emailRef = ({
        required: true,
        maxLength: 320,
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    })

    return (
        <>
            {/* <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlhtmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlhtmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                        </div>
                    </div>
                </form>
            </div> */}

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl m-2">
                {renderError()}
                <div className="flex flex-wrap -mx-3 mb-6">
                    {renderField("first_name", "First Name *", { required: true, maxLength: 30 }, "text", "Phileas")}
                    {renderField("last_name", "Last Name", { maxLength: 30 }, "text", "Fogg")}
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    {renderField("username", "Username *", { required: true, minLength: 2, maxLength: 20 }, "text", "phileasfogg")}
                    {renderField("email", "Email Address *", emailRef, "text", "phileasfogg@world.com")}
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    {renderField("password", "Password *", { required: true, minLength: 8, maxLength: 100 }, "password", "**********")}
                    {renderField("password_verify", "Verify Password *", passVerifyRef, "password", "**********")}
                </div>
                <input type="submit" value="Register" className="button bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline" />
            </form>
        </>
    )
}

export default Register