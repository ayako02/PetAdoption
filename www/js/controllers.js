angular.module('app.controllers', [])


.controller('login2Ctrl', function($scope, $state) {
  $scope.login = {};

  $scope.getLogin = function() {
    console.log($scope.login);
    Parse.User.logIn($scope.login.username, $scope.login.password, {
      success: function(user) {
        $state.go('tabsController.home');
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
})

.controller('signupCtrl', function($scope, $state, $cordovaCamera, $cordovaImagePicker) {
  $scope.signup = {};

  var newImage;

  //camera function
  $scope.useCamera = function() {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('profile');
      image.src = "data:image/jpeg;base64," + imageData;
      newImage = imageData;
    }, function(err) {
      // error
    });

  };
  //image picker function

  $scope.pickPix = function() {
    var options = {
      maximumImagesCount: 1,
      width: 300,
      height: 300,
      quality: 50
    };

    $cordovaImagePicker.getPictures(options)
      .then(function(results) {
        var image = document.getElementById('profile');
        image.src = results;
        newImage = results;
      }, function(error) {
        // error getting photos
      });
  };

  $scope.getSignUp = function() {
    if (newImage) {
      var user = new Parse.User();
      user.set("username", $scope.signup.username);
      user.set("email", $scope.signup.email);
      user.set("whatsApp", $scope.signup.whatsApp);
      user.set("password", $scope.signup.password);
      user.set("retype password", $scope.signup.retype);
      user.set("profileImage", newImage);

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
    } else {
      alert("you must upload a photo");
    }
  };
})

.controller('homeCtrl', function($scope, $state, $http) {
  $scope.getStatus = function() {
    //creates the news feed
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
            city: object.get('City'),
            state: object.get('State'),
            image: "data:image/jpeg;base64," + object.get('Image'),
          };
        }
        window.localStorage['status'] = JSON.stringify($scope.status);
        // stop the ion refresher
        $scope.$broadcast('scroll.refreshComplete');
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    if (window.localStorage['status'])
      $scope.status = JSON.parse(window.localStorage['status']);
  };

  $scope.getStatus();
})

.controller('searchCtrl', function($scope, $state) {
  $scope.search = {
    value: "",
  };
  $scope.doSearch = function() {
    console.log("Search: " + $scope.search.value);
    var NewStatus = Parse.Object.extend("NewStatus");
    var query = new Parse.Query(NewStatus);
    query.descending("createdAt");
    query.equalTo("PetName", $scope.search.value);

    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          object = results[i];
          $scope.status[i] = {
            PetName: object.get('PetName'),
            age: object.get('Age'),
            breed: object.get('Breed'),
            gender: object.get('Gender'),
            city: object.get('City'),
            state: object.get('State'),
            image: "data:image/jpeg;base64," + object.get('Image'),
          };
          console.log(object.get('Gender'));
        }
        console.log($scope.status);
        window.localStorage['status'] = JSON.stringify($scope.status);
        // stop the ion refresher
        $scope.$broadcast('scroll.refreshComplete');
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    if (window.localStorage['status'])
      $scope.status = JSON.parse(window.localStorage['status']);
  };

})

.controller('newStatusCtrl', function($scope, $cordovaCamera, $cordovaImagePicker) {
  $scope.status = {};

  var newImage;

  $scope.getNewStatus = function() {
    if ($scope.status.petname && $scope.status.city && $scope.status.state) {
      if (newImage) {
        var NewStatus = Parse.Object.extend("NewStatus");
        var status = new NewStatus();

        status.set("User", Parse.User.current());
        status.set("PetName", $scope.status.petname);
        status.set("Age", $scope.status.age);
        status.set("Breed", $scope.status.breed);
        status.set("Gender", $scope.status.gender);
        status.set("City", $scope.status.city);
        status.set("State", $scope.status.state);
        status.set("Image", newImage);

        status.save(null, {
          success: function(messaege) {
            alert('Post successfully!');
            $scope.status = {};
            var image = document.getElementById('myImage');
            image.src = "";
          },
          error: function(message, error) {
            alert('Failed to post!' + error.message);
          }
        });
      } else {
        alert('You must post a photo!');
      }
    } else {
      alert('Please enter the PetName and Location');
    }
  };

  //camera function
  $scope.useCamera = function() {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
      newImage = imageData;
    }, function(err) {
      // error
    });

  };


  //image picker function

  $scope.pickPix = function() {
    var options = {
      maximumImagesCount: 1,
      width: 300,
      height: 300,
      quality: 50
    };

    $cordovaImagePicker.getPictures(options)
      .then(function(results) {
        var image = document.getElementById('myImage');
        image.src = results;
        newImage = results;
      }, function(error) {
        // error getting photos
      });
  };
})

.controller('profileCtrl', function($scope, $state, $ionicPopover) {

  //get username, email & WhatsApp
  var user = Parse.User.current();
  $scope.profileImage = user.get('profileImage');
  $scope.name = user.get("username");
  $scope.email = user.get("email");
  $scope.whatsApp = user.get("whatsApp");

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

  $scope.logout = function() {
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
          city: object.get('City'),
          state: object.get('State'),
          image: "data:image/jpeg;base64," + object.get('Image'),
        }
      }
      window.localStorage['UserPost'] = JSON.stringify($scope.UserPost);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  if (window.localStorage['UserPost'])
    $scope.UserPost = JSON.parse(window.localStorage['UserPost']);
})
