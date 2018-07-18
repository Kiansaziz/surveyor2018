<?php
$conn = new mysqli('localhost','root','','survey18');
if ($conn->connect_error) {
  printf("Gagal Koneksi: %s\n", mysqli_connect_error());
  exit();
}


// AUTH
$tokenId    = base64_encode(32);
$issuedAt   = time();
$notBefore  = $issuedAt + 0;
$expire     = $notBefore + 7200;
$serverName = 'http://survey-index-tppu-pt18.id/';

// SETTING GLOBAL VARIABLE
$nowshort   = date('Y-m-d');
$nowfull    = date('Y-m-d H:i:s');
$outpArr    = [];
$outp       = "";
?>
