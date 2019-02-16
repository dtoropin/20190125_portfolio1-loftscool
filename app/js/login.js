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

	var _onInput = function () {
		$('.login-block__error').hide();
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _loginSend = function (e) {
		e.preventDefault();

		var form = $(this),
			url = '/php/auth.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function (result) {
				if(result.ans === 'OK') {
					window.location.href = '/portfolio';
				} else {
					result.field.forEach(function (type) {
						form.find("input[name='" + type + "']").addClass('err');
						if(type === 'pass') {
							form.find("input[name='" + type + "']").val('');
						}
					});
					workingForms.validate(form);
				}
			})
			.fail(function () {
				$('.login-block__error').show();
			});
	};


	return {
		init: init
	}

})();

login.init();