<?php
error_reporting(0);

require_once 'vendor/autoload.php';

$router = new \Klein\Klein();
$templater = Templater::getInstance();
$config = include_once 'config/config.php';

$router->respond('GET', '/portfolio/?', function () use ($templater, $config) {
	$data = array();
	$data['config'] = $config;
	$data['active'] = 'portfolio';
	$data['title'] = 'Страница портфолио';
	return $templater->display('pages/portfolio', $data);
});

$router->respond('GET', '/contacts/?', function () use ($templater, $config) {
	$data = array();
	$data['config'] = $config;
	$data['active'] = 'contacts';
	$data['title'] = 'Страница контактов';
	return $templater->display('pages/contacts', $data);
});

$router->respond('GET', '/auth/?', function () use ($templater, $config) {
	$data = array();
	$data['config'] = $config;
	$data['logger'] = true;
	$data['title'] = 'Страница авторизации';
	return $templater->display('pages/auth', $data);
});

$router->respond('GET', '404', function () use ($templater, $config) {
	$data = array();
	$data['config'] = $config;
	$data['logger'] = true;
	$data['title'] = 'Страница не найдена';
	return $templater->display('pages/404', $data);
});

$router->respond('GET', '/?', function () use ($templater, $config) {
	$data = array();
	$data['config'] = $config;
	$data['active'] = 'index';
	$data['title'] = 'Главная страница';
	return $templater->display('pages/index', $data);

});

$router->dispatch();