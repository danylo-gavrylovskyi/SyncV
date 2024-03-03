const chatSocket = new WebSocket("ws://127.0.0.1:8000/ws");

const messagesContainer = document.getElementById("messages");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const clearChatBtn = document.getElementById("clear");

function sendMessage() {
	const name = nameInput.value;
	const message = messageInput.value;

	if (name.trim() === "" || message.trim() === "") {
		alert("Please enter both name and message.");
		return;
	}

	chatSocket.send(
		JSON.stringify({
			user: name,
			text: message,
		})
	);
	messageInput.value = "";

	chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
	chatHistory.push({ user: name, text: message });
	localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

messageInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		sendMessage();
	}
});

function writeToScreen(user, message) {
	const p = document.createElement("p");
	p.innerHTML = `<strong>${user}:</strong> ${message}`;
	p.className = user === nameInput.value ? "sentMessage" : "receivedMessage";

	messagesContainer.appendChild(p);
}

chatSocket.onmessage = function (event) {
	const message = event.data;
	const wholeMessageJSON = JSON.parse(message);
	const beMessageJSON = JSON.parse(wholeMessageJSON.yourMsg);

	writeToScreen(beMessageJSON.user, beMessageJSON.text);
};

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
chatHistory.map((msg) => writeToScreen(msg.user, msg.text));
clearChatBtn.addEventListener("click", () => {
	while (messagesContainer.firstChild) {
		messagesContainer.removeChild(messagesContainer.firstChild);
	}
	localStorage.removeItem("chatHistory");
});
