<?php

require_once 'vendor/autoload.php';

$router = new \Klein\Klein();

$router->respond('GET', '/?', function () {
	return 'Главная страница!';
});

$router->respond('GET', '/projects/?', function () {
	return 'Страница портфолио!';
});

$router->respond('GET', '/writeme/?', function () {
	return 'Страница контактов!';
});

$router->respond('GET', '/login/?', function () {
	return 'Страница авторизации!';
});

$router->dispatch();