const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

// List Schema
const ListSchema = new Schema ({

    // title, createdBy
    title: {
        type: String,
        required: true
    },
    // createdBy connects a user to their specific lists
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})
module.exports = mongoose.model('List', ListSchema);