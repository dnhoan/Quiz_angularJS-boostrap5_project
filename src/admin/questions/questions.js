app.controller(
	"questionsCtrl",
	function ($scope, $http, $location, $routeParams) {
		$scope.subjects = [];
		$scope.startIndex = 0;
		$scope.question = null;
		$scope.questions = [];
		$http.get(`${baseUrl}subjects`).then((res) => {
			$scope.subjects = res.data;
			$scope.openQuiz(res.data[0].Id, res.data[0].id);
		});

		$scope.deleteQuestion = (id, index) => {
			Swal.fire({
				title: "Bạn có thực sự muốn xóa quiz này không?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Xóa",
				cancelButtonText: "Không",
			}).then((result) => {
				if (result.isConfirmed) {
					let data = $scope.questions.filter((ques) => ques.Id != id);
					$http
						.put(
							`${baseUrl}questions/${$scope.currentSubject.id}`,
							{ questions: data }
						)
						.then((res) => {
							$scope.questions.splice(index, 1);
							Swal.fire(
								"Đã xóa",
								"Xóa quiz thành công",
								"success"
							);
						})
						.catch((err) => {
							Swal.fire({
								icon: "error",
								title: "Oops...",
								text: "Something went wrong!",
							});
						});
				}
			});
		};

		$scope.saveInfoQuestion = (event, form) => {
			let data;
			if ($scope.isCreate) {
				data = [$scope.question].concat($scope.questions);
				console.log(data);
				console.log($scope.questions);
			} else {
				console.log($scope.question);
				data = angular.copy($scope.questions);
				data.splice($scope.index_question_edit, 1, $scope.question);
				console.log(data);
				console.log($scope.questions);
			}
			$http
				.put(`${baseUrl}questions/${$scope.currentSubject.id}`, {
					questions: data,
				})
				.then((res) => {
					if ($scope.isCreate) {
						$scope.questions.unshift($scope.question);
					} else {
						$scope.questions.splice(
							$scope.index_question_edit,
							1,
							$scope.question
						);
						$scope.index_question_edit = -1;
					}
					$scope.question = null;
					{
						Swal.fire(
							"",
							$scope.isCreate
								? "Tạo quiz thành công"
								: "Lưu thành công",
							"success"
						).then((result) => {});
					}
				})
				.catch((err) => {
					Swal.fire("", "Lưu thông tin thất bại", "error");
				});
		};

		$scope.onSubmit = (event, form) => {
			event.preventDefault();
			if (form.$valid) {
				$scope.saveInfoQuestion();
				form.$setUntouched();
			}
		};

		// show modal
		$scope.showModal = (ques, index) => {
			if (ques != null) {
				$scope.isCreate = false;
				$scope.index_question_edit = index;
				$scope.question = angular.copy(ques);
			} else {
				$scope.isCreate = true;
				$scope.index_user_edit = -1;
				let Id = new Date().getTime();
				let fakeData = {
					Id,
					Text: "",
					Marks: 1,
					AnswerId: `${Id}_0`,
					Answers: [
						{
							Id: `${Id}_0`,
							Text: "",
						},
						{
							Id: `${Id}_1`,
							Text: "",
						},
					],
				};
				$scope.question = fakeData;
			}
		};

		// add answer
		$scope.addAnswer = () => {
			let fakeAnswer = {
				Id: `${$scope.question.Id}_${$scope.question.Answers.length}`,
				Text: "",
			};
			$scope.question.Answers.push(fakeAnswer);
		};

		// remove answer
		$scope.removeAnswer = (index) => {
			if ($scope.question.Answers[index].Id == $scope.question.AnswerId) {
				$scope.question.AnswerId = null;
			}
			$scope.question.Answers.splice(index, 1);
		};

		// show quiz
		$scope.openQuiz = (maMon, id) => {
			$http
				.get(`${baseUrl}questions/${id}`)
				.then((res) => {
					$scope.questions = res.data.questions;
				})
				.catch((err) => {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Something went wrong!",
					});
				});
			$scope.currentSubject = $scope.subjects.filter(
				(sub) => sub.Id == maMon
			)[0];
		};

		// pagination
		$scope.startIndex = 0;
		$scope.first = () => {
			$scope.startIndex = 0;
		};
		$scope.previous = () => {
			if ($scope.startIndex > 0) $scope.startIndex -= 8;
		};
		$scope.next = () => {
			if (
				$scope.startIndex <
				$scope.questions.length -
					($scope.questions.length % 8 == 0
						? 8
						: $scope.questions.length % 8)
			)
				$scope.startIndex += 8;
		};
		$scope.last = () => {
			$scope.startIndex =
				$scope.questions.length -
				($scope.questions.length % 8 == 0
					? 8
					: $scope.questions.length % 8);
		};
	}
);
