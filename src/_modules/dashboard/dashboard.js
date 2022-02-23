// const app = angular.module("dashboard", ["ngRoute"]);
app.controller("subjectsCtrl1", ($scope, $http, $window, $route) => {
	$scope.subjects = [];
	
	const url = "./db/Subjects.js";
	$http.get(url).then((res) => {
		$scope.subjects = res.data;
	});
	$scope.openQuiz = (id) => {
		// $route.updateParams({id: `${id}`})
		if ($scope.$parent.$parent.isLogin)
			$window.location.href = `#/quiz/${id}`;
		else {
			Swal.fire("", "Vui lòng đăng nhập", "info").then((result) => {
				if (result.isConfirmed) {
					// if(user_login)
					$window.location.href = "#/login";
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
