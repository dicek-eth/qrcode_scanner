document.addEventListener("DOMContentLoaded", function() {
  function onScanSuccess(decodedText, decodedResult) {
      // スキャンに成功したら、デコードされたテキストをコンソールに表示し、
      // 結果表示エリアにデコードされたテキストを表示します。
      console.log(`Code matched = ${decodedText}`, decodedResult);
      document.getElementById('result').textContent = `スキャン結果: ${decodedText}`;

      // スキャンを停止します。継続的にスキャンする場合は、この行を削除またはコメントアウトします。
      html5QrcodeScanner.clear();
  }

  function onScanFailure(error) {
      // スキャンに失敗した時の処理。この例では、単にエラーをコンソールに表示します。
      console.warn(`QR error = ${error}`);
  }

  // Html5QrcodeScanner オブジェクトを初期化します。"qr-reader"は、QRコードスキャナーの
  // ビデオプレビューを表示するHTML要素のIDです。
  let html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } }, 
      /* verbose= */ false
  );

  // スキャナーをレンダリングし、成功または失敗のコールバックを提供します。
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
