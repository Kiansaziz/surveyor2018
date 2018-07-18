<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));



if($type == 'submit')
{
  $ket        = '';
  $post       = json_decode(file_get_contents("php://input"));
  $jawaban    = isset($post->jawaban) ? $post->jawaban : '';
  $tabel      = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $aksi       = $conn->real_escape_string(isset($post->aksi) ? $post->aksi : '');
  $grup       = $conn->real_escape_string(isset($post->grup) ? $post->grup : '');
  $jwt        = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $kolom_valid     = $DecodedDataArray->data->valid;
     $level           = $DecodedDataArray->data->level;
     $bagian          = $DecodedDataArray->data->bagian;

     // Handling Error NOMOR KUESIONER KOSONG -------------------------------------------------------------------------------------------------------------------------
     if ($nomor_kuesioner == '') {
       $outp .= '{"status":"error",';
       $outp .= '"keterangan":"Gagal Proses, Mohon Login Kembali"}';
       echo $outp;
       exit();
     }

     if ($aksi == 'insert') {

         if ($grup == 'ab'){ $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman C"; }
         if ($grup == 'c') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman D"; }
         if ($grup == 'd') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman E"; }
         if ($grup == 'e') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman F"; }
         if ($grup == 'f') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman G"; }
         if ($grup == 'g') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman H"; }
         if ($grup == 'h') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman I"; }
         if ($grup == 'i') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman J"; }
         if ($grup == 'j') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman K"; }
         if ($grup == 'k') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman L"; }
         if ($grup == 'l') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman M"; }
         if ($grup == 'm') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman N"; }
         if ($grup == 'n') { $ket = "Berhasil Memasukan Data"; }
          //  QUERY INSERT ------------------------------------------------------------------------------------------------------------------------------------------------
          foreach ($jawaban as $key => $value) {
            $cols[]     = "`".$key."`='".$value."'";
            $compares[] = "( t1.".$key." <> t2.".$key." ) AS $key";
          }
          $col             = "`nomor_kuesioner` = '$nomor_kuesioner', ";
          $col             .= implode(",", $cols);
          $compare         = implode(",", $compares);
          $query           = "INSERT INTO $tabel SET $col; ";



          // TAMBAHAN,
          // UNTUK FORM C, JIKA FORM C INPUT TIDAK, MAKA HARUS INPUT TABEL D TAPI KOSONG
          if ($level == '7' && $grup == 'c') {
            if ($jawaban->p303a == 'Tidak' && $jawaban->p303c == 'Tidak') {
              $query .= "INSERT INTO `tbl_jwb_en_d` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
            }
          }
          if ($level == '8' && $grup == 'c') {
            if ($jawaban->p303a == 'Tidak' && $jawaban->p303c == 'Tidak') {
              $query .= "INSERT INTO `tbl_jwb_ed_d` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
              $query .= "INSERT INTO `tbl_jwb_gb_d` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
              $cek_enum_c = $conn->query("SELECT nomor_kuesioner, p303a, p303c FROM tbl_jwb_en_c WHERE nomor_kuesioner = '$nomor_kuesioner'");
              $row_enum_c = $cek_enum_c->fetch_assoc();
              if ($row_enum_c['p303a'] == 'Tidak' && $row_enum_c['p303c'] == 'Ya' or $row_enum_c['p303a'] == 'Ya' && $row_enum_c['p303c'] == '' ) {
                   $query .= "INSERT INTO `tbl_jwb_beda` (id, nomor_kuesioner, grup, pertanyaan) VALUES ('','$nomor_kuesioner','d','p401'),('','$nomor_kuesioner','d','p402'),('','$nomor_kuesioner','d','p403a1'),('','$nomor_kuesioner','d','p403a2'),('','$nomor_kuesioner','d','p403a3'),('','$nomor_kuesioner','d','p403b'),('','$nomor_kuesioner','d','p403c'),('','$nomor_kuesioner','d','p403d'),('','$nomor_kuesioner','d','p403e'),('','$nomor_kuesioner','d','p403f'),('','$nomor_kuesioner','d','p403g'),('','$nomor_kuesioner','d','p403h'),('','$nomor_kuesioner','d','p403i'),('','$nomor_kuesioner','d','p403j'),('','$nomor_kuesioner','d','p403k'),('','$nomor_kuesioner','d','p403l'),('','$nomor_kuesioner','d','p403m'),('','$nomor_kuesioner','d','p404a'),('','$nomor_kuesioner','d','p404b'),('','$nomor_kuesioner','d','p404c'),('','$nomor_kuesioner','d','p404d'),('','$nomor_kuesioner','d','p404e'),('','$nomor_kuesioner','d','p405a'),('','$nomor_kuesioner','d','p405b'),('','$nomor_kuesioner','d','p405c'),('','$nomor_kuesioner','d','p405d'),('','$nomor_kuesioner','d','p405e'),('','$nomor_kuesioner','d','p405f'),('','$nomor_kuesioner','d','p405g'),('','$nomor_kuesioner','d','p405h'),('','$nomor_kuesioner','d','p405i'),('','$nomor_kuesioner','d','p405j'),('','$nomor_kuesioner','d','p405k'),('','$nomor_kuesioner','d','p405l'),('','$nomor_kuesioner','d','p405m'),('','$nomor_kuesioner','d','p405n'),('','$nomor_kuesioner','d','p405o'),('','$nomor_kuesioner','d','p405p'),('','$nomor_kuesioner','d','p405q'),('','$nomor_kuesioner','d','p405r'),('','$nomor_kuesioner','d','p405s'),('','$nomor_kuesioner','d','p405t'),('','$nomor_kuesioner','d','p405u'),('','$nomor_kuesioner','d','p405v'),('','$nomor_kuesioner','d','p405w'),('','$nomor_kuesioner','d','p405x'),('','$nomor_kuesioner','d','p405y'),('','$nomor_kuesioner','d','p406a'),('','$nomor_kuesioner','d','p406b'),('','$nomor_kuesioner','d','p406c'),('','$nomor_kuesioner','d','p406d'),('','$nomor_kuesioner','d','p406e'),('','$nomor_kuesioner','d','p406f'),('','$nomor_kuesioner','d','p406g'),('','$nomor_kuesioner','d','p406h'),('','$nomor_kuesioner','d','p406i'),('','$nomor_kuesioner','d','p406j'),('','$nomor_kuesioner','d','p406k'),('','$nomor_kuesioner','d','p406l'),('','$nomor_kuesioner','d','p406m'); ";
              }
            }
          }
          // UNTUK FORM F, JIKA FORM F INPUT TIDAK, MAKA HARUS INPUT TABEL G TAPI KOSONG
          if ($level == '7' && $grup == 'f') {
            if ($jawaban->p603a == 'Tidak' && $jawaban->p603c == 'Tidak') {
              $query .= "INSERT INTO `tbl_jwb_en_g` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
            }
          }
          if ($level == '8' && $grup == 'f') {
            if ($jawaban->p603a == 'Tidak' && $jawaban->p603c == 'Tidak') {
              $query .= "INSERT INTO `tbl_jwb_ed_g` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
              $query .= "INSERT INTO `tbl_jwb_gb_g` (nomor_kuesioner) VALUES ('$nomor_kuesioner'); ";
              $cek_enum_f = $conn->query("SELECT nomor_kuesioner, p603a, p603c FROM tbl_jwb_en_f WHERE nomor_kuesioner = '$nomor_kuesioner'");
              $row_enum_f = $cek_enum_f->fetch_assoc();
              if ($row_enum_f['p603a'] =='Tidak' && $row_enum_f['p603c'] =='Ya' or $row_enum_f['p603a'] =='Ya' && $row_enum_f['p603c'] =='') {
                $query   .= "INSERT INTO tbl_jwb_beda (id,nomor_kuesioner,grup,pertanyaan) VALUES('','$nomor_kuesioner','g','p701'),('','$nomor_kuesioner','g','p702'),('','$nomor_kuesioner','g','p703a1'),('','$nomor_kuesioner','g','p703a2'),('','$nomor_kuesioner','g','p703a3'),('','$nomor_kuesioner','g','p703c'),('','$nomor_kuesioner','g','p703b'),('','$nomor_kuesioner','g','p703d'),('','$nomor_kuesioner','g','p703e'),('','$nomor_kuesioner','g','p703f'),('','$nomor_kuesioner','g','p703g'),('','$nomor_kuesioner','g','p703h'),('','$nomor_kuesioner','g','p703i'),('','$nomor_kuesioner','g','p703j'),('','$nomor_kuesioner','g','p703k'),('','$nomor_kuesioner','g','p703l'),('','$nomor_kuesioner','g','p703m'),('','$nomor_kuesioner','g','p704a'),('','$nomor_kuesioner','g','p704b'),('','$nomor_kuesioner','g','p704c'),('','$nomor_kuesioner','g','p704d'),('','$nomor_kuesioner','g','p705a'),('','$nomor_kuesioner','g','p705b'),('','$nomor_kuesioner','g','p705c'),('','$nomor_kuesioner','g','p705d'),('','$nomor_kuesioner','g','p705e'),('','$nomor_kuesioner','g','p706a'),('','$nomor_kuesioner','g','p706b'),('','$nomor_kuesioner','g','p706c'),('','$nomor_kuesioner','g','p706d'),('','$nomor_kuesioner','g','p706e'),('','$nomor_kuesioner','g','p706f'),('','$nomor_kuesioner','g','p706g'),('','$nomor_kuesioner','g','p706h'),('','$nomor_kuesioner','g','p706i'); ";
              }
            }
          }


          // AKSI ENUMERATOR ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '7' && $grup == 'ab') {
            $query .= "INSERT INTO `tbl_jwb_ed_ab` SET $col; ";
            $query .= "INSERT INTO `tbl_jwb_gb_ab` SET $col; ";
          }
          if ($level == '7' && $grup == 'n') {
            $query .= "INSERT INTO `tbl_jwb_ed_n` SET $col; ";
            $query .= "INSERT INTO `tbl_jwb_gb_n` SET $col; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          // AKSI DATAENTRY ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '8' && $grup == 'c') {
            $query .= "INSERT INTO `tbl_jwb_gb_c` SET $col; ";
          }
          if ($level == '8' && $grup == 'd') {
            $query .= "INSERT INTO `tbl_jwb_gb_d` SET $col; ";
          }
          if ($level == '8' && $grup == 'e') {
            $query .= "INSERT INTO `tbl_jwb_gb_e` SET $col; ";
          }
          if ($level == '8' && $grup == 'f') {
            $query .= "INSERT INTO `tbl_jwb_gb_f` SET $col; ";
          }
          if ($level == '8' && $grup == 'g') {
            $query .= "INSERT INTO `tbl_jwb_gb_g` SET $col; ";
          }
          if ($level == '8' && $grup == 'h') {
            $query .= "INSERT INTO `tbl_jwb_gb_h` SET $col; ";
          }
          if ($level == '8' && $grup == 'i') {
            $query .= "INSERT INTO `tbl_jwb_gb_i` SET $col; ";
          }
          if ($level == '8' && $grup == 'j') {
            $query .= "INSERT INTO `tbl_jwb_gb_j` SET $col; ";
          }
           if ($level == '8' && $grup == 'k') {
            $query .= "INSERT INTO `tbl_jwb_gb_k` SET $col; ";
          }
          if ($level == '8' && $grup == 'l') {
            $query .= "INSERT INTO `tbl_jwb_gb_l` SET $col; ";
          }
          if ($level == '8' && $grup == 'm') {
            $query .= "INSERT INTO `tbl_jwb_gb_m` SET $col; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          // PROSES QUERY
          $run    = $conn->multi_query($query)or die(mysql_error());
          if (!$run) {
            // JIKA GAGAL ----------------------------------------------------------------------------------------------------------------------------------------------
            $outp .= '{"status":"error",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"Gagal Memasukan Data"}';
          } else {
            // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
            do {
              $conn->use_result();
            } while ($conn->next_result());
            if ($conn->errno) {
              $ket .= "Terjadi Kegagalan Sistem Kode 1212";
            }
            // Proses membandingkan jika ini dari data entry ------------------------------------------------------------------------------------------------------------
            if ($level == '8') {
              if ($conn->query("DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' AND grup = '$grup'")) {
                $i             = 0;
                $query_compare = "SELECT $compare
                                  FROM tbl_jwb_ed_$grup t1,
                                       tbl_jwb_en_$grup t2
                                  WHERE t1.nomor_kuesioner = '$nomor_kuesioner'
                                  AND t2.nomor_kuesioner = '$nomor_kuesioner'";
                $proses_compare = $conn->query($query_compare);
                $row_compare    = $proses_compare->fetch_assoc();
                $insert_beda    = "INSERT INTO tbl_jwb_beda (id,nomor_kuesioner,grup,pertanyaan) VALUES";
                                    foreach ($jawaban as $key => $value) {
                                      $i += $row_compare[$key];
                                      if( $row_compare[$key] == '1' ){ $insert_beda .= "('','$nomor_kuesioner','$grup','$key'),";  }
                                    }
                                    $insert_beda = rtrim($insert_beda,",");
                if($i != 0){
                  $simpan_beda    = $conn->query($insert_beda);
                }
              }
            }
            // Proses valid gabungan, jika di table beda kosong, maka diubah menjadi 0 -------------------------------------------------------------------------------
            if ($level == '8' && ($grup == 'm' || $grup == 'n')) {
              $query_cek_gabungan   = "SELECT * FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'";
              $proses_cek_gabungan  = $conn->query($query_cek_gabungan);
              if ($proses_cek_gabungan->num_rows == NULL) {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              } else {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '1' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              }
            }
            // Output Sukses INSERT-------------------------------------------------------------------------------------------------------------------------------------
            $outp .= '{"status":"success",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"'.$ket.'"}';
          }


     } else {


          //  QUERY UPDATE -----------------------------------------------------------------------------------------------------------------------------------------------
          foreach ($jawaban as $key => $value) {
            $cols[]     = "`".$key."`='".$value."'";
            $compares[] = "( t1.".$key." <> t2.".$key." ) AS $key";
          }
          $col             = implode(",", $cols);
          $compare         = implode(",", $compares);
          $query           = "UPDATE $tabel SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";

          // AKSI ENUMERATOR ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '7' && $grup == 'ab') {
            $query .= "UPDATE `tbl_jwb_ed_ab` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE `tbl_jwb_gb_ab` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '7' && $grup == 'n') {
            $query .= "UPDATE `tbl_jwb_ed_n` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE `tbl_jwb_gb_n` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          // AKSI DATAENTRY ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '8' && $grup == 'ab') {
            $query .= "UPDATE `tbl_jwb_gb_ab` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'c') {
            $query .= "UPDATE `tbl_jwb_gb_c` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'd') {
            $query .= "UPDATE `tbl_jwb_gb_d` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'e') {
            $query .= "UPDATE `tbl_jwb_gb_e` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'f') {
            $query .= "UPDATE `tbl_jwb_gb_f` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'g') {
            $query .= "UPDATE `tbl_jwb_gb_g` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'h') {
            $query .= "UPDATE `tbl_jwb_gb_h` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'i') {
            $query .= "UPDATE `tbl_jwb_gb_i` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'j') {
            $query .= "UPDATE `tbl_jwb_gb_i` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'k') {
            $query .= "UPDATE `tbl_jwb_gb_k` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'l') {
            $query .= "UPDATE `tbl_jwb_gb_k` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'm') {
            $query .= "UPDATE `tbl_jwb_gb_m` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'n') {
            $query .= "UPDATE `tbl_jwb_gb_n` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }

          $run    = $conn->multi_query($query)or die(mysql_error());
          if (!$run) {
            // JIKA GAGAL
            $outp .= '{"status":"error",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"Gagal Mengubah Data"}';
          } else {
            $ket = "Berhasil Mengubah Data";
            // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
            do {
              $conn->use_result();
            } while ($conn->next_result());
            if ($conn->errno) {
              $ket .= " -> Terjadi Kegagalan Sistem Kode 1212";
            }

            // Proses membandingkan jika ini dari data entry ------------------------------------------------------------------------------------------------------------
            if ($level == '8') {
              if ($conn->query("DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' AND grup = '$grup'")) {
                $i             = 0;
                $query_compare = "SELECT $compare
                                  FROM tbl_jwb_ed_$grup t1,
                                       tbl_jwb_en_$grup t2
                                  WHERE t1.nomor_kuesioner = '$nomor_kuesioner'
                                  AND t2.nomor_kuesioner = '$nomor_kuesioner'";
                $proses_compare = $conn->query($query_compare);
                $row_compare    = $proses_compare->fetch_assoc();
                $insert_beda    = "INSERT INTO tbl_jwb_beda (id,nomor_kuesioner,grup,pertanyaan) VALUES";
                                    foreach ($jawaban as $key => $value) {
                                      $i += $row_compare[$key];
                                      if( $row_compare[$key] == '1' ){ $insert_beda .= "('','$nomor_kuesioner','$grup','$key'),";  }
                                    }
                                    $insert_beda = rtrim($insert_beda,",");
                if($i != 0){
                  $simpan_beda    = $conn->query($insert_beda);
                }
              }
            }


            // Proses valid gabungan, jika di table beda kosong, maka diubah menjadi 0 -------------------------------------------------------------------------------
            if ($level == '8' && ($grup == 'm' || $grup == 'n')) {
              $query_cek_gabungan   = "SELECT * FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'";
              $proses_cek_gabungan  = $conn->query($query_cek_gabungan);
              if ($proses_cek_gabungan->num_rows == NULL) {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              } else {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '1' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              }
            }
            // Output Sukses UPDATE-------------------------------------------------------------------------------------------------------------------------------------
            $outp .= '{"status":"success",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"'.$ket.'"}';
          }

     }
  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Proses, Code : 1212"}';
  }
  echo $outp;
}

?>
