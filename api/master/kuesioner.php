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
  $proses = $conn->query("SELECT tbl_kuesioner.nomor_kuesioner, tbl_kuesioner.valid_enumerator, tbl_kuesioner.valid_data_entry, tbl_kuesioner.valid_gabungan, tbl_kuesioner.id_prov, tbl_kuesioner.id_kab, tbl_kuesioner.id_kec, tbl_kuesioner.id_kel,
                                  tbl_prov.provinsi,
                                  tbl_kab.kabupaten,
                                  tbl_kec.kecamatan,
                                  tbl_kel.kelurahan
                                  FROM tbl_kuesioner
                                  LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov =  tbl_prov.id
                                  LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab = tbl_kab.id
                                  LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec = tbl_kec.id
                                  LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel = tbl_kel.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}


if($type == 'dataKuesionerDetail')
{
  $post             = json_decode(file_get_contents("php://input"));
  $nomor_kuesioner  = $conn->real_escape_string($post->nomor_kuesioner);
  $proses           = $conn->query("SELECT tbl_kuesioner.*,
                                  tbl_prov.provinsi,
                                  tbl_kab.kabupaten,
                                  tbl_kec.kecamatan,
                                  tbl_kel.kelurahan
                                  FROM tbl_kuesioner
                                  LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov =  tbl_prov.id
                                  LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab = tbl_kab.id
                                  LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec = tbl_kec.id
                                  LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel = tbl_kel.id
                                  WHERE tbl_kuesioner.nomor_kuesioner = '$nomor_kuesioner'
                                  ");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outp = $rs;
    }
  } else {
    $outp=null;
  }
  echo json_encode($outp);
}


if($type == 'jawabanBeda')
{
  $post             = json_decode(file_get_contents("php://input"));
  $nomor_kuesioner  = $conn->real_escape_string($post->nomor_kuesioner);
  $proses           = $conn->query("SELECT nomor_kuesioner, grup, pertanyaan FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' ");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[] = null;
  }
  echo json_encode($outpArr);
}


if($type == 'jawaban')
{
  $post             = json_decode(file_get_contents("php://input"));
  $bagian           = $conn->real_escape_string($post->bagian);
  $grup             = $conn->real_escape_string($post->grup);
  $nomor_kuesioner  = $conn->real_escape_string($post->nomor_kuesioner);
  if ($bagian == 'enum') {
    $tbl = 'tbl_jwb_en_'.$grup;
  } elseif ($bagian == 'data') {
    $tbl = 'tbl_jwb_ed_'.$grup;
  } else {
    $tbl = 'tbl_jwb_gb_'.$grup;
  }
  $query            = "SELECT * FROM $tbl WHERE nomor_kuesioner = '$nomor_kuesioner'";
  $run              = $conn->query($query);
  if ($run->num_rows != NULL) {
     $outp = $run->fetch_object();
  } else {
    $outp=null;
  }
  echo json_encode($outp);
}


if($type == 'ubahJawaban')
{
  $post             = json_decode(file_get_contents("php://input"));
  $grup             = $conn->real_escape_string($post->grup);
  $nomor_kuesioner  = $conn->real_escape_string($post->nomor_kuesioner);
  $pertanyaan       = $conn->real_escape_string($post->pertanyaan);
  $jawaban          = $conn->real_escape_string($post->jawaban);
  $query            = "UPDATE tbl_jwb_gb_$grup SET $pertanyaan = '$jawaban' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
  $query            .= "DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' AND grup = '$grup' AND pertanyaan = '$pertanyaan'; ";
  $run              = $conn->multi_query($query);
  if (!$run) {

    $outp .= '{"status":"error",';
    $outp .= '"valid_gb":"unvalid",';
    $outp .= '"keterangan":"Gagal Mengubah Jawaban"}';

  } else {

    do {
      $conn->use_result();
    } while ($conn->next_result());

    $proses = $conn->query("SELECT nomor_kuesioner FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'");
    if ($proses->num_rows == NULL) {
      $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'");
      $valid = "valid";
    } else {
      $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '1' WHERE nomor_kuesioner = '$nomor_kuesioner'");
      $valid = "unvalid";
    }

    $outp .= '{"status":"success",';
    $outp .= '"valid_gb":"'.$valid.'",';
    $outp .= '"keterangan":"Berhasil Mengubah Jawaban"}';

  }
  echo $outp;
}

?>
