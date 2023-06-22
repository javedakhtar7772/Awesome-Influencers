const express = require('express');
const userRouter = require('./routers/userRouter');
const brandRouter = require('./routers/brandRouter');
const enrollMentRouter = require('./routers/enrollMentRouter');
const jobRouter = require('./routers/jobRouter');
const utilRouter = require('./routers/utils');


const cors = require('cors');

const app = express();
const port = 5000;

// to allow client to make request
app.use( cors({ origin: 'http://localhost:3000' }) )

app.use(express.json());
app.use('/user', userRouter);   
app.use('/brand', brandRouter);   
app.use('/job', jobRouter);   
app.use('/enroll', enrollMentRouter);   
app.use('/util', utilRouter);   

app.get('/', (req, res) => {
    res.send('Working Fine');
});

app.get('/add', (req, res) => {
    res.send('Add Request on Server');
});

app.use(express.static('./static/uploads'));

// home
// getall

app.listen( port, () => { console.log('server started') } );