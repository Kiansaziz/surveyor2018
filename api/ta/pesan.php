<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));



if($type == 'dataMainPesanKhusus')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id       = $DecodedDataArray->data->id;
     $proses   = $conn->query("SELECT tbl_pesan_khusus.*, (tbl_user.nama) as dari FROM tbl_pesan_khusus INNER JOIN tbl_user ON tbl_pesan_khusus.dari=tbl_user.id WHERE tbl_pesan_khusus.kepada = '$id'");
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

if ($type == 'responsePesanKhusus') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $query      = "UPDATE tbl_pesan_khusus SET response = '1' WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Membaca Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Membaca Data"}';
  }
  echo $outp;
}




if($type == 'dataMainPesanBroadcast')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $level    = $DecodedDataArray->data->level;
     $proses   = $conn->query("SELECT tbl_pesan_broadcast.*, (tbl_user.nama) as dari FROM tbl_pesan_broadcast
                                INNER JOIN tbl_user ON tbl_pesan_broadcast.dari=tbl_user.id WHERE tbl_pesan_broadcast.kepada LIKE '%$level%'
                                AND tbl_pesan_broadcast.mulai <= '$nowshort' AND tbl_pesan_broadcast.selesai >= '$nowshort'");
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




if($type == 'dataPesanKhusus')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id       = $DecodedDataArray->data->id;
     $proses = $conn->query("SELECT tbl_pesan_khusus.*, (tbl_user.nama) AS pengirim FROM tbl_pesan_khusus INNER JOIN tbl_user ON tbl_pesan_khusus.dari=tbl_user.id WHERE tbl_pesan_khusus.dari = '$id' OR tbl_pesan_khusus.kepada='$id'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
         $queryPenerima = $conn->query("SELECT nama FROM tbl_user WHERE id = '$rs->kepada'")->fetch_array();
         $rs->penerima = $queryPenerima['nama'];
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


if($type == 'dataPesanBroadcast')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id       = $DecodedDataArray->data->id;
     $proses = $conn->query("SELECT * FROM tbl_pesan_broadcast WHERE dari = '$id'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
         if ($rs->kepada != '') {
           $queryPenerima = $conn->query("SELECT nama_level FROM tbl_level WHERE id IN ($rs->kepada)");
           while ($rspenerima = $queryPenerima->fetch_object()) {
             $rs->penerima[] = $rspenerima;
           }
         } else {
           $rs->penerima[] = null;
         }
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



if($type == 'insertPesanKhusus')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  $kepada = $conn->real_escape_string(isset($post->kepada) ? $post->kepada : '');
  $isi    = $conn->real_escape_string(isset($post->isi) ? $post->isi : '');
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $dari     = $DecodedDataArray->data->id;
     $query    = "INSERT INTO tbl_pesan_khusus VALUES ('', '$dari', '$kepada', '$isi', '0', NOW())";
     $runQuery = $conn->query($query);

     if ($runQuery) {
       $outp .= '{"status":"success",';
       $outp .= '"keterangan":"Berhasil Memasukan Data"}';
     } else {
       $outp .= '{"status":"error",';
       $outp .= '"keterangan":"Gagal Memasukan Data"}';
     }

  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memproses Data"}';
  }
  echo $outp;
}


if($type == 'insertPesanBroadcast')
{
  $post     = json_decode(file_get_contents("php://input"));
  $jwt      = $conn->real_escape_string($post->token);
  $kepadas  = isset($post->broadTo) ? $post->broadTo : '';
  $kepada   = implode(',',$kepadas);
  $isi      = $conn->real_escape_string(isset($post->isi) ? $post->isi : '');
  $mulai    = $conn->real_escape_string(isset($post->mulai) ? $post->mulai : '');
  $selesai  = $conn->real_escape_string(isset($post->selesai) ? $post->selesai : '');
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $dari     = $DecodedDataArray->data->id;
     $query    = "INSERT INTO tbl_pesan_broadcast VALUES ('', '$dari', '$kepada', '0', '0', '$isi', '$mulai', '$selesai', NOW())";
     $runQuery = $conn->query($query);

     if ($runQuery) {
       $outp .= '{"status":"success",';
       $outp .= '"keterangan":"Berhasil Memasukan Data"}';
     } else {
       $outp .= '{"status":"error",';
       $outp .= '"keterangan":"Gagal Memasukan Data"}';
     }

  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memproses Data"}';
  }
  echo $outp;
}


if ($type == 'delete') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $tabel       = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $query      = "DELETE FROM $tabel WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menghapus Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menghapus Data"}';
  }
  echo $outp;
}


?>
