<?php
$result['mes'] = 'NO';
$file_name = '';

// cоздадим папку если её нет
if(!is_dir('./upload')) mkdir('./upload', 0777);

//сохраняем наш файл на сервер в папку /upload/
if (!empty($_FILES['file']['tmp_name'])) { 
	// $path = $_SERVER['DOCUMENT_ROOT'].'/upload/'.$_FILES['file']['name']; 
	$path = './upload/'.$_FILES['file']['name'];
	if (!copy($_FILES['file']['tmp_name'], $path)) die(json_encode($result));

	$file_name = $_FILES['file']['name'];
	$result['mes'] = 'OK';
	// Обработка данных
	// ['filename'] = $file_name;
	// ['name'] = htmlspecialchars($_POST['name']);
	// ['url'] = htmlspecialchars($_POST['projectUrl']);
	// ['comment'] = htmlspecialchars($_POST['discr']);
}

die(json_encode($result));