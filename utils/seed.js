const userData = require("./userData");
const thoughtData = require("./thoughtData");
const reactionData = require("./reactionData");

const db = require("../config/connection");

const { User, Thought } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany(userData);
    const newThoughts = await Thought.insertMany(thoughtData);

    // seed reactions inside of each thought
    // newThoughts.forEach(function(newThought, i) {
    //     newThought.reactions.push(reactionData[i]);
    //     console.log(newThought);
  
    //     newThought.save();
    // })

    // for (var i = 0; i < newThoughts.length; i++) {
      
    // }

    console.log("Seeding complete!");

    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});
