# Shopping List App

[![CodeQL](https://github.com/seapagan/shopping-list/actions/workflows/codeql.yml/badge.svg)](https://github.com/seapagan/shopping-list/actions/workflows/codeql.yml) [![Dependency
Review](https://github.com/seapagan/shopping-list/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/seapagan/shopping-list/actions/workflows/dependency-review.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/626644b9-1b8d-4936-821d-b02784fd765e/deploy-status)](https://app.netlify.com/sites/sp-shopping/deploys)

A web-based Shopping List written in plain-vanilla JavaScript.

This application is to teach myself "plain" JavaScript as opposed to using a
library like `React` or similar. Also, I always forget to take my shopping list
with me, but never forget my phone!!

This app uses [Webpack](https://webpack.js.org/) to provide a hot-reload
development server and an optimised Production bundle. This is configured and
controlled using my [SPBuild](https://github.com/seapagan/sp-build) system which
can handle JS/TS, CSS/SCSS and much more automatically.

User Authentication and Authorization plus the Database storage uses
[Supabase](https://supabase.com)

For development purposes, you can pre-seed the list with 5 items by adding an
item 'test' to the list.

**Note : This app uses the PRO (Paid) version of FontAwesome icons at the moment.
I'll look at replacing this with a free solution when the app is completed.**

![screenshot](images/screenshot.png)

## Functionality that is Working

- Add a new List Item.
- Delete an existing List Item or complete list.
- Toggle an item as done. If toggled, it is moved to a different list below. If
  toggled again, it is moved back to the main list.
- Edit an item name inline.
- Drag and drop ordering of items, even between lists. ~~Fixed to work on iOS
  devices using a polyfill from [Bernardo
  Castilho](https://github.com/Bernardo-Castilho/dragdroptouch)~~ [Polyfill
  temporarily removed as it was causing several issues on iOS]. _Note that for
  the moment, the drag sort order will not be saved and is lost on refresh._
- Light/Dark mode toggle
- Responsive Design
- User authentication & authorization implemented. Each user has their own list.
- Each list is stored in an online postgresql database.
- Tooltips, using a personally modified version of [hint.css](https://github.com/chinchang/hint.css)

## Functionality Planned

- Disallow duplicate items.
- Allow quantity. If blank just add 1. Optionally select 'type' of quantity (ie
  pack, box, pallet etc).
- Add comment to an item.
- add item to category - ie Fresh, Frozen, Bakery etc.
- Group items by Shop.
- Remember previous items and shops for later input.
- Save the entire list as a favourite, ability to load from saved favourites
  overwriting any current list.

## Other TODO

- `Escape` key to cancel editing List, perhaps also `blur` event which is better
  for mobile.
- implement accordian drop-downs for each list.

## Development

Development needs [Node.JS](https://nodejs.org/) to be installed and optionally
[yarn](https://yarnpkg.com/). **These are NOT needed for production once the
optimized bundle is created.**

You will also need to sign up for a [Supabase](https://supabase.com) account,
then update the `.env` file with your **SUPABASE_KEY** and **SUPABASE_URL**.
Further instructions for using Supabase in local development are `TODO`

1) Fork or Checkout this repository then change into that directory.
2) Install dependencies using `npm install` or `yarn install`
3) Run the development server using `npm run dev` or `yarn dev` then access
   <http://localhost:8080> to use the app.

## Deployment

To create a production minimised version, run `npm prod` (or `yarn prod`
depending on your preference) from the project root:

This will create an optimised version in the [dist](dist) folder, the contents
of which can then be served from any standard web server or service.
