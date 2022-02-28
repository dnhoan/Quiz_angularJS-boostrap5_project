// const app = angular.module("dashboard", ["ngRoute"]);
app.controller("subjectsCtrl1", ($scope, $http, $window, $route, $location, $rootScope) => {
	$scope.subjects = [];

	const url = "./db/Subjects.js";
	$http.get(url).then((res) => {
		$scope.subjects = res.data;
	});
	$scope.openQuiz = (id) => {
		if ($rootScope.isLogin) $location.path(`quiz/${id}`);
		else {
			Swal.fire("", "Vui lòng đăng nhập", "info").then((result) => {
				if (result.isConfirmed) {
				}
			});
		}
	};
	$scope.startIndex = 0;
	$scope.first = () => {
		$scope.startIndex = 0;
	};
	$scope.previous = () => {
		if ($scope.startIndex > 0) $scope.startIndex -= 8;
	};
	$scope.next = () => {
		if (
			$scope.startIndex <
			$scope.subjects.length -
				($scope.subjects.length % 8 == 0
					? 8
					: $scope.subjects.length % 8)
		)
			$scope.startIndex += 8;
	};
	$scope.last = () => {
		$scope.startIndex =
			$scope.subjects.length -
			($scope.subjects.length % 8 == 0 ? 8 : $scope.subjects.length % 8);
	};
});
