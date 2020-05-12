(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getAllMenuItemShortNames = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      var itemObjects = response.data.menu_items;
      var itemNames = [];

      for (var i = 0; i < itemObjects.length; ++i) {
          itemNames.push(itemObjects[i].short_name);
      }

      return itemNames;
    });
  };
}



})();