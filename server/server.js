const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/crypto', (req, res) => {
    // handle algorithm, key, inputText
    res.json({ result: "Encrypted or decrypted result" });
});

app.get('/', (req, res) => {
    res.send('CryptoForge API is running');
});

const PORT = 1711;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));