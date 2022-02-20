var users = [];
var password = "";
app.controller("form_change_password", ($scope, $http, $location) => {
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
		current_password: "",
		new_password: "",
		confirm_new_password: "",
	};
	$http
		.get(`${baseUrl}users`)
		.then((res) => {
			users = res.data;
		})
		.catch((err) => {});
	$scope.changePassword = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			let user_change = users.find(
				(user) => user.username == $scope.user.username
			);
			$http
				.put(`${baseUrl}users/${user_change.id}`, {
					password: $scope.user.new_password,
				})
				.then((res) => {
					console.log(res);
					{
						Swal.fire(
							"",
							"Đổi mật khẩu thành công",
							"success"
						).then((result) => {
							$location.path("#/login");
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
