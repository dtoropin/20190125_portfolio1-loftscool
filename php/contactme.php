<?php
$result['ans'] = 'OK';

if ($_COOKIE['imgcaptcha_'] != md5(htmlspecialchars($_POST['captcha']))) {
	$result['ans'] = 'NOK';
	$result['field'][] = 'captcha';
}

/* Устанавливаем e-mail Кому будут приходить письма */
$to = 'free73@list.ru';
/* Указываем переменные, в которые будет записываться информация с формы */
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['text']);
$subject = 'Форма отправки сообщений с сайта'; // тема письма

/* Проверка правильного написания e-mail адреса */
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
	$result['ans'] = 'NOK';
	$result['field'][] = 'email';
}

if ($result['ans'] !== 'OK') die(json_encode($result));

/* Переменная, которая будет отправлена на почту со значениями, вводимых в поля */
$mail_mes = "Сообщение с сайта!\r\n
Имя отправителя: $name\r\n
E-mail: $email\r\n
Текст сообщения: $message";

$charset = "utf-8";
$headers = "Content-type: text/plain; charset=$charset\r\n"; // text/html ?
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Date: " . date('D, d M Y h:i:s O') . "\r\n";

/* Отправка сообщения, с помощью функции mail() */
mail($to, $subject, $mail_mes, $headers) ? die(json_encode($result)) : die(false);
