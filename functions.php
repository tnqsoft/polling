<?php

function getList($mysqli, $last=0)
{
    $sql = "SELECT * FROM `chatbox`";
    if($last != 0) {
        $sql .= " WHERE `created_at` > '$last'";
    }
    $sql .= " ORDER BY `created_at` ASC LIMIT 20";
    $list = array();
    while(true) {
        try {
            $result = $mysqli->query($sql);
            if($result->num_rows > 0) {

                while ($obj = $result->fetch_object()) {
                    $list[] = array(
                        'id' => $obj->id,
                        'username' => $obj->username,
                        'message' => $obj->message,
                        'created_at' => $obj->created_at,
                    );
                }
                $result->close();
                break;
            } else {
                sleep(1);
                continue;
            }
        } catch(Exception $e) {
            throw $e;
        }
    }

    return $list;
}

function getMessage($mysqli, $id)
{
    $sql = "SELECT * FROM `chatbox` WHERE id=$id";
    $item = array();
    try {
        $result = $mysqli->query($sql);
        $obj = $result->fetch_object();
        $item = array(
            'id' => $obj->id,
            'username' => $obj->username,
            'message' => $obj->message,
            'created_at' => $obj->created_at,
        );
    } catch(Exception $e) {
        throw $e;
    } finally {
        $result->close();
    }

    return $item;
}

function addMessage($mysqli, $username, $message)
{
    $message = $mysqli->real_escape_string($message);
    $username = $mysqli->real_escape_string($username);
    $sql = "INSERT INTO `chatbox`(`username`,`message`,`created_at`) ";
	$sql .= "VALUES ('$username', '$message', NOW())";

    try {
        if ($mysqli->query($sql)) {
            return $mysqli->insert_id;
        }
    } catch(Exception $e) {
        throw $e;
    }

    return false;
}
