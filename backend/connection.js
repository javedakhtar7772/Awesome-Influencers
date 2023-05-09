const mongoose = require('mongoose');

const url = 'mongodb+srv://javedakhtar7772:javed123@cluster0.gvyon.mongodb.net/Awesome_Influencers?retryWrites=true&w=majority'

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;