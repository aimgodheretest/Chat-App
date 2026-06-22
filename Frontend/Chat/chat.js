const chatMessages = document.getElementById("chatMessages");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

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
      addMessage(
        msg.message,
        msg.user ? msg.user.name : "Unknown User",
        new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        "received",
      );
    });
  } catch (err) {
    console.log(err);
  }
}

async function saveMessage(text) {
  try {
    const token = localStorage.getItem("token");

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

  messageInput.value = "";

  loadMessages();
});

messageInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

window.addEventListener("load", loadMessages);
