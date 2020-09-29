const express = require('express');
const route   = require('./route-init');
const Peer    = require('./Peer');
const port    = process.argv[2];
const iPort   = process.argv[3];
const app     = express();
const peer    = new Peer(port, iPort);

function appInit() {
    console.log("Peer is listening on port : " + port);
    app.use(express.json());
    app.listen(port);
    route(app, peer, port);
}

appInit();