<?php
session_start();
$login_valid = false;

  if(isset($_GET["submitted"])){

    //Includes
    include 'DB_companies.php';

    //We want to get all of the the users details.
    $stmt = $conn->prepare('SELECT ID, userName, pass, role, company_ID FROM users WHERE userName=:username');
    $stmt->bindParam(":username", $_GET['user_name']);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //Test if our data returns a match, if not, tell our app it's invalid.
    if( $stmt->rowCount() > 0 ) {
      //Details match those stored
      if(password_verify($_GET['user_pass'], $row['pass'])){
        $_SESSION["user_id"] = $row['ID'];
        $_SESSION["type"]    = $row['role'];
        $_SESSION["company_id"] = $row['company_ID'];
        $login_valid = true;
      }
    }
    echo $login_valid;  
  }
    $conn = null;

?>
