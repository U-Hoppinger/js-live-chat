let myName = localStorage.getItem("chatUsername");
let message = document.querySelector(".message_input");
let sendButton = document.querySelector(".btn_to_send");

if (!myName) {
  myName = prompt("Введи имя...");
  localStorage.setItem("chatUsername", myName);
}
//POST запрос сообщения
sendButton.addEventListener("click", async () => {
  let text = message.value;
  let p = document.createElement("p");
  let textValue = text.value.trim();
  if (!textValue) {
    return;
  }
  p.textContent = `${myName}: ${text}`;
  p.classList.add("message");
  p.classList.add("my-message");
  let containerMessages = document.querySelector(".chat-box");
  containerMessages.appendChild(p);
  message.value = "";

  let newMessage = {
    name: myName,
    text: text,
  };
  await fetch("https://6ab51b3524ee9d3caa1c2f57.mockapi.io/api/WMF/messages", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newMessage),
  });
  message.value = "";
});
//POST запрос сообщения - конец

//GET запрос сообщения
async function loadMessages() {
  let response = await fetch(
    "https://6ab51b3524ee9d3caa1c2f57.mockapi.io/api/WMF/messages",
  );
  let dataText = await response.json();
  let containerMessages = document.querySelector(".chat-box");
  if (dataText.length === containerMessages.children.length) {
    return;
  } // запрещает обновляться если данные на экране совпадают с данными в базе
  containerMessages.innerHTML = "";
  for (let item of dataText) {
    let p = document.createElement("p");
    p.textContent = `${item.name}: ${item.text}`;
    p.classList.add("message");
    if (item.name === myName) {
      p.classList.add("my-message");
    } else {
      p.classList.add("other-message");
    }
    containerMessages.appendChild(p);
  }
}
loadMessages();
//GET запрос сообщения - конец

message.addEventListener("keydown", (event) => {
  if (event.key === "Enter") sendButton.click();
}); // отправка по интеру

setInterval(loadMessages, 3000); // каждые 3 секунды принудительное обновление данных
text.innerHTML;
