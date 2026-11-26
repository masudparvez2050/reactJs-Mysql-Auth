import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Register from '../Pages/Register';
import PageNotFound from '../Pages/PageNotFound';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const Rotas = () => {
	const [ articles, setArticles ] = useState(null);

	useEffect(() => {
		axios
			.get('https://localhost:4000/', {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				method: 'GET',
			})
			.then((response) => {
				console.log(response.data.loggedIn);
				setArticles(response.data.loggedIn);
			})
			.catch((error) => {
				console.error(error);
				// setArticles(error.data);
			});
	}, []);

	console.log(articles);

	let logado = articles;
	return (
		<BrowserRouter>
			<Routes>
				{logado && <Route path="/" exact element={<Dashboard />} />}
				<Route path="*" element={<PageNotFound />} />
				{!logado && <Route path="/" element={<Login logado={logado} />} />}
				{!logado && <Route path="/register" element={<Register logado={logado} />} />}
			</Routes>
		</BrowserRouter>
	);
};

export default Rotas;
