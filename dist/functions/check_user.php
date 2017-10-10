<?php
session_start();

  if(isset($_GET["submitted"])){

    //Includes
    include 'DB_companies.php';

    //Assign our Vars
    $pre_user_type  = $_GET['user_type'];
    $user_type           = mysqli_real_escape_string($conn ,$pre_user_type);

    $pre_user_name  = $_GET['user_name'];
    $user_name           = mysqli_real_escape_string($conn ,$pre_user_name);

    $pre_user_pass  = $_GET['user_pass'];
    $user_pass           = mysqli_real_escape_string($conn ,$pre_user_pass);



    if($user_type == 'digital_nomad'){
      $stmt = $conn->prepare("SELECT email , password , ID FROM users WHERE email = ?");
      $stmt->bind_param("s", $user_name);
      $stmt->execute();
      $stmt->bind_result($name , $user_password , $ID);
    }
    if($user_type == 'company'){
      $stmt = $conn->prepare("SELECT company_name , user_password , ID FROM companies WHERE  user_email = ?");
      $stmt->bind_param("s", $user_name);
      $stmt->execute();
      $stmt->bind_result($company_name , $user_password , $ID);
    }
      while($stmt->fetch()) {
        if(password_verify($user_pass, $user_password)){
          echo "User has logged in Thank you.";
          $_SESSION["user_id"] = $ID;
          $_SESSION["type"]    = $user_type;
        }else{ 
          echo "Invalid Credentials";
        }
      }

    $stmt->close();
  }
?>
