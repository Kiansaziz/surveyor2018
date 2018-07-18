<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));





if($type == 'capaian_kornas')
{
     $proses = $conn->query("SELECT nama, kornas FROM tbl_user WHERE level = '5'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $rs->target = 100;
           $proses2 = $conn->query("SELECT
                                   COUNT(nomor_kuesioner) AS jumlah,
                                   (SUM(CASE WHEN valid_enumerator = '0' THEN 1 ELSE 0 END) / COUNT(nomor_kuesioner)) * 100 AS enumerator,
                                   (SUM(CASE WHEN valid_data_entry = '0' THEN 1 ELSE 0 END) / COUNT(nomor_kuesioner)) * 100 AS data_entry,
                                   (SUM(CASE WHEN valid_gabungan = '0' THEN 1 ELSE 0 END) / COUNT(nomor_kuesioner)) * 100 AS hasil
                                   FROM tbl_kuesioner
                                   WHERE id_prov IN ($rs->kornas)
                                   ");
           $rs2 = $proses2->fetch_assoc();
           $rs->jumlah      = $rs2['jumlah'];
           $rs->enumerator  = $rs2['enumerator'];
           $rs->data_entry  = $rs2['data_entry'];
           $rs->hasil       = $rs2['hasil'];
           $outpArr[] = $rs;
       }
     } else {
       $outpArr[]=null;
     }
  echo json_encode($outpArr);
}

?>
