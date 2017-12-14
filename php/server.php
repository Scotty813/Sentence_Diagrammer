<?php

session_start();

// variable declaration
$username = "";
$errors = array();
$_SESSION['success'] = "";

// connect to database
// $db = mysqli_connect('mysql.yaacotu.com', 'sentdiagteam', 'ZujFR6gc', 'sentdiagdb');
$db = mysqli_connect('localhost', 'shorn', 'Drumline1!', 'sentdiagdb');

// REGISTER USER
if (isset($_POST['reg_user']))
{
    // receive all input values from the form
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
    $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

    // query to see if the username has already been used
    $query = "SELECT * FROM users WHERE username = '$username'";    
    $result = mysqli_query($db, $query);
    $num_rows = mysqli_num_rows($result); 

    if ($num_rows != 0) 
    {
	   array_push($errors, "Username already exists");
    }    

    // form validation: ensure that the form is correctly filled
    if (empty($username))
    {
	   array_push($errors, "Username is required");
    }
    if (empty($password_1))
    {
	   array_push($errors, "Password is required");
    }

    if ($password_1 != $password_2)
    {
	   array_push($errors, "The two passwords do not match");
    }
  

    // register user if there are no errors in the form
    if (count($errors) == 0)
    {
	    $password = md5($password_1); //encrypt the password before saving in the database
	    $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
	    mysqli_query($db, $query);

    	$_SESSION['username'] = $username;
    	$_SESSION['success'] = "You are now logged in";
    	header('location: ../diagrammer.html');
    }
}

// LOGIN USER

if (isset($_POST['login_user']))
{
    // receive all input values from the form
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    if (empty($username))
    {
	   array_push($errors, "Username is required");
    }
    if (empty($password))
    {
	   array_push($errors, "Password is required");
    }
    // there are no elments in the error array
    if (count($errors) == 0)
    {
    	// password encrypted when stored
    	$password = md5($password);
    	$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    	$results = mysqli_query($db, $query);

        // did you find at least one row
    	if (mysqli_num_rows($results) == 1)
    	{
    	    $_SESSION['username'] = $username;
    	    $_SESSION['success'] = "You are now logged in";
    	    header('location: ../diagrammer.html');
    	}
        // incorrect cridentials
    	else
    	{
    	    array_push($errors, "Wrong username/password combination");
    	}
    }
}
?>
