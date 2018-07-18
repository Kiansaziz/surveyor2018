<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'capaian')
{
  $proses = $conn->query("SELECT
                            tbl_prov.provinsi,
                            COUNT(nomor_kuesioner) AS jumlah,
                            SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS enumerator,
                            SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS data_entry,
                            SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS hasil
                            FROM tbl_kuesioner
                            LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov=tbl_prov.id
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
  echo json_encode($outpArr);
}

?>
