const app = angular.module("my_app", ["ngRoute", "angularCSS"]);
const baseUrl = `https://620ca9e4b57363259393b634.mockapi.io/tesst/`;
app.controller("appCtrl", ($scope, $location, $window) => {
	let current_user = JSON.parse($window.localStorage.getItem("user"));
	$scope.isLogin = false;
	$scope.isAdmin = false;
	if (current_user != null) {
		$scope.isLogin = true;
		$scope.isAdmin = current_user.isAdmin == "1";
	}
});
app.config(function ($routeProvider) {
	$routeProvider
		.when("/about", {
			templateUrl: "./src/_modules/about/about.html",
		})
		.when("/contact", {
			templateUrl: "./src/_modules/contact/contact.html",
			css: "./src/_modules/contact/contact.css",
		})
		.when("/feedback", {
			templateUrl: "./src/_modules/feedback/feedback.html",
			css: "./src/_modules/feedback/feedback.css",
		})
		.when("/question-answer", {
			templateUrl: "./src/_modules/question-answer/question-answer.html",
			css: "./src/_modules/question-answer/question-answer.css",
		})
		.when("/quiz/:id", {
			templateUrl: "./src/_modules/quiz/quiz.html",
			css: "./src/_modules/quiz/quiz.css",
		})
		.when("/login", {
			templateUrl: "./src/_modules/login/login.html",
			css: "./src/_modules/login/login.css",
		})
		.when("/register", {
			templateUrl: "./src/_modules/register/register.html",
			css: "./src/_modules/register/register.css",
		})
		.when("/account", {
			templateUrl: "./src/_modules/account/account.html",
			css: "./src/_modules/account/account.css",
		})
		.when("/change-password", {
			templateUrl: "./src/_modules/change-password/change-password.html",
			css: "./src/_modules/change-password/change-password.css",
		})
		.when("/forgot-password", {
			templateUrl: "./src/_modules/forgot_password/forgot_password.html",
			css: "./src/_modules/forgot_password/forgot_password.css",
		})
		.when("/users", {
			templateUrl: "./src/admin/users/users.html",
			css: "./src/admin/users/users.css",
		})
		.when("/subjects", {
			templateUrl: "./src/admin/subjects/subjects.html",
			css: "./src/admin/subjects/subjects.css",
		})
		.when("/", {
			templateUrl: "./src/_modules/dashboard/dashboard.html",
			// css: "./src/_modules/dashboard/dashboard.css",
		})
		.otherwise({
			redirectTo: "/",
		});
});
