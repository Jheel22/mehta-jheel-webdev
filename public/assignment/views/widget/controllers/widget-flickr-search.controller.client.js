(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,
                                         $location,
                                         FlickrService,widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.widgetId=$routeParams.widgetId;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

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

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

                model.widget.url=url;
                widgetService
                    .updateWidget(model.widgetId,model.widget)
                    .then(function () {
                        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+model.widgetId);
                    });




        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();