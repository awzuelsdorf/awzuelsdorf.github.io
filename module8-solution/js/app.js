(function () {
    'use strict';

    var dependencies = [];
    var module = angular.module("NarrowItDownApp", dependencies)
.controller('NarrowItDownController', NarrowItDownController).service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var searcher = this;

        search.getMatchedMenuItems = function (searchTerm) {
            return $http("https://davids-restaurant.herokuapp.com/menu_items.json").then(function (result) {
                var foundItems = [];
                var allMenuItems = result["menu_items"];

                for (var i = 0; i < allMenuItems.length; ++i) {
                    if (allMenuItems[i].description.indexOf(searchTerm) !== -1) {
                        foundItems.add(allMenuItems[i]);
		    }
                }

                return foundItems;
	    });
        }
    }
}

})();
