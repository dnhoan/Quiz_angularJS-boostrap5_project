var users = [];
var password = "";
app.controller("form_register", ($scope, $http, $location, $window) => {
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
	$scope.user = {
		username: "",
		password: "",
		confirm_password: "",
	};
	$http
		.get(`${baseUrl}/users`)
		.then((res) => {
			users = res.data;
		})
		.catch((err) => {});
	$scope.register = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			let data = {
				username: $scope.user.username,
				password: $scope.user.password,
				fullname: "",
				email: "",
				gender: "1",
				birthday: "",
				chuyen_nganh: "",
				address: "",
				marks: 0,
				isAdmin: '0'
			};
			$http
				.post(`${baseUrl}/users`, data)
				.then((res) => {
					{
						Swal.fire("", "Đăng ký thành công", "success").then(
							(result) => {
								if (result.isConfirmed)
									$window.location.href = `#/login`;
							}
						);
					}
				})
				.catch((err) => {
					Swal.fire("", "Đăng ký tài khoản thất bại", "error");
				});
		}
	};
	$scope.savePassword = () => {
		password = $scope.user.password;
	};
});
app.directive("checkUsernameExist", ($http) => {
	return {
		require: "ngModel",
		link: (scope, element, attr, mCtrl) => {
			const fnValidate = (value) => {
				let isInValid = true;
				if (value != null) {
					if (
						users.filter((user) => user.username == value).length >
						0
					) {
						isInValid = false;
					}
				}
				console.log("sau");
				mCtrl.$setValidity("check_username_exist", isInValid);
				return value;
			};
			mCtrl.$parsers.push(fnValidate);
		},
	};
});
app.directive("checkConfirmPassword", ($http) => {
	return {
		require: "ngModel",
		link: (scope, element, attr, mCtrl) => {
			const fnValidate = (value) => {
				let isInValid = true;
				if (value != null) {
					if (value != password) {
						isInValid = false;
					}
				} else {
					isInValid = true;
				}
				mCtrl.$setValidity("check_confirm_password", isInValid);
				return value;
			};
			mCtrl.$parsers.push(fnValidate);
		},
	};
});
