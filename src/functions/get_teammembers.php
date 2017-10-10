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

      //Get the company ID of the current user
      $result = $conn->query("SELECT company FROM users WHERE ID = '$user_id'");

      //Company does the logged in user belong to.
      $user_company;

      if ($result->num_rows > 0){

        while ($row = $result->fetch_assoc()) {
          $user_company =  $row["company"];
        }

        //Get all users that belong to the same company.
        $search_string = $conn->query("SELECT name, ID, company, current_location , Colour FROM users WHERE company = '$user_company' AND ID <> '$user_id'");
        while ($row = $search_string->fetch_assoc()) {
          $users_data['users'][] = $row;
        }

        echo json_encode($users_data['users']);

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
