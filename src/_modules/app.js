const app = angular.module("my_app", ["ngRoute", "angularCSS"]);
const baseUrl = `https://620ca9e4b57363259393b634.mockapi.io/tesst/`;
app.controller("appCtrl", ($window, $http, $rootScope) => {
	$rootScope.current_user = JSON.parse($window.localStorage.getItem("user"));
	$rootScope.isLogin = false;
	$rootScope.isAdmin = false;
	if ($rootScope.current_user != null) {
		$rootScope.isLogin = true;
		$rootScope.isAdmin = $rootScope.current_user.isAdmin == "1";
	}
	$rootScope.sendEmail = async () => {
		let users = [];
		await $http.get(`${baseUrl}users`).then((res) => {
			users = res.data;
		});
		Swal.fire({
			inputLabel: "Nhập địa chỉ email của bạn để lấy lại mật khẩu",
			input: "email",
			title: "Nhập email",
			inputPlaceholder: "Nhập email",
		}).then((result) => {
			if (result.isConfirmed) {
				let user = users.filter((u) => u.email == result.value);
				if (user.length > 0) {
					var data = {
						service_id: "service_tj32n09",
						template_id: "template_fwb3x5l",
						user_id: "2UwEIwbz70gIPYq2U",
						template_params: {
							account: `${user[0].username}`,
							password: `${user[0].password}`,
							to_email: `${result.value}`,
							from_email: "hoandnph17963@fpt.edu.vn",
						},
					};
					$http
						.post(
							"https://api.emailjs.com/api/v1.0/email/send",
							data
						)
						.then(function (res) {
							Swal.fire(
								"",
								"Gửi mật khẩu thành công",
								"success"
							).then((result) => {});
						})
						.catch(function (error) {
							Swal.fire("", "Lỗi gửi email", "error").then(
								(result) => {}
							);
						});
				} else {
					Swal.fire("", "Email chưa được đăng ký", "warning").then(
						(result) => {}
					);
				}
			}
		});
	};
});
app.config(function ($routeProvider) {
	$routeProvider
		.when("/about", {
			templateUrl: "src/_modules/about/about.html",
		})
		.when("/contact", {
			templateUrl: "src/_modules/contact/contact.html",
			css: "src/_modules/contact/contact.css",
		})
		.when("/feedback", {
			templateUrl: "src/_modules/feedback/feedback.html",
			css: "src/_modules/feedback/feedback.css",
		})
		.when("/question-answer", {
			templateUrl: "src/_modules/question-answer/question-answer.html",
			css: "src/_modules/question-answer/question-answer.css",
		})
		.when("/quiz/:id", {
			templateUrl: "src/_modules/quiz/quiz.html",
			css: "src/_modules/quiz/quiz.css",
		})
		.when("/login", {
			templateUrl: "src/_modules/login/login.html",
			css: "src/_modules/login/login.css",
		})
		.when("/register", {
			templateUrl: "src/_modules/register/register.html",
			css: "src/_modules/register/register.css",
		})
		.when("/account", {
			templateUrl: "src/_modules/account/account.html",
			css: "src/_modules/account/account.css",
		})
		.when("/change-password", {
			templateUrl: "src/_modules/change-password/change-password.html",
			css: "src/_modules/change-password/change-password.css",
		})
		// .when("/forgot-password", {
		// 	templateUrl: "src/_modules/forgot_password/forgot_password.html",
		// 	css: "src/_modules/forgot_password/forgot_password.css",
		// })
		.when("/users", {
			templateUrl: "src/admin/users/users.html",
			css: "src/admin/users/users.css",
		})
		.when("/questions", {
			templateUrl: "src/admin/questions/questions.html",
			css: "src/admin/questions/questions.css",
		})
		.when("/subjects", {
			templateUrl: "src/admin/subjects/subjects.html",
			css: "src/admin/subjects/subjects.css",
		})
		.when("/", {
			templateUrl: "src/_modules/dashboard/dashboard.html",
		})
		.otherwise({
			redirectTo: "/",
		});
});
