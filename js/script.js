// Check Login

const token = localStorage.getItem("token");

if(!token) {

    window.location.href = "../login.html";
}


// Load Profile

async function loadProfile() {

	

    try {

        const response = await fetch(
            "http://localhost:8080/api/user/profile",
            {

                method: "GET",

                headers: {

                    "Authorization":
                        "Bearer " + token,

                    "Content-Type":
                        "application/json"
                }
            }
        );


        if(!response.ok) {
	

            throw new Error(
                "Failed to load profile"
            );
        }
		
        const user = await response.json();
alert(user);

        // Set User Details

        document.getElementById(
            "userName"
        ).innerText = user.fullName;

        document.getElementById(
            "userPosition"
        ).innerText = user.position;

        document.getElementById(
            "userDepartment"
        ).innerText = user.department;

        document.getElementById(
            "statusMessage"
        ).innerText =
            user.statusMessage ||
            "No status updated";

        // Profile Image

        if(user.profilePicture) {

            document.querySelector(
                ".profile-image"
            ).src = user.profilePicture;
        }

        // Interests

        const interestsContainer =
            document.querySelector(
                ".interest-tags"
            );

        interestsContainer.innerHTML = "";

        if(user.interests) {

            user.interests.forEach(
                interest => {

                    const span =
                        document.createElement(
                            "span"
                        );

                    span.innerText = interest;

                    interestsContainer.appendChild(
                        span
                    );
                }
            );
        }

    } catch(error) {
	

        console.error(error);
    }
}


// Update Status

async function updateStatus() {

    const status =
        document.getElementById(
            "statusInput"
        ).value;

    try {

        const response = await fetch(
            "http://localhost:8080/api/user/status",
            {

                method: "PUT",

                headers: {

                    "Authorization":
                        "Bearer " + token,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    statusMessage: status
                })
            }
        );

        if(response.ok) {

            document.getElementById(
                "statusMessage"
            ).innerText = status;

            document.getElementById(
                "statusInput"
            ).value = "";
        }

    } catch(error) {

        console.error(error);
    }
}


// Logout

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "../login.html";
}


// Load on Page Start

loadProfile();