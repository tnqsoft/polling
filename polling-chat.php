<?php
// Include Config and Lib
include "config.php";
include "condb.php";
include "functions.php";

//--------------------------------------------
header("Content-Type: application/json;charset=utf-8");
//--------------------------------------------

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $message = $_POST['message'];
    $responseCode = 500;
    $response = array('code'=>500,'error'=>'Can not create message');
    if($id = addMessage($mysqli, $username, $message)) {
        $responseCode = 200;
        $response = getMessage($mysqli, $id);
    }
    http_response_code($responseCode);
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

// Get List
$last = isset($_GET['last'])?$_GET['last']:0;
$response = getList($mysqli, $last);
echo json_encode($response, JSON_PRETTY_PRINT);
die;
