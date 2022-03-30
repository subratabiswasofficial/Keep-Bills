require('dotenv').config();
const express = require('express');
const app = express();
const { connctDb } = require('./db/mysql');

app.use(express.json());
connctDb();

const { loginRouter, studentRouter } = require('./routers');
app.use('/api', loginRouter);
app.use('/api/student', studentRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT || 5000}`);
});
