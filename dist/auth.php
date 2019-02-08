<?php

if(isset($_POST['user'])) $result = htmlspecialchars($_POST['user']);
if(isset($_POST['pass'])) $result = htmlspecialchars($_POST['pass']);

die(json_encode($result));