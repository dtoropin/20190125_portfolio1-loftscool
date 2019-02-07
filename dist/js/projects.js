// addProlect for projects.html
var addProject = (function () {

	var _MODAL = null;

	var init = function () {
		_setUpListners();
		_fileUpload();
	};

	var _setUpListners = function () {
		$('.sites-add__link').on('click', _showModal);
		$('.formAddProject').on('submit', _addProject);
		$('.formAddProject').find('input, textarea').on('input', _onInput);
		$('.addProject-title__close').on('click', _resetForm);
	};

	var _onInput = function (e) {
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _showModal = function (e) {
		e.preventDefault();
		_MODAL = $('.addProject').bPopup({
			modalClose: false
		});
	};

	var _resetForm = function (e) {
		e.preventDefault();
		workingForms.resetErrorForm($('.formAddProject'));
		$('.alertError').hide();
		$(('.formAddProject')).trigger('reset');
		_fileUpload(1);
		_MODAL.close();
	};

	var _addProject = function (e) {
		e.preventDefault();
		var form = $(this),
			url = 'addProject.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSend(url)
			.done(function () {
				console.log("success");
				_MODAL.close();
				$('.alertAdd').bPopup({
					modalClose: false,
					autoClose: 2000
				});
			})
			.fail(function () {
				console.log("error");
				$('.alertError').show();
			});
	};

	var _fileUpload = function (bool) {
		var lbl = $('.file-upload__text');
		lbl.css('color', '#48cbe8');
		lbl.text('Загрузите изображение');
		if (bool) return false;
		$('.file-upload__input').change(function () {
			lbl.css('color', '#000000')
			lbl.text(this.files[0].name);
		});
	};

	return {
		init: init
	}

})();

addProject.init();