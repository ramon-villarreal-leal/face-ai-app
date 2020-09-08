const video = document.getElementById("video")

function startVideo(){
    navigator.getUserMedia(
        { video: {}}
    )
}