require('dotenv').config();
const express = require('express');
const app = express();
const { connctDb } = require('./db/mysql');

app.use(express.json());
connctDb();

/*
 */
// const File = require('./models/File');
// const testFx = async () => {
//     const file = new File('https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png');
//     // const result = await File.getUrlByFid('246b6845-4fa0-4fe2-ae13-e997d545ffc7');
//     const result = await file.save();
//     console.log(result);
// };
// testFx();

/*
 */

const { loginRouter, studentRouter } = require('./routers');
app.use('/api', loginRouter);
app.use('/api/student', studentRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT || 5000}`);
});
