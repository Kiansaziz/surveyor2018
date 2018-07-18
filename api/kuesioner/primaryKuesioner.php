<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


// QUERY AWAL ATAU PRIMARY
if($type == 'kuesioner')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $outp = $DecodedDataArray->data;
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}




if($type == 'jawaban201')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = substr($DecodedDataArray->data->nomor_kuesioner, 0,10).''.'__';
     $query           = "SELECT `p201` FROM tbl_jwb_gb_ab WHERE nomor_kuesioner LIKE '$nomor_kuesioner'";
     $proses          = $conn->query($query);
     if ($proses->num_rows != NULL) {
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




// QUERY PER GRUP ------------------------------------------------------------------------------------------------------------------------------------------------------------
if($type == 'jawabanAB')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_ab          = $DecodedDataArray->data->tbl_ab;
     $query           = "SELECT * FROM $tbl_ab WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanC')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_c           = $DecodedDataArray->data->tbl_c;
     $query           = "SELECT * FROM $tbl_c WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanD')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_d           = $DecodedDataArray->data->tbl_d;
     $query           = "SELECT * FROM $tbl_d WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanE')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_e           = $DecodedDataArray->data->tbl_e;
     $query           = "SELECT * FROM $tbl_e WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanF')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_f           = $DecodedDataArray->data->tbl_f;
     $query           = "SELECT * FROM $tbl_f WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanG')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_g           = $DecodedDataArray->data->tbl_g;
     $query           = "SELECT * FROM $tbl_g WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanH')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_h           = $DecodedDataArray->data->tbl_h;
     $query           = "SELECT * FROM $tbl_h WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanI')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_i           = $DecodedDataArray->data->tbl_i;
     $query           = "SELECT * FROM $tbl_i WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanJ')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_j           = $DecodedDataArray->data->tbl_j;
     $query           = "SELECT * FROM $tbl_j WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanK')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_k           = $DecodedDataArray->data->tbl_k;
     $query           = "SELECT * FROM $tbl_k WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanL')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_l           = $DecodedDataArray->data->tbl_l;
     $query           = "SELECT * FROM $tbl_l WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanM')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_m           = $DecodedDataArray->data->tbl_m;
     $query           = "SELECT * FROM $tbl_m WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'jawabanN')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $tbl_n           = $DecodedDataArray->data->tbl_n;
     $query           = "SELECT * FROM $tbl_n WHERE nomor_kuesioner = '$nomor_kuesioner'";
     $run             = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}


?>
