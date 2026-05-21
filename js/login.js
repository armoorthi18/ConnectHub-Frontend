// Check Login

const token = localStorage.getItem("token");

if(!token) {

    window.location.href = "../view/login.html";
}


document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const errorMessage =
        document.getElementById("errorMessage");

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if(response.ok) {

            const token = await response.text();

            // Store JWT Token
            localStorage.setItem(
                "token",
                token
            );

            // Redirect to profile page
            window.location.href = "../view/status.html";

        } else {

            errorMessage.innerText =
                "Invalid Email or Password";
        }

    } catch(error) {


        errorMessage.innerText =
            "Server Error";
    }

});