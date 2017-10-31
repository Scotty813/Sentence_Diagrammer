<?php

$servername = "mysql.yaacotu.com";
$username   = "sentdiagteam";
$password   = "ZujFR6gc";
$db         = "sentdiagdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>