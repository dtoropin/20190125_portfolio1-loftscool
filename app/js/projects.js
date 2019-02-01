// for modal formAddProject
var addProject = (function () {

	var init = function () {
		_setUpListners();
		_fileUpload();
	};

	var _setUpListners = function () {
		// прослушка событий
		$('.sites-add__link').on('click', _showModal);
		$('.formAddProject').on('submit', _addProject);
	};

	var _showModal = function (e) {
		e.preventDefault();
		$('.addProject').bPopup({ modalClose: false, onClose: _resetForm });
	};

	var _resetForm = function () {
		$('.formAddProject').trigger('reset');
		_fileUpload(1);
		$('.alertError').hide();
	};

	var _addProject = function (e) {
		e.preventDefault();
		var form = $(this),
			url = 'addProject.php',
			data = new FormData();

		//присоединяем наш файл
		jQuery.each($('input[type=["file"]]')[0].files, function (i, file) {
			data.append('file', file);
		});
		//присоединяем остальные поля
		data.append('name', $('input[type="text"]').val());
		data.append('projectUrl', $('input[type="url"]').val());
		data.append('discr', $('textarea').val());

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			cache: false,
			contentType: false,
			processData: false,
			data: data,
			success: function (response) {
				if (response.mes === 'OK') {
					$('.addProject').bPopup({ onClose: _resetForm }).close();
					$('.alertAdd').bPopup({ modalClose: false, autoClose: 2000 });
				} else {
					$('.alertError').show();
				}
			}
		});
	};

	var _fileUpload = function (bool) {

		var file_name = null;
		var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
		var wrapper = $('.file-upload'),
			inp = wrapper.find('.file-upload__input'),
			lbl = wrapper.find('.file-upload__text');
			lbl.css('color', '#48cbe8')
			lbl.text('Загрузите изображение');

		if(bool) return false;
		inp.change(function () {
			if (file_api && inp[0].files[0])
				file_name = inp[0].files[0].name;
			else
				file_name = inp.val().replace('C:\\fakepath\\', '');
			if (!file_name.length) return;
			lbl.css('color', '#000000')
			lbl.text(file_name);
			$('.alertError').hide();
		});
	};

	return {
		init: init
	}
})();

addProject.init();