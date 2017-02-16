<?php

// Include Config and Lib
include "config.php";
include "condb.php";
include "functions.php";

$chatSocket = new ChatWebSocket("0.0.0.0", "9000");

try {
    $chatSocket->run();
} catch (Exception $e) {
    $chatSocket->stdout($e->getMessage());
}
