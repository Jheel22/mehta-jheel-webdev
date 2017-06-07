(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            //model.pages = pageService.findPageByWebsiteId(model.websiteId);
            //console.log("LENGTH : " + model.pages.length);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function createPage(page) {
            pageService
                .findPageByPagename(page)
                .then(
                    function () {
                        model.error = "sorry, that page name is taken";
                    },
                    function () {
                        return pageService
                            .createPage(model.websiteId,page);
                    }
                )
                .then(function (user) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
           // page.websiteId = model.websiteId;
            //pageService.createPage(model.websiteId,page);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();