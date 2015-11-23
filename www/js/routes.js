angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('login2', {
      url: '/emaillogin',
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
      url: '/page10',
      views: {
        'tab12': {
          templateUrl: 'templates/newStatus.html',
          controller: 'newStatusCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/page7',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.notification', {
      url: '/notification',
      views: {
        'tab13': {
          templateUrl: 'templates/notification.html',
          controller: 'notificationCtrl'
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
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});