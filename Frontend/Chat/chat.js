const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const receiverEmail = document.getElementById("receiverEmail");
const joinRoomBtn = document.getElementById("joinRoomBtn");
let currentRoom = "";

const token = localStorage.getItem("token");

const socket = io("http://localhost:3000", {
  auth: {
    token,
  },
});

socket.on("connect", () => {
  console.log("Connected to Socket Server");
});

joinRoomBtn.addEventListener("click", () => {
  const email = receiverEmail.value.trim();

  if (!email) {
    alert("Enter Email");
    return;
  }

  currentRoom = generateRoomId(currentUser.name, email);

  socket.emit("join_room", currentRoom);

  joinRoomBtn.textContent = "Connected ✓";
  joinRoomBtn.style.background = "#16a34a";

  console.log("Joined Room:", currentRoom);
});

socket.on("connect_error", (err) => {
  console.log(err.message);
});
socket.on("receive_message", (data) => {
  addMessage(
    data.message,
    data.sender,
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    "received",
  );
});

function parseJwt(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

const currentUser = parseJwt(token);

function generateRoomId(user1, user2) {
  return [user1, user2].sort().join("_");
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, sender, time, type) {
  const message = document.createElement("div");

  message.classList.add("message", type);

  message.innerHTML = `
    <div class="message-content">
      <strong>${sender}</strong><br>
      ${text}
    </div>

    <span class="timestamp">
      ${time}
    </span>
  `;

  chatMessages.appendChild(message);

  scrollToBottom();
}

async function loadMessages() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:3000/chat/messages", {
      headers: {
        Authorization: token,
      },
    });

    chatMessages.innerHTML = "";

    response.data.forEach((msg) => {
      const type = msg.userId === currentUser.userId ? "sent" : "received";

      addMessage(
        msg.message,
        msg.user?.name || "Unknown",
        new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

async function saveMessage(text) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "../Login/login.html";
    }

    const currentUser = parseJwt(token);

    await axios.post(
      "http://localhost:3000/chat/message",
      {
        message: text,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
}

sendBtn.addEventListener("click", async () => {
  const text = messageInput.value.trim();

  if (!text) return;

  await saveMessage(text);

  if (!currentRoom) {
    alert("Join a room first");
    return;
  }

  socket.emit("new_message", {
    roomId: currentRoom,
    message: text,
  });

  messageInput.value = "";
});

messageInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

window.addEventListener("load", () => {
  loadMessages();
});
