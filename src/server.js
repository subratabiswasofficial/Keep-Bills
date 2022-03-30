require('dotenv').config();
const express = require('express');
const app = express();
const { connctDb } = require('./db/mysql');

app.use(express.json());
connctDb();

const { loginRouter } = require('./routers');
app.use('/api', loginRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
});
