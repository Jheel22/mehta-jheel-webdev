(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController($routeParams,
                                   $location,
                                   widgetService) {
        var model = this;
        model.createWidget = createWidget;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        function init() {



            fetchWidgetTypes();
        }
        init();

        function fetchWidgetTypes () {
            widgetService.getWidgetTypes()
                .then(
                    function (response) {
                        model.widgetTypes = response.data;
                    }
                );
        }


        function createWidget(widgetType) {
            widgetService
                            .createWidget(model.pageId,{type: widgetType})
                .then(function (response) {
                    var widget = response.data;
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+ widget._id);
                });
           // page.websiteId = model.websiteId;
           // widgetService.createWidget(model.pageId,widget);
           // $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();