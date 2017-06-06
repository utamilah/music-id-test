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
.factory("UserShowFactory", [
  "$resource",
  UserShowFactoryFunction
])
.controller("LogIn", [
  "$scope",
  "$http",
  LogInControllerFunction
])
.controller("UserShow", [
  "$scope",
  "$http",
  "UserShowFactory",
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
    url: "/access_token=:access_token",
    templateUrl: "js/ng-views/main.html",
    controller: "UserShow",
    controllerAs: "vm"
  })
}

function LogInControllerFunction($scope, $http) {
  console.log('log in here')
}

function UserShowFactoryFunction($resource) {
  return $resource("https://api.spotify.com/v1/me/top/artists/:id")
}

function UserShowFunction($scope, $http, UserShowFactory) {
  console.log('logged in')
}
