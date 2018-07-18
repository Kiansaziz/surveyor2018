<?php
require('connection.php');
require_once('vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
if (!isset($_GET['type'])) { header('Location: ../'); }
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'profile')
{
  $data   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($data->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id         = $DecodedDataArray->data->id;
     $proses     = $conn->query("SELECT tbl_user.*, (tbl_level.nama_level) AS nama_level FROM tbl_user INNER JOIN tbl_level ON tbl_user.level=tbl_level.id WHERE tbl_user.id = '$id'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $data = $rs;
       }
     } else {
       $data=null;
     }
  } catch (Exception $e) {
    $data=null;
  }
  echo json_encode($data);
}

if ($type == 'updateProfile') {
  $data           = json_decode(file_get_contents("php://input"));
  $id             = $conn->real_escape_string($data->id);
  $nama           = $conn->real_escape_string(isset($data->nama) ? $data->nama : '');
  $no_telp        = $conn->real_escape_string(isset($data->no_telp) ? $data->no_telp : '');
  $email          = $conn->real_escape_string(isset($data->email) ? $data->email : '');
  $username       = $conn->real_escape_string($data->username);
  $password       = $conn->real_escape_string($data->passwordNew);
  $password       = sha1(sha1($password));
  $cek            = $conn->query("SELECT * FROM tbl_user WHERE username = '$username' AND password = '$password' AND id != '$id'");
  if ($cek->num_rows != NULL) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Maaf, Data dengan username atau password Tersebut sudah ada, mohon ganti username atau password untuk keamanan"}';
    echo $outp;
    exit();
  }
  $query = "UPDATE tbl_user SET nama = '$nama', no_telp = '$no_telp', email = '$email', username = '$username', password = '$password', date_update = NOW() WHERE id = '$id'";
  $res = $conn->query($query);
  if ($res) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Mengubah Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Mengubah Data"}';
  }
  echo $outp;
}








if($type == 'level')
{
  $proses = $conn->query("SELECT * FROM tbl_level");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}


if($type == 'dataProvinsi')
{
   $proses     = $conn->query("SELECT * FROM tbl_prov");
   if ($proses->num_rows > 0) {
     while($rs = $proses->fetch_object()) {
         $outpArr[] = $rs;
     }
   } else {
     $outpArr[]=null;
   }
   echo json_encode($outpArr);
}

if($type == 'dataKabupaten')
{
  $proses     = $conn->query("SELECT tbl_kab.*, tbl_prov.provinsi FROM tbl_kab LEFT JOIN tbl_prov ON tbl_kab.id_prov=tbl_prov.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'dataKecamatan')
{
  $proses     = $conn->query("SELECT tbl_kec.*, tbl_kab.kabupaten FROM tbl_kec LEFT JOIN tbl_kab ON tbl_kec.id_kab=tbl_kab.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'dataKelurahan')
{
  $proses     = $conn->query("SELECT tbl_kel.*, tbl_kec.kecamatan FROM tbl_kel LEFT JOIN tbl_kec ON tbl_kel.id_kec=tbl_kec.id");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}


if($type == 'images')
{
  $log_directory = '../assets/files';
  foreach(glob($log_directory.'/*.*') as $key=>$file) {
    $outpArr[] = substr($file, 16, -4);
  }
  echo json_encode($outpArr);
}

?>
