<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));





if($type == 'datasc')
{
  $proses = $conn->query("SELECT tbl_kuesioner.nomor_kuesioner, tbl_kuesioner.valid_enumerator, tbl_kuesioner.valid_data_entry, tbl_kuesioner.valid_gabungan, tbl_kuesioner.id_prov, tbl_kuesioner.id_kab, tbl_kuesioner.id_kec, tbl_kuesioner.id_kel,
                                  tbl_prov.provinsi,
                                  tbl_kab.kabupaten,
                                  tbl_kec.kecamatan,
                                  tbl_kel.kelurahan
                                  FROM tbl_kuesioner
                                  LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov =  tbl_prov.id
                                  LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab = tbl_kab.id
                                  LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec = tbl_kec.id
                                  LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel = tbl_kel.id
                                  WHERE tbl_kuesioner.valid_enumerator = '0' AND tbl_kuesioner.valid_data_entry = '0' AND tbl_kuesioner.valid_gabungan = '1'
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

if($type == 'datasx')
{
  $proses = $conn->query("SELECT tbl_kuesioner.nomor_kuesioner, tbl_kuesioner.valid_enumerator, tbl_kuesioner.valid_data_entry, tbl_kuesioner.valid_gabungan, tbl_kuesioner.id_prov, tbl_kuesioner.id_kab, tbl_kuesioner.id_kec, tbl_kuesioner.id_kel,
                                  tbl_prov.provinsi,
                                  tbl_kab.kabupaten,
                                  tbl_kec.kecamatan,
                                  tbl_kel.kelurahan
                                  FROM tbl_kuesioner
                                  LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov =  tbl_prov.id
                                  LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab = tbl_kab.id
                                  LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec = tbl_kec.id
                                  LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel = tbl_kel.id
                                  WHERE tbl_kuesioner.valid_enumerator = '0' AND tbl_kuesioner.valid_data_entry = '1' AND tbl_kuesioner.valid_gabungan = '1'
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


if ($type == 'scit') {
  $post             = json_decode(file_get_contents("php://input"));
  $nomor_kuesioner  = $conn->real_escape_string(isset($post->nomor_kuesioner) ? $post->nomor_kuesioner : '');

  $query  = "UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $run    = $conn->multi_query($query)or die(mysql_error());
  if (!$run) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menyamakan Data"}';
  } else {
    $ket   = "Berhasil Menyamakan Data ";
    // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
    do {
      $conn->use_result();
    } while ($conn->next_result());
    if ($conn->errno) {
      $ket .= " Terjadi Kegagalan Sistem Kode 1207";
    }

    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"'.$ket.'"}';
  }
  echo $outp;
}


if ($type == 'sxit') {
  $query            = '';
  $post             = json_decode(file_get_contents("php://input"));
  $nomor_kuesioner  = $conn->real_escape_string(isset($post->nomor_kuesioner) ? $post->nomor_kuesioner : '');

  $query .= "DELETE FROM tbl_jwb_ed_ab WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_c WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_d WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_e WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_f WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_g WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_h WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_i WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_j WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_k WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_l WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_m WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_ed_n WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $query .= "DELETE FROM tbl_jwb_gb_ab WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_c WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_d WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_e WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_f WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_g WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_h WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_i WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_j WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_k WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_l WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_m WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "DELETE FROM tbl_jwb_gb_n WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $query .= "DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $query .= "INSERT INTO tbl_jwb_ed_ab SELECT * FROM tbl_jwb_en_ab WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_c SELECT * FROM tbl_jwb_en_c WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_d SELECT * FROM tbl_jwb_en_d WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_e SELECT * FROM tbl_jwb_en_e WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_f SELECT * FROM tbl_jwb_en_f WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_g SELECT * FROM tbl_jwb_en_g WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_h SELECT * FROM tbl_jwb_en_h WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_i SELECT * FROM tbl_jwb_en_i WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_j SELECT * FROM tbl_jwb_en_j WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_k SELECT * FROM tbl_jwb_en_k WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_l SELECT * FROM tbl_jwb_en_l WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_m SELECT * FROM tbl_jwb_en_m WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_ed_n SELECT * FROM tbl_jwb_en_n WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $query .= "INSERT INTO tbl_jwb_gb_ab SELECT * FROM tbl_jwb_en_ab WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_c SELECT * FROM tbl_jwb_en_c WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_d SELECT * FROM tbl_jwb_en_d WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_e SELECT * FROM tbl_jwb_en_e WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_f SELECT * FROM tbl_jwb_en_f WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_g SELECT * FROM tbl_jwb_en_g WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_h SELECT * FROM tbl_jwb_en_h WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_i SELECT * FROM tbl_jwb_en_i WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_j SELECT * FROM tbl_jwb_en_j WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_k SELECT * FROM tbl_jwb_en_k WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_l SELECT * FROM tbl_jwb_en_l WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_m SELECT * FROM tbl_jwb_en_m WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query .= "INSERT INTO tbl_jwb_gb_n SELECT * FROM tbl_jwb_en_n WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $query .= "UPDATE tbl_kuesioner SET valid_data_entry = '0', valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";

  $run    = $conn->multi_query($query)or die(mysql_error());
  if (!$run) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menyalin Data"}';
  } else {
    $ket   = "Berhasil Menyalin Data ";
    // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
    do {
      $conn->use_result();
    } while ($conn->next_result());
    if ($conn->errno) {
      $ket .= " Terjadi Kegagalan Sistem Kode 120793";
    }

    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"'.$ket.'"}';
  }
  echo $outp;
}

?>
