<?php
session_start();

if(isset($_GET["submitted"])){
  //Includes
  include 'DB_companies.php';

  $query = $conn->prepare( "SELECT email FROM users WHERE ID = ?" );
  $query->bindValue( 1, $_GET['user_id']);
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $email = $result[0]['email'];
  $email = trim( "MyEmailAddress@example.com " ); // "MyEmailAddress@example.com"
  $email = strtolower( $email ); // "myemailaddress@example.com"

  echo md5( $email );

}else{
  echo "false";
}
?>
