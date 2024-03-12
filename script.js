const video = document.createElement('video');
const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');
const loading = document.getElementById('loading');
let isReadQR = false;
// ES6 import
import jsQR from "jsqr";
 
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then((stream) => {
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    requestAnimationFrame(tick);
  });

function tick() {
  loading.textContent = '⌛ ロード中...';
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loading.hidden = true;
    canvasElement.hidden = false;
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (code && !isReadQR) {
      location.href = code.data;
      isReadQR = true;
    }
  }
  requestAnimationFrame(tick);
}