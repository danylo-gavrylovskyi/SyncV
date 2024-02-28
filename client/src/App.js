import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home.js";
import { Room } from "./pages/Room.js";

function App() {
	const [currentUser, setCurrentUser] = React.useState();

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home setCurrentUser={setCurrentUser} />} />
				<Route path="room=/:roomid" element={<Room currentUser={currentUser} />} />
				<Route path="/room" element={<Room currentUser={currentUser} />} />

				<Route path="/join" element={<Room currentUser={currentUser} />} />
			</Routes>
		</Router>
	);
}

export default App;
