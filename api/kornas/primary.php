<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));

if($type == 'dataProvinsi')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses     = $conn->query("SELECT * FROM tbl_prov WHERE id IN ($kornas)");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[]=null;
     }
  } catch (Exception $e) {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'dataKabupaten')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses    = $conn->query("SELECT tbl_kab.*, tbl_prov.provinsi FROM tbl_kab LEFT JOIN tbl_prov ON tbl_kab.id_prov=tbl_prov.id WHERE tbl_kab.id_prov IN ($kornas)");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[]=null;
     }
  } catch (Exception $e) {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'dataKecamatan')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses    = $conn->query("SELECT tbl_kec.*, tbl_kab.kabupaten FROM tbl_kec LEFT JOIN tbl_kab ON tbl_kec.id_kab=tbl_kab.id WHERE tbl_kab.id_prov IN ($kornas)");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[]=null;
     }
  } catch (Exception $e) {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'dataKelurahan')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses    = $conn->query("SELECT tbl_kel.*, tbl_kec.kecamatan FROM tbl_kel LEFT JOIN tbl_kec ON tbl_kel.id_kec=tbl_kec.id WHERE tbl_kec.id_kab IN (SELECT id FROM tbl_kab WHERE id_prov IN ($kornas))");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[]=null;
     }
  } catch (Exception $e) {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

?>
