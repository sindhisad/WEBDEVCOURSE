document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const liveStream = document.getElementById("liveStream");
    const userIdInput = document.getElementById("userId");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
    const controls = document.getElementById("controls");
    const muteButton = document.getElementById("muteButton");
    const unmuteButton = document.getElementById("unmuteButton");
    const streamFrame = document.getElementById("streamFrame");

    // Predefined User Credentials
    const credentials = {
        "admin": "admin123",
        "user1": "pass123",
        "user2": "secure456"
    };

    let isMuted = true;

    function verifyLogin() {
        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Attempting login:", userId);

        if (credentials[userId] && credentials[userId] === password) {
            console.log("Login successful for:", userId);

            // Hide login form, show live stream
            loginForm.style.display = "none";
            liveStream.style.display = "block";
            errorMessage.innerText = "";

            if (userId === "admin") {
                controls.style.display = "block";
                muteButton.style.display = "inline-block";
                unmuteButton.style.display = "inline-block";
            } else {
                controls.style.display = "none";
                muteButton.style.display = "none";
                unmuteButton.style.display = "none";
            }
        } else {
            console.log("Login failed for:", userId);
            errorMessage.innerText = "Invalid User ID or Password!";
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        console.log("Mute toggled, new state:", isMuted);

        if (isMuted) {
            muteButton.style.display = "none";
            unmuteButton.style.display = "inline-block";
        } else {
            muteButton.style.display = "inline-block";
            unmuteButton.style.display = "none";
        }
    }

    // Clears error message on input change
    userIdInput.addEventListener("input", () => errorMessage.innerText = "");
    passwordInput.addEventListener("input", () => errorMessage.innerText = "");

    // Expose functions to window
    window.verifyLogin = verifyLogin;
    window.toggleMute = toggleMute;

    // Hide elements on page load
    liveStream.style.display = "none";
    controls.style.display = "none";
    muteButton.style.display = "none";
    unmuteButton.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
    const muteButton = document.getElementById("muteButton");
    const unmuteButton = document.getElementById("unmuteButton");

    let isMuted = true;

    function toggleMute() {
        isMuted = !isMuted;

        // Store the mute state globally so students get the update instantly
        localStorage.setItem("isMuted", isMuted);

        updateAskQuestionVisibility();

        if (isMuted) {
            muteButton.style.display = "none";
            unmuteButton.style.display = "inline-block";
        } else {
            muteButton.style.display = "inline-block";
            unmuteButton.style.display = "none";
        }
    }

    function updateAskQuestionVisibility() {
        const askQuestionButton = document.getElementById("askQuestionButton");
        if (askQuestionButton) {
            askQuestionButton.style.display = isMuted ? "none" : "inline-block";
        }
    }

    // Update student interface instantly based on mute state
    function syncMuteState() {
        isMuted = localStorage.getItem("isMuted") === "true";
        updateAskQuestionVisibility();
    }

    // Sync on load to ensure state remains consistent across all users
    syncMuteState();

    // Expose function globally
    window.toggleMute = toggleMute;
});
document.addEventListener("DOMContentLoaded", function () {
    const streamFrame = document.getElementById("streamFrame");
    const fullScreenButton = document.getElementById("fullScreenButton");

    function openFullScreen() {
        if (streamFrame.requestFullscreen) {
            streamFrame.requestFullscreen();
        } else if (streamFrame.mozRequestFullScreen) { // Firefox
            streamFrame.mozRequestFullScreen();
        } else if (streamFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
            streamFrame.webkitRequestFullscreen();
        } else if (streamFrame.msRequestFullscreen) { // IE/Edge
            streamFrame.msRequestFullscreen();
        }

        // Force landscape mode on mobile
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock("landscape").catch(err => console.log("Orientation lock failed:", err));
        }
    }

    // Fullscreen button click event
    fullScreenButton.addEventListener("click", openFullScreen);
});
function verifyLogin() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    if (credentials[userId] && credentials[userId] === password) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("liveStream").style.display = "block";

        // Open voice chat in the background
        let voiceChat = document.getElementById("voiceChat");
        if (!voiceChat) {
            voiceChat = document.createElement("iframe");
            voiceChat.id = "voiceChat";
            voiceChat.src = "https://meet.jit.si/webdevteach#config.startWithAudioMuted=false&config.startWithVideoMuted=true&config.video=false";
            voiceChat.allow = "microphone; autoplay";
            voiceChat.style = "width: 1px; height: 1px; position: absolute; opacity: 0;";
            document.body.appendChild(voiceChat);
        }
    } else {
        document.getElementById("errorMessage").innerText = "Invalid User ID or Password!";
    }
}
function verifyLogin() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    if (credentials[userId] && credentials[userId] === password) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("liveStream").style.display = "block";

        // Open Jitsi Meet in a new tab for the admin
        if (userId === "admin") {
            window.open("https://meet.jit.si/webdevteach#config.startWithAudioMuted=false&config.startWithVideoMuted=true", "_blank");
        } 
        // For students, embed Jitsi Meet silently
        else {
            let voiceChat = document.getElementById("voiceChat");
            if (!voiceChat) {
                voiceChat = document.createElement("iframe");
                voiceChat.id = "voiceChat";
                voiceChat.src = "https://meet.jit.si/webdevteach#config.startWithAudioMuted=false&config.startWithVideoMuted=true";
                voiceChat.allow = "microphone; autoplay";
                voiceChat.style = "width: 1px; height: 1px; position: absolute; opacity: 0;";
                document.body.appendChild(voiceChat);
            }
        }
    } else {
        document.getElementById("errorMessage").innerText = "Invalid User ID or Password!";
    }
}
