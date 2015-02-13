// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    templateUrl: "templates/tabs.html",
        controller:'loginContrl'
  })
      .state('chat', {
        url: "/chat",
        templateUrl: "templates/chat.html",
        controller:'chatContrl'
      })
  // Each tab has its own nav history stack:


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab');

})
    .factory('userDetail',function(){
        var name1=''
        return{
            abc:name1
        }
    })
.controller('loginContrl',function($scope,$firebase, $firebaseAuth,userDetail){
      var ref = new Firebase("https://chatapp01.firebaseio.com/")
      $scope.authObj = $firebaseAuth(ref);
      $scope.register = function(){
        var ref = new Firebase("https://chatapp01.firebaseio.com/");
        var sync = $firebase(ref);
        $scope.authObj.$createUser($scope.user.email, $scope.user.password,$scope.user.Name).then(function() {
          alert("User created successfully!");
        })
      }
        var authData = $scope.authObj.$getAuth();

        if (authData) {
            console.log("Logged in as:", authData.uid);
        } else {
            console.log("Logged out");
        }
      $scope.login = function(){
          userDetail.abc=$scope.user.Name
          var ref = new Firebase("https://chatapp01.firebaseio.com/");
          var authData = ref.getAuth();

          if (authData) {
              console.log("Authenticated user with uid:", authData.uid);
          }
          $scope.authObj.$authWithPassword({
            UserName: $scope.user.Name,
            email: $scope.user.email,
          password: $scope.user.password
        }).then(function(authData) {
          $scope.name=true;
          console.log(authData);
          alert("Logged in as:", authData.uid);
        }).catch(function(error) {
          alert("Error: " + error);
        });
      }    })
.controller('chatContrl',function($scope,$firebase,userDetail){
      var ref = new Firebase('https://chatapp01.firebaseio.com/');
      var con = ref.child('massages')
      var sync = $firebase(con);
      var massage = sync.$asArray()
        $scope.text= '';
        $scope.user1 = userDetail.abc
      $scope.sendIt = massage
      $scope.abc = function(){
        $scope.sendIt.$add({
          xyz:$scope.text
        })
      alert('send')
      }
    })