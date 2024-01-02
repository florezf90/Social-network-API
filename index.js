const express = require('express');
const db  = require('./config/connection');
const routes = require ('./routes');

const cwd = process.cwd();

const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(routes);


db.on("error", console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    app.listen(port, () => {
        console.log(`API server running on http://localhost:${port}`);
    })
})
