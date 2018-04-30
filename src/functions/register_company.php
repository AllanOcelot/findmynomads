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


        //We create the company, that is to say, we create a row of data in the database that represents this company and it's information
        $sql_insert = "INSERT INTO companies(company_name, email, pass ) VALUES ('$company_name', '$company_email' , '$password_hashed' )";

        //We execute the action, so that we can retreive the company ID from the listing and set it when creating the user.
        if($conn->exec($sql_insert) === false){
          echo 'Error creating new company listing.';
        }else{
          echo "The new company $company_name is created";
        }

        $sql = "SELECT ID FROM companies WHERE company_name = ?";
        $q = $conn->prepare($sql);
        $q->bindValue( 1, $company_name );
        $q->execute();
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $company_generated_id = $q->fetch();
        $company_generated_id = $company_generated_id['ID'];

        //we Create a user, so that the 'company owner' can actually log in
        $sql_insert = "INSERT INTO users (userName, role, pass, email, company_ID ) VALUES ('$company_name', 1,'$password_hashed','$company_email', '$company_generated_id' )";

        if($conn->exec($sql_insert) === false){
          echo 'Error creating new company listing.';
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
