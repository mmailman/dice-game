# dice-game
Project for Class 201

## Monday

Tasks completed:

* Created object constructor for Die object
* Created die method to generate random number between 1 and 6
* Created Die type object constructors
* Created roll methods for each of the die type objects

Who did what:

* Sarah: driver
* Mike: navigator

Tasks Completed:

* Created basic HTML framework for the page
* Added CSS styling to the elements
* Incorporated Flexbox to handle positioning

Who did what:

* Keiran: navigator
* Rafi: Driver


Tasks completed:

* Created a function to do the first roll to start a round called startRound().
* Created a function to render the dice pool called renderDice().
* Added css for the dice images.

Who did what:

* Sarah: navigator
* Mike: driver


Tasks completed:

* Added new user function, which creates a user object with a username property
* Added change user function, which allows you to add a second user on top of the first
* When a new user is created, the objects are pushed to an array to allow us to access them
* Set results containers to only display when someone is "signed in"

* Keiran: driver
* Rafi: navigator

Tasks completed:

* Created function that handles the Keep-Rolling event and re-renders the necessary images
* Added event listener to Keep-Rolling button

Who did what:

* Sarah: driver
* Mike: navigator

Tasks completed:

* Added difficulty dropdown to HTML and start game button functionality to JS
* Difficulty and gameplay buttons toggle between disabled and enabled with click event

* Sarah: driver
* Mike: navigator

________________________________________________________

## Tuesday

Tasks completed:

* created a function to account to populate the status bar with the current stats.
* created a win/loss message in the image container
* fixed a bug to clear the status bar and image container when starting a new game
* made a new array to store difficulty and score for each round of the game

Who did what:

* Rafi: driver
* Keiran: chief navigation officer

Tasks completed:
* Added background image.
* Added custom font.
* Added color scheme.

Who did what:
* Sarah: driver
* Rafi: navigator

Tasks completed:

* Refactored HTML code on home and game page
* Adjusted margins and paddings on elements to improve aesthetics
* Adjusted color scheme and background image on game page

Who did what:
* Mike: driver
* Sarah: navigator

Tasks completed:

* Added responsiveness to home and game pages
* Made sticky footer
* Uploaded custom font-family
* Changed background-image

Who did what:
* Sarah: driver
* Mike: navigator

Task completed:

* Added a function to count claws and determine mauling.
* Render a message on Mauling in the Die-Title container.
* Added disabling of the Keep Rolling button upon Mauling.

Who did what:

* Keiran: driver
* Mike: navigator

Tasks completed:

* Added a function to count cameras and log round scores to scoreArray.
* Added click handler/listener for the End-Turn button.
* Modified the startRound function to check for and remove mauled message and re-enable the Keep Rolling button.

Who did what:
* Keiran: navigator
* Mike: driver


Tasks completed:

* Added local storage for scores and difficulties

* Keiran: driver
* Rafi: navigator

______________________________________________________________________

## Wednesday

Michael Tasks Completed:
Added a story to the game page.
Added rules to the game page.
Made the game page more mobile friendly through layout tweaks.
Cleaned up CSS in Game page.
Minor Tweaks to the Stats page (Changed Header Text).
Refactored CSS so that shared CSS is in its own file that all 3 pages use.


Sarah Tasks Completed:
* HTML scaffolding for about me page
* Asset collection
* Angry and neutral sasquatch for game results
* Logo
* Custom font that isn’t working
* CSS for about me page
* Layout, images, background, etc

Keiran: Driver, Rafi: Navigator, Tasks Completed:
* Game page now checks if their is a user signed in, redirects to sign in page if there is not.
* Switched up local storage to better allow us to access it for leaderboards and charts. Now saves an array of objects, each of which have the difficulty of that game, the score, and the username of whoever was signed in



Rafi: Driver, Michael:Navigator
* Solved an issue with the game title not responding to resizing of screen. We used a media query to hide the game logo when the px dimension dropped below a certain dimension.
* Solved another resizing issue with the about us page. Got the text to wrap responsively to screen resizing.
* Added a failing image
* Added a call for a function and moved variable names for the renderScore function.
* Michael:Driver, Rafi:Navigator
* Narrowed the main element
* Fixed the CSS associated with the main element
* added a margin to the nav bar
* Adjusted the GIF size to be mobile responsivei

Sarah: Driver, Keiran: Navigator
* Sorted game array by difficulty into three separate arrays
* Sorted those arrays by score to determine top 3 scores of each user
* Rendered the saved user data from the game play page into tables on the scores page
* Set up canvas element to chart user game data

Keiran: Navigator, Sarah: Driver

* Table rendering for all three chart.js charts onto canvas elements
* Styling for the tables
* Tried to add title to charts but failed


__________________________________________________________________________

## Thursday

Keiran: Driver, Rafi: Navigator, tasks completed:
* Set footer to only display when a user is signed in on home page.
* Removed userArray from stats.js because we didn’t need it when we’re saving the username as part of the data from each game.

Sarah tasks completed:
* Button styling and hover effect
* Pizza pizza pizza
* Fixed header layout and text size
* Fixed table spacing to allow them all to sit on same line


Michael tasks completed:
* Fixed some bugs around the redirect on the game page, reorganized the code a bit.
* Added code to render neutral image.
* Added code to populate span on the game page based on the username.


Keiran tasks completed:
* Put a click handler on the reset high scores button that clears the charts and the high scores tables

Michael: Driver, Keiran: Navigator, tasks completed:
* Fixed Scaling on the charts.
* Fixed Chart title.
* Increased Game length.
* Hid the dice board and status section when game ends.

Keiran: Driver, Michael: Navigator, tasks completed:
* Made the game js more DRY.
* Made the stats js more DRY.


Rafi: Driver, Sarah: Navigator:
* Fixed spacing on about-us page
* Fixed spacing and layout when user enters username
* Hid footer on page load
* Edited navbar for content and spacing

Sarah: Driver, Rafi: Navigator:
* Changed table layout and margins so wrap looks better
* Centered win/loss message on game page
* Changed colors of dice and borders to improve user experience
* Other user experience improvements
* Changed table styling and color
* Updated button styling


Mike: Driver, Keiran:Navigator  
* CHANGED USER DASHBOARD TO SASQUATCH DICE
* CHANGED COLORS ON THE CHARTS TO SAME COLORS AS DIE BACKGROUNDS
* ADDED TOGGLE BUTTON TO SWITCH BETWEEN CHARTS AND TABLES IF THE USER WANTS

Mike:
* Minor change to readme to force github pages to build.
