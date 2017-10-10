<?php
session_start();

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

    // STRING - Company name.
    $user_id     = $_SESSION['user_id'];

    // Check connection
    if($conn->connect_error){
      die("Connection failed: " . $conn->connect_error);
    }else{

      //In travel plans find all travel plans that belong to the user
      $result = $conn->query("SELECT * FROM travel_plans WHERE owner = '$user_id'");

      if ($result->num_rows > 0){

        while ($row = $result->fetch_assoc()) {
          $travel_plans['travel_plans'][] = $row;
        }

        echo json_encode($travel_plans['travel_plans']);

        //echo $result;
      } else {
        echo "User has no travel plans";
      }
     $conn->close();
    }

  //Has item been submitted
  }else{
    echo "error";
    return false;
  }
?>
