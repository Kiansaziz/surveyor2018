<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));





if($type == 'dataUser')
{
  $proses = $conn->query("SELECT tbl_user.*, (tbl_level.nama_level) AS nama_level FROM tbl_user INNER JOIN tbl_level ON tbl_user.level=tbl_level.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}


if ($type == 'insert') {
  $post     = json_decode(file_get_contents("php://input"));
  $level    = $conn->real_escape_string(isset($post->level) ? $post->level : '');
  $nama     = $conn->real_escape_string(isset($post->nama) ? $post->nama : '');
  $no_telp  = $conn->real_escape_string(isset($post->no_telp) ? $post->no_telp : '');
  $email    = $conn->real_escape_string(isset($post->email) ? $post->email : '');
  $username = $conn->real_escape_string(isset($post->username) ? $post->username : '');
  $password = $conn->real_escape_string(isset($post->password) ? $post->password : '');
  $password = sha1(sha1($password));
  $id_prov  = $conn->real_escape_string(isset($post->id_prov) ? $post->id_prov : '');
  $kornass      = isset($post->kornas) ? $post->kornas : '';
  $kornas       = implode(',',$kornass);
  $korwils      = isset($post->korwil) ? $post->korwil : '';
  $korwil       = implode(',',$korwils);
  $cek              = $conn->query("SELECT * FROM tbl_user WHERE username = '$username' AND password = '$password'");
  if ($cek->num_rows != NULL) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"User Dengan Username Dan Password Tersebut Sudah Ada, Mohon Ganti Demi Keamanan"}';
    echo $outp;
    exit();
  }

  $query    = "INSERT INTO tbl_user VALUES ('', '$nama', '$no_telp', '$email', '$level', '$kornas', '$id_prov', '$korwil', '$username', '$password', '', NOW(), '')";
  $runQuery = $conn->query($query);

  if ($runQuery) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memasukan Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memasukan Data"}';
  }
  echo $outp;
}





if($type == 'dataUserDetail')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $conn->real_escape_string($post->id);
  $proses = $conn->query("SELECT tbl_user.*, (tbl_level.nama_level) AS nama_level FROM tbl_user INNER JOIN tbl_level ON tbl_user.level=tbl_level.id WHERE tbl_user.id='$id'");
  if ($proses->num_rows > 0) {
    $outp = $proses->fetch_object();
  } else {
    $outp=null;
  }
  echo json_encode($outp);
}



if ($type == 'update') {
  $post     = json_decode(file_get_contents("php://input"));
  $id       = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $nama     = $conn->real_escape_string(isset($post->nama) ? $post->nama : '');
  $no_telp  = $conn->real_escape_string(isset($post->no_telp) ? $post->no_telp : '');
  $email    = $conn->real_escape_string(isset($post->email) ? $post->email : '');
  $username = $conn->real_escape_string(isset($post->username) ? $post->username : '');
  $password = $conn->real_escape_string(isset($post->passwordNew) ? $post->passwordNew : '');
  $password = sha1(sha1($password));
  $id_prov  = $conn->real_escape_string(isset($post->id_prov) ? $post->id_prov : '');
  $kornass  = isset($post->kornasUpdate) ? $post->kornasUpdate : '';
  $kornas   = implode(',',$kornass);
  $korwils  = isset($post->korwilUpdate) ? $post->korwilUpdate : '';
  $korwil   = implode(',',$korwils);
  $cek      = $conn->query("SELECT * FROM tbl_user WHERE username = '$username' AND password = '$password' AND id != '$id'");
  if ($cek->num_rows != NULL) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Maaf, Data dengan username atau password Tersebut sudah ada, mohon ganti username atau password untuk keamanan"}';
    echo $outp;
    exit();
  }
  $query = "UPDATE tbl_user SET nama = '$nama', no_telp = '$no_telp', email = '$email', kornas= '$kornas', id_prov = '$id_prov', korwil = '$korwil', username = '$username', password = '$password', date_update = NOW() WHERE id = '$id'";
  $runQuery = $conn->query($query);
  if ($runQuery) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Mengubah Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Mengubah Data"}';
  }
  echo $outp;
}




if ($type == 'delete') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $query      = "DELETE FROM tbl_user WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menghapus Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menghapus Data"}';
  }
  echo $outp;
}






// KEPERLUAN KORNAS #####################################################################################################################################################################################
if($type == 'dataKornas')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $post->id_prov;
  $proses = $conn->query("SELECT * FROM tbl_prov WHERE id IN ($id)");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}
// KEPERLUAN KORNAS #####################################################################################################################################################################################

// KEPERLUAN KORWIL #####################################################################################################################################################################################
if($type == 'dataKorwil')
{
  $post   = json_decode(file_get_contents("php://input"));
  $id     = $post->id_kab;
  $proses = $conn->query("SELECT * FROM tbl_kab WHERE id IN ($id)");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}
// KEPERLUAN KORWIL #####################################################################################################################################################################################



?>
