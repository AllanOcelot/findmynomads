<?php
session_start();

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

    //Get the user ID (In reference to the table)
    $user_id     = $_SESSION['user_id'];
    $user_type   = $_SESSION['type'];

    // Check connection
    if($conn->connect_error){
      die("Connection failed: " . $conn->connect_error);
    }else{



      if($_SESSION['type'] == 'digital_nomad'){
        $result = $conn->query("SELECT current_location FROM users WHERE ID = '$user_id'");
      }
      if($_SESSION['type'] == 'company'){
        $result = $conn->query("SELECT home_location FROM companies WHERE ID = '$user_id'");
      }

      if($result->num_rows > 0){
        $result = $result->fetch_assoc();
        //$current_location = explode("*", $result['current_location']);
        echo json_encode($result);
      }else{ 
        echo "No location data";
      }
     $conn->close();
    }

  //Has item been submitted
  }else{
    echo "error";
    return false;
  }
?>
