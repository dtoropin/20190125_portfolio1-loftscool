<?php
// Обработка данных
$result['email'] = htmlspecialchars($_POST['email']);
$result['name'] = htmlspecialchars($_POST['name']);
$result['text'] = htmlspecialchars($_POST['text']);
$result['captcha'] = htmlspecialchars($_POST['captcha']);

die(json_encode($result));