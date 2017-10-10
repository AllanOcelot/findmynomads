<?php

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

    // STRING - Company name.
    $pre_company_name = $_GET["company_name"];
    $company_name   = mysqli_real_escape_string($conn ,$pre_company_name);

    // STRING - User name - Companies are set as 'Default' since they have control over others accounts.
    $pre_company_email = $_GET["company_email"];
    $company_email  = mysqli_real_escape_string($conn, $pre_company_email);

    //We use the password hash method to hash and salt our passwords
    $pre_password = $_GET["company_password"];
    $password = mysqli_real_escape_string($conn ,$pre_password);
    $password_hashed = password_hash($password, PASSWORD_DEFAULT);


    // Check connection
    if($conn->connect_error){
      die("Connection failed: " . $conn->connect_error);
    }else{

      //Check if user exits in database already
      $result = $conn->query("SELECT * FROM companies WHERE company_name = '$company_name'");
      if ($result->num_rows > 0){
          echo "Username is not valid, pleae choose another";
      } else {
        //Now check to make sure the email is not in use by anyone - comapnies or users
        $result2 = $conn->query("SELECT * FROM companies WHERE email = '$company_email'");
        if ($result2->num_rows > 0){
            echo "The company email is already in use, please try another.";
        } else {
          $sql = "INSERT INTO companies (company_name , email , user_password  ) VALUES ('$company_name', '$company_email' , '$password_hashed' )";
          if($conn->query($sql) === TRUE){
             echo "New record created successfully";
          } else {
             echo "Error: " . $sql . "<br>" . $conn->error;
          }
        }

       $conn->close();
      }
    //Connection
    }




  //Has item been submitted
  }else{
    echo "error";
    return false;
  }


?>
