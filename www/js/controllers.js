angular.module('app.controllers', [])
   

.controller('login2Ctrl', function($scope, $state) {
    $scope.login = {};
     
    $scope.getLogin = function(){
        console.log($scope.login);    
        Parse.User.logIn($scope.login.username, $scope.login.password, {
            success: function(user) {
                $state.go('tabsController.home');
            },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);            }
        });
    };
})
   
.controller('signupCtrl', function($scope, $state) {
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
            alert("Hooray! Sign up sucessfully!");
            $state.go('tabsController.home');
            },
            error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            }
        });
    }
})
   
.controller('homeCtrl', function($scope, $state) {
    $scope.status = [];
    var NewStatus = Parse.Object.extend("NewStatus");
    var query = new Parse.Query(NewStatus);
    query.descending("createdAt");

    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          object = results[i];
          $scope.status[i] = {
              PetName: object.get('PetName'),
              age: object.get('Age'),
              breed: object.get('Breed'),
              gender: object.get('Gender'),
              location: object.get('Location'),
          }
        }
        window.localStorage['status'] = JSON.stringify($scope.status);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    $scope.status = JSON.parse(window.localStorage['status']);
})
   
.controller('searchCtrl', function($scope, $state) {
    
})
   
.controller('newStatusCtrl', function($scope) {
    $scope.status = {};

    $scope.getNewStatus = function() {
      var NewStatus = Parse.Object.extend("NewStatus");
      var status = new NewStatus();
      
      status.set("User", Parse.User.current());
      status.set("PetName", $scope.status.petname);
      status.set("Age", $scope.status.age);
      status.set("Breed", $scope.status.breed);
      status.set("Gender", $scope.status.gender);
      status.set("Location", $scope.status.location);

      status.save(null, {
        success: function(gameScore) {
        alert('New object created with objectId: ' + gameScore.id);
        },
     error: function(gameScore, error) {
        alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }
})
      
.controller('notificationCtrl', function($scope, $state) {
   
    
})

.controller('profileCtrl', function($scope, $state,$ionicPopover) {
    
    //get username
    var user = Parse.User.current();
    $scope.name = user.get("username");
    //popover-menu function
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
  
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.logout =function(){
        Parse.User.logOut();
        $state.go('login');
        $scope.closePopover();
        window.localStorage.clear();
    }

    //Post submitted by user
    $scope.UserPost = [];
    var NewStatus = Parse.Object.extend("NewStatus");
    var query = new Parse.Query(NewStatus);
   
    query.descending("createdAt");
    query.equalTo("User", Parse.User.current());
   
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          object = results[i];
          $scope.UserPost[i] = {
              PetName: object.get('PetName'),
              age: object.get('Age'),
              breed: object.get('Breed'),
              gender: object.get('Gender'),
              location: object.get('Location'),
          }
        }
        window.localStorage['UserPost'] = JSON.stringify($scope.UserPost);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    $scope.UserPost = JSON.parse(window.localStorage['UserPost']);
    console.log($scope.UserPost);
})


 