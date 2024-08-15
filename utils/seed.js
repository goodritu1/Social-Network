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
    

    //seed reactions inside of each thought
    thoughtData.forEach( async function(newThought, i) {

        newThought.reactions = [];
        newThought.reactions.push(reactionData[i]);
        console.log(newThought);
  
        // await newThought.save();

    })
   
    
    const newThoughts = await Thought.insertMany(thoughtData);
    console.log('here are the thoughts', newThoughts);

    console.log("Seeding complete!");

    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});
