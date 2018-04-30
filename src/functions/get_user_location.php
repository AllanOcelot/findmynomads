<?php
session_start();

if(isset($_GET["submitted"])){
  //Includes
  include 'DB_companies.php';

  //Get the user ID (In reference to the table)
  $user_id     = $_SESSION['user_id'];
  $user_type   = $_SESSION['type'];

  $query = $conn->prepare( "SELECT longitude, latitude FROM locations WHERE owner_ID = ? ORDER BY ID DESC LIMIT 1" );
  $query->bindValue( 1, $user_id );
  $query->execute();

  if( $query->rowCount() > 0 ) {
    //Here is the user's last known location
    echo json_encode($query->fetch(PDO::FETCH_ASSOC));
  } else {
    //User does not seem to have a last known location
    echo 'false';
  }
}else{
  echo false;
}
?>
