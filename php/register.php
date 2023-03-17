<?php

$servername = "localhost";
$username ="root";
$password="";
$dbname="guvii";
$connect=mysqli_connect($servername,$username,$password,$dbname);
if(mysqli_connect_errno())
{
    echo "falied to connect";
}
// echo $_POST['name'];
$password=$_POST['password'];
$password=password_hash($password,PASSWORD_DEFAULT);
if(isset($_POST['name']) && $_POST['name']!='' && isset($_POST['password']) && $_POST['password']!='' && isset($_POST['email']) && $_POST['email']!='')
{
    $sql = "INSERT INTO idregister(name,password,email) VALUES('".addslashes($_POST['name'])."','".addslashes($password)."','".addslashes($_POST['email'])."')";
    $connect->query($sql);
}
$uri = 'mongodb+srv://Ashwinth:1234@guviclus.dl5aa6p.mongodb.net/?retryWrites=true&w=majority';
$manager = new MongoDB\Driver\Manager($uri);

$database = "test";
$collection = "guvi";

$bulk = new MongoDB\Driver\BulkWrite;

$document = [
    // 'email' => 'e',
    'name'=> $_POST['name'],
    'password' => $password,
    'email' => $_POST['email'],
    'mobile'=>$_POST['mobile']
    // 'confirmPassword' => $confirmPassword,
];

$bulk = new MongoDB\Driver\BulkWrite;

// Add insert operation to bulk write object
$bulk->insert($document);

// Create MongoDB write concern object
$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);

// Execute bulk write operation
$result = $manager->executeBulkWrite("$database.$collection", $bulk, $writeConcern);

// Print result
printf("Inserted %d document(s)\n", $result->getInsertedCount());


?>