<?php

  if(isset($_GET["submitted"])){
    //Includes
    include 'DB_companies.php';

      // user ID
      $pre_user_id = $_GET["user_id"];
      $user_id     = mysqli_real_escape_string($conn ,$pre_user_id);

      $result = $conn->query("SELECT current_location FROM users WHERE ID = '$user_id'");
      if($result->num_rows > 0){
        $result = $result->fetch_assoc();
        $current_location = $result['current_location'];

        echo $current_location;

      }else{
        echo "No location";
      }

     $conn->close();
  }else{
    echo "error";
    return false;
  }


?>
