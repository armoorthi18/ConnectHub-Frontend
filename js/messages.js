async function sendMessage() {

    try {

        const token = localStorage.getItem("token");
alert(token);

        const receiverEmail =
            document.getElementById("receiverEmail").value;

        const content =
            document.getElementById("messageInput").value;

        if (!receiverEmail || !content) {
            alert("Please enter recipient email and message");
            return;
        }

        const response = await fetch(
            "http://localhost:8080/messages/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    receiverEmail: receiverEmail,
                    content: content
                })
            }
        );

        console.log("Status:", response.status);

        if (response.ok) {

            alert("Message sent");

            document.getElementById("messageInput").value = "";

        } else {

            const errorText = await response.text();
            console.error(errorText);

            alert("Failed: " + response.status);
        }

    } catch (error) {

        console.error(error);
        alert("Error: " + error.message);
    }
}