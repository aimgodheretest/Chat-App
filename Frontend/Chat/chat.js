const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, type = "sent") {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const message = document.createElement("div");

  message.classList.add("message", type);

  message.innerHTML = `
    <div class="message-content">
      ${text}
    </div>

    <span class="timestamp">
      ${time}
    </span>
  `;

  chatMessages.appendChild(message);

  scrollToBottom();
}

async function saveMessage(text) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
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

    console.log(response.data);
  } catch (err) {
    console.log(err);

    alert(err.response?.data?.message || "Unable to save message");
  }
}

sendBtn.addEventListener("click", async () => {
  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text, "sent");

  await saveMessage(text);

  messageInput.value = "";
});
messageInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
