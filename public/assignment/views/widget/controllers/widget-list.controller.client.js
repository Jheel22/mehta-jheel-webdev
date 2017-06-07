(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,$routeParams,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(renderWidgets);
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            //console.log("LENGTH : " + model.pages.length);
        }
        init();
        function renderWidgets(widgets) {
            model.widgets = widgets;
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
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
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