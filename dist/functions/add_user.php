<?php

  //Includes
  include 'DB_users.php';
  include 'create_password.php';

  //Get user info.

















  //echo random_pwd();

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  //About this script
    //Point: To add a new user to the users table.
    //Users: Belong to a company. Can only be added by a company.
    //Companies: Each have an ID. When we create this user, we pass the company ID.


  // Functions
    //Email user a unique password if everyhing went ok
    function email_user_password($name, $email){
      $to      =  $email;
      $subject = 'Password for FindMyNomads!';
      $message = 'Hi there' . $name . '/n';
      $message += 'This is your password for FindMyNomads \n';
      $message += 'Have fun!';

      $headers = 'From: allan@findmynomad.com' . "\r\n" .
          'Reply-To: allan@findmynomad.com' . "\r\n";

      mail($to, $subject, $message, $headers);

      echo "Mail was sent";
    }



  // All new users are set up 'clean' as a fail safe, I want to mak sure there are no null cases.
    $ID        = 1;
    $Company   = 0;
    $Name      = "Allan Ocelot";
    $Email     =  "Testing@localhost.com";
    $Avatar    = "www.workofcode.com";
    $Longitude = 0;
    $Latitude  = 0;


    $sql = "INSERT INTO users (company , name , email ) VALUES (553, '$Name' , 'john@example.com')";

       if ($conn->query($sql) === TRUE) {
          //echo "New record created successfully";
          //email_user_password('Allan', 'allan@workofcode.com');
       } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
       }

    $conn->close();
?>
