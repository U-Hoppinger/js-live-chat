let myName = localStorage.getItem("chatUsername");
let message = document.querySelector(".message_input");
let sendButton = document.querySelector(".btn_to_send");

if (!myName) {
  myName = prompt("Введи имя...");
  localStorage.setItem("chatUsername", myName);
}
//POST запрос сообщения

sendButton.addEventListener("click", async () => {
  let text = message.value.trim();

  if (!text) {
    return;
  }

  let newMessage = {
    name: myName,
    text: text,
  };

  try {
    let response = await fetch(
      "https://6ab51b3524ee9d3caa1c2f57.mockapi.io/api/WMF/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      },
    );

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    message.value = "";
    await loadMessages();
  } catch (error) {
    console.error("Не удалось отправить сообщение:", error);
  }
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

setInterval(loadMessages, 1000); // каждые 3 секунды принудительное обновление данных
