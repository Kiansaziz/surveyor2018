<?php
require('../connection.php');
$type      = $conn->real_escape_string(htmlentities($_GET['type']));

if($type == 'dataFailed')
{
   $proses     = $conn->query("SELECT * FROM tbl_login_failed");
   if ($proses->num_rows > 0) {
     while($rs = $proses->fetch_object()) {
         $outpArr[] = $rs;
     }
   } else {
     $outpArr[] = null;
   }
  echo json_encode($outpArr);
}

if ($type == 'delete') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $query      = "DELETE FROM tbl_login_failed WHERE id = '$id'";
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
