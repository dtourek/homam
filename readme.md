# Heroes of Might and Magic - purely in JavaScript (Typescript)


## Features
- role play game
- resources to buy more army and buildings

### Battle
- move with army in hexagonal map during battle

### World
- move with your hero in octagonal map through world
- obstacles
- poi (castle, resources, army recruits, foes, wild enemy army, mines, ....)

...and much more

# TODO
- [x] Player can move on free land, not to obstacle
- [x] disable scrolling in browser
- [x] Migrate to React
- [ ] add oblique movement by using keyboard (numlock 7 - left up, 9 - right up, 1 - left down, 3 right down)
- [ ] add mouse control move
  - [x] click on a field, make it target field, mark the shortest path
  - [ ] double click to move player on that location(without move animation for now)
- [ ] resources
  - player has resources - gold, wood, rock, gem, sulfur, mercury
  - new field type **resources**
    - it has the following props: amount, type
    - player cannot step on resource field, but it has to acquire it first
    - when player is next to the resource field (1 unit far in any direction), acquire those resources and stay with player on same field. Change field from resource to normal field
    - field is hoverable to display how many resources is available to acquire.
- [ ] mines
  - add new field types: mines.
    - mines are following types: gold, saw, gem, lab(for mercury), stone mine, sulfur mine
    - mines have owner field, default owner is empty
- [ ] income
  - show how many resource player has available at the bottom of the page
  - income is calculated based on mines and castles
- [ ] role play 
  - add player turns
  - limit movement of the player(hero)
  - max player turn time 
- [ ] beautify map - add some texture to fields (forest, mountain...)
