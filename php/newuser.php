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
    echo "Connected successfully<br>";

    //Inserts data into db
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    $sql = "INSERT INTO info (username, password) VALUES ('$username', '$password')";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully<br>";
        echo "Username: " . $username . "<br>";
        echo "Password: " . $password;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

?>