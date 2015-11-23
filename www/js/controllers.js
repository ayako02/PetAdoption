angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('login2Ctrl', function($scope, $state) {
    $scope.login = {};
   
    $scope.getLogin = function(){
        console.log($scope.login);
        if($scope.login.username == data.username
            && $scope.login.password == data.password)
        {
            $state.go('tabsController.home');
        }    
    };
    
//     if(false){
//         $state.go('tabsController.home');
//     }
})
   
.controller('signupCtrl', function($scope) {
    $scope.signup = {};

    $scope.getSignUp = function() {
        console.log($scope.signup);
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
 