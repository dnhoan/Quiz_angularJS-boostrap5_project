var users = [];
app.controller("list_users", ($scope, $http, $window, $rootScope) => {
	$(document).ready(function () {
		$(".pass_show").append('<span class="ptxt">Show</span>');
	});

	$(document).on("click", ".pass_show .ptxt", function () {
		$(this).text($(this).text() == "Show" ? "Hide" : "Show");

		$(this)
			.prev()
			.attr("type", function (index, attr) {
				return attr == "password" ? "text" : "password";
			});
	});
	$scope.users = [];
	$http
		.get(`${baseUrl}users`)
		.then((res) => {
			console.log(res);
			$scope.users = res.data.filter(
				(u) => u.id != $rootScope.current_user.id
			);
			console.log($scope.users);
		})
		.catch((err) => {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		});

	$scope.deleteUser = (id, index) => {
		Swal.fire({
			title: "Bạn có thực sự muốn xóa người dùng này không?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Xóa",
			cancelButtonText: "Không",
		}).then((result) => {
			if (result.isConfirmed) {
				$http
					.delete(`${baseUrl}users/${id}`)
					.then((res) => {
						console.log(res);
						$scope.users.splice(index, 1);
						Swal.fire(
							"Đã xóa",
							"Xóa người dùng thành công",
							"success"
						);
					})
					.catch((err) => {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Something went wrong!",
						});
					});
			}
		});
	};
	$scope.saveInfoUser = (event, form) => {
		$http
			.put(`${baseUrl}users/${$scope.user_info.id}`, $scope.user_info)
			.then((res) => {
				console.log($scope.index_user_edit);
				$scope.users[$scope.index_user_edit] = $scope.user_info;
				$scope.index_user_edit = -1;
				$scope.user_info = null;
				{
					Swal.fire("", "Lưu thông tin thành công", "success").then(
						(result) => {}
					);
				}
			})
			.catch((err) => {
				Swal.fire("", "Lưu thông tin thất bại", "error");
			});
	};
	$scope.onSubmit = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			if ($scope.index_user_edit >= 0) {
				$scope.saveInfoUser();
			} else {
				$scope.createUser();
			}
			form.$setUntouched();
		}
	};
	$scope.createUser = () => {
		$http
			.post(`${baseUrl}users`, $scope.user_info)
			.then((res) => {
				console.log(res);
				$scope.users.unshift(res.data);
				$scope.user_info = null;
				{
					Swal.fire(
						"",
						"Tạo user thông tin thành công",
						"success"
					).then((result) => {});
				}
			})
			.catch((err) => {
				Swal.fire("", "Tạo user  thất bại", "error");
			});
	};
	$scope.showModal = (user, index) => {
		users = [...$scope.users];
		if (user != null) {
			$scope.isCreate = false;
			$scope.index_user_edit = index;
			$scope.user_info = { ...user };
		} else {
			users.push($rootScope.current_user);
			$scope.isCreate = true;
			$scope.index_user_edit = -1;
			$scope.user_info = {
				username: "",
				password: "",
				fullname: "",
				email: "",
				gender: "1",
				birthday: "",
				chuyen_nganh: "",
				address: "",
				marks: 0,
				isAdmin: "0",
			};
		}
		$scope.user_info.birthday = new Date($scope.user_info.birthday);
	};
	$scope.list_chuyen_nganh = [
		{ id: "udpm", name: "Ứng dụng phần mềm" },
		{ id: "tktw", name: "Thiết kế trang web" },
		{ id: "ltmt", name: "Lập trình máy tính" },
	];
	$scope.startIndex = 0;
	$scope.first = () => {
		$scope.startIndex = 0;
	};
	$scope.previous = () => {
		if ($scope.startIndex > 0) $scope.startIndex -= 10;
	};
	$scope.next = () => {
		if (
			$scope.startIndex <
			$scope.users.length -
				($scope.users.length % 10 == 0 ? 10 : $scope.users.length % 10)
		)
			$scope.startIndex += 10;
	};
	$scope.last = () => {
		$scope.startIndex =
			$scope.users.length -
			($scope.users.length % 10 == 0 ? 10 : $scope.users.length % 10);
	};
});
