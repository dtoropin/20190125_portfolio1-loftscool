// writeMe for writeme.html
var writeMe = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.formWriteme').on('submit', _sendForm);
		$('.formWriteme').find('input, textarea').on('input', _onInput);
		$('.formWriteme').on('reset', _resetForm);
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
			url = 'contactme.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function () {
				console.log("success");
				$('.formWriteme').trigger('reset');
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