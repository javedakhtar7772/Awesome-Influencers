// const mongoose = require('mongoose');

// const url = 'mongodb+srv://javedakhtar7772:javed123@cluster0.kvn4jdj.mongodb.net/Awesome_Influencers?retryWrites=true&w=majority'
// // const url = 'mongodb+srv://ashutoshshubham:ashutosh@cluster0.cqjsjz0.mongodb.net/Awesome_Influencers?retryWrites=true&w=majority'

// mongoose.connect(url)
// .then((result) => {
//     console.log('database connected');
// })
// .catch((err) => {
//     console.error(err);
// });

// module.exports = mongoose;

const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/Awesome_Influencers';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected (local)');
})
.catch((err) => {
    console.error('Connection error:', err.message);
});

module.exports = mongoose;
