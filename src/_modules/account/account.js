var users = [];
app.controller("info_account", ($scope, $http, $window, $rootScope) => {
	// $scope.user = Object.assign(
	// 	JSON.parse($window.localStorage.getItem("user"))
	// );
	if ($rootScope.current_user.birthday != "")
		$rootScope.current_user.birthday = new Date(
			$rootScope.current_user.birthday
		);
	$scope.saveInfo = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			$http
				.put(
					`${baseUrl}users/${$rootScope.current_user.id}`,
					$rootScope.current_user
				)
				.then((res) => {
					$window.localStorage.removeItem("user");
					$window.localStorage.setItem(
						"user",
						JSON.stringify($rootScope.current_user)
					);
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
