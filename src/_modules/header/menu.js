app.controller(
	"menu",
	($scope, $route, $window, $http, $location, $rootScope) => {
		$scope.logOut = () => {
			$rootScope.isLogin = false;
			$rootScope.isAdmin = false;
			$rootScope.current_user = null;
			$window.localStorage.removeItem("user");
			$location.path("login");
		};
	}
);
