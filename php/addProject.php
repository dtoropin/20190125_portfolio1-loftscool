<?php
require_once '../vendor/j4mie/idiorm/idiorm.php';
$upload = $_SERVER['DOCUMENT_ROOT'] . '/build/img/sites/';
//$upload = $_SERVER['DOCUMENT_ROOT'] . '/build/upload/';

// создаем папку если её нет
if (!is_dir($upload)) mkdir($upload, 0777);

//сохраняем наш файл на сервер в папку $upload
if (!empty($_FILES['file']['tmp_name'])) {
	// $path = $_SERVER['DOCUMENT_ROOT'].'/upload/'.$_FILES['file']['name']; 
	$path = $upload . $_FILES['file']['name'];
	(copy($_FILES['file']['tmp_name'], $path))
		? $file_name = $_FILES['file']['name']
		: $file_name = 'site-1.jpg';
}

// Обработка данных
ORM::configure('sqlite:../database/portfolio.db');
$result = ORM::for_table('project')->create();

$result->title = htmlspecialchars($_POST['name']);
$result->fileName = $file_name;
$result->url = htmlspecialchars($_POST['projectUrl']);
$result->description = htmlspecialchars($_POST['discr']);
$result->save();

die(true);