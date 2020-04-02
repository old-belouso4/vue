<?php
$_POST = json_decode(file_get_contents('php://input'), true);

$newFile = "../../" . $_POST["name"] . ".html";

if($_POST["name"]) {
    if (file_exists($newFile)) {
        header("HTTP/1.0 400 Bad Request");
    } else {
        fopen($newFile, 'w');
    }
}


