(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService($http) {
        var api= {
            findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget,
        createWidget: createWidget,
        updateWidget: updateWidget,
            getWidgetTypes:getWidgetTypes,
            sortWidgets:sortWidgets
    }
    return api;

        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, widget);
                /*.then(function (response) {
                    return response.data;
                });*/
            /*widget._id = (new Date()).getTime() + "";
            widget.pageId=pageId;
            widgets.push(widget);*/
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.delete(url);
                /*.then(function (response) {
                    return response.data;
                });*/
            /*var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);*/
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url);
               /* .then(function (response) {
                    return response.data;
                });*/
            /*return widgets.find(function (widget) {
                return widget._id === widgetId;
            });*/
        }
        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, widget);
                /*.then(function (response) {
                    return response.data;
                });*/
            /*var wid = findWidgetById(widgetId);
            var index = widgets.indexOf(wid);
            widgets[index] = widget;*/
        }

        // function findWidgetByWidgetname(widget) {
        //     var url = "/api/assignment/page/pageId/widget?widgetname=" + widget.name;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function findWidgetsByPageId(pageId) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.get(url);
               /* .then(function (response) {
                    return response.data;
                });*/
            /*var results = [];

            for(var v in widgets) {
                if(widgets[v].pageId === pageId) {
                    results.push(widgets[v]);
                }
            }

            return results;*/
        }

        function getWidgetTypes() {
            var url = '/api/assignment/widgetTypes';

            return $http.get(url);
        }

        function sortWidgets(pageId, startIndex, endIndex) {
            var url = '/api/assignment/page/' + pageId + '/widget?initial=' + startIndex + "&final=" + endIndex;

            return $http.put(url);
                /*.then(function (response) {
                    return response.data;
                });*/
        }
    }
})();