const mongoose = require('moongose');

const DeviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    state: {type: Boolean, default: false},
    lastUpdated: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Device', DeviceSchema);