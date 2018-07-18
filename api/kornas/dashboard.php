<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'kuesioner')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT
                               COUNT(nomor_kuesioner) jumlah,
                               SUM(CASE WHEN valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                               SUM(CASE WHEN valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                               SUM(CASE WHEN valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                               FROM tbl_kuesioner
                               WHERE id_prov IN ($kornas)
                             ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outp = $rs;
       }
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}



if($type == 'capaian_percent')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT
                           	  tbl_prov.provinsi,
                               SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS enumerator,
                               SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS data_entry,
                               SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS hasil
                               FROM tbl_kuesioner
                               LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov=tbl_prov.id
                               WHERE tbl_kuesioner.id_prov IN ($kornas)
                               GROUP BY tbl_kuesioner.id_prov
                             ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $rs->target = 100;
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




if($type == 'capaian')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT
                           	  tbl_prov.provinsi,
                               COUNT(tbl_kuesioner.nomor_kuesioner) target,
                               SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                               SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                               SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                               FROM tbl_kuesioner
                               INNER JOIN tbl_prov ON tbl_kuesioner.id_prov=tbl_prov.id
                               WHERE tbl_kuesioner.id_prov IN ($kornas)
                               GROUP BY tbl_kuesioner.id_prov
                             ");
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




if($type == 'jenis_kelamin')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                           tbl_jwb_gb_ab.p106 as label
                                           FROM tbl_jwb_gb_ab
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_prov IN ($kornas)
                                           GROUP BY tbl_jwb_gb_ab.p106
                                           ");
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




if($type == 'profesi')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                           tbl_jwb_gb_ab.p201 as label
                                           FROM tbl_jwb_gb_ab
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_prov IN ($kornas)
                                           GROUP BY tbl_jwb_gb_ab.p201
                                           ");
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




if($type == 'profesi_lain')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                           tbl_jwb_gb_ab.p201x as label
                                           FROM tbl_jwb_gb_ab
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_jwb_gb_ab.p201 = 'Profesi Lainnya'
                                           AND tbl_kuesioner.id_prov IN ($kornas)
                                           GROUP BY tbl_jwb_gb_ab.p201x
                                           ");
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




if($type == 'usia')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                           tbl_jwb_gb_ab.p107 as label
                                           FROM tbl_jwb_gb_ab
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_prov IN ($kornas)
                                           GROUP BY tbl_jwb_gb_ab.p107
                                           ");
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




if($type == 'pendidikan')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                           tbl_jwb_gb_ab.p108 as label
                                           FROM tbl_jwb_gb_ab
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_prov IN ($kornas)
                                           GROUP BY tbl_jwb_gb_ab.p108
                                           ");
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
