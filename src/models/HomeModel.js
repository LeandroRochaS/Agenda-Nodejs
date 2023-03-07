const mongoose = require('mongoose');

const HomeShema = new mongoose.Schema({
    titulo: {type: String, required: true}

});


class Home {

}

module.exports = Home;