const app = angular.module("my_app", ["ngRoute", "angularCSS"]);
const baseUrl = `https://620ca9e4b57363259393b634.mockapi.io/tesst/`;
app.config(function ($routeProvider) {
	$routeProvider
		.when("/about", {
			templateUrl: "./about/about.html",
		})
		.when("/contact", {
			templateUrl: "./contact/contact.html",
			css: "./contact/contact.css",
		})
		.when("/feedback", {
			templateUrl: "./feedback/feedback.html",
			css: "./feedback/feedback.css",
		})
		.when("/question-answer", {
			templateUrl: "./question-answer/question-answer.html",
			css: "./question-answer/question-answer.css",
		})
		.when("/quiz/:id", {
			templateUrl: "./quiz/quiz.html",
			css: "./quiz/quiz.css",
		})
		.when("/login", {
			templateUrl: "./login/login.html",
			css: "./login/login.css",
		})
		.when("/register", {
			templateUrl: "./register/register.html",
			css: "./register/register.css",
		})
		.when("/account", {
			templateUrl: "./account/account.html",
			css: "./account/account.css",
		})
		.when("/change-password", {
			templateUrl: "./change-password/change-password.html",
			css: "./change-password/change-password.css",
		})
		.when("/", {
			templateUrl: "./dashboard/dashboard.html",
			css: "./dashboard/dashboard.css",
		})
		.otherwise({
			redirectTo: "/",
		});
});
