const { Schema, model} = require ('mongoose');

const reactionSchema = require('./Reaction.js')


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]
    },

    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
   );

   thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;



  