app.controller("menu", ($scope, $route, $window) => {
	
	$scope.logOut = () => {
		$scope.$parent.$parent.isLogin = false
		$scope.$parent.$parent.isAdmin = false
		$window.localStorage.removeItem("user");
		$window.location.href = `#/login`;
	}
});
