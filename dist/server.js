import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import api from './api.js';
const app = express();
app.use('/', api);
app.use('/health', (req, res) => {
    res.send('OK');
});
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Page did not exist' });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map