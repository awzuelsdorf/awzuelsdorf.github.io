//Use IIFE to prevent the need for local variables to enter the global scope.
(function () {
    'use strict';

    var dependencies = [];
    var module = angular.module("application_name", dependencies)

    function Controller($scope) {
        $scope.checkIfTooMuch = function () {
            if ($scope.items == null || $scope.items == "") {
                $scope.message = "Please enter data first";
                $scope.borderType = "red";
                $scope.color = "red";
            } else {
                var itemsList = $scope.items.split(",").filter(function (item) {
                    return item.trim() != "";
                });

                if (itemsList.length > 3) {
                    $scope.message = "Too much!";
                } else {
                    $scope.message = "Enjoy!";
                }

                $scope.borderType = "green";
                $scope.color = "green";
            }
        }
    }

    Controller.$inject = ['$scope'];

    module.controller("controller_name", Controller);
})();
