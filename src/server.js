require('dotenv').config();
const express = require('express');
const app = express();
const { connctDb, sqlQuery } = require('./db/mysql');

// mySQL
connctDb();

// middleware
app.use(express.json());

app.get('/test', async (req, res) => {
    const output = await sqlQuery(`SELECT * FROM Users WHERE email = ?`, ['ab@gmail.com']);
    console.log(output.results[0]);
    res.send(output.results[0]);
});

// routes
// app.use('/api', require('./apis/users'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
});
