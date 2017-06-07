var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/' + filename;

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/IMAGE";

    res.redirect(callbackUrl);

}



var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Today we got <a href="http://io9.gizmodo.com/the-new-game-of-thrones-trailer-is-here-and-everyone-i-1795509917" target="_blank" rel="noopener">our first good look</a> at <em>Game of Thrones</em>’ seventh season, and boy howdy does it look like we’re in for some dark times ahead. But while the trailer is suitably cryptic, if you’ve been paying close attention to <a href="http://io9.gizmodo.com/everything-we-know-about-game-of-thrones-seventh-season-1788588295" target="_blank" rel="noopener">the rumors</a> surrounding this penultimate season, it paints an intriguing picture of the battles…<span class="read-more-placeholder"></span></p>'},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get ('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put ('/api/assignment/widget/:widgetId', updateWidget);
app.put   ('/api/assignment/page/:pageId/widget', updateWidgetOrder);
app.delete ('/api/assignment/widget/:widgetId', deleteWidget);

function findAllWidgetsForPage(req, res) {
    var widgetname = req.query.widgetname;
    if(widgetname) {
        for(var u in widgets) {
            var widget = widgets[u];
            if( widget.name === widgetname) {
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else {
        console.log("keu");
        var pageId = req.params['pageId'];

        var results = getWidgetsOfPage(pageId);

        res.json(results);
    }
}
function updateWidget(req, res) {
    var widget = req.body;
    for(var u in widgets) {
        if(widgets[u]._id === req.params.widgetId) {
            widgets[u] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            widgets.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId=pageId;
    widgets.push(widget);
    res.sendStatus(200);
}
function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            res.send(widgets[u]);
            return;
        }
    }
    res.sendStatus(404);
}
function getWidgetById(widgetId) {
    //var widgetId = req.params['widgetId'];
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            return widgets[u];
            //res.send(widgets[u]);
            //return;
        }
    }
   // res.sendStatus(404);
}

function updateWidgetOrder(req, res) {

    if (req.query['initial'] && req.query['final']) {

        var initial = parseInt(req.query['initial']);
        var final = parseInt(req.query['final']);
        var pageId = req.params['pageId'];

        var matches = getWidgetsOfPage(pageId);

        if (initial >= 0 && final < matches.length && initial !== final) {

            var start, end, delta;

            if (initial < final) {
                start = initial;
                end = final;
                delta = -1;
            }
            else {
                start = final;
                end = initial;
                delta = 1;
            }

            for (var i=start; i <= end; i++) {

                if (i === initial) {
                    matches[i].index = final;
                }
                else {
                    matches[i].index += delta;
                }
            }
console.log("ok");
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(400);
}
function getWidgetsOfPage(pageId) {
    var results = widgets.filter(function(wg) {

        return wg.pageId === pageId;
    });
    return results.sort(function(o1, o2) {
        return o1.index > o2.index;
    });
}



