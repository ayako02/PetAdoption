angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('login2Ctrl', function($scope, $state) {
    $scope.login = {};
     
    $scope.getLogin = function(){
        console.log($scope.login);    
        Parse.User.logIn($scope.login.username, $scope.login.password, {
            success: function(user) {
                $state.go('tabsController.home')
            },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);            }
        });
    };
})
   
.controller('signupCtrl', function($scope) {
    $scope.signup = {};
    
    $scope.getSignUp = function() {
        console.log($scope.signup);
        var user = new Parse.User();
        user.set("username", $scope.signup.username);
        user.set("email", $scope.signup.email);
        user.set("password", $scope.signup.password);
        user.set("retype password", $scope.signup.retype);

        user.signUp(null, {
            success: function(user) {
            // Hooray! Let them use the app now.
            },
            error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            }
        });
    }
})
   
.controller('homeCtrl', function($scope) {

})
   
.controller('searchCtrl', function($scope) {

})
   
.controller('newStatusCtrl', function($scope) {

})
      
.controller('notificationCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
 