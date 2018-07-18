<?php
require('connection.php');
require_once('vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey  = base64_decode(SECRET_KEY);

if (!isset($_GET['type'])) { header('Location: ../'); }
$type       = $conn->real_escape_string(htmlentities($_GET['type']));


function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    if(filter_var($client, FILTER_VALIDATE_IP)) { $ip = $client; }
    elseif(filter_var($forward, FILTER_VALIDATE_IP)) { $ip = $forward; }
    else { $ip = $remote; }
    return $ip;
}
$ip = getUserIP();



if($type == 'signin')
{
  $post     = json_decode(file_get_contents("php://input"));
  $username = $conn->real_escape_string($post->username);
  $passwordNonEnkrip = $post->password;
  $password = $conn->real_escape_string(sha1(sha1($post->password)));


  $prosesUser   = $conn->query("SELECT tbl_user.*, (tbl_level.nama_level) AS nama_level FROM tbl_user INNER JOIN tbl_level ON tbl_user.level=tbl_level.id WHERE tbl_user.username = '$username' AND tbl_user.password = '$password'");
  if ($prosesUser->num_rows != NULL){
    $row        = $prosesUser->fetch_assoc();
    $data       = [
                    'iat'  => $issuedAt,
                    'jti'  => $tokenId,
                    'iss'  => $serverName,
                    'data' => [
                          'id'    => $row['id'],
                          'level' => $row['level'],
                          'nama_level' => $row['nama_level'],
                          'kornas'     => $row['kornas'],
                          'id_prov'    => $row['id_prov'],
                          'korwil'     => $row['korwil'],
                    ]
    ];
    $jwt = JWT::encode(
      $data,
      $secretKey,
      ALGORITHM
    );
    $unencodedArray = ['token' => $jwt];
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Login, Mengalihkan Halaman ...",';
    $outp .= '"level":"' . $row['level'] . '",';
    $outp .= '"token":"'. $jwt . '"}';
    echo $outp;
    exit();
  }



  $prosesEnum   = $conn->query("SELECT tbl_kuesioner.*,
                                tbl_prov.provinsi,
                                tbl_kab.kabupaten,
                                tbl_kec.kecamatan,
                                tbl_kel.kelurahan
                                FROM tbl_kuesioner
                                LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov=tbl_prov.id
                                LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id
                                LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec=tbl_kec.id
                                LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel=tbl_kel.id
                                WHERE tbl_kuesioner.nomor_kuesioner = '$username'
                                AND tbl_kuesioner.token_enumerator = '$password'");
  if ($prosesEnum->num_rows != NULL){
    $row        = $prosesEnum->fetch_assoc();
    if ($row['valid_enumerator'] == '0') {
      $outp .= '{"status":"error",';
      $outp .= '"keterangan":"Data Kuesioner '.$username.' Sudah Tidak Bisa Log-in ..."}';
      echo $outp;
      exit();
    }
    $data       = [
                    'iat'  => $issuedAt,
                    'jti'  => $tokenId,
                    'iss'  => $serverName,
                    'data' => [
                          'nomor_kuesioner'    => $row['nomor_kuesioner'],
                          'level'       => '7',
                          'bagian'      => 'Enumerator',
                          'nama'        => $row['nama_enum'],
                          'provinsi'    => $row['provinsi'],
                          'kabupaten'   => $row['kabupaten'],
                          'kecamatan'   => $row['kecamatan'],
                          'kelurahan'   => $row['kelurahan'],
                          'tbl_ab'      => 'tbl_jwb_en_ab',
                          'tbl_c'       => 'tbl_jwb_en_c',
                          'tbl_d'       => 'tbl_jwb_en_d',
                          'tbl_e'       => 'tbl_jwb_en_e',
                          'tbl_f'       => 'tbl_jwb_en_f',
                          'tbl_g'       => 'tbl_jwb_en_g',
                          'tbl_h'       => 'tbl_jwb_en_h',
                          'tbl_i'       => 'tbl_jwb_en_i',
                          'tbl_j'       => 'tbl_jwb_en_j',
                          'tbl_k'       => 'tbl_jwb_en_k',
                          'tbl_l'       => 'tbl_jwb_en_l',
                          'tbl_m'       => 'tbl_jwb_en_m',
                          'tbl_n'       => 'tbl_jwb_en_n',
                          'valid'       => 'valid_enumerator',
                    ]
    ];
    $jwt = JWT::encode(
      $data,
      $secretKey,
      ALGORITHM
    );
    $unencodedArray = ['token' => $jwt];
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Login, Mengalihkan Halaman ...",';
    $outp .= '"level":"7",';
    $outp .= '"token":"'. $jwt . '"}';
    echo $outp;
    exit();
  }

  $prosesData   = $conn->query("SELECT tbl_kuesioner.*,
                                tbl_prov.provinsi,
                                tbl_kab.kabupaten,
                                tbl_kec.kecamatan,
                                tbl_kel.kelurahan
                                FROM tbl_kuesioner
                                LEFT JOIN tbl_prov ON tbl_kuesioner.id_prov=tbl_prov.id
                                LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id
                                LEFT JOIN tbl_kec ON tbl_kuesioner.id_kec=tbl_kec.id
                                LEFT JOIN tbl_kel ON tbl_kuesioner.id_kel=tbl_kel.id
                                WHERE tbl_kuesioner.nomor_kuesioner = '$username'
                                AND tbl_kuesioner.token_data_entry = '$password'");
  if ($prosesData->num_rows != NULL){
    $row        = $prosesData->fetch_assoc();
    if ($row['valid_data_entry'] == '0') {
      $outp .= '{"status":"error",';
      $outp .= '"keterangan":"Data Kuesioner '.$username.' Sudah Tidak Bisa Log-in ..."}';
      echo $outp;
      exit();
    }
    if ($row['valid_enumerator'] == '1') {
      $outp .= '{"status":"error",';
      $outp .= '"keterangan":"Data Kuesioner '.$username.' Bagian Enumerator Belum Selesai ..."}';
      echo $outp;
      exit();
    }
    $data       = [
                    'iat'  => $issuedAt,
                    'jti'  => $tokenId,
                    'iss'  => $serverName,
                    'data' => [
                          'nomor_kuesioner'    => $row['nomor_kuesioner'],
                          'level'       => '8',
                          'bagian'      => 'Data Entry',
                          'nama'        => $row['nama_entry'],
                          'provinsi'    => $row['provinsi'],
                          'kabupaten'   => $row['kabupaten'],
                          'kecamatan'   => $row['kecamatan'],
                          'kelurahan'   => $row['kelurahan'],
                          'tbl_ab'      => 'tbl_jwb_ed_ab',
                          'tbl_c'       => 'tbl_jwb_ed_c',
                          'tbl_d'       => 'tbl_jwb_ed_d',
                          'tbl_e'       => 'tbl_jwb_ed_e',
                          'tbl_f'       => 'tbl_jwb_ed_f',
                          'tbl_g'       => 'tbl_jwb_ed_g',
                          'tbl_h'       => 'tbl_jwb_ed_h',
                          'tbl_i'       => 'tbl_jwb_ed_i',
                          'tbl_j'       => 'tbl_jwb_ed_j',
                          'tbl_k'       => 'tbl_jwb_ed_k',
                          'tbl_l'       => 'tbl_jwb_ed_l',
                          'tbl_m'       => 'tbl_jwb_ed_m',
                          'tbl_n'       => 'tbl_jwb_ed_n',
                          'valid'       => 'valid_data_entry',
                    ]
    ];
    $jwt = JWT::encode(
      $data,
      $secretKey,
      ALGORITHM
    );
    $unencodedArray = ['token' => $jwt];
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Login, Mengalihkan Halaman ...",';
    $outp .= '"level":"8",';
    $outp .= '"token":"'. $jwt . '"}';
    echo $outp;
    exit();
  }


  $prosesUserKelurahan   = $conn->query("SELECT tbl_user_kelurahan.*,
                                tbl_prov.provinsi,
                                tbl_kab.kabupaten,
                                tbl_kec.kecamatan,
                                tbl_kel.kelurahan
                                FROM tbl_user_kelurahan
                                LEFT JOIN tbl_prov ON tbl_user_kelurahan.id_prov=tbl_prov.id
                                LEFT JOIN tbl_kab ON tbl_user_kelurahan.id_kab=tbl_kab.id
                                LEFT JOIN tbl_kec ON tbl_user_kelurahan.id_kec=tbl_kec.id
                                LEFT JOIN tbl_kel ON tbl_user_kelurahan.id_kel=tbl_kel.id
                                WHERE tbl_user_kelurahan.id = '$username'
                                AND tbl_user_kelurahan.password = '$password'");
  if ($prosesUserKelurahan->num_rows != NULL){
    $row        = $prosesUserKelurahan->fetch_assoc();
    $data       = [
                    'iat'  => $issuedAt,
                    'jti'  => $tokenId,
                    'iss'  => $serverName,
                    'data' => [
                          'id'          => $row['id'],
                          'level'       => '9',
                          'bagian'      => 'User Kelurahan',
                          'provinsi'    => $row['provinsi'],
                          'kabupaten'   => $row['kabupaten'],
                          'kecamatan'   => $row['kecamatan'],
                          'kelurahan'   => $row['kelurahan'],
                    ]
    ];
    $jwt = JWT::encode(
      $data,
      $secretKey,
      ALGORITHM
    );
    $unencodedArray = ['token' => $jwt];
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Login, Mengalihkan Halaman ...",';
    $outp .= '"level":"9",';
    $outp .= '"token":"'. $jwt . '"}';
    echo $outp;
    exit();
  }

  $outp .= '{"status":"error",';
  $outp .= '"keterangan":"Gagal Memasukan Data Dengan Benar"}';
  echo $outp;
  $conn->query("INSERT INTO tbl_login_failed VALUES ('','$ip','$username','$passwordNonEnkrip', NOW())");
  exit();

}




if($type == 'checkAuth')
{
  $data = json_decode(file_get_contents("php://input"));
  $jwt  = $data->token;
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
    $outp .= '{"status":"authorized",';
    $outp .= '"profile":'.json_encode($DecodedDataArray).'}';
  } catch (Exception $e) {
    $outp .= '{"status":"unauthorized",';
    $outp .= '"keterangan":"Login Kembali"}';
  }
  echo $outp;
}


if($type == 'signout')
{
  $data = json_decode(file_get_contents("php://input"));
  $jwt  = $data->token;
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id         = $DecodedDataArray->data->id;
     $proses     = $conn->query("UPDATE tbl_user SET last_access = '$nowfull' WHERE id = '$id'");
  } catch (Exception $e) {

  }
}

?>
