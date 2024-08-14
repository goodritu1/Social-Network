const {OjectId} = require ('mongoose').Types;

const {Thought, User} = require ('../models');
// api/thoughts
const thoughtsController = {

    getThoughts(req, res) {
        Thought.find({})
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtsController