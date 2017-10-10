<?php
session_start();

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

      // user ID
      $user_id = $_SESSION['user_id'];

      //Long and lat cleansing
      $new_location =  $_GET["new_location"];

      //Now, put the user's latest provided lot and lang as the 'current one' in the DB
      $sql = "UPDATE Users SET current_location = '$new_location' WHERE id = '$user_id'";

      if($conn->query($sql) === TRUE){
         echo 'Current location updated';
      } else {
         echo "Error: " . $sql . "<br>" . $conn->error;
      }

     $conn->close();

  //Has item been submitted
  }else{
    echo "error";
    return false;
  }


?>
