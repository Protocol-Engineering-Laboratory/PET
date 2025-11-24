const express = require('express');
const bodyParser = require('body-parser');
const connectToFabric = require('./connectToFabric'); // 함수 불러오기

const app = express();
app.use(bodyParser.json());

app.post('/submitData', async (req, res) => {
    try {
        const { id, ip, data } = req.body;

        // connectToFabric 함수 호출
        const contract = await connectToFabric();
        await contract.submitTransaction('createData', id, ip, data.toString());

        res.json({ success: true, message: 'Data submitted to Fabric network' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
