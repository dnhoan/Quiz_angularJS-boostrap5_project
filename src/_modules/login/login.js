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
		console.log($scope);

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
										$scope.$parent.$parent.isAdmin = true;
									}
									$scope.$parent.$parent.isLogin = true;
									// if(user_login)
									$window.location.href = "#/";
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
		$scope.changePassword = () => {
			Swal.fire({
				title: "Nhập địa chỉ email",
				input: "email",
				inputLabel: "Nhập email trong tài khoản của bạn",
				inputPlaceholder: "Nhập email",
			}).then((result) => {
				if (result.isConfirmed)
					$window.location.href = `#/forgot-password`;
			});
		};
	}
);
