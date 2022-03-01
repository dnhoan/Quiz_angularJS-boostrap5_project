var subjects = [];
app.controller("list_subjects", ($scope, $http, $window, $rootScope) => {
	$scope.subjects = [];
	$http
		.get(`${baseUrl}subjects`)
		.then((res) => {
			$scope.subjects = res.data;
		})
		.catch((err) => {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		});

	$scope.deleteSubject = (id, index) => {
		Swal.fire({
			title: "Bạn có thực sự muốn xóa môn học này không?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Xóa",
			cancelButtonText: "Không",
		}).then((result) => {
			if (result.isConfirmed) {
				$http
					.delete(`${baseUrl}subjects/${id}`)
					.then((res) => {
						$scope.subjects.splice(index, 1);
						$http
							.delete(`${baseUrl}questions/${id}`)
							.then((res) => {
								Swal.fire(
									"Đã xóa",
									"Xóa người dùng thành công",
									"success"
								);
							});
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
	$scope.saveInfoSub = (event, form) => {
		$http
			.put(`${baseUrl}subjects/${$scope.subject.id}`, $scope.subject)
			.then((res) => {
				$scope.subjects[$scope.index_subject_edit] = $scope.subject;
				$scope.index_subject_edit = -1;
				$scope.subject = null;
				{
					Swal.fire("", "Lưu thông tin thành công", "success").then(
						(result) => {}
					);
				}
			})
			.catch((err) => {
				Swal.fire("", "Lưu thông tin thất bại", "error");
			});
	};
	$scope.onSubmit = (event, form) => {
		event.preventDefault();
		if (form.$valid) {
			if ($scope.index_subject_edit >= 0) {
				$scope.saveInfoSub();
			} else {
				$scope.createSub();
			}
			form.$setUntouched();
		}
	};
	$scope.createSub = () => {
		$http
			.post(`${baseUrl}subjects`, $scope.subject)
			.then((res) => {
				$scope.subjects.unshift(res.data);
				$scope.subject = null;
				$http
					.post(`${baseUrl}questions`, {
						id: res.data.id,
						questions: [],
					})
					.then((res) => {});
				{
					Swal.fire("", "Tạo môn học thành công", "success").then(
						(result) => {}
					);
				}
			})
			.catch((err) => {
				Swal.fire("", "Tạo môn học  thất bại", "error");
			});
	};
	$scope.showModal = (sub, index) => {
		if (sub != null) {
			subjects = [...$scope.subjects];
			subjects.splice(index, 1);
			$scope.isCreate = false;
			$scope.index_subject_edit = index;
			$scope.subject = { ...sub };
		} else {
			subjects = [...$scope.subjects];
			$scope.isCreate = true;
			$scope.index_subject_edit = -1;
			$scope.subject = {
				Id: "",
				Name: "",
				Logo: "ASNE.png"
			};
		}
	};

	$scope.startIndex = 0;
	$scope.first = () => {
		$scope.startIndex = 0;
	};
	$scope.previous = () => {
		if ($scope.startIndex > 0) $scope.startIndex -= 10;
	};
	$scope.next = () => {
		if (
			$scope.startIndex <
			$scope.subjects.length -
				($scope.subjects.length % 10 == 0
					? 10
					: $scope.subjects.length % 10)
		)
			$scope.startIndex += 10;
	};
	$scope.last = () => {
		$scope.startIndex =
			$scope.subjects.length -
			($scope.subjects.length % 10 == 0
				? 10
				: $scope.subjects.length % 10);
	};
});

app.directive("checkMaExist", ($http) => {
	return {
		require: "ngModel",
		link: (scope, element, attr, mCtrl) => {
			const fnValidate = (value) => {
				let isInValid = true;
				if (value != null) {
					if (subjects.filter((sub) => sub.Id == value).length > 0) {
						isInValid = false;
					}
				}
				mCtrl.$setValidity("check_ma_exist", isInValid);
				return value;
			};
			mCtrl.$parsers.push(fnValidate);
		},
	};
});
