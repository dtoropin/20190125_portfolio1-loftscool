<?php
$file_name = '';
//$upload = '/dist/img/sites/';
$upload = $_SERVER['DOCUMENT_ROOT'] . '/dist/upload/';

// cоздадим папку если её нет
if (!is_dir($upload)) mkdir($upload, 0777);

//сохраняем наш файл на сервер в папку $upload
if (!empty($_FILES['file']['tmp_name'])) {
	// $path = $_SERVER['DOCUMENT_ROOT'].'/upload/'.$_FILES['file']['name']; 
	$path = $upload . $_FILES['file']['name'];
	(copy($_FILES['file']['tmp_name'], $path))
		? $file_name = $_FILES['file']['name']
		: $file_name = 'no file';
}

// Обработка данных
 $result['filename'] = $file_name;
 $result['name'] = htmlspecialchars($_POST['name']);
 $result['url'] = htmlspecialchars($_POST['projectUrl']);
 $result['comment'] = htmlspecialchars($_POST['discr']);

 die(json_encode($result));
//die();