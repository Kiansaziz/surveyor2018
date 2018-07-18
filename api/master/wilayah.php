<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if ($type == 'delete') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $tabel       = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $query       = "DELETE FROM $tabel WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menghapus Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menghapus Data"}';
  }
  echo $outp;
}


if($type == 'submit')
{
  $post       = json_decode(file_get_contents("php://input"));
  $isi        = isset($post->isi) ? $post->isi : '';
  $tabel      = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $jwt        = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
      //  QUERY INSERT
      foreach ($isi as $key => $value) {
        $cols[] = "`".$key."`='".$value."'";
      }
      $col             = implode(",", $cols);
      $query           = "INSERT INTO $tabel SET $col";
      $run             = $conn->query($query);
      if ($run) {
        $outp .= '{"status":"success",';
        $outp .= '"keterangan":"Berhasil Memasukan Data"}';
      } else {
        $outp .= '{"status":"error",';
        $outp .= '"keterangan":"Gagal Memasukan Data"}';
      }
  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Proses, Code : 1212"}';
  }
  echo $outp;
}


?>
