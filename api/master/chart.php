<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'filter')
{
  $cond     = "WHERE 1 ";
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';

  if ($id_prov != '') {
    $cond   .= "AND id_prov = '$id_prov'";
    $wilayah = 'provinsi';
  }
  if ($id_kab != '') {
    $cond   .= "AND id_kab = '$id_kab'";
    $wilayah = 'kabupaten';
  }
  if ($id_kec != '') {
    $cond   .= "AND id_kec = '$id_kec'";
    $wilayah = 'kecamatan';
  }

  $proses   = $conn->query("SELECT
                            COUNT(nomor_kuesioner) jumlah,
                            SUM(CASE WHEN valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                            SUM(CASE WHEN valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                            SUM(CASE WHEN valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                            FROM tbl_kuesioner
                            $cond
                          ");
  if ($proses->num_rows > 0) {
    $rs = $proses->fetch_object();
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"ok",';
    $outp .= '"wilayah":"'.$wilayah.'",';
    $outp .= '"hasil":'. json_encode($rs) . '}';
  } else {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"nok",';
    $outp .= '"wilayah":"'.$wilayah.'",';
    $outp .= '"hasil":"null"}';
  }
  echo $outp;
}



if($type == 'capaian')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = "WHERE 1 ";
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') {  $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') {  $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $wilayah  = isset($post->wilayah) ? $post->wilayah : '';
  if ($wilayah == 'provinsi') {
    $condPengambilan   = "tbl_kab.kabupaten AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kab";
  } elseif ($wilayah == 'kabupaten') {
    $condPengambilan   = "tbl_kec.kecamatan AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kec ON tbl_kuesioner.id_kec=tbl_kec.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kec";
  } else {
    $condPengambilan   = "tbl_kel.kelurahan AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kel ON tbl_kuesioner.id_kel=tbl_kel.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kel";
  }

  $proses = $conn->query("SELECT
                        	  $condPengambilan,
                            COUNT(tbl_kuesioner.nomor_kuesioner) target,
                            SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                            SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                            SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                          FROM tbl_kuesioner
                          $condINNERJoin
                          $cond
                          $condGROUPBY
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







if($type == 'capaian_percent')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = "WHERE 1 ";
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $wilayah  = isset($post->wilayah) ? $post->wilayah : '';
  if ($wilayah == 'provinsi') {
    $condPengambilan   = "tbl_kab.kabupaten AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kab";
  } elseif ($wilayah == 'kabupaten') {
    $condPengambilan   = "tbl_kec.kecamatan AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kec ON tbl_kuesioner.id_kec=tbl_kec.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kec";
  } else {
    $condPengambilan   = "tbl_kel.kelurahan AS wilayah";
    $condINNERJoin     = "INNER JOIN tbl_kel ON tbl_kuesioner.id_kel=tbl_kel.id";
    $condGROUPBY       = "GROUP BY tbl_kuesioner.id_kel";
  }

  $proses = $conn->query("SELECT
                        	  $condPengambilan,
                            SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS enumerator,
                            SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS data_entry,
                            SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS hasil
                          FROM tbl_kuesioner
                          $condINNERJoin
                          $cond
                          $condGROUPBY
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





if($type == 'jenis_kelamin')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = '';
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                        tbl_jwb_gb_ab.p106 as label
                                        FROM tbl_jwb_gb_ab
                                        INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                        WHERE tbl_kuesioner.valid_gabungan = '0' $cond
                                        GROUP BY tbl_jwb_gb_ab.p106
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







if($type == 'profesi')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = '';
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                        tbl_jwb_gb_ab.p201 as label
                                        FROM tbl_jwb_gb_ab
                                        INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                        WHERE tbl_kuesioner.valid_gabungan = '0'
                                        $cond
                                        GROUP BY tbl_jwb_gb_ab.p201
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






if($type == 'profesi_lain')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = '';
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                        tbl_jwb_gb_ab.p201x as label
                                        FROM tbl_jwb_gb_ab
                                        INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                        WHERE tbl_kuesioner.valid_gabungan = '0'
                                        AND tbl_jwb_gb_ab.p201 = 'Profesi Lainnya'
                                        $cond
                                        GROUP BY tbl_jwb_gb_ab.p201x
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







if($type == 'usia')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = '';
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                        tbl_jwb_gb_ab.p107 as label
                                        FROM tbl_jwb_gb_ab
                                        INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                        WHERE tbl_kuesioner.valid_gabungan = '0'
                                        $cond
                                        GROUP BY tbl_jwb_gb_ab.p107
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






if($type == 'pendidikan')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $cond     = '';
  if ($id_prov != '') { $cond   .= "AND tbl_kuesioner.id_prov = '$id_prov' "; }
  if ($id_kab != '') { $cond   .= "AND tbl_kuesioner.id_kab = '$id_kab' "; }
  if ($id_kec != '') { $cond   .= "AND tbl_kuesioner.id_kec = '$id_kec' "; }

  $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_ab.nomor_kuesioner) as value,
                                        tbl_jwb_gb_ab.p108 as label
                                        FROM tbl_jwb_gb_ab
                                        INNER JOIN tbl_kuesioner ON tbl_jwb_gb_ab.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                        WHERE tbl_kuesioner.valid_gabungan = '0'
                                        $cond
                                        GROUP BY tbl_jwb_gb_ab.p108
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


?>
