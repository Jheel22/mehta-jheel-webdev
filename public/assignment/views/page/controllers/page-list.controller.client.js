(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams,
                                   pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        //console.log(model.userId, model.websiteId);
        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            /*model.pages = pageService.findPageByWebsiteId(model.websiteId);*/
            //console.log("LENGTH : " + model.pages.length);
        }
        init();
        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();