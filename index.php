<?php
//error_reporting(0);
session_start();
$auth = isset($_SESSION['auth']) ? true : false;

require_once 'vendor/autoload.php';

$router = new \Klein\Klein();
$templater = Templater::getInstance();
$config = include_once 'config/config.php';

$router->respond('GET', '/portfolio/?', function () use ($templater, $config, $auth) {
	ORM::configure('sqlite:./database/portfolio.db');
	$data = array();
	$data['results'] = ORM::for_table('project')->find_many();
	$data['auth'] = $auth;
	$data['config'] = $config;
	$data['active'] = 'portfolio';
	$data['title'] = 'Страница портфолио';
	return $templater->display('pages/portfolio', $data);
});

$router->respond('GET', '/contacts/?', function () use ($templater, $config, $auth) {
	$data = array();
	$data['auth'] = $auth;
	$data['config'] = $config;
	$data['active'] = 'contacts';
	$data['title'] = 'Страница контактов';
	return $templater->display('pages/contacts', $data);
});

$router->respond('GET', '/auth/?', function () use ($templater, $config, $auth) {
	$data = array();
	$data['auth'] = $auth;
	$data['config'] = $config;
	$data['logger'] = true;
	$data['title'] = 'Страница авторизации';
	return $templater->display('pages/auth', $data);
});

$router->respond('GET', '/?', function () use ($templater, $config, $auth) {
	$data = array();
	$data['auth'] = $auth;
	$data['config'] = $config;
	$data['active'] = 'index';
	$data['title'] = 'Главная страница';
	return $templater->display('pages/index', $data);
});

$router->respond('404', function () use ($templater, $config, $auth) {
	$data = array();
	$data['auth'] = $auth;
	$data['config'] = $config;
	$data['logger'] = true;
	$data['title'] = 'Страница не найдена';
	return $templater->display('pages/404', $data);
});


$router->dispatch();