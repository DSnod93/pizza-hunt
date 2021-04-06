/*
The name of the pizza
The name of the user that created the pizza
A timestamp of when the pizza was created
A timestamp of any updates to the pizza's data
The pizza's suggested size
The pizza's toppings
*/

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set ID to false because mongo will add in this ID for the comments
        id: false
    }
);
// get total count of comments and replies on retrieval
// reduce method to tally up the total amount of replies with each comment
// reduce takes two parameters, an accumulator and a currentValue
// accumulator is total
// currentValue is comment
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});


// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;