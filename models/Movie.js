const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const MovieSchema = new Schema ({

    // TODO: Determine if mostly API calls, or saved props from search

    // listId connects movies to lists
    listId: {
        type: ObjectId,
        ref: 'List',
        required: true
    },
    // get movieId's so they can be referenced by API on load?
    movieId: {
        // search params is though movie id
        type: Number
    }
})
module.exports = mongoose.model('Movie', MovieSchema);