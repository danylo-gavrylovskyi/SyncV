import React from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import io from "socket.io-client";
import Modal from "react-modal";
import copy from "clipboard-copy";

import Chat from "../components/Chat/Chat";
import { Header } from "../components/Header/Header";

import styles from "../styles/Room.module.css";

Modal.setAppElement("#root");

export const Room = ({ currentUser }) => {
	const [vidLink, getVidLink] = React.useState("");
	const [playing, setPlaying] = React.useState(false);
	const [link, setLink] = React.useState("");
	const [roomInfo, setRoomInfo] = React.useState({});
	const [modalChangeVideoIsOpen, setModalChangeVideoIsOpen] = React.useState(false);
	const [inviteModalIsOpen, setInviteModalIsOpen] = React.useState(false);
	const player = React.useRef(null);

	const socket = io("http://localhost:8000");
	const room = window.location.pathname.substring(7);

	const fetchRoomData = async () => {
		const { data } = await axios.get(`http://localhost:3400/room-info/${room}`);
		setRoomInfo(data);
		return data;
	};

	React.useEffect(() => {
		(async () => {
			try {
				socket.on("connect", () => {
					console.log("Socket connected");
				});

				const data = await fetchRoomData();
				setLink(data.currentVideo.videoUrl);

				socket.emit("joinRoom", { roomId: room, displayName: currentUser });
			} catch (error) {
				console.log("Error:", error);
			}
		})();
	}, []);

	socket.on("NEW_USER", () => {
		fetchRoomData();
	});
	socket.on("NEW_MESSAGE", () => {
		fetchRoomData();
	});

	socket.on("SYNC", (data) => {
		setLink(data.videoUrl);
	});
	socket.on("VIDEO_LOAD", (data) => {
		setLink(data);
	});

	socket.on("VIDEO_PAUSE", (data) => {
		player.current.seekTo(data);
	});
	socket.on("VIDEO_PLAY", (data) => {
		setPlaying(true);
	});

	const handlePause = () => {
		socket.emit("VIDEO_PAUSE", {
			event: "pause",
			roomId: room,
			currTime: player.current.getCurrentTime(),
		});
	};
	const setTheLink = (e) => {
		e.preventDefault();
		socket.emit("VIDEO_LOAD", { videoUrl: vidLink, roomId: room });
		closeChangeVideoModal();
	};

	const openChangeVideoModal = () => {
		setModalChangeVideoIsOpen(true);
	};
	const closeChangeVideoModal = () => {
		setModalChangeVideoIsOpen(false);
	};
	const openInviteModal = () => {
		setInviteModalIsOpen(true);
	};
	const closeInviteModal = () => {
		setInviteModalIsOpen(false);
	};

	const handlePlay = () => {
		socket.emit("VIDEO_PLAY", {
			event: "play",
			roomId: room,
			currTime: player.current.getCurrentTime(),
		});
	};

	return (
		<div className={styles.container}>
			<Header socket roomId={room} />

			<div className={styles.watchArea}>
				<ReactPlayer
					url={link}
					ref={player}
					width="75%"
					height="95%"
					onPause={handlePause}
					onPlay={handlePlay}
					onBuffer={() => setPlaying(false)}
					onBufferEnd={() => setPlaying(true)}
					muted={true}
					controls={true}
					playing={playing}
				/>

				<aside>
					<div className={styles.asideBtns}>
						<button onClick={openChangeVideoModal}>Change Video</button>
						<button onClick={openInviteModal}>Invite Friends</button>
					</div>
					<Chat
						socket={socket}
						users={roomInfo.users}
						messages={roomInfo.messages}
						currentUser={currentUser}
						roomId={room}
					/>
				</aside>
			</div>

			<Modal
				isOpen={modalChangeVideoIsOpen}
				onRequestClose={closeChangeVideoModal}
				contentLabel="Change Video Modal"
				className={styles.modal}>
				<h2>Change Video</h2>
				<form onSubmit={setTheLink}>
					<label>
						Video URL:
						<input
							type="text"
							value={vidLink}
							onChange={(e) => getVidLink(e.target.value)}
							placeholder="Enter video URL"
							required
						/>
					</label>
					<button type="submit">Change</button>
				</form>
			</Modal>

			<Modal
				isOpen={inviteModalIsOpen}
				onRequestClose={closeInviteModal}
				contentLabel="Invite Friends Modal"
				className={styles.modal}>
				<h2>Invite Friends</h2>
				<p>Share the room ID with your friends:</p>
				<input type="text" value={room} readOnly onClick={(e) => e.target.select()} />
				<button onClick={() => copy(room)}>Copy to Clipboard</button>
			</Modal>
		</div>
	);
};
