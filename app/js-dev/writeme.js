// writeMe for writeme.html
var writeMe = (function () {

	var _form = $('.formWriteme');

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		_form.on('submit', _sendForm);
		_form.find('input, textarea').on('input', _onInput);
		_form.on('reset', _resetForm);
	};

	var _resetForm = function() {
		workingForms.resetErrorForm($(this));
	};

	var _onInput = function (e) {
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _sendForm = function (e) {
		e.preventDefault();

		var form = $(this),
			url = '/php/contactme.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function () {
				console.log("success");
				_form.trigger('reset');
				$('.alertAdd').bPopup({
					modalClose: false,
					autoClose: 2000
				});
			})
			.fail(function () {
				console.log("error");
			});
	};


	return {
		init: init
	}

})();

writeMe.init();