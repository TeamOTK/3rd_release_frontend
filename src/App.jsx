import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import HomePage from './components/HomePage';
import CharacterCommunity from './components/CharacterCommunity';
import WarningPage from './components/WarningPage';
import Chat from './components/chat/Chat';
import CharacterSettingPage from './components/CharacterSettingPage';

const App = () => {

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path='/character' element={<CharacterCommunity/>}></Route>
					<Route path='/character/setting' element={<CharacterSettingPage/>}></Route>
					<Route path='/warning' element={<WarningPage/>}></Route>
					<Route path='/chat' element={<Chat/>}></Route>
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
