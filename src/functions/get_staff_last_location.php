<?php
session_start();

if(isset($_GET["submitted"])){
  //Includes
  include 'DB_companies.php';

  $query = $conn->prepare( "SELECT ID, owner_ID, longitude, latitude FROM locations WHERE company_owner_ID = ? AND owner_ID <> ? ORDER BY owner_ID" );
  $query->bindValue( 1, $_SESSION['company_id']);
  $query->bindValue( 2, $_SESSION['user_id']);
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $email_hash_query = $conn->prepare( "SELECT ID, email_hash FROM users WHERE company_ID = ? AND ID <> ? ORDER BY ID" );
  $email_hash_query->bindValue( 1, $_SESSION['company_id']);
  $email_hash_query->bindValue( 2, $_SESSION['user_id']);
  $email_hash_query->execute();
  $email_hash_result = $email_hash_query->fetchAll(PDO::FETCH_ASSOC);


  //Create our own JSON data to send back to the map with the user's hashed email address included
  $location_pin_array= [];

  //Resulting JSON should look like
  // for each result, with an ID of X, if X matches the email_hash ID , add that to a new JSON element
  foreach($result as $key=>$location){
    if($result[$key]['owner_ID'] == $email_hash_result[$key]['ID']){
        $pin_data = [
          "ID"   => $result[$key]['ID'],
          "owner_ID" => $result[$key]['owner_ID'],
          "longitude" => $result[$key]['longitude'],
          "latitude" => $result[$key]['latitude'],
          "email_hash" => $email_hash_result[$key]['email_hash']
        ];
        array_push($location_pin_array, $pin_data);
    }
  }

  //var_dump($location_pin_array);

  echo json_encode($location_pin_array);

}else{
  echo "false";
}
?>
