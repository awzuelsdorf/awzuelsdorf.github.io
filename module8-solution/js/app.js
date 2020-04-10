(function () {
    'use strict';

    var dependencies = [];
    angular.module("NarrowItDownApp", dependencies)
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowCtrl',
            bindToController: true
        };

        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var searcher = this;

	searcher.found = [];

        search.getMatchedMenuItems = function (searchTerm) {
            return $http("https://davids-restaurant.herokuapp.com/menu_items.json").then(function (result) {
                searcher.found = [];

                var allMenuItems = result["menu_items"];

                for (var i = 0; i < allMenuItems.length; ++i) {
                    if (allMenuItems[i].description.indexOf(searchTerm) !== -1) {
                        searcher.found.push(allMenuItems[i]);
		    }
                }

                return searcher.found;
	    });
        }

        service.removeItem = function (itemIndex) {
            searcher.found.splice(itemIndex, 1);
        };
    }

    function MenuSearchService() {
        var factory = function () {
            return new ShoppingListService();
        };

        return factory;
    }
}

})();
