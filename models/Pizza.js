const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
/*
The name of the pizza
The name of the user that created the pizza
A timestamp of when the pizza was created
A timestamp of any updates to the pizza's data
The pizza's suggested size
The pizza's toppings
*/

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        // you can also provide a custom message to required - 
        // required: 'Username needs to be provided'
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        // enumerable, set of data that can be iterated over, much like the for ... in loop to iterate through an object
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings: [],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    // set ID to false because mongo will add in this ID for the comments
    id: false
});

// get total count of comments and replies on retrieval
// reduce method to tally up the total amount of replies with each comment
// reduce takes two parameters, an accumulator and a currentValue
// accumulator is total
// currentValue is comment
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});


// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;