import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import history from '../history';
import ProtectedRoute from '../protectedRoute'
import Homepage from './Homepage';
import Nav from './Nav';
import About from './About';
import Register from './auth/Register';
import Login from './auth/Login';
import EditMap from './EditMap';
import WorldMap from './WorldMap';
import UserContext from '../context/UserContext';
import CountriesContext from '../context/CountriesContext';

const App = () => {
	// initalising the state
	const [userData, setUserData] = useState({ token: undefined, user: undefined });
	const [countries, setCountries] = useState([]);

	// const history = useHistory()
	// console.log('history:')
	// console.log(history)

	useEffect(() => {
		const checkLoggedIn = async () => {
			const token = localStorage.getItem("auth-token");
			if (!token) return

			let userRes = null;
			try {
				userRes = await axios.get(
					`${process.env.REACT_APP_API_URL}/user/`,
					{
						headers: {
							"Content-type": "application/json",
							"x-access-token": token
						}
					}
				)
			} catch (err) {
				if (err == 500) console.log("Server Error")
				if (err == 401) console.log("Auth Error")
				console.log(err.response.data)
			}

			if (userRes) {
				setUserData({ token, user: userRes.data });
			} else {
				setUserData({ token: undefined, user: undefined });
				localStorage.removeItem('auth-token');
				history.push('/login');
			}
		};

		checkLoggedIn();
	}, []);

	return (
		// using Router rather than BrowserRouter so I can create my own history object
		<Router history={history}>
			<div id="router">
				<UserContext.Provider value={{ userData, setUserData }}>
					<CountriesContext.Provider value={{ countries, setCountries }}>
						<Nav />
						<Switch>
							<Route path="/" exact component={Homepage}></Route>
							<Route path="/about" exact component={About}></Route>
							<Route path="/register" exact component={Register}></Route>
							<Route path="/login" exact component={Login}></Route>
							<ProtectedRoute path="/editmap" exact component={EditMap}></ProtectedRoute>
							<Route path="/map" exact component={WorldMap}></Route>
						</Switch>
					</CountriesContext.Provider>
				</UserContext.Provider>
			</div>
		</Router>
	)
}

export default App;