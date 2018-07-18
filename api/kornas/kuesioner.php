<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'dataKuesioner')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas    = $DecodedDataArray->data->kornas;
     $proses = $conn->query("SELECT tbl_kuesioner.*,
                                     tbl_prov.provinsi,
                                     tbl_kab.kabupaten,
                                     tbl_kec.kecamatan,
                                     tbl_kel.kelurahan
                                     FROM tbl_kuesioner
                                     LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov =  tbl_prov.id
                                     LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab = tbl_kab.id
                                     LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec = tbl_kec.id
                                     LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel = tbl_kel.id
                                     WHERE tbl_kuesioner.id_prov IN ($kornas)
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
