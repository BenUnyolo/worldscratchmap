import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext'
import CountriesContext from '../../context/CountriesContext'

const AuthOptions = () => {
    const { userData, setUserData } = useContext(UserContext)
    const { setCountries } = useContext(CountriesContext)

    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({ token: undefined, user: undefined });
        localStorage.removeItem('auth-token');
        setCountries([]);
        history.push('/');
    }

    return (
        <div>
            {userData.user ? (
                <button onClick={logout} className="button auth-button lg:mt-0">Log Out</button>
            ) : (
                    <>
                        <button onClick={register} className="button auth-button lg:mt-0 mr-2">Register</button>
                        <button onClick={login} className="button auth-button lg:mt-0">Log In</button>
                    </>
                )}
        </div>
    )
}

export default AuthOptions