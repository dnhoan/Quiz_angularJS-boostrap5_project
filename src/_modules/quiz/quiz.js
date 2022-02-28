app.controller(
	"subjectsCtrl2",
	function ($scope, $http, $location, $routeParams) {
		$scope.$parent.subjects = [];
		$scope.startIndex = 0;
		const url = "./db/Subjects.js";
		$http.get(url).then((res) => {
			$scope.$parent.subjects = res.data;
			$scope.$parent.currentSubject = $scope.$parent.subjects.filter(
				(sub) => sub.Id == $routeParams.id
			)[0];
		});
		$scope.openQuiz = (id) => {
			$location.path(`/quiz/${id}`);
		};
	}
);
app.controller(
	"question",
	(
		$scope,
		$http,
		$location,
		$interval,
		$routeParams,
		$rootScope,
		$window
	) => {
		console.log($rootScope);
		console.log($scope.$parent);
		const url = `./db/Quizs/${$routeParams.id}.js`;
		$http.get(url).then((res) => {
			$scope.questions = res.data.map((ques) => {
				return { ...ques, answer_selected: null };
			});
			Swal.fire({
				title: "Bạn đã sẵn sàng làm bài chưa",
				text: "Thời gian làm bài bắt đầu?",
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Sẵn sàng",
				cancelButtonText: "Chưa",
			}).then((result) => {
				console.log(result);
				if (result.isConfirmed) {
					$interval(() => {
						$scope.second++;
						if ($scope.minute == 59 && $scope.second == 59) {
							$scope.hour++;
							$scope.minute = 0;
							$scope.second = 0;
						}
						if ($scope.second == 59) {
							$scope.minute++;
							$scope.second = 0;
						}
					}, 1000);
				}
				if (result.isDismissed) {
					$location.path("login");
				}
			});
		});
		$scope.countQuestionsSelected = 0;
		$scope.isShowAnswer = false;
		// hand in
		$scope.handIn = () => {
			Swal.fire({
				title: "Bạn có chắc muốn nộp bài không?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes",
			}).then(async (result) => {
				if (result.isConfirmed) {
					let question_right = $scope.questions.filter(
						(ques) => ques.AnswerId == ques.answer_selected
					).length;
					let mark =
						Math.round(
							(question_right / $scope.questions.length) * 100
						) / 100;
					let alert =
						mark >= 5
							? "Xin chúc mừng bạn đã vượt qua bài thi"
							: "Xin chia buồn bạn đã bị trượt";
					let time =
						$scope.second +
						($scope.minute > 0 ? $scope.minute * 60 : 0) +
						($scope.hour > 0 ? $scope.hour * 3600 : 0);
					let history = {
						id_subject: $scope.$parent.currentSubject.Id,
						name_subject: $scope.$parent.currentSubject.Name,
						time,
						mark,
						right_answer: question_right,
						total_answer: $scope.questions.length,
						false_answer: $scope.questions.length - question_right,
						ctime: new Date(),
					};
					$rootScope.current_user.history.unshift(history);
					await $http
						.put(`${baseUrl}users/${$rootScope.current_user.id}`, {
							history: $rootScope.current_user.history,
						})
						.then((res) => {
							$window.localStorage.removeItem("user");
							$window.localStorage.setItem(
								"user",
								JSON.stringify($rootScope.current_user)
							);
						});
					Swal.fire({
						title: `Bạn được ${mark} điểm`,
						text: alert,
						html: `<p>Xin chia buồn bạn đã bị trượt</p><br><b>Thời gian: ${time} giây</b>`,
						icon: mark >= 5 ? "success" : "error",
						showDenyButton: true,
						showCancelButton: true,
						cancelButtonColor: "#3085d6",
						confirmButtonText: "Xem đáp án",
						denyButtonText: `Thi lại`,
						cancelButtonText: "Thi môn khác",
					}).then((result) => {
						switch (true) {
							case result.isConfirmed: // show answer
								$scope.startIndex = 0;
								$scope.isShowAnswer = true;
								break;
							case result.isDenied: // try again
								$scope.refresh();
								break;
							case result.isDismissed: // go to dashboard
								$location.path(`/`);
								break;
						}
					});
				}
			});
		};
		$scope.reload = () => {
			$scope.refresh();
		};
		$scope.backToDashboard = () => {
			$location.path(`/`);
		};
		// select answer
		$scope.selectAnswer = (id, question) => {
			$scope.questions.find(
				(ques) => ques.Id == question.Id
			).answer_selected = `${id}`;
			$scope.countQuestionsSelected = $scope.questions.filter(
				(ques) => ques.answer_selected != null
			).length;
		};

		// pagination
		$scope.startIndex = 0;
		$scope.back = () => {
			if ($scope.startIndex > 0) $scope.startIndex -= 3;
		};
		$scope.next = () => {
			if (
				$scope.startIndex <
				$scope.questions.length -
					($scope.questions.length % 3 == 0
						? 3
						: $scope.questions.length % 3)
			)
				$scope.startIndex += 3;
		};

		// calculate time
		$scope.hour = 0;
		$scope.minute = 0;
		$scope.second = 0;
		$scope.refresh = () => {
			$scope.hour = 0;
			$scope.minute = 0;
			$scope.second = 0;
			$scope.startIndex = 0;
			$scope.countQuestionsSelected = 0;
			$scope.isShowAnswer = false;
			$http.get(url).then((res) => {
				$scope.questions = res.data.map((ques) => {
					return { ...ques, answer_selected: null };
				});
			});
		};
	}
);
