<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));



if($type == 'dataBackup')
{
  $proses = $conn->query("SELECT * FROM tbl_backup");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}

if($type == 'backupTable')
{
  $post   = json_decode(file_get_contents("php://input"));
  $table  = isset($post->table) ? $post->table : '';
  $proses = $conn->query("SELECT * FROM $table");
  if ($proses->num_rows > 0) {
    while($rs = $proses->fetch_object()) {
        $outpArr[] = $rs;
    }
  } else {
    $outpArr[]=null;
  }
  echo json_encode($outpArr);
}



if($type == 'deleteBackup')
{
  $post   = json_decode(file_get_contents("php://input"));
  $file   = isset($post->file) ? $post->file : '';
  if (file_exists('../backup/'.$file)) {
    if (unlink("../backup/".$file)) {
      $conn->query("DELETE FROM tbl_backup WHERE file = '$file'");
      $outp .= '{"status":"success",';
      $outp .= '"keterangan":"Berhasil Menghapus File"}';
    } else {
      $outp .= '{"status":"error",';
      $outp .= '"keterangan":"Gagal Manghapus Foto"}';
    }
  } else {
    $conn->query("DELETE FROM tbl_backup WHERE file = '$file'");
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menghapus File"}';
  }
  echo $outp;
}



if($type == 'backup')
{
  backup_tables($conn,$outp);
}




















/* backup database */
function backup_tables($conn,$outp)
{
  $return = '';
  $tables = '*';
	//dapatkan semua nama tabel
	if($tables == '*')
	{
		$tables = array();
		$result = $conn->query('SHOW TABLES');
		while($row = $result->fetch_row())
		{
			$tables[] = $row[0];
		}
	}
	else
	{
		$tables = is_array($tables) ? $tables : explode(',',$tables);
	}
	// looping hasil tabel
	foreach($tables as $table)
	{
		$result = $conn->query('SELECT * FROM '.$table);
		$num_fields = $result->field_count;
		// $return .= 'DROP TABLE '.$table.';'; // dihapus dahulu atau tidak, jika pakai ini, berarti sudah ada tabel di database, jika tidak pakai database harus kosong / tidak ada tabel
		$row2 = $conn->query('SHOW CREATE TABLE '.$table)->fetch_row();
		$return.= "\n\n".$row2[1].";\n\n";

    $return.= 'INSERT INTO '.$table.' VALUES ';
    $return.="\n";
		for ($i = 0; $i < $num_fields; $i++)
		{
			while($row = $result->fetch_row())
			{
				$return.= "(";
				for($j=0; $j < $num_fields; $j++)
				{
					$row[$j] = addslashes($row[$j]);
					$row[$j] = ereg_replace("\n","\\n",$row[$j]);
					if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
					if ($j < ($num_fields-1)) { $return.= ','; }
				}
				$return.= "),\n";
			}
		}
    $return = substr($return, 0, -2);
    $return.= ";\n\n\n\n";
	}
	//simpan file
  $namafile = 'db-backup-'.time().'.sql';
	$handle = fopen('../backup/'.$namafile,'w+');
	fwrite($handle,$return);
	fclose($handle);

  $query    = "INSERT INTO tbl_backup VALUES ('$namafile', NOW())";
  $runQuery = $conn->query($query);

  if ($runQuery) {
    $outp .= '{"status":"success",';
    $outp .= '"file":"'.$namafile.'",';
    $outp .= '"keterangan":"Berhasil Backup Database"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Backup Database"}';
  }
  echo $outp;
}
?>
