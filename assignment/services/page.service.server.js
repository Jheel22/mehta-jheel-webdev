var app = require('../../express');
var pageModel = require('../models/page/page.model.server');
var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get ('/api/assignment/page/:pageId', findPageById);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.put ('/api/assignment/page/:pageId', updatePage);
app.delete ('/api/assignment/website/:websiteId/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res) {
    var pagename = req.query.pagename;
    if(pagename) {
        for(var u in pages) {
            var page = pages[u];
            if( page.name === pagename) {
                res.json(page);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else {
        pageModel
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function (pages) {
                res.json(pages);
            })
        /*var results = [];

        for (var v in pages) {
            if (pages[v].websiteId === req.params.websiteId) {
                results.push(pages[v]);
            }
        }
        res.json(results);*/
    }
}
function updatePage(req, res) {
    var page = req.body;
    pageModel
        .updatePage(req.params.pageId, page)
        .then(function (status) {
            res.send(status);
        });
   /* var page = req.body;
    for(var u in pages) {
        if(pages[u]._id === req.params.pageId) {
            pages[u] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}
function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(websiteId,pageId)
        .then(function (page) {
            res.json(page);
        });
    /*var pageId = req.params.pageId;
    for(var u in pages) {
        if(pages[u]._id === pageId) {
            pages.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}
function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
    /*var websiteId = req.params.websiteId;
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId=websiteId;
    pages.push(page);
    res.sendStatus(200);*/
}
function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
    /*var pageId = req.params['pageId'];
    for(var u in pages) {
        if(pages[u]._id === pageId) {
            res.send(pages[u]);
            return;
        }
    }
    res.sendStatus(404);*/
}