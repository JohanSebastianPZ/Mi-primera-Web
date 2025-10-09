<?php
    $servername = "127.0.0.1"; 
    $database = "PracticaWordPress";
    $username = "root"; 
    $password = ""; 
    $port = 3307; // XAMPP MySQL

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database, $port);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";

    mysqli_close($conn);
?>
