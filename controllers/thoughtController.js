const {OjectId} = require ('mongoose').Types;

const {Thought, User} = require ('../models');
const { updateMany } = require('../models/User');
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
    },
    addReaction(req, res){
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true, runValidators: true}
            )
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with that ID'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },


    }


module.exports = thoughtsController