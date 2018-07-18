<?php
set_time_limit(0);
require('../connection.php');
$type  = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'tambahkanIdProv')
{
  $proses     = $conn->query("SELECT * FROM tbl_kuesioner_base");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_assoc()) {
      $id_prov = substr($rs['nomor_kuesioner'], 0,2);
      $conn->query("UPDATE tbl_kuesioner_base SET id_prov = '$id_prov' WHERE nomor_kuesioner = '$rs[nomor_kuesioner]'");
    }
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memasukan ID Provinsi"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memanggil data Data"}';
  }
  echo $outp;
}




if($type == 'tambahkanIdKab')
{
  $proses     = $conn->query("SELECT * FROM tbl_kuesioner_base");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_assoc()) {
      $id_prov      = $rs['id_prov'];
      $kode_kab     = substr($rs['nomor_kuesioner'], 2,2);
      $id_kab       = $conn->query("SELECT * FROM tbl_kab WHERE id_prov = '$id_prov' AND kode = '$kode_kab'")->fetch_assoc();
      $conn->query("UPDATE tbl_kuesioner_base SET id_kab = '$id_kab[id]' WHERE nomor_kuesioner = '$rs[nomor_kuesioner]'");
    }
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memasukan ID Kabupaten"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memanggil Data"}';
  }
  echo $outp;
}



if($type == 'tambahkanIdKec')
{
  $proses     = $conn->query("SELECT * FROM tbl_kuesioner_base");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_assoc()) {
      $id_kab       = $rs['id_kab'];
      $kode_kec     = substr($rs['nomor_kuesioner'], 4,3);
      $id_kec       = $conn->query("SELECT * FROM tbl_kec WHERE id_kab = '$id_kab' AND kode = '$kode_kec'")->fetch_assoc();
      $conn->query("UPDATE tbl_kuesioner_base SET id_kec = '$id_kec[id]' WHERE nomor_kuesioner = '$rs[nomor_kuesioner]'");
    }
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memasukan ID Kecamatan"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memanggil Data"}';
  }
  echo $outp;
}


if($type == 'tambahkanIdKel')
{
  $proses     = $conn->query("SELECT * FROM tbl_kuesioner_base");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_assoc()) {
      $id_kec       = $rs['id_kec'];
      $kode_kel     = substr($rs['nomor_kuesioner'], 7,3);
      $id_kel       = $conn->query("SELECT * FROM tbl_kel WHERE id_kec = '$id_kec' AND kode = '$kode_kel'")->fetch_assoc();
      $conn->query("UPDATE tbl_kuesioner_base SET id_kel = '$id_kel[id]' WHERE nomor_kuesioner = '$rs[nomor_kuesioner]'");
    }
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memasukan ID Kelurahan"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memanggil Data"}';
  }
  echo $outp;
}


if($type == 'kosongkan')
{
  $proses     = $conn->query("DELETE FROM tbl_kuesioner");
  if ($proses) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Mengosongkan Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Mengosongkan Data"}';
  }
  echo $outp;
}


if($type == 'pindahkan')
{
  $proses     = $conn->query("SELECT * FROM tbl_kuesioner_base");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_assoc()) {
      $enkripEnumerator = sha1(sha1($rs['token_enumerator']));
      $enkripDataEntry  = sha1(sha1($rs['token_data_entry']));
      $conn->query("INSERT INTO tbl_kuesioner VALUES ('$rs[nomor_kuesioner]', '$enkripEnumerator', '$enkripDataEntry', '1', '1', '1', '1', '1', '$rs[id_prov]', '$rs[id_kab]', '$rs[id_kec]', '$rs[id_kel]','$rs[nama_enum]','$rs[nama_entry]')");
    }
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Memindahkan Seluruh Data Ke Tabel Kuesioner"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memanggil Data"}';
  }
  echo $outp;
}

?>
