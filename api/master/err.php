<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));

if($type == 'dataErrNull')
{
  $proses = $conn->query("SELECT  tbl_kuesioner.nomor_kuesioner AS nomor_kuesioner,
                                  tbl_jwb_en_ab.nomor_kuesioner AS enumAB,
                                  tbl_jwb_en_c.nomor_kuesioner AS enumC,
                                  tbl_jwb_en_d.nomor_kuesioner AS enumD,
                                  tbl_jwb_en_e.nomor_kuesioner AS enumE,
                                  tbl_jwb_en_f.nomor_kuesioner AS enumF,
                                  tbl_jwb_en_g.nomor_kuesioner AS enumG,
                                  tbl_jwb_en_h.nomor_kuesioner AS enumH,
                                  tbl_jwb_en_i.nomor_kuesioner AS enumI,
                                  tbl_jwb_en_j.nomor_kuesioner AS enumJ,
                                  tbl_jwb_en_k.nomor_kuesioner AS enumK,
                                  tbl_jwb_en_l.nomor_kuesioner AS enumL,
                                  tbl_jwb_en_m.nomor_kuesioner AS enumM,
                                  tbl_jwb_en_n.nomor_kuesioner AS enumN,
                                  tbl_jwb_ed_ab.nomor_kuesioner AS entryAB,
                                  tbl_jwb_ed_c.nomor_kuesioner AS entryC,
                                  tbl_jwb_ed_d.nomor_kuesioner AS entryD,
                                  tbl_jwb_ed_e.nomor_kuesioner AS entryE,
                                  tbl_jwb_ed_f.nomor_kuesioner AS entryF,
                                  tbl_jwb_ed_g.nomor_kuesioner AS entryG,
                                  tbl_jwb_ed_h.nomor_kuesioner AS entryH,
                                  tbl_jwb_ed_i.nomor_kuesioner AS entryI,
                                  tbl_jwb_ed_j.nomor_kuesioner AS entryJ,
                                  tbl_jwb_ed_k.nomor_kuesioner AS entryK,
                                  tbl_jwb_ed_l.nomor_kuesioner AS entryL,
                                  tbl_jwb_ed_m.nomor_kuesioner AS entryM,
                                  tbl_jwb_ed_n.nomor_kuesioner AS entryN,
                                  tbl_jwb_gb_ab.nomor_kuesioner AS gbAB,
                                  tbl_jwb_gb_c.nomor_kuesioner AS gbC,
                                  tbl_jwb_gb_d.nomor_kuesioner AS gbD,
                                  tbl_jwb_gb_e.nomor_kuesioner AS gbE,
                                  tbl_jwb_gb_f.nomor_kuesioner AS gbF,
                                  tbl_jwb_gb_g.nomor_kuesioner AS gbG,
                                  tbl_jwb_gb_h.nomor_kuesioner AS gbH,
                                  tbl_jwb_gb_i.nomor_kuesioner AS gbI,
                                  tbl_jwb_gb_j.nomor_kuesioner AS gbJ,
                                  tbl_jwb_gb_k.nomor_kuesioner AS gbK,
                                  tbl_jwb_gb_l.nomor_kuesioner AS gbL,
                                  tbl_jwb_gb_m.nomor_kuesioner AS gbM,
                                  tbl_jwb_gb_n.nomor_kuesioner AS gbN
                                  FROM tbl_kuesioner
                                  LEFT JOIN tbl_jwb_en_ab ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_ab.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_c ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_c.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_d ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_d.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_e ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_e.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_f ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_f.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_g ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_g.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_h ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_h.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_i ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_i.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_j ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_j.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_k ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_k.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_l ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_l.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_m ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_m.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_en_n ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_en_n.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_ab ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_ab.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_c ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_c.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_d ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_d.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_e ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_e.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_f ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_f.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_g ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_g.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_h ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_h.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_i ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_i.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_j ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_j.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_k ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_k.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_l ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_l.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_m ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_m.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_ed_n ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_ed_n.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_ab ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_ab.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_c ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_c.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_d ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_d.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_e ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_e.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_f ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_f.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_g ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_g.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_h ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_h.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_i ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_i.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_j ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_j.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_k ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_k.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_l ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_l.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_m ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_m.nomor_kuesioner
                                  LEFT JOIN tbl_jwb_gb_n ON tbl_kuesioner.nomor_kuesioner =  tbl_jwb_gb_n.nomor_kuesioner
                                  WHERE tbl_kuesioner.valid_enumerator = '0' AND tbl_kuesioner.valid_data_entry = '0' AND tbl_kuesioner.valid_gabungan = '0'
                                  AND (
                                  tbl_jwb_en_ab.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_c.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_d.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_e.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_f.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_g.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_h.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_i.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_j.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_k.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_l.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_m.nomor_kuesioner IS NULL
                                  OR tbl_jwb_en_n.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_ab.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_c.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_d.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_e.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_f.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_g.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_h.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_i.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_j.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_k.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_l.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_m.nomor_kuesioner IS NULL
                                  OR tbl_jwb_ed_n.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_ab.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_c.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_d.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_e.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_f.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_g.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_h.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_i.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_j.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_k.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_l.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_m.nomor_kuesioner IS NULL
                                  OR tbl_jwb_gb_n.nomor_kuesioner IS NULL
                                  )
                                  ");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}



if ($type == 'duplikat') {
  $post   = json_decode(file_get_contents("php://input"));
  $nomor  = $conn->real_escape_string(isset($post->nomor) ? $post->nomor : '');
  $dari   = $conn->real_escape_string(isset($post->dari) ? $post->dari : '');
  $ke     = $conn->real_escape_string(isset($post->ke) ? $post->ke : '');

  $cekDari  = $conn->query("SELECT nomor_kuesioner FROM $dari WHERE nomor_kuesioner = '$nomor'");
  if ($cekDari->num_rows == NULL) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Sumber Data Kosong"}';
    echo $outp;
    exit();
  }
  $cekKe    = $conn->query("SELECT nomor_kuesioner FROM $ke WHERE nomor_kuesioner = '$nomor'");
  if ($cekKe->num_rows != NULL) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Data Tabel Tujuan Sudah Ada"}';
    echo $outp;
    exit();
  }

  $query   = $conn->query("INSERT INTO $ke SELECT * FROM $dari WHERE nomor_kuesioner = '$nomor'");
  if ($query) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menyalin Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menyalin Data"}';
  }
  echo $outp;
}

?>
