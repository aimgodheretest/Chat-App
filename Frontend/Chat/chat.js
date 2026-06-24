const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const receiverEmail = document.getElementById("receiverEmail");

const groupNameInput = document.getElementById("groupName");
const createGroupBtn = document.getElementById("createGroupBtn");
const joinGroupBtn = document.getElementById("joinGroupBtn");
const activeGroup = document.getElementById("activeGroup");

const joinRoomBtn = document.getElementById("joinRoomBtn");
let currentRoom = "";
let currentGroup = "";

const token = localStorage.getItem("token");

const socket = io("http://localhost:3000", {
  auth: {
    token,
  },
});

socket.on("connect", () => {
  console.log("Connected to Socket Server");
});
createGroupBtn.addEventListener("click", () => {
  const groupName = groupNameInput.value.trim();

  if (!groupName) {
    alert("Enter Group Name");
    return;
  }

  currentGroup = groupName;

  socket.emit("join_group", currentGroup);

  activeGroup.style.display = "block";

  activeGroup.innerHTML = `
    Group: <strong>${currentGroup}</strong>
  `;

  console.log("Created Group:", currentGroup);
});

joinGroupBtn.addEventListener("click", () => {
  const groupName = groupNameInput.value.trim();

  if (!groupName) {
    alert("Enter Group Name");
    return;
  }

  currentGroup = groupName;

  socket.emit("join_group", currentGroup);

  activeGroup.style.display = "block";

  activeGroup.innerHTML = `
    Group: <strong>${currentGroup}</strong>
  `;

  console.log("Joined Group:", currentGroup);
});

joinRoomBtn.addEventListener("click", async () => {
  try {
    const email = receiverEmail.value.trim();

    if (email === currentUser.email) {
      alert("You cannot chat with yourself");
      return;
    }

    if (!email) {
      alert("Enter Email");
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/user/find/${email}`,
    );

    currentRoom = generateRoomId(currentUser.email, response.data.email);

    socket.emit("join_room", currentRoom);

    joinRoomBtn.textContent = "Connected ✓";
    joinRoomBtn.style.background = "#16a34a";

    console.log("Joined Room:", currentRoom);
  } catch (err) {
    alert("User not found");
  }
});

socket.on("connect_error", (err) => {
  console.log(err.message);
});
socket.on("receive_message", (data) => {
  const type = data.sender === currentUser.name ? "sent" : "received";

  addMessage(
    data.message,
    data.sender,
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type,
  );
});

socket.on("receive_group_message", (data) => {
  const type = data.sender === currentUser.name ? "sent" : "received";

  addMessage(
    data.message,
    data.sender,
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type,
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

  // GROUP CHAT
  if (currentGroup) {
    socket.emit("group_message", {
      groupName: currentGroup,
      message: text,
    });

    messageInput.value = "";

    return;
  }

  // PERSONAL CHAT
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

// window.addEventListener("load", () => {
//   loadMessages();
// });
