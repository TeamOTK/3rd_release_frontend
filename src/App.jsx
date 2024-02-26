import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import WarningPage from './components/WarningPage';
import CharacterPage from './components/CharacterPage/CharacterPage';
import Chat from './components/chat/Chat';
import Search from './components/Search';
import Situation from './components/Situation';
import CharacterSettingPage from './components/CharacterSettingPage';
import SituationSettingPage from './components/SituationSettingPage';
import CharacterCommunity from './components/CharacterCommunity';

const App = () => {

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/main" element={<MainPage />}></Route>
					<Route path="/warning" element={<WarningPage />}></Route>
					<Route path='/character' element={<CharacterPage/>}></Route>
					<Route path='/community' element={<CharacterCommunity/>}></Route>
					<Route path='/setting/character' element={<CharacterSettingPage/>}></Route>
					<Route path='/setting/situation' element={<SituationSettingPage/>}></Route>
					<Route path='/page/chat/:id' element={<Chat/>}></Route>
					<Route path='/page/search' element={<Search/>}></Route>
					<Route path='/page/situation' element={<Situation/>}></Route>
					<Route path="/*" element={<HomePage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

// const router = createBrowserRouter([
//   { path: '/', element: <HomePage />},
//   {
//     element: <RootLayout />,
//     id: 'root',
//     children: [
//       {path: 'main', element: <MainPage/>},
//       {path: 'character', element: <CharacterPage/>},
//       {
//         path: 'page', 
//         element: <ChatLayout/>,
//         children: [
//           {path:'chat', element: <Chat/>},
//           {path:'search', element: <Search/>},
//           {path:'situation', element: <Situation/>}
//         ]
//       }
//     ]
//   }
// ])


// ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
