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

sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text, "sent");

  messageInput.value = "";
});

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
