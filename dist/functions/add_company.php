<?php

  //Includes
  include 'DB_companies.php';

  //Get company/team info , the term is used interchangably.
  //
  //
      // ID's auto Inc, so we don't need to provide this.
      $ID        = "";
      // STRING - Company name.
      $company   = $_GET["company_name"];
      // STRING - User name - Companies are set as 'Default' since they have control over others accounts.
      $userName      = "Allan Ocelot";
      // STRING -  Email - the admin / team owner email address
      $email     =  $_GET["email_address"];
      // I Think we'll use gravatar to get the user avatar.
      $avatar    = "www.workofcode.com";
      // Long + Lat are the 'Home' for the admin account.
      $Longitude = 0;
      $Latitude  = 0;
      //We use the password hash method to hash and salt our passwords
      $password = password_hash($_GET["pass_word"], PASSWORD_DEFAULT);
  //

   //if(password_hash("Spedey99", PASSWORD_DEFAULT) == password_verify('Spedey99', password_hash("Spedey99", PASSWORD_DEFAULT))){


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






    $sql = "INSERT INTO users (company , name , email ) VALUES (553, '$Name' , 'john@example.com')";

       if ($conn->query($sql) === TRUE) {
          //echo "New record created successfully";
          //email_user_password('Allan', 'allan@workofcode.com');
       } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
       }

    $conn->close();
?>
