<?php

define("DB_HOST", "localhost");
define("DB_NAME", "polling");
define("DB_USER", "root");
define("DB_PASS", "123456");
define("DB_PORT", 3306);

// set php runtime to unlimited
set_time_limit(0);

function __autoload($class)
{
    $parts = explode('\\', $class);
    require __DIR__.'/classes/'.end($parts) . '.php';
}
