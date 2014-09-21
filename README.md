Project 1 - Game of Life
============

# Grading Instructions

## Usage

Open `index.html` in Google Chrome *or* navigate to [conway.firebaseapp.com](https://conway.firebaseapp.com/).

An initial configuration for the Game of Life will be set and the game will begin. There are 5 buttons.

1. **Prev. Config**: Reset the board with the previous sample configuration.
2. **Stop/Start**: Pause or resume the game.
3. **Random Spawn**: Randomly make some cells on the grid alive (click rapidly for lots of action!).
4. **Reset/Done**: After clicking Reset, the game board will be cleared. Then, you can click cells to toggle them alive or dead. When you're done, click Done and the game will start.
5. **Next Config**: Reset the board with the next sample configuration.

## Highlights

Consider the [`step` function](https://github.com/6170-fa14/hsubrama_proj1/blob/master/js/life.js#L70-L145) in `js/life.js`.

This code computes the next step in the Game of Life. It has three phases:

1. Determine the live cells that must die.
2. Determine the dead cells that must come to life.
3. Apply the updates to the game.

The three pass approach has two advantages:

1. It represents the game state (i.e. the locations of live cells) with a JavaScript object instead of a 2D array (see Design Challenges section).
2. It returns the updates to the game state (i.e. the cells that have come to life and the cells that have died) instead of returning the whole game board. This is efficient because the drawing code needs only to make incremental changes (ex. drawing a few rectangles on the canvas or modifying a few DOM elements) instead of redrawing the whole game board. 

## Help Wanted

My testing code is in `js/tests` and in `js/test.js`, I create a boolean flag which determines whether tests are run.

I would prefer to be able to run tests from the command line instead of having to toggle a flag and run them in the browser. Are there any JavaScript test frameworks which could help me do this?

# Design Challenges

**Problem**: The Game of Life is supposed to be played on an **infinite grid**.

The naive way to store the game state is as a 2D array (i.e. array of arrays). This is bad because it's possible that the next step of the Game of Life produces a cell out of the array bounds. If this is the case, we will have to ignore that cell. By ignoring it, that cell can no longer affect other cells, so our simulation is not a **true** Game of Life.

Another approach is to make a 2D array which is significantly larger than the grid displayed to the user. While this isn't perfect, it is a "better approximation" to an infinite grid. However, many cells of this array may not be used in the simulation, so storage space is wasted.

The solution used in this program is to **store only the coordinates of the live cells**. We store them in a JavaScript object called `live_cells` in `js/life.js`. The keys of the objects are coordinates (represented as two-element arrays converted to strings `[x, y]`) and the values of the object are simply `True`. For instance:

```
{
  "[1, 2]": True,
  "[3, 5]": True
}

```

The above represents a game state with two live cells, at (1, 2) and (3, 5). By storing them as the keys of an object, we can insert, delete, and lookup in constant time.

Since we only store the live cells instead of a 2D array of all cells, we are more efficient with storage space and can scale to support even a very large Game of Life.


# Architecture

`index.html` loads the stylesheets and javascripts. It displays the `canvas` on which the Game of Life will be drawn.

The code is inside the `js` directory.

`js/main.js` - Creates a global object called `LIFE`. All other classes are fields of this object (to avoid polluting global scope).

`js/life.js` - The game logic. It creates the `Life` class which tracks live cells and takes a step in the Game of Life each time the `step()` method is called.

`js/canvas_grid.js` - The canvas grid system. It creates a class which draws a grid on top of an HTML `canvas` and fills/clears grids squares. NOTE: I created this class before the 6.170 staff provided their own drawing code, that is why I'm not using the 6.170 drawing code.

`js/game_ui.js` - Interaction between models and user interface. It sets up handlers for the buttons and sets up the logic to draw the game state (from `js/life.js`) onto the `canvas` grid (from `js/canvas_grid.js`).

`js/sample_initial_states.js` - Defines some sample initial board configurations.

# Testing

Testing is done with [QUnit](http://qunitjs.com/). See `js/qunit.js` and `css/qunit.css`. The following files are also used:

`js/test.js` - Contains a boolean flag to toggle test running. If true, all tests will be run.

`js/tests/` - Unit tests are inside this directory.

# Author
Harihar Subramanyam (hsubrama@mit.edu)

# Documentation

The code has been commented using [JSDoc](http://usejsdoc.org/) conventions.

