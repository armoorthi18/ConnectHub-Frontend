// SAMPLE POSTS

const posts = [

    {
        user: "Mathi Vanan",

        position: "Senior Software Developer",

        profile:
            "https://i.pravatar.cc/150?img=12",

        content:
            "Successfully integrated JWT Authentication into ConnectHub 🚀"
    },

    {
        user: "Arun Kumar",

        position: "HR Manager",

        profile:
            "https://i.pravatar.cc/150?img=15",

        content:
            "Reminder: Team outing this Friday 🎉"
    }
];


// LOAD POSTS

function loadPosts() {

    const postFeed =
        document.getElementById(
            "postFeed"
        );

    if(!postFeed) {

        console.log(
            "postFeed not found"
        );

        return;
    }

    postFeed.innerHTML = "";

    posts.forEach(post => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "post-card";

        card.innerHTML = `

            <div class="post-header">

                <img
                    src="${post.profile}"
                    class="profile-image"
                >

                <div>

                    <h4>${post.user}</h4>

                    <p>${post.position}</p>

                </div>

            </div>

            <div class="post-content">

                ${post.content}

            </div>

            <div class="post-actions">

                <button>
                    👍 Like
                </button>

                <button>
                    💬 Comment
                </button>

                <button>
                    🔁 Share
                </button>

            </div>
        `;

        postFeed.appendChild(card);
    });
}


// CREATE POST

function createPost() {

    const content =
        document.getElementById(
            "postContent"
        ).value;

    if(!content.trim()) {

        alert(
            "Please enter content"
        );

        return;
    }

    posts.unshift({

        user: "Mathi Vanan",

        position:
            "Senior Software Developer",

        profile:
            "https://i.pravatar.cc/150?img=12",

        content: content
    });

    document.getElementById(
        "postContent"
    ).value = "";

    loadPosts();
}


// INITIAL LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPosts();
    }
);