<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Sign Up!</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,300i,400,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="../css/vendors/animate.css">
        <link rel="stylesheet" type="text/css" href="../css/vendors/Grid.css">
        <link rel="stylesheet" type="text/css" href="../css/loginStyles.css">
    </head>
    
    <body>
      <!-- LOGIN -->
      <section class="main center">
        <form class="login" action="login.php" method="post">
            <div class="row">
                <div class="col span-3-of-3 heading">
                    <label>Login</label>
                </div>
            </div>
            <div class="row">
                <div class="col span-1-of-3">
                    <label for="username">Username</label>
                </div>
                <div class="col span-2-of-3">
                    <input type="text" name="username" id="username">
                </div>
            </div>
            <div class="row">
                <div class="col span-1-of-3">
                    <label for="password">Password</label>
                </div>
                <div class="col span-2-of-3">
                    <input type="password" name="password" id="password">
                </div>
            </div>
            <?php include('errors.php'); ?>
            <div class="row">
                <div class="col span-1-of-3">
                    <label>&nbsp;</label>
                </div>
                <div class="col span-2-of-3">
                    <a class="btn-ghost" href="../index.php">Back</a>
                    <input type="submit" value="Submit" name="login_user" class="btn-full sub">
                </div>
            </div>
        </form>
      </section>
    
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>         
    </body>
  
</html>