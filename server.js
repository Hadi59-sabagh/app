const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// فعال‌سازی CORS
app.use(cors());

// یک روت ساده
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// سرور رو راه‌اندازی کن
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
