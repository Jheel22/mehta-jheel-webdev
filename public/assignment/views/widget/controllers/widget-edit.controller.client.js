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
            widgetService.findWidgetById(model.widgetId)
                .then(
                    function (response) {
                        model.widget = response.data;
                    }
                );
            //model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));
        }
        init();

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
                }, function () {
                    model.error = "Unable to add page";
                });
            //widgetService.deleteWidget(widgetId);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
        }
        function updateWidget() {
            console.log(model.widget);
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