# Shopping List App

[![CodeQL](https://github.com/seapagan/shopping-list/actions/workflows/codeql.yml/badge.svg)](https://github.com/seapagan/shopping-list/actions/workflows/codeql.yml) [![Dependency
Review](https://github.com/seapagan/shopping-list/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/seapagan/shopping-list/actions/workflows/dependency-review.yml) [![pages-build-deployment](https://github.com/seapagan/shopping-list/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/seapagan/shopping-list/actions/workflows/pages/pages-build-deployment)

A web-based Shopping List written in plain-vanilla JavaScript. Currently this is
in a seriously pre-alpha stage, with almost no styling or attempt to make it
look good!

This application is to teach myself "plain" JavaScript as opposed to using a
library like `React` or similar. Also, I always forget to take my shopping list
with me, but never forget my phone!!

For development purposes, you can pre-seed the list with 5 items by adding an
item 'test' to the list.

**Note : This app uses the PRO (Paid) version of FontAwesome icons at the moment.
I'll look at replacing this with a free solution when the app is completed.**

![screenshot](images/screenshot.png)

## Functionality that is Working

- Add a new List Item
- Delete an existing List Item
- Toggle an item as done. If toggled, it is moved to a different list below. If
  toggled again, it is moved back to the main list.
- Edit an item name inline.
- Save current items to LocalStorage so they persist between sessions.

## Functionality Planned

- Disallow duplicate items.
- Allow quantity. If blank just add 1. Optionally select 'type' of quantity (ie
  pack, box, pallet etc).
- Add comment to an item.
- add item to category - ie Fresh, Frozen, Bakery etc.
- Drag and drop ordering.
- implement User login system, each with their own list(s) - use Firebase Auth
  for this? (that would enable login with google/facebook etc.)
- Store items using Firebase or similar noSQL system.
- Group items by Shop.
- Remember previous items and shops for later input.
- Save the entire list as a favourite, ability to load from saved favourites
  overwriting any current list.
- Fully responsive design.
- add a toaster-notification system for add/complete/delete/errors etc. Try
  write from scratch.

## Other TODO

- `Escape` key to cancel editing List, perhaps also `blur` event which is better
  for mobile.
- possibly replace LocalStorage with IndexedDB to allow async. Probably won't
  speed up this app much but would be a decent learning experience.
- implement accordian drop-downs for each list.
