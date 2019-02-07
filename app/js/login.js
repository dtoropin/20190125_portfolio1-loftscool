// login.js for login.html
var login = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.formLogin').on('submit', _loginSend);
		$('.formLogin').find('input').on('input', _onInput);
	};

	var _onInput = function (e) {
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _loginSend = function (e) {
		e.preventDefault();

		var form = $(this),
			url = 'auth.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function () {
				console.log("success");
				window.location.href = './projects.html';
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