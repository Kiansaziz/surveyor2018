<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'dataUser')
{
  $proses = $conn->query("SELECT tbl_user.*, (tbl_level.nama_level) AS nama_level FROM tbl_user INNER JOIN tbl_level ON tbl_user.level=tbl_level.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $data[] = $rs;
    }
  } else {
    $data[]=null;
  }
  echo json_encode($data);
}


?>
