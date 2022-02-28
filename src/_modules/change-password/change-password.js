var users = [];
var password = "";
app.controller("form_change_password", ($scope, $http, $location, $window,$rootScope) => {
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
		current_password: "",
		new_password: "",
		confirm_new_password: "",
	};
	$scope.changePassword = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			$http
				.put(`${baseUrl}users/${$rootScope.current_user.id}`, {
					password: $scope.user.new_password,
				})
				.then((res) => {
					$location.path("login");
					{
						Swal.fire(
							"",
							"Đổi mật khẩu thành công",
							"success"
						).then((result) => {
							if (result.isConfirmed) {
								$window.localStorage.removeItem("user");
							}
						});
					}
				})
				.catch((err) => {
					Swal.fire("", "Đổi mật khẩu thất bại", "error");
				});
		}
	};
	$scope.savePassword = () => {
		password = $scope.user.new_password;
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
