<?php

/*
  include_once 'BaseImage.php';
  $path_upload = "./uploads";
  $file_name = "category";
  $file_target = sprintf("%s/%s.png", $path_upload, $file_name);

  $base = new BaseImage();
  $return = $base->setImage($_FILES['category'], $file_target);

  if ($return['status'] == 'S') {
  $base->resizeImage($file_target, 64, 64);
  }

  return realpath($file_target);
 */



/*
  include_once 'BaseImage.php';
  $path_upload = "./uploads";
  $file_name = "product";
  $file_target = sprintf("%s/%s.png", $path_upload, $file_name);

  $base = new BaseImage();
  $return = $base->setImage($_FILES['category'], $file_target);

  $file_default = realpath($file_target);
  $file_size = array();

  foreach (array('64x64', '250x250', '800x800') as $size) {
  $dimension = explode('x', $size);
  $weight = $dimension[0];
  $height = $dimension[1];
  // prefix, id, sequence, size, ext
  $file_name = sprintf("%s_%s_%s_%s.png", 'prefix', '1', '1', $size);
  $src = $file_target;
  $dst = sprintf("%s/%s", $path_upload, $file_name);

  $base->resizeImage(array($src, $dst), $weight, $height);
  $file_size[] = realpath($dst);
  }
  echo '<pre>'; print_r($file_size); exit;
 */

//echo '<pre>';
//print_r($_FILES);
//exit;

$data = array();

function set_debug($data) {
  echo '<pre>';
  print_r($data);
  exit;
}

$count = count($_FILES['combination']['name']);
for ($i = 0; $i < $count; $i++) {
  //image($i, $_FILES['combination']['name'][$i], $_FILES['combination']['type'][$i], $_FILES['combination']['tmp_name'][$i], $_FILES['combination']['error'][$i], $_FILES['combination']['size'][$i]);


  $data[$i]['name'] = $_FILES['combination']['name'][$i];
  $data[$i]['type'] = $_FILES['combination']['type'][$i];
  $data[$i]['tmp_name'] = $_FILES['combination']['tmp_name'][$i];
  $data[$i]['error'] = $_FILES['combination']['error'][$i];
  $data[$i]['size'] = $_FILES['combination']['size'][$i];
}

//function image($i, $name, $type, $tmp_name, $error, $size) {
//  $data[$i]['name'] = $name;
//  $data[$i]['type'] = $type;
//  $data[$i]['tmp_name'] = $tmp_name;
//  $data[$i]['error'] = $error;
//  $data[$i]['size'] = $size;
//}




include_once 'BaseImage.php';
$base = new BaseImage();

$path_upload = "./uploads";
$file_name = "product";
$file_target = sprintf("%s/%s.png", $path_upload, $file_name);


set_debug($data);

foreach ($data as $d) {
  $image = array();
  if (isset($d['name']['image_1']) && !empty($d['name']['image_1'])) {
    $image['name'] = $d['name']['image_1'];
    $image['type'] = $d['type']['image_1'];
    $image['tmp_name'] = $d['tmp_name']['image_1'];
    $image['error'] = $d['error']['image_1'];
    $image['size'] = $d['size']['image_1'];
    $return = $base->setImage($image, $file_target);
  }

  $image = array();
  if (isset($d['name']['image_2']) && !empty($d['name']['image_2'])) {
    $image['name'] = $d['name']['image_2'];
    $image['type'] = $d['type']['image_2'];
    $image['tmp_name'] = $d['tmp_name']['image_2'];
    $image['error'] = $d['error']['image_2'];
    $image['size'] = $d['size']['image_2'];
    $return = $base->setImage($image, $file_target);
  }

  $image = array();
  if (isset($d['name']['image_3']) && !empty($d['name']['image_3'])) {
    $image['name'] = $d['name']['image_3'];
    $image['type'] = $d['type']['image_3'];
    $image['tmp_name'] = $d['tmp_name']['image_3'];
    $image['error'] = $d['error']['image_3'];
    $image['size'] = $d['size']['image_3'];
    $return = $base->setImage($image, $file_target);
  }

  $image = array();
  if (isset($d['name']['image_4']) && !empty($d['name']['image_4'])) {
    $image['name'] = $d['name']['image_4'];
    $image['type'] = $d['type']['image_4'];
    $image['tmp_name'] = $d['tmp_name']['image_4'];
    $image['error'] = $d['error']['image_4'];
    $image['size'] = $d['size']['image_4'];
    $return = $base->setImage($image, $file_target);
  }
}




