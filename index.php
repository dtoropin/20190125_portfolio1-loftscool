<?php

require_once 'vendor/autoload.php';

$router = new \Klein\Klein();
$templater = Templater::getInstance();

$router->respond('GET', '/portfolio/?', function () use ($templater) {
	return 'Страница портфолио!';
});

$router->respond('GET', '/contacts/?', function () use ($templater) {
	return 'Страница контактов!';
});

$router->respond('GET', '/auth/?', function () use ($templater) {
	return 'Страница авторизации!';
});

$router->respond('GET', '/?', function () use ($templater) {

	return $templater->display('main_template');

});

$router->dispatch();