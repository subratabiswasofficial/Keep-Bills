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

// const Bill = require('./models/Bill');
// const bill = new Bill({ uid: '153b9b34-bcd6-4dab-9252-cb99dd0778b1', amount: 12340, ref: 'upi 123456' });
// bill.save();
// const testFx = async () => {
//     const bills = await Bill.getBillsByRoll(18101105043);
//     console.log(bills);
// };
// testFx();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const specs = swaggerJsdoc(require('./swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const { loginRouter, studentRouter } = require('./routers');
app.use('/api', loginRouter);
app.use('/api/student', studentRouter);

//==========SERVE STATIC FILES==========
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'design', 'login.html'));
    });
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT || 5000}`);
});
