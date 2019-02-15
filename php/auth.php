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

if (isset($_POST['user']) && $result->user_name !== trim(htmlspecialchars($_POST['user']))) die(false);
if (isset($_POST['pass']) && $result->user_pass !== strtoupper(md5(trim(htmlspecialchars($_POST['pass']))))) die(false);

$_SESSION['auth'] = 'admin';

die(true);