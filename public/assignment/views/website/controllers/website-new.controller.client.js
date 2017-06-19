(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                  currentUser,
                                   websiteService,userService) {
        var model = this;
        model.userId = currentUser._id;
        //model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;
        model.logout=logout;
        function init() {
           /* model.websites = websiteService.findAllWebsitesForUser(model.userId);*/
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
           /* website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');*/
           if(typeof website === 'undefined')
           {
               model.error = 'Website name is required';
               return;
           }
            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = 'Website name is required';
                return;
            }
            websiteService
                .findWebsiteByWebsitename(website)
                .then(
                    function () {
                        model.error = "sorry, that website name is taken";
                    },
                    function () {
                        return websiteService
                            .createWebsite(website,model.userId);
                    }
                )
                .then(function (user) {
                    $location.url('/website');
                });
        }
    }
})();