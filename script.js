document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById('qr-video');
  const canvasElement = document.getElementById('qr-canvas');
  const canvas = canvasElement.getContext('2d', { willReadFrequently: true });
  const loading = document.getElementById('loading');
  let isReadQR = false;

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then((stream) => {
      video.srcObject = stream;
      video.setAttribute('playsinline', true);
      video.play();
      requestAnimationFrame(tick);
  });

  function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
          //loading.style.display = 'none';
          canvasElement.height = video.videoHeight;
          canvasElement.width = video.videoWidth;
          canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
          });
          if (code && !isReadQR) {
              const result = document.getElementById('result');
              result.textContent = `スキャン結果: ${code.data}`;
              isReadQR = true;
          }
      }
      if (!isReadQR) requestAnimationFrame(tick);
  }
});
