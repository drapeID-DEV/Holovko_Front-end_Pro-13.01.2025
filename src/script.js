const messagesContainer = document.querySelector(`.messages-container`);
const inputContainer = document.querySelector(`.input-container`);
const messageInput = document.querySelector(`#message-input`);
const sendButton = document.querySelector(`.send-message`);
sendButton.addEventListener("click", sendMessage);

function createYourMessage() {
  const message = document.createElement("div");
  message.classList.add("text-message", "your-message");
  message.textContent = messageInput.value;
  messagesContainer.appendChild(message);
  messageInput.value = "";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function createResponseMessage(text) {
  const response = document.createElement("div");
  response.classList.add("text-message", "companion-message");
  response.textContent = text;
  setTimeout(() => {
    messagesContainer.appendChild(response);
  }, "2000");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function endChat() {
  createResponseMessage("Have a good day!");
  inputContainer.innerHTML = "Chat has ended!";
}

function randomEnding() {
  if(Math.floor(Math.random() * 2) == 0){
    return true;
  }
}

console.log(Math.floor(Math.random() * 2))

async function getResponse() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();

  const responseText = data[Math.floor(Math.random() * data.length)].title;
  createResponseMessage(responseText);
}

function sendMessage() {
  if (!messageInput.value) return;

  if (messageInput.value == "My watch has ended") {
    createYourMessage();
    endChat();
    return;
  }

  createYourMessage();

  if(randomEnding()) {
    endChat();
    return;
  }
  
  getResponse();
}
