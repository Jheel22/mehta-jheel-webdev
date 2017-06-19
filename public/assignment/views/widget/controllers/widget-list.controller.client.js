(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,$routeParams,
                                  currentUser,
                                  $location,
                                  widgetService,userService) {
        var model = this;
        model.userId = currentUser._id;//model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.logout=logout;
        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(
                    function (response) {

                        model.widgets = response.data;
                    }
                );
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            //console.log("LENGTH : " + model.pages.length);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


        //model.widgets = widgets;
       model.trust = trust;
          model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
          model.widgetUrl = widgetUrl;
        model.widgetSort = widgetSort;

        function widgetSort (from, to) {

            if (from === to) { return; }

            widgetService.sortWidgets(model.pageId, from, to)
                .then(
                    null,
                    function (response) {
                        model.widgets = angular.copy(model.widgets);
                    }
                );
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
        
        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();