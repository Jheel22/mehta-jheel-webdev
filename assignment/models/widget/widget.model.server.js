var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidgets = reorderWidgets;
widgetModel.updateWidgetUrl = updateWidgetUrl;

module.exports = widgetModel;

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newwidget) {
  delete newwidget._page;
  delete newwidget.dateCreated;
    return widgetModel
        .update({_id: widgetId}, {$set: newwidget});
}

function deleteWidget(widgetId) {

    return widgetModel
        .remove({_id: widgetId});
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {

            pageModel.addWidget(pageId, widget._id);
            return widget;
        });
}

function findAllWidgets() {
    return widgetModel.find();
}

function updateWidgetUrl(widgetId, url) {
    return widgetModel.findOne({_id: widgetId })
        .then(
            function (widget) {
                widget.url = url;
                return widget.save();
            }
        )
}

function reorderWidgets(pageId, start, end) {

    return widgetModel.find({ _page: pageId })
        .sort({order: 1})
        .then(
            function (widgets) {

                for (var i in widgets) {

                    if ((i >= start && i <= end) ||
                        (i >= end && i <= start)) {

                        if (i == start)
                            widgets[i].order = end;
                        else if (start > end) {
                            widgets[i].order += i + 1;
                        }
                        else {
                            widgets[i].order = i - 1;
                        }
                    }
                    else {
                        widgets[i].order = i;
                    }

                    widgets[i].save();
                }

                return;
            }
        )
}