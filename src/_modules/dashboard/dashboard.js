// const app = angular.module("dashboard", ["ngRoute"]);
app.controller("subjectsCtrl1", ($scope, $http, $window) => {
	$scope.subjects = [
		{
			Id: "ADAV",
			Name: "Lập trình Android nâng cao",
			Logo: "ADAV.jpg",
		},
	];
	$scope.startIndex = 0;
	const url = "../../db/Subjects.js";
	$http.get(url).then((res) => {
		$scope.subjects = res.data;
	});
	$scope.openQuiz = (id) => {
		$window.location.href = `#/quiz/${id}`;
	};
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
