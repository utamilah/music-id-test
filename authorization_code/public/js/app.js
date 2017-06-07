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

function LogInControllerFunction($scope, $http) {
  console.log('log in here')
}

function UserShowFunction($scope, $http, $stateParams, $location) {
  let url_tokens = $location.$$path
  let access_token = url_tokens.substr(url_tokens.indexOf('=') +1)
  console.log(access_token)

  let urlUser = "https://api.spotify.com/v1/me"
  this.user = $http.get(urlUser, {headers:{'Authorization':'Bearer ' + access_token}})
  .success( function(response){
    let userInfo = {
      id: response.id,
      country: response.country,
      followers: response.followers.total,
      image: response.images.url
    }
    console.log(userInfo)
  })
}
