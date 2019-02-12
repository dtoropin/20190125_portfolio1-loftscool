// login.js for login.html
var login = (function () {

	var _form = $('.formLogin');

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		_form.on('submit', _loginSend);
		_form.find('input').on('input', _onInput);
	};

	var _onInput = function (e) {
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _loginSend = function (e) {
		e.preventDefault();

		var form = $(this),
			url = '/php/auth.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function () {
				console.log("success");
				window.location.href = '/portfolio';
			})
			.fail(function () {
				console.log("error");
			});
	};


	return {
		init: init
	}

})();

login.init();