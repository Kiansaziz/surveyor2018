<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);

// variable Kosong
$joinab  = "";

$post     = json_decode(file_get_contents("php://input"));
$table    = isset($post->table) ? $post->table : '';
$poin     = isset($post->poin) ? $post->poin : '';
$x        = isset($post->x) ? $post->x : '';

if ($x != '') {
  foreach ($x as $key => $value) {
    $cols[]     = $table.".".$key." AS ".$value;
  }
  $col = implode(", ", $cols);
} else {
  $col = '';
}

if ($table != 'tbl_jwb_gb_ab') {
  $joinab  = "INNER JOIN tbl_jwb_gb_ab ON $table.nomor_kuesioner = tbl_jwb_gb_ab.nomor_kuesioner";
}


// membuat perintah dinamis
$query    = "SELECT $col,
                    tbl_kuesioner.nomor_kuesioner AS nomor_kuesioner,
                    tbl_jwb_gb_ab.p107 AS usia,
                    tbl_prov.kategori_tppu AS tppu_wil,
                    tbl_prov.kategori_tppt AS tppt_wil,
                    tbl_profil.kategori_tppu AS tppu_profesi,
                    tbl_profil.kategori_tppt AS tppt_profesi
             FROM $table $joinab
             INNER JOIN tbl_kuesioner ON $table.nomor_kuesioner=tbl_kuesioner.nomor_kuesioner
             INNER JOIN tbl_prov ON tbl_prov.id=tbl_kuesioner.id_prov
             INNER JOIN tbl_profil ON tbl_profil.profil=tbl_jwb_gb_ab.p201
             WHERE tbl_kuesioner.valid_gabungan = '0'";

// PROSES QUERY
$proses = $conn->query($query);
if ($proses->num_rows > 0) {
  while($rs = $proses->fetch_object()) {
      $data[] = $rs;
  }
} else {
  $data[]=null;
}
$outp .= '{"hasil":'.json_encode($data).',';
$outp .= '"title":"PERTANYAAN POIN '.SUBSTR($poin,1).'"}';
echo $outp;




?>
