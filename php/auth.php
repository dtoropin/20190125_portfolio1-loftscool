<?php
session_start();
if (isset($_GET['del'])) {
	unset($_SESSION['auth']);
	session_destroy();
	header('Location: /');
}

require_once '../vendor/j4mie/idiorm/idiorm.php';
ORM::configure('sqlite:../database/portfolio.db');

$result = ORM::for_table('user')->find_one(1);
if(!$result) die(false);

$answer['ans'] = 'OK';
if (isset($_POST['user']) && $result->user_name !== trim(htmlspecialchars($_POST['user']))) {
	$answer['ans'] = 'NOK';
	$answer['field'][] = 'user';
}
if (isset($_POST['pass']) && $result->user_pass !== strtoupper(md5(trim(htmlspecialchars($_POST['pass']))))) {
	$answer['ans'] = 'NOK';
	$answer['field'][] = 'pass';
}

if($answer['ans'] !== 'OK') die(json_encode($answer));

$_SESSION['auth'] = 'admin';
die(json_encode($answer));