# React-redux-socketio-chat

<img width="900" src="src/img/React chat.png" border="0" />

## About

Using React.js and Socket.io, I built the React-chatting-App.
This project is written by [Big Silver].

## Prepare

Note: You need MongoDB set up and running to run the code locally. [Installation instructions](https://docs.mongodb.org/manual/installation/)

Once you've installed MongoDB start up the MongoDB server in a new terminal with the following commands:

```
mkdir db
mongod --dbpath=./db --smallfiles
```

Then open a new terminal and type in `mongo` and type in `use chat_dev`
This is your database interface.  You can query the database for records for example: `db.users.find()` or `db.stats()`.

Now that you've done all that, you can go go ahead and code away!

## Install

```
git clone https://github.com/Big-Silver/React-Redux-Socketio-Chat.git react@redux-chat
cd react@redux-chat
npm install
```

## Development

```
npm run dev
```
And then point your browser to `localhost:3000`

Note:
This program comes with [redux-dev tools](https://github.com/gaearon/redux-devtools)
* To hide the dev tool panel press ctrl+h
* To change position press ctrl+m

## Production

```
npm run build
npm start
```
And then point your browser to `localhost:3000`

