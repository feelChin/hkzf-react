import React, { lazy, Suspensem,useState } from "react";
import { Link, Route, Routes, useLocation, } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AuthRoute from "./components/AutoRoute";

import Nav from "./page/Nav"

import Home from "./page/Home"

import News from "./page/News"
import Profile from "./page/Profile"

import Search from "./page/Search"
import Map from "./page/Map"
import HouseDetail from "./page/HouseDetail";
import Login from "./page/Login"
import Registered from "./page/Registered"
import Favorite from "./page/Favorite"

const Houselist = React.lazy(() => import("./page/Houselist"));
const Citylist = React.lazy(() => import("./page/Citylist"));

const renderPlaceholoder = () => {
	return (
		<div className="loading">加载中</div>
	)
}

const App = () => {
	return (
		<div className="App">
			<Routes >
				<Route path='/' element={<Nav />} >
					<Route path='/' element={<Home />} />
					<Route path='/index/houseList'
						element={
							<React.Suspense fallback={renderPlaceholoder()}>
								<Houselist />
							</React.Suspense>
						}
					/>
					<Route path='/index/news' element={<News />} />
					<Route path='/index/profile' element={<Profile />} />
				</Route>
				<Route path='/citylist'
					element={
						<React.Suspense fallback={<>...</>}>
							<Citylist />
						</React.Suspense>
					}
				/>
				<Route path='/search' element={<Search />} />
				<Route path='/map' element={<Map />} />
				<Route path='/houseDetail' element={<HouseDetail />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registered' element={<Registered />} />
				<Route path='/favorite'
					element={
						<AuthRoute>
							<Favorite />
						</AuthRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
