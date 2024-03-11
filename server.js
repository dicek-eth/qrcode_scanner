const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/verify-vc', (req, res) => {
    const vcData = req.body.vcData;
    // VCの検証ロジックをここに実装
    // 仮にVCが20歳以上であることを検証する場合
    if (vcData.age >= 20) {
        res.send('OK');
    } else {
        res.send('Not OK');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
