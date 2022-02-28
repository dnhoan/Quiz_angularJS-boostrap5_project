app.controller(
	"form_login",
	($scope, $http, $rootScope, $location, $window) => {
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
		};
		$scope.checkUser = async (event) => {
			event.preventDefault();
			await $http
				.get(`${baseUrl}/users`)
				.then((res) => {
					let user_login = res.data.find(
						(user) =>
							user.username == $scope.user.username &&
							user.password == $scope.user.password
					);
					if (user_login) {
						Swal.fire("", "Đăng nhập thành công", "success").then(
							(result) => {
								if (result.isConfirmed) {
									$window.localStorage.setItem(
										"user",
										JSON.stringify(user_login)
									);
									if (user_login.isAdmin == "1") {
										$rootScope.isAdmin = true;
									}
									$rootScope.current_user = user_login;
									$rootScope.isLogin = true;
									$window.location.href = "#/";
									// $location.path("/");
								}
							}
						);
					} else {
						Swal.fire(
							"",
							"Tài khoản hoặc mật khẩu không chính xác",
							"warning"
						);
					}
				})
				.catch((err) => {
					Swal.fire("", "Đăng nhập lỗi", "error");
				});
		};
	}
);
