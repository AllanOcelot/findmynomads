<?php

  //Includes
  include 'DB_companies.php';

  //Assign our Vars
  $user_password_provided  = $_GET['user_password'];

  $stmt = $conn->prepare("SELECT * FROM companies WHERE user_password=?");
  $stmt->bind_param('s', $user_password_provided);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name);  // <- Add; #args = #cols in SELECT
  if($stmt->num_rows > 0) {
    echo true;
  }else{
    echo false;
  }

  $stmt->close();
  $conn->close();


  ?>
