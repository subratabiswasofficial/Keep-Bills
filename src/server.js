require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');

const { connctDb } = require('./db/mysql');

app.use(express.json());
app.use(fileUpload());

connctDb();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const specs = swaggerJsdoc(require('./swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const { loginRouter, studentRouter, billRouter, adminRouter, logger } = require('./routers');
app.use('/api', loginRouter);
app.use('/api/student', studentRouter);
app.use('/api/bill', billRouter);
app.use('/api/admin', adminRouter);
app.use('/api/logger', logger);

//==========SERVE STATIC FILES==========
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT || 5000}`);
});
