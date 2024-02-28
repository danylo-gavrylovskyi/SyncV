import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header/Header";

import styles from "../styles/Home.module.css";

export const Home = ({ setCurrentUser }) => {
	const navigate = useNavigate();

	const joinRoom = (roomId) => {
		axios
			.get("http://localhost:3400/join", {
				params: {
					roomId,
				},
			})
			.then((res) => {
				navigate("room=/" + `${res.data}`);
			});
	};

	const createRoom = (youtubeUrl) => {
		axios.post("http://localhost:3400/room", { youtubeUrl }).then((res) => {
			navigate("room=/" + `${res.data.room}`);
		});
	};

	const handleCreateRoomSubmit = (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const youtubeUrl = e.target[1].value;
		setCurrentUser(displayName);

		createRoom(youtubeUrl);
	};

	const handleJoinRoomSubmit = (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const roomId = e.target[1].value;
		setCurrentUser(displayName);

		joinRoom(roomId);
	};

	return (
		<div className={styles.container}>
			<Header />

			<main>
				<form className={styles.homeForm} onSubmit={(e) => handleCreateRoomSubmit(e)}>
					<h4>Create room!</h4>

					<p>Display Name</p>
					<input placeholder="Me" name="displayName"></input>

					<p>Youtube URL</p>
					<input placeholder="https://www.youtube.com/watch?v=xxxxx" name="url"></input>

					<button type="submit">Host</button>
				</form>

				<p className={styles.or}>...Or...</p>

				<form className={styles.homeForm} onSubmit={(e) => handleJoinRoomSubmit(e)}>
					<h4>Join room!</h4>

					<p>Display Name</p>
					<input placeholder="Me" name="displayName"></input>

					<p>Room ID</p>
					<input placeholder="qwe23n2ij34" name="roomId"></input>

					<button type="submit">Join</button>
				</form>
			</main>
		</div>
	);
};
