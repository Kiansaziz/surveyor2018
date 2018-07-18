<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'dataBA')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas = $DecodedDataArray->data->kornas;
     $proses     = $conn->query("SELECT tbl_user_kelurahan.id AS id,
                                        tbl_user_kelurahan_ba.id AS ba,
                                        tbl_prov.provinsi AS provinsi,
                                        tbl_kab.kabupaten AS kabupaten,
                                        tbl_kec.kecamatan AS kecamatan,
                                        tbl_kel.kelurahan AS kelurahan
                                  FROM tbl_user_kelurahan
                                  LEFT JOIN tbl_user_kelurahan_ba ON tbl_user_kelurahan_ba.id = tbl_user_kelurahan.id
                                  INNER JOIN tbl_prov ON tbl_user_kelurahan.id_prov = tbl_prov.id
                                  INNER JOIN tbl_kab ON tbl_user_kelurahan.id_kab = tbl_kab.id
                                  INNER JOIN tbl_kec ON tbl_user_kelurahan.id_kec = tbl_kec.id
                                  INNER JOIN tbl_kel ON tbl_user_kelurahan.id_kel = tbl_kel.id
                                  WHERE tbl_user_kelurahan.id_prov IN ($kornas)
                                ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[] = null;
     }
  } catch (Exception $e) {
    $outpArr[] = null;
  }
  echo json_encode($outpArr);
}




if($type == 'dataObservasi')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas = $DecodedDataArray->data->kornas;
     $proses     = $conn->query("SELECT tbl_user_kelurahan.id AS id,
                                        tbl_user_kelurahan_observasi.id AS observasi,
                                        tbl_prov.provinsi AS provinsi,
                                        tbl_kab.kabupaten AS kabupaten,
                                        tbl_kec.kecamatan AS kecamatan,
                                        tbl_kel.kelurahan AS kelurahan
                                  FROM tbl_user_kelurahan
                                  LEFT JOIN tbl_user_kelurahan_observasi ON tbl_user_kelurahan_observasi.id = tbl_user_kelurahan.id
                                  INNER JOIN tbl_prov ON tbl_user_kelurahan.id_prov = tbl_prov.id
                                  INNER JOIN tbl_kab ON tbl_user_kelurahan.id_kab = tbl_kab.id
                                  INNER JOIN tbl_kec ON tbl_user_kelurahan.id_kec = tbl_kec.id
                                  INNER JOIN tbl_kel ON tbl_user_kelurahan.id_kel = tbl_kel.id
                                  WHERE tbl_user_kelurahan.id_prov IN ($kornas)
                                ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[] = null;
     }
  } catch (Exception $e) {
    $outpArr[] = null;
  }
  echo json_encode($outpArr);
}




if($type == 'dataBaDetail')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $conn->real_escape_string($post->id);
  $query  = "SELECT tbl_user_kelurahan_ba.*,
            tbl_user_kelurahan.id AS awal,
            tbl_prov.provinsi AS provinsi,
            tbl_kab.kabupaten AS kabupaten,
            tbl_kec.kecamatan AS kecamatan,
            tbl_kel.kelurahan AS kelurahan
            FROM tbl_user_kelurahan_ba
            INNER JOIN tbl_user_kelurahan ON tbl_user_kelurahan_ba.id = tbl_user_kelurahan.id
            INNER JOIN tbl_prov ON tbl_user_kelurahan.id_prov = tbl_prov.id
            INNER JOIN tbl_kab ON tbl_user_kelurahan.id_kab = tbl_kab.id
            INNER JOIN tbl_kec ON tbl_user_kelurahan.id_kec = tbl_kec.id
            INNER JOIN tbl_kel ON tbl_user_kelurahan.id_kel = tbl_kel.id
            WHERE tbl_user_kelurahan_ba.id = '$id'
                            ";
  $run       = $conn->query($query);
  if ($run->num_rows != NULL) {
    $outp = $run->fetch_object();
  } else {
   $outp=null;
  }
  echo json_encode($outp);
}


if($type == 'dataObservasiDetail')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $conn->real_escape_string($post->id);
  $query  = "SELECT tbl_user_kelurahan_observasi.*,
            tbl_user_kelurahan.id AS awal,
            tbl_prov.provinsi AS provinsi,
            tbl_kab.kabupaten AS kabupaten,
            tbl_kec.kecamatan AS kecamatan,
            tbl_kel.kelurahan AS kelurahan
            FROM tbl_user_kelurahan_observasi
            INNER JOIN tbl_user_kelurahan ON tbl_user_kelurahan_observasi.id = tbl_user_kelurahan.id
            INNER JOIN tbl_prov ON tbl_user_kelurahan.id_prov = tbl_prov.id
            INNER JOIN tbl_kab ON tbl_user_kelurahan.id_kab = tbl_kab.id
            INNER JOIN tbl_kec ON tbl_user_kelurahan.id_kec = tbl_kec.id
            INNER JOIN tbl_kel ON tbl_user_kelurahan.id_kel = tbl_kel.id
            WHERE tbl_user_kelurahan_observasi.id = '$id'
                            ";
  $run       = $conn->query($query);
  if ($run->num_rows != NULL) {
    $outp = $run->fetch_object();
  } else {
   $outp=null;
  }
  echo json_encode($outp);
}


if($type == 'ba_c')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $conn->real_escape_string($post->id);
  $query     = "SELECT * FROM tbl_jwb_gb_ab  WHERE nomor_kuesioner LIKE '$id%'";
  $run       = $conn->query($query);
  if ($run->num_rows != NULL) {
    while($rs = $run->fetch_object()) {
       $outpArr[] = $rs;
    }
  } else {
  $outpArr[]=null;
  }
  echo json_encode($outpArr);
}


?>
