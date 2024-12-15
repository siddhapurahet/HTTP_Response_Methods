const express = require('express');
const app = express();

app.get('/streaming', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    for (let i = 1; i <= 10; i++) {
        res.write(`Line ${i}\n`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    res.end();
});

app.listen(5000, () => console.log('Server running on port 5000'));
