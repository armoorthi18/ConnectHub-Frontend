window.onload = function() {
    loadReceivedMessages();
};

async function loadReceivedMessages() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:8080/messages/received",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const messages = await response.json();

        const container =
            document.getElementById("messageList");

        container.innerHTML = "";

        messages.forEach(message => {

            container.innerHTML += `
                <div class="message-card">
                    <h4>${message.senderName}</h4>
                    <p>${message.content}</p>
                    <small>${message.sentAt}</small>
                </div>
            `;
        });

    } catch(error) {

        console.error(error);
    }
}