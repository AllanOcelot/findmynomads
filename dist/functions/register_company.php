<?php

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

    // STRING - Company name.
    $company_name = $_GET["company_name"];

    // STRING - User name - Companies are set as 'Default' since they have control over others accounts.
    $company_email = $_GET["company_email"];

    //We use the password hash method to hash and salt our passwords
    $password = $_GET["company_password"];
    $password_hashed = password_hash($password, PASSWORD_DEFAULT);

    //Check if user exits in database already
    $query = $conn->prepare( "SELECT company_name FROM companies WHERE company_name = ?" );
    $query->bindValue( 1, $company_name );
    $query->execute();
    if( $query->rowCount() > 0 ) {
        //Username is taken
        echo "Username is not valid, pleae choose another";
    } else {
      //Now check to make sure the email is not in use by anyone - comapnies or users
      $query = $conn->prepare( "SELECT email FROM companies WHERE email = ?" );
      $query->bindValue( 1, $company_email );
      $query->execute();
      if( $query->rowCount() > 0 ) {
        echo "The company email is already in use, please try another.";
      } else {
        //Email does not exist, we create user.
        echo "we get this far";
        $sql = "INSERT INTO companies (company_name , email , pass  ) VALUES ('$company_name', '$company_email' , '$password_hashed' )";

        $sql_insert = "INSERT INTO companies(company_name, email, pass ) VALUES ('$company_name', '$company_email' , '$password_hashed' )";

        if($conn->exec($sql_insert) === false){
          echo 'Error inserting the department.';
          return false;
        }else{
          echo "The new company $company_name is created";
          return true;
        }

      }
     $conn = null;
  }
}else{
  echo "error";
  return false;
}
?>
