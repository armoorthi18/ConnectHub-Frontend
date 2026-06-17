async function loadTodayPosts() {

    try {
	const token = localStorage.getItem("token");
	
        const response = await fetch("http://localhost:8080/posts/today", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
	
        if (!response.ok) {
            console.error("Failed to load posts:", response.status);
            return;
        }
	

        const posts = await response.json();
	

        const feed = document.getElementById("postFeed");
        feed.innerHTML = "";

        posts.forEach(post => {
            feed.innerHTML += `
                <div class="post-card">
                    <h4>${post.username}</h4>
                    <p>${post.content}</p>
                    <small>${post.createdAt}</small>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}
async function createPost() {

    const content = document.getElementById("postContent").value;

    

    if (!content.trim()) {
        alert("Enter a post");
        return;
    }

    const formData = new URLSearchParams();
    formData.append("content", content);
    const token = localStorage.getItem("token");
   

    try {

        const response = await fetch("http://localhost:8080/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer " + token
            },
            body: formData.toString()
        });

        console.log("After fetch");
        console.log("Status:", response.status);

        if (response.ok) {
            document.getElementById("postContent").value = "";
            loadTodayPosts();
        } else {
            console.log("Request failed");
        }

    } catch (error) {

        console.error("Fetch Error:", error);
        alert(error);

    }
}
window.onload = function() {
    loadTodayPosts();
};