<?php
    
    $servername = "localhost";
    $username   = "root";
    $password   = "Drumline1";
    $db         = "test";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $db);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    echo "Connected successfully";

    //Check db for matching login credentials
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    $sql = "SELECT count(*) FROM info WHERE(username='$username' AND password='$password')";
    $query = mysql_query($sql);
    $result = mysql_fetch_array($query);

    if($result[0] > 0)
        echo "Login Successful";
    else
        echo "Failed to login";

    $conn->close();

?>



























