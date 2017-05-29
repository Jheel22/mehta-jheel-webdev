(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
        model.updateUser = updateUser;
        function updateUser(user) {
            userService.updateUser(model.userId,user);
            $location.url('/user/' + model.userId);
        }
    }
})();