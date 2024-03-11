document.addEventListener("DOMContentLoaded", function() {
  const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      // 以下の行はサンプルとしてのみ機能します。実際のAPIには対応していない可能性があります。
      facingMode: "user",
  };

  function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      document.getElementById('result').textContent = `スキャン結果: ${decodedText}`;
      html5QrcodeScanner.clear();
  }

  function onScanFailure(error) {
      console.warn(`QR error = ${error}`);
  }

  let html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader", 
      config, 
      false
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
