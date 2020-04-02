<?php
$_POST = json_decode(file_get_contents('php://input'), true);
$remove = "../../" . $_POST["remove"];

if (!file_exists($remove)) {
    header("HTTP/1.0 400 Bad Request");
} else {
    unlink($remove);
}

