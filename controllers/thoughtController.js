const {ObjectId} = require ('mongoose').Types;

const {Thought, User} = require ('../models');
// const { updateMany } = require('../models/User');
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
    // addReaction(req, res){
    //     Thought.findOneAndUpdate({_id: req.params.thoughtId},
    //         {$addToSet: {reactions: req.body}},
    //         {new: true, runValidators: true}
    //         )
    //         .then((thought) => 
    //         !thought
    //         ? res.status(404).json({ message: 'No thought with that ID'})
    //         : res.json(thought)
    //         )
    //         .catch((err) => res.status(500).json(err));

    //},
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

    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true})
        
            .then((thought) => {
                !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
     } )


        .catch((err) => res.status(500).json(err));

    },

deleteThought(req, res) {
   console.log("delete");
   
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) => {
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : console.log("i am here");
        // : res.json({ message: 'Thought deleted!' })
    })
    
    .catch((err) => res.status(500).json(err));

    console.log(" i am not here");
    
    const user = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    );
    console.log(user);
    
    if (!user) {
        return res.status(404).json({ message: 'Thought created, but no user with that ID' });
    }
    res.json({ message: 'Thought successfully deleted' });
},

addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: {reactionBody: req.body.reactionBody, username: req.body.username}}},
        { new: true }
    )
    .then((User) =>
        !User
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(User)
    )
    .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
    .then((User) =>
        !User
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(User)
    )
    .catch((err) => res.status(500).json(err));

},
}

    
module.exports = thoughtsController;