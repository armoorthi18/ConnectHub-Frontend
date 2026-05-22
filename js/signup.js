document.getElementById(
    "signupForm"
).addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const fullName =
            document.getElementById(
                "fullName"
            ).value;

        const email =
            document.getElementById(
                "email"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        const message =
            document.getElementById(
                "message"
            );

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/signup",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        fullName,
                        email,
                        password
                    })
                }
            );

            const result =
                    await response.text();

            if(response.ok) {

                message.style.color =
                    "green";

                message.innerText =
                    "Successfully Registered";

                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 2000);

            } else {

                message.style.color =
                    "red";

                message.innerText =
                    result;
            }

        } catch(error) {

            message.style.color =
                "red";

            message.innerText =
                "Server Error";
        }
    }
);