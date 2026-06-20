document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const errorMessage =
        document.getElementById("errorMessage");

 // CLEAR OLD ERROR

            errorMessage.innerText = "";

            // EMAIL VALIDATION

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailPattern.test(email)) {

                errorMessage.innerText =
                    "Please enter valid email address";

                return;
            }

            // PASSWORD VALIDATION

            if(password.length < 4) {

                errorMessage.innerText =
                    "Password must be minimum 4 characters";

                return;
            }

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

            
const data = await response.json();
	
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
localStorage.setItem("fullName", data.fullName);

            // Redirect to profile page
            window.location.href = "../view/status.html";

        } else {

            errorMessage.innerText =
                "Invalid Email or Password";
        }

    } catch(error) {

	alert(error);
        errorMessage.innerText =
            "Server Error" + error;
    }

});

function goToSignup() {

    window.location.href =
        "../view/signup.html";
}