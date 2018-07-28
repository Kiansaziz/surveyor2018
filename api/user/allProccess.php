<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'submit')
{
  $ket        = '';
  $post       = json_decode(file_get_contents("php://input"));
  $jawaban    = isset($post->jawaban) ? $post->jawaban : '';
  $tabel      = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $aksi       = $conn->real_escape_string(isset($post->aksi) ? $post->aksi : '');
  $grup       = $conn->real_escape_string(isset($post->grup) ? $post->grup : '');
  $jwt        = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id  = $DecodedDataArray->data->id;

     if ($aksi == 'insert') {

          //  QUERY INSERT
          foreach ($jawaban as $key => $value) {
            $cols[] = "`".$key."`='".$value."'";
          }
          $col             = "`id` = '$id', ";
          $col             .= implode(",", $cols);
          $query           = "INSERT INTO $tabel SET $col";
          $run             = $conn->query($query);
          if ($run) {

            $outp .= '{"status":"success",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"Berhasil Memasukan Data"}';

          } else {
            $outp .= '{"status":"error",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"Gagal Memasukan Data"}';
          }


     } else {

          //  QUERY UPDATE
          foreach ($jawaban as $key => $value) {
            $cols[] = "`".$key."`='".$value."'";
          }
          $col             = implode(",", $cols);
          $query           = "UPDATE $tabel SET $col WHERE `id` = '$id'";
          $run             = $conn->query($query);
          if ($run) {

            $outp .= '{"status":"success",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"Berhasil Mengubah Data"}';

          } else {
            $outp .= '{"status":"error",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"Gagal Mengubah Data"}';
          }

     }
  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Proses, Code : 1212"}';
  }
  echo $outp;
}

if($type == 'change')
{
  $ket        = '';
  $post       = json_decode(file_get_contents("php://input"));
  $kolom      = $conn->real_escape_string(isset($post->kolom) ? $post->kolom : '');
  $value      = $conn->real_escape_string(isset($post->value) ? $post->value : '');
  $jwt        = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id  = $DecodedDataArray->data->id;

     if ($id == '') {
       $outp .= '{"status":"error",';
       $outp .= '"keterangan":"Gagal Proses, Mohon Login Kembali"}';
       echo $outp;
       exit();
     }

      //  QUERY UPDATE
      $query           = "UPDATE tbl_user_kelurahan_list SET $kolom = $value WHERE `id` = '$id'";
      $run             = $conn->query($query);
      if ($run) {
        $outp .= '{"status":"success",';
        $outp .= '"hasil":"update",';
        $outp .= '"keterangan":"Berhasil Mengubah Data"}';
      } else {
        $outp .= '{"status":"error",';
        $outp .= '"hasil":"update",';
        $outp .= '"keterangan":"Gagal Mengubah Data"}';
      }

  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Proses, Code : 1212"}';
  }
  echo $outp;
}

?>
