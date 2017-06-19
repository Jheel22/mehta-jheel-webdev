(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,
                                         $location,
                                         currentUser,
                                         FlickrService,widgetService,userService) {
        var model = this;
        model.userId = currentUser._id;//model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.widgetId=$routeParams.widgetId;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.logout=logout;
        function init() {
            model.widget = angular.copy(widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget, WidgetError));
            //model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));
        }
        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
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
                        $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+model.widgetId);
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