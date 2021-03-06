var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get ('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put ('/api/assignment/website/:websiteId', updateWebsite);
app.delete ('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req, res) {
    var websitename = req.query.websitename;
    if(websitename) {
        for(var u in websites) {
            var website = websites[u];
            if( website.name === websitename) {
                res.json(website);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else {
        websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            })
        /*var results = [];

        for (var v in websites) {
            if (websites[v].developerId === req.params.userId) {
                results.push(websites[v]);
            }
        }
        res.json(results);*/
    }
}
function updateWebsite(req, res) {
    var website = req.body;
    websiteModel
        .updateWebsite(req.params.websiteId, website)
        .then(function (status) {
            res.send(status);
        });
    /*for(var u in websites) {
        if(websites[u]._id === req.params.websiteId) {
            websites[u] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}
function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (website) {
            res.json(website);
        });
  /*  var websiteId = req.params.websiteId;
    for(var u in websites) {
        if(websites[u]._id === websiteId) {
            websites.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}
function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
   /* var userId = req.params.userId;
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId=userId;
    websites.push(website);
    res.sendStatus(200);*/
}
function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
    /*for(var u in websites) {
        if(websites[u]._id === websiteId) {
            res.send(websites[u]);
            return;
        }
    }
    console.log("okay");
    res.sendStatus(404);*/
}