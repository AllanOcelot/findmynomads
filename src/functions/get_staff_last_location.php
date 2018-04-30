<?php
session_start();

if(isset($_GET["submitted"])){
  //Includes
  include 'DB_companies.php';

  $query = $conn->prepare( "SELECT ID, owner_ID, longitude, latitude, owner_email_hash FROM locations WHERE company_owner_ID = ? AND is_last_location = ? AND owner_ID <> ?" );
  $query->bindValue( 1, $_SESSION['company_id']);
  $query->bindValue( 2, 1);
  $query->bindValue( 3, $_SESSION['user_id']);
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($result);
  
}else{
  echo "false";
}
?>
