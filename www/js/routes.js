angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  var token = '/login';
  
  if(Parse.User.current())  
    token = '/page7/home';

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login2.html',
      controller: 'login2Ctrl'
    })

        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
      
        
    .state('tabsController.home', {
      url: '/home',
      views: {
        'tab10': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('tabsController.search', {
      url: '/search',
      views: {
        'tab11': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
      
        
    .state('tabsController.newStatus', {
      url: '/newStatus',
      views: {
        'tab12': {
          templateUrl: 'templates/newStatus.html',
          controller: 'newStatusCtrl'
        }
      }
    })
        
       .state('tabsController.profile', {
      url: '/profile',
      views: {
        'tab14': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
    
      
    .state('tabsController', {
      url: '/page7',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
        
   
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(token);

});