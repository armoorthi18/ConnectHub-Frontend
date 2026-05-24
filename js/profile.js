// js/profile.js

const token = localStorage.getItem("token");

if(!token) {

    window.location.href =
        "../login.html";
}


// Load Existing Profile

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

        const user =
            await response.json();

        // Populate Form

        document.getElementById(
            "updateFullName"
        ).value =
            user.fullName || "";

        document.getElementById(
            "updateDepartment"
        ).value =
            user.department || "";

        document.getElementById(
            "updatePosition"
        ).value =
            user.position || "";

        document.getElementById(
            "updateInterests"
        ).value =
            user.interests
                ? user.interests.join(", ")
                : "";

        document.getElementById(
            "updateProfilePicture"
        ).value =
            user.profilePicture || "";

        // Preview Image

        document.getElementById(
            "profilePreview"
        ).src =
            user.profilePicture ||
            "https://ui-avatars.com/api/?name="
            + encodeURIComponent(
                user.fullName
            );

    } catch(error) {

        console.error(error);
    }
}


// Preview Profile Image

function previewImage() {

    const imageUrl =
        document.getElementById(
            "updateProfilePicture"
        ).value;

    document.getElementById(
        "profilePreview"
    ).src =
        imageUrl;
}


// Update Profile

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

            window.location.href =
                "status.html";
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


// INITIAL LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProfile();
    }
);