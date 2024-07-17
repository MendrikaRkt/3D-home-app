const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    type: {type: String, required: true},
    description: {type: String, required: true},
    deviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Device'},
    timeStamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);