(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController($routeParams,
                                   $location,
                                   widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.createWidget = createWidget;


        function createWidget(widget) {
           // page.websiteId = model.websiteId;
            widgetService.createWidget(model.pageId,widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();