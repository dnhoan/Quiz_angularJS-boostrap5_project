app.controller("form_login", ($scope, $http) => {
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
	$scope.checkUser = (event) => {
		event.preventDefault();
		$http
			.get(`${baseUrl}/users`)
			.then((res) => {
				if (
					res.data.find(
						(user) =>
							user.username == $scope.user.username &&
							user.password == $scope.user.password
					)
				) {
					Swal.fire("", "Đăng nhập thành công", "success").then(
						(result) => $location.path("#/")
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
});
