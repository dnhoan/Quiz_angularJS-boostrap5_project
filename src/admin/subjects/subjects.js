app.controller(
	"subjectsCtrl3",
	function ($scope, $http, $location, $routeParams) {
		$scope.subjects = [];
		$scope.startIndex = 0;
		$scope.question = null;
		$scope.questions = [];
		const url = "./db/Subjects.js";
		$http
			.get(`${baseUrl}sql`)
			.then((res) => {
				$scope.questions = res.data;
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				});
			});
		$http.get(url).then((res) => {
			$scope.subjects = res.data;
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
					$http
						.delete(`${baseUrl}sql/${id}`)
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
			$http
				.put(`${baseUrl}sql/${$scope.question.id}`, $scope.question)
				.then((res) => {
					console.log(res);
					if ($scope.isCreate) {
						$scope.questions.unshift($scope.question);
					} else {
						$scope.questions[$scope.index_question_edit] =
							$scope.question;
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
				console.log($scope.question);
				$scope.saveInfoQuestion();
				form.$setUntouched();
			}
		};
		$scope.createQuestion = (data) => {
			console.log(data);
			$http
				.post(`${baseUrl}sql`, data)
				.then((res) => {
					console.log(res);
					$scope.question = res.data;
					$scope.question.Answers = [
						{
							Id: `${$scope.question.id}_0`,
							Text: "",
						},
						{
							Id: `${$scope.question.id}_1`,
							Text: "",
						},
					];
					$scope.question.AnswerId = `${$scope.question.id}_0`;
				})
				.catch((err) => {
					Swal.fire("", "Tạo quiz  thất bại", "error");
				});
		};
		$scope.showModal = (ques, index) => {
			if (ques != null) {
				$scope.isCreate = false;
				$scope.index_question_edit = index;
				$scope.question = JSON.parse(JSON.stringify(ques));
			} else {
				console.log("ạklsdj");
				$scope.isCreate = true;
				$scope.index_user_edit = -1;
				let fakeData = {
					Answers: [],
					AnswerId: "",
					Marks: "",
					Text: "",
				};
				console.log(fakeData);
				$scope.createQuestion(fakeData);
			}
		};
		$scope.addAnswer = () => {
			let fakeAnswer = {
				Id: `${$scope.question.id}_${$scope.question.Answers.length}`,
				Text: "",
			};
			$scope.question.Answers.push(fakeAnswer);
		};
		$scope.removeAnswer = (index) => {
			if ($scope.question.Answers[index].Id == $scope.question.AnswerId) {
				$scope.question.AnswerId = null;
			}
			$scope.question.Answers.splice(index, 1);
		};
		$scope.openQuiz = (id) => {
			console.log(id);
			const url = `./db/Quizs/${id}.js`;
			$http.get(url).then((res) => {
				$scope.questions = res.data;
			});
			$scope.currentSubject = $scope.subjects.filter(
				(sub) => sub.Id == id
			)[0];
		};
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
