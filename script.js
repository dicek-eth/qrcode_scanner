const video = document.createElement('video');
document.body.appendChild(video); // この行を追加
const canvasElement = document.getElementById('qr-canvas');
const canvas = canvasElement.getContext('2d', { willReadFrequently: true });
const loading = document.getElementById('loading');
const output = document.getElementById('output');
let isReadQR = false;
 
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then((stream) => {
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    requestAnimationFrame(tick);
  });
 
function tick() {
  loading.innerText = 'ロード中...';
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
      alert(`スキャン結果: ${code.data}`); // 結果をアラートで表示
      isReadQR = true; // 一度スキャンしたら再スキャンしない
    }
  }
  if (!isReadQR) requestAnimationFrame(tick); // QRコードをまだ読み取っていなければ、繰り返す
}