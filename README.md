# ViruClean

Viruclean will literally get you moving as you use your body to move around a room to get rid of a pesky virus! This was made for [MelonJam](https://melon-jam.devpost.com/) and won **Third Place**! Check out our Devpost submission [here](https://devpost.com/software/viruclean).

## Inspiration

When the theme of MelonJam was announced to be “Outbreak”, one thing popped straight into our (and I’m sure a lot of other people’s) minds; the pandemic. We took this idea and ran with it, but added in our own aesthetics to make it visually appealing and less scary than the reality of the world right now.

## What it does
ViruClean is an interactive game that centers around the following story:

In the year 2020, COVID-19 had risen to cause a global pandemic. The virus has the property to survive on surfaces from hours to days. Somehow, the virus has ended up in your home, and the best way to defeat it is to clean your house!

When the user first opens the game, they will see a home/menu page. Their cursor will be indicated by a spray bottle.

The instructions for how to play the game are found by clicking the “How to Play” button. There, users can get familiarized with the enemy (the virus), items (medicine and vaccine) and how to move around. One special feature of ViruClean is that users must pose for the camera to move around the house. To utilize this feature, users need to enable their camera, then pose using the 5 poses listed in the “How to Play.” Users can test this feature within the “How to Play” screen.

To play the actual game, users select one of three levels (based on difficulty) and then are taken to the play screen. During gameplay, if a player sees a virus, they just have to click on the virus, then press the spacebar before the virus gets too large and stuck to the screen. If the virus does get too large, then the player’s health begins to decrease. To stop the health from decreasing, the player needs to find medicine (pill). However, this will not restore their health, so if they’re low, they need to find a vaccine(syringe), to restore it.

If time runs out, the player’s health reaches 0, or all the viruses are cleaned, then the game is over. Players can then choose to return to the home/menu screen or replay the level.

## How we built it
We started by making the basic framework using p5.js in Glitch. We also created all of the graphics you see on the screen by designing vector images. We then used this original framework, but trained a teachable machine and implemented it to make the game more interactive. (You’ll definitely stretch a lot while playing!)

If you would like to learn more about Google’s teachable machine and how to implement it, we used the following links as guides!

Google's Teachable Machine

Daniel Schiffman's tutorial on how to implement Teachable Machine

Challenges we ran into
Moving seamlessly between the different screens of the game was a bit of a struggle. This issue came to a head with our biggest bug: buttons. Figuring out how to ensure that specific buttons are only active on specific screens proved to be a tedious task, but we were eventually able to solve it using just a few extra lines of code.

## Accomplishments that we're proud of
Creating a game in just a few days is in accomplishment in itself! We are also proud of the overall UI of the game and being able to use Google’s teachable machine to make the game more enjoyable (and slightly more difficult).

## What we learned
We learned how to implement Google’s Teachable Machine, which uses image recognition to classify and then, for our game, move the screen around based on the player’s poses.

We also learned a lot about creating our own original graphics and navigating through the software. We used Vectornator and Clip Studio Paint to create them!

## What's next for ViruClean
We’d like to keep improving on gameplay virus multiplication, should a player take too long to eradicate the virus, and adding more poses for more actions in our teachable machine.

Additionally, we’re going to try to improve the accuracy of our teachable machine. Originally only one team member created the data for the machine, so the game works best with her as the player. However, by providing more variations of each pose with different people, we’re hoping we can make the game smoothly playable for everyone!
