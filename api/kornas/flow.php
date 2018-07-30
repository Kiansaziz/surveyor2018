<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'filterFlow')
{
  $outp .= '{"status":"success",';
  $outp .= '"keterangan":"ok",';
  $outp .= '"hasil":"null"}';
  echo $outp;
}


if($type == 'list1')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT COUNT(id) as value,
                                   CASE WHEN list1 = '1' THEN 'Selesai' ELSE 'Belum' END AS label
                                   FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   GROUP BY list1
                                   ");
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



if($type == 'list2')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT COUNT(id) as value,
                                   CASE WHEN list2 = '1' THEN 'Selesai' ELSE 'Belum' END AS label
                                   FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   GROUP BY list2
                                   ");
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



if($type == 'list13')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT COUNT(id) as value,
                                   CASE WHEN list13 = '1' THEN 'Selesai' ELSE 'Belum' END AS label
                                   FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   GROUP BY list13
                                   ");
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



if($type == 'list14')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT COUNT(id) as value,
                                   CASE WHEN list14 = '1' THEN 'Selesai' ELSE 'Belum' END AS label
                                   FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   GROUP BY list14
                                   ");
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



if($type == 'list15')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT COUNT(id) as value,
                                   CASE WHEN list15 = '1' THEN 'Selesai' ELSE 'Belum' END AS label
                                   FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   GROUP BY list15
                                   ");
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



if($type == 'listRes')
{
  $post     = json_decode(file_get_contents("php://input"));
  $id_prov  = isset($post->id_prov) ? $post->id_prov : '';
  $id_kab   = isset($post->id_kab) ? $post->id_kab : '';
  $id_kec   = isset($post->id_kec) ? $post->id_kec : '';
  $jwt      = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $kornas   = $DecodedDataArray->data->kornas;
     $cond     = '';
     if ($id_prov != '') { $cond   .= "AND id_prov = '$id_prov' "; }
     if ($id_kab != '') { $cond   .= "AND id_kab = '$id_kab' "; }
     if ($id_kec != '') { $cond   .= "AND id_kec = '$id_kec' "; }
     $proses = $conn->query("SELECT list3, list4, list5, list6, list7, list8, list9, list10, list11, list12 FROM tbl_user_kelurahan_list
                                   WHERE 1
                                   $cond AND id_prov IN ($kornas)
                                   ");
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



?>
