const scanner = new jscanify();
let canvas = document.getElementById("canvas");
let result = document.getElementById("result");
let video = document.getElementById("video");

const canvasCtx = canvas.getContext("2d");
const resultCtx = result.getContext("2d");

function loadVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: {
                facingMode: { exact: "environment" } 
            } 
        }).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();

                setInterval(() => {
                    canvasCtx.drawImage(video, 0, 0);
                    const resultCanvas = scanner.highlightPaper(canvas);
                    resultCtx.drawImage(resultCanvas, 0, 0);
                }, 10);
            };
        }).catch((err) => {
            console.error("Ошибка доступа к камере: ", err);
        });
    } else {
        console.error("Ваш браузер не поддерживает API getUserMedia.");
    }
}

loadVideo();
console.log(navigator.mediaDevices);