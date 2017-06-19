(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password === null || typeof password === 'undefined') {
                model.error = "password does not match";
                return;
            }
            //console.log(username);
            //var found = userService.findUserByCredentials(username, password);
            userService
                .login(username, password)
                .then(function (found) {
                    if(found !== null) {
                      //  console.log("got here");
                        $location.url('/profile');
                    } else {
                       // console.log("got here");
                        model.error = "sorry, " + username + " not found. please try again!";
                    }
                });
           /* findUserByCredentials(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/user/' + found._id);
                    } else {
                        model.message = "sorry, " + username + " not found. please try again!";
                    }
                });*/


        }
    }
})();