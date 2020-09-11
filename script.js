const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),

]).then(startVideo)


//have webcam display
function startVideo() {
    navigator.getUserMedia(
        { video: {}},
        //grabbing video object
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}
//call function
//
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    // add canvas to the screen
    document.body.append(canvas)
    //Get display size of current  video
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            .withFaceExpressions()
        //boxes that show on face are properly sized for the video elements
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})