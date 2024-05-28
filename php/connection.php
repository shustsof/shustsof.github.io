<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kaj_portfolio";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
