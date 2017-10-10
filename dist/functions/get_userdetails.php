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
        $result = $conn->query("SELECT * FROM users WHERE ID = '$user_id'");
      }
      if($_SESSION['type'] == 'company'){
        $result = $conn->query("SELECT * FROM companies WHERE ID = '$user_id'");
      }


      if ($result->num_rows > 0){
        $returnArray = array();
        while($row = $result->fetch_assoc()) {

          //The User's name
          $returnArray[0] = $row['name'];

          //Avatar ( We will use Gravatar for them )
          $avatar_hash =  md5( strtolower( trim( 'meagusxlr@hotmail.com' ) ) );
          $returnArray[1] = $avatar_hash;

          //Return the data as an array
          echo json_encode($returnArray);

        }
      } else {
        echo "no user exists";
      }
     $conn->close();
    }

  //Has item been submitted
  }else{
    echo "error";
    return false;
  }
?>
