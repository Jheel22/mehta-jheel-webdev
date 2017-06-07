(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);
    
    function widgetEditController($routeParams,
                                   $location,
                                   widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.widgetId=$routeParams.widgetId;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        function init() {
            model.widget = angular.copy(widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget, WidgetError));
            //model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));
        }
        init();

        function renderWidget (widget) {
            model.widget = widget;
        }

        function WidgetError(widget) {
            model.error = "widget not found";
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
                }, function () {
                    model.error = "Unable to add page";
                });
            //widgetService.deleteWidget(widgetId);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
        }
        function updateWidget() {
            widgetService
                .updateWidget(model.widgetId,model.widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
                })
            //widgetService.updateWidget(model.widgetId,model.widget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
        }
    }
})();