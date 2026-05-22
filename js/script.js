// Check Login

const token = localStorage.getItem("token");

if(!token) {

    window.location.href = "../login.html";
}


// Load Profile

async function loadProfile() {

    console.log("LOAD PROFILE CALLED");

    console.log("TOKEN:", token);

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

        console.log(
            "RESPONSE STATUS:",
            response.status
        );

        const responseText =
            await response.text();

        console.log(
            "RESPONSE TEXT:",
            responseText
        );

        const user =
            JSON.parse(responseText);

        console.log("USER:", user);

        // USER NAME

        document.getElementById(
            "userName"
        ).innerText =
            user.fullName || "";

        // POSITION

        document.getElementById(
            "userPosition"
        ).innerText =
            user.position || "";

        // DEPARTMENT

        document.getElementById(
            "userDepartment"
        ).innerText =
            user.department || "";

        // STATUS

        document.getElementById(
            "statusMessage"
        ).innerText =
            user.statusMessage ||
            "No Status";

        // PROFILE IMAGE

        document.getElementById(
            "profileImage"
        ).src =
            user.profilePicture ||
            "https://ui-avatars.com/api/?name="
            + encodeURIComponent(
                user.fullName
            );

        // INTERESTS

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

                    span.innerText =
                        interest;

                    interestsContainer.appendChild(
                        span
                    );
                }
            );
        }

    } catch(error) {

        console.error(
            "LOAD PROFILE ERROR:",
            error
        );
    }
}
// update Profile
async function updateProfile() {

    const fullName =
        document.getElementById(
            "updateFullName"
        ).value;

    const department =
        document.getElementById(
            "updateDepartment"
        ).value;

    const position =
        document.getElementById(
            "updatePosition"
        ).value;

    const profilePicture =
        document.getElementById(
            "updateProfilePicture"
        ).value;

    const interests =
        document.getElementById(
            "updateInterests"
        ).value
            .split(",")

            .map(item => item.trim());

    try {

        const response = await fetch(
            "http://localhost:8080/api/user/update-profile",
            {

                method: "PUT",

                headers: {

                    "Authorization":
                        "Bearer " + token,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    fullName,
                    department,
                    position,
                    profilePicture,
                    interests
                })
            }
        );

        if(response.ok) {

            alert(
                "Profile Updated Successfully"
            );

            loadProfile();
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

async function addAchievement() {

    const title =
        prompt("Enter Achievement Title");

    if(!title) {

        return;
    }

    const description =
        prompt("Enter Description");

    try {

        const response = await fetch(
            "http://localhost:8080/api/user/achievement",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        "Bearer " + token,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title: title,

                    description: description
                })
            }
        );

        if(response.ok) {

            loadAchievements();
        }

    } catch(error) {

        console.error(error);
    }
}

async function loadAchievements() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/user/achievements",
            {

                method: "GET",

                headers: {

                    "Authorization":
                        "Bearer " + token
                }
            }
        );

        const achievements =
                await response.json();

        const achievementList =
                document.getElementById(
                    "achievementList"
                );

        achievementList.innerHTML = "";

        achievements.forEach(
            achievement => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "achievement-card";

                card.innerHTML = `

                    <h4>
                        ${achievement.title}
                    </h4>

                    <p>
                        ${achievement.description}
                    </p>
                `;

                achievementList.appendChild(
                    card
                );
            }
        );

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

loadAchievements();