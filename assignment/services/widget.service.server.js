var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });





var widgetTypes = [
    { "widgetType": "HEADING", "text": "Heading" },
    { "widgetType": "IMAGE", "text": "Image" },
    { "widgetType": "YOUTUBE", "text": "YouTube" },
    { "widgetType": "HTML", "text": "HTML" },
    { "widgetType": "TEXT", "text": "Text" }

];

app.get("/api/assignment/page/:pageId/widget", findAllWidgetsOfPage);
app.get ('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put ('/api/assignment/widget/:widgetId', updateWidget);
app.put   ('/api/assignment/page/:pageId/widget', updateWidgetOrder);
app.delete ('/api/assignment/widget/:widgetId', deleteWidget);
app.get   ('/api/assignment/widgetTypes', findAllWidgetTypes);
app.post  ("/api/assignment/upload", upload.single('myFile'), uploadImage);

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

  /*  widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/' + filename;

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/IMAGE";
*/
    //res.redirect(callbackUrl);
    var savedUrl = '/assignment/uploads/'+filename;
    widgetModel.updateWidgetUrl(widgetId, savedUrl)
        .then(
            function (status) {

                var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+'/page/'+pageId+'/widget/'+widgetId;
                res.redirect(callbackUrl);
            }
        );

}

function createWidget (req, res) {

    var pageId = req.params['pageId'];
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(
            function (widget) {
                console.log("ser"+widget);
                res.json(widget);
            },
            function (error) {
                console.log("ser"+error);
                res.status(401).json(error);
            }
        );
}

function findAllWidgetsOfPage(req, res) {

    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsForPage(pageId)
        .sort({ order: 1 })
        .then(
            function (widgets) {
                res.json(widgets);
            },
            function (error) {
                res.status(401).json(error);
            }
        );
}

function findWidgetById (req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                console.log(widget);
                res.json(widget);
            },
            function (error) {
                res.status(401).json(error);
            }
        );
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    widgetModel
        .updateWidget(widgetId, widget)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(401).json(error);
            }
        );
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(401).json(error);
            }
        );
}

function updateWidgetOrder(req, res) {

    if (req.query['initial'] && req.query['final']) {

        var initial = parseInt(req.query['initial']);
        var final = parseInt(req.query['final']);

        var pageId = req.params['pageId'];

        widgetModel
            .reorderWidgets(pageId, initial, final)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(401).json(error);
                }
            );

    }
    else {
        res.sendStatus(400);
    }
}

function findAllWidgetTypes(req, res) {
    return res.json(widgetTypes);
}