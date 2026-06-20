document.addEventListener(
    "DOMContentLoaded",
    loadStatistics
);

async function loadStatistics() {

    try {

        const token =
            localStorage.getItem("token");

        const role =
            localStorage.getItem("role");

        if (role !== "ADMIN") {

            alert("Access Denied");

            window.location.href =
                "status.html";

            return;
        }

        const response = await fetch(
            "http://localhost:8080/api/admin/stats",
            {
                method: "GET",
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );

        if (response.status === 403) {

            alert("Admin access required");

            window.location.href =
                "status.html";

            return;
        }

        const stats =
            await response.json();

        document.getElementById(
            "totalUsers"
        ).innerText =
            stats.totalUsers;

        document.getElementById(
            "totalPosts"
        ).innerText =
            stats.totalPosts;

        document.getElementById(
            "totalAchievements"
        ).innerText =
            stats.totalAchievements;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to load dashboard"
        );
    }
}