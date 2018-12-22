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
