angular
.module("music-id", [
  "ui.router",
  "ngResource"
])
.config([
  "$locationProvider",
  "$stateProvider",
  Router
])
.factory("User", [
  "$location",
  "$resource",
  User
])
.controller("LogIn", [
  "$scope",
  "$http",
  LogInControllerFunction
])
.controller("UserShow", [
  "$scope",
  "$http",
  "$stateParams",
  "$location",
  "User",
  UserShowFunction
])

function Router($locationProvider, $stateProvider) {
  $stateProvider
  .state("login", {
    url: "/",
    templateUrl: "js/ng-views/oauth.html",
    controller: "LogIn",
    controllerAs: "vm"
  })
  .state("usershow", {
    url: "/access_token=:access_token&refresh_token=:refresh_token",
    templateUrl: "js/ng-views/main.html",
    controller: "UserShow",
    controllerAs: "vm"
  })
}

function User($location, $resource) {
  let url_tokens = $location.$$path
  let access_token = url_tokens.substr(url_tokens.indexOf('='))

  return $resource('https://api.spotify.com/v1/me', {}, {
      get: {
          method: 'GET',
          headers:{'Authorization':'Bearer ' + access_token}
      }
  });

  console.log()
}

function LogInControllerFunction($scope, $http) {
  console.log('log in here')
}

function UserShowFunction($scope, $http, $stateParams, $location, User) {
  let url_tokens = $location.$$path
  let access_token = url_tokens.substr(url_tokens.indexOf('=') + 1)

  let self = this
  console.log(access_token)

  let urlUser = "https://api.spotify.com/v1/me"


  $http.get(urlUser, {headers:{'Authorization':'Bearer ' + access_token}})
  .success( function(response){
    self.user = response
  })

  let urlArtist = "https://api.spotify.com/v1/me/top/artists"
  $http.get(urlArtist, {headers:{'Authorization':'Bearer ' + access_token}})
  .success( function(response){
    self.artists = response.items
    let artistArray = self.artists

    if (artistArray.length > 5) artistArray.length = 5;
  })

  let urlTracks = "https://api.spotify.com/v1/me/top/tracks"
  $http.get(urlTracks, {headers:{'Authorization':'Bearer ' + access_token}})
  .success( function(response){
    self.tracks = response.items
    let trackArray = self.tracks

    if (trackArray.length > 5) trackArray.length = 5;
  })
}
