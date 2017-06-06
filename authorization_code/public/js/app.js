angular
.module("music-id", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  Router
])
.controller("LogIn", [
  "$scope",
  "$http",
  LogInControllerFunction
])

function Router($stateProvider) {
  $stateProvider
  .state("login", {
    url: "/",
    templateUrl: "js/ng-views/oauth.html",
    controller: "LogIn",
    controllerAs: "vm"
  })
}

function LogInControllerFunction($scope, $http) {
  console.log('log in here')
}
