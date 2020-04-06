<?php
$remove = "../../erwrtwehgeegegs_dsfsdf.html";

if (!file_exists($remove)) {
    header("HTTP/1.0 400 Bad Request");
} else {
    unlink($remove);
}

