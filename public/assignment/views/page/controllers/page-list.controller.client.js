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
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            //console.log("LENGTH : " + model.pages.length);
        }
        init();
    }
})();