(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.registration', {
      url: '/registration',
      templateUrl: 'src/public/registration/registration.html',
      controller: 'RegistrationController',
      controllerAs: 'registrationCtrl',
      resolve: {
        menuItems: ['MenuService', function (MenuService) {
          return MenuService.getAllMenuItemShortNames();
        }],
        userInfo: ['MenuService', function (MenuService) {
          return MenuService.getUserInfo();
        }]
      }
    })
    .state('public.profile', {
      url: '/profile',
      templateUrl: 'src/public/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        userInfo: ['MenuService', function (MenuService) {
          return MenuService.getUserInfo();
        }],
        favoriteMenuItemInfo: ['MenuService', function (MenuService) {
          return MenuService.getFavoriteMenuItemInfo();
	}]
      }
    });
}
})();
