# Updates from Sunday May 11th
- We have written a Group Contract, and all members should have signed and uploaded it to our repo

# Updates from Tuesday May 13th
- Sprints will start and end on Thursdays or Tuesdays with meetings after class
- Regardless of if we are in a sprint or not we will meet after every class
- Card design team will handle integrating Card.js with individual card templates
- Slack Premium trial ended so some channels were archived

# Updates from Thursday May 15th
- Since the three teams we split into are working well together, we will not shuffle the teams and will assign new tasks to those three teams
- Hand.js, Deck.js, Discard.js, Player.js and PlayerManager.js are the goals for the next sprint
- Mitchell's group is handling Hand.js, Deck.js, Discard.js
- Yunsong's group is handling Player.js and the design of the battle scene
- Vivian's team is handling the design of the player section of the battle scene

# Updates from Sunday May 18th
- We had sprint retrospective and review meetings. The notes are available [here](https://github.com/Team-Black-Hat-White-Hat/Card-Game-Project/blob/main/admin/retrospective/051825-retrospective.md).

# Updates from Saturday May 17th
- Small changes need to be made to allow us to easily render cards dynamically without manually inputting constructor variables
- This primarily entails having all cards be named exports rather than default exports, and defining the custom elements in each class.
- We can now choose a card and render it in just 3 lines of code - which can be easily put into a helper function that takes only the name of the card as an argumnent.

# Updates from Monday May 19th
-  Yunsong's team will split into 1 backend and 3 frontend devs
-  The team update video will have 4 sections, each voiced over by one member

#Updates from Wednesday May 21st
- Since HTMLElement isn't testable in Jest's native environment, we needed to introduce a virtual environment using jsdom. We updated the package.json file under the dev directory as needed.
