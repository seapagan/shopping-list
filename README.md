# Shopping List App

A web-based Shopping List written in plain-vanilla JavaScript. Currently this is
in a seriously pre-alpha stage, with almost no styling or attempt to make it
look good!

This application is to teach myself "plain" JavaScript as opposed to using a
library like `React` or similar. Also, I always forget to take my shopping list
with me, but never forget my phone!!

For development purposes, you can pre-seed the list with 5 items by adding an
item 'test' to the list.

![](images/screenshot.png)

## Functionality that is Working

- Add a new List Item
- Delete an existing List Item
- Toggle an item as done. If toggled, it is moved to a different list below. If
  toggled again, it is moved back to the main list.

## Functionality Planned

- disallow duplicate items
- Allow quantity. If blank just add 1. Optionally select 'type' of quantity (ie
  pack, box, pallet etc).
- Edit an item.
- Add comment to an item.
- add item to category - ie Fresh, Frozen, Bakery etc.
- Drag and drop ordering.
- Store items using Firebase or similar noSQL system.
- Copy data to LocalStorage in case WiFi or cell coverage is interrupted.
- Group items by Shop.
- Remember previous items and shops for later input.
- Save the entire list as a favourite, ability to load from saved favourites
  overwriting any current list.
- Fully responsive design.
