// for modal formAddProject
var fileUpload = (function () {

	var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
	var wrapper = $(".file-upload"),
		inp = wrapper.find(".file-upload__input"),
		lbl = wrapper.find(".file-upload__text");

	inp.change(function () {
		var file_name;
		if (file_api && inp[0].files[0])
			file_name = inp[0].files[0].name;
		else
			file_name = inp.val().replace("C:\\fakepath\\", '');

		if (!file_name.length)
			return;

		if (lbl.is(":visible")) {
			lbl.css('color', '#000000')
			lbl.text(file_name);
		}
	}).change();

})();

// other
var myModule = (function () {

	var init = function () {
		console.log('It is myModule!');
	};

	return {
		init: init
	}

})();

myModule.init();