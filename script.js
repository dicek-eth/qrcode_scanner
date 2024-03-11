document.addEventListener("DOMContentLoaded", function() {
  const videoElement = document.getElementById('qr-video');
  const canvasElement = document.getElementById('qr-canvas');
  const canvasContext = canvasElement.getContext('2d');

  // カメラを起動
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(function(stream) {
          videoElement.srcObject = stream;
          videoElement.setAttribute("playsinline", true); // iOS用の設定
          videoElement.play();
          requestAnimationFrame(tick);
      });

  function tick() {
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
          // Videoの表示をCanvasに転送
          canvasElement.height = videoElement.videoHeight;
          canvasElement.width = videoElement.videoWidth;
          canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
          var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
          // QRコードをデコード
          var code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
          });
          if (code) {
              document.getElementById('result').textContent = `スキャン結果: ${code.data}`;
              // QRコードのスキャンを停止
              //videoElement.pause();
              //videoElement.srcObject.getTracks().forEach(track => track.stop());
          } else {
              requestAnimationFrame(tick);
          }
      } else {
          requestAnimationFrame(tick);
      }
  }
});
