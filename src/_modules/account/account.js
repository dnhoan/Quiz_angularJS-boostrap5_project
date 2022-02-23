app.controller("info_account", ($scope, $http, $window) => {
	$scope.user = Object.assign(
		JSON.parse($window.localStorage.getItem("user"))
	);
	if ($scope.user.birthday != "")
		$scope.user.birthday = new Date($scope.user.birthday);
	$scope.saveInfo = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			$http
				.put(`${baseUrl}users/${$scope.user.id}`, $scope.user)
				.then((res) => {
					$window.localStorage.removeItem("user");
					$window.localStorage.setItem(
						"user",
						JSON.stringify($scope.user)
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
});
