var users = [];
app.controller("info_account", ($scope, $http, $window, $rootScope) => {
	// $scope.user = Object.assign(
	// 	JSON.parse($window.localStorage.getItem("user"))
	// );
	$scope.user = angular.copy($rootScope.current_user);
	console.log('gdsgd',$scope.user);
	if ($scope.user.birthday != "")
		$scope.user.birthday = new Date($scope.user.birthday);
	$scope.saveInfo = (event, form) => {
		event.preventDefault();
		console.log($scope.user);
		if (form.$valid) {
			$http
				.put(`${baseUrl}users/${$scope.user.id}`, $scope.user)
				.then((res) => {
					console.log(res);
					$window.localStorage.removeItem("user");
					$window.localStorage.setItem(
						"user",
						JSON.stringify($scope.user)
					);
					$rootScope.current_user = angular.copy($scope.user);
					{
						Swal.fire(
							"",
							"Lưu thông tin thành công",
							"success"
						).then((result) => {
							// $location.path("#/login");
						});
					}
				})
				.catch((err) => {
					Swal.fire("", "Lưu thông tin thất bại", "error");
				});
		}
	};
	$scope.list_chuyen_nganh = [
		{ id: "udpm", name: "Ứng dụng phần mềm" },
		{ id: "tktw", name: "Thiết kế trang web" },
		{ id: "ltmt", name: "Lập trình máy tính" },
	];
	$http
		.get(`${baseUrl}users`)
		.then((res) => {
			users = res.data.filter((u) => u.id != $rootScope.current_user.id);
		})
		.catch((err) => {});
});
app.directive("checkEmailExist", ($http) => {
	return {
		require: "ngModel",
		link: (scope, element, attr, mCtrl) => {
			const fnValidate = (value) => {
				let isInValid = true;
				if (value != null) {
					if (
						users.filter((user) => user.email == value).length > 0
					) {
						isInValid = false;
					}
				}
				mCtrl.$setValidity("check_email_exist", isInValid);
				return value;
			};
			mCtrl.$parsers.push(fnValidate);
		},
	};
});
