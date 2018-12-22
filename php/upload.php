<?php

//Array
//(
//    [fileToUpload] => Array
//        (
//            [name] => 2561-10-09 16_05_04-Mon Compte - Product.png
//            [type] => image/png
//            [tmp_name] => D:\xampp5680\tmp\php8176.tmp
//            [error] => 0
//            [size] => 63347
//        )
//
//)

$file_image = $_FILES['fileToUpload'];

$file_name = $file_image['name'];
$file_type = $file_image['type'];
$file_size = $file_image['size'];
$file_error = $file_image['error'];
$file_tmp_name = $file_image['tmp_name'];

$file_target = "./uploads/".$file_name;
$path_upload = "./uploads/";
$errors = array();

// set file extension
//$fileExtensions = ['jpeg','jpg','png'];
$set_extension = array('jpeg', 'jpg', 'png');

// get extension
$extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
$extension = strtolower(end(explode('.', $file_name)));

//Array
//(
//    [0] => 869
//    [1] => 709
//    [2] => 3
//    [3] => width="869" height="709"
//    [bits] => 8
//    [mime] => image/png
//)
//Get the size of an image
$getimagesize = getimagesize($file_tmp_name);
if (!$getimagesize) {
  $errors[] = "File is not an image.";
}

// If the file is larger than 500000 (500KB), an error message is displayed, 
// 2000000 = 2MB
if ($file_size > 2000000) {
  $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
}

if (!in_array($extension, $set_extension)) {
  $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
}

// check if file already exists if you want
if (file_exists($file_target)) {
  //$errors[] = "This file already exists.";
}

if (!empty($errors)) {
  foreach ($errors as $error) {
    echo $error."These are the errors"."\n";
  }
  return false;
}

$is_upload = move_uploaded_file($file_tmp_name, $file_target);
if (!$is_upload) {
  echo "An error occurred somewhere. Try again or contact the admin";
  return false;
}

//$resize = resize_image($file_target, $file_target, $file_type,200, 200);
$resize = resize_image2($file_target, 200, 200);


//resize_image($file_target, $file_tmp_name, $file_type, 500, 500);
echo '<pre>';
print_r($resize);
exit;

/**
 * Image resize
 * @param int $width
 * @param int $height
 */
function resize_image($file_target, $tmp_name, $file_type, $width, $height) {
  list($w, $h) = getimagesize($tmp_name); /* get original image x y */
  $ratio = max($width / $w, $height / $h); /* calculate new image size with ratio */
  $h = ceil($height / $ratio);
  $x = ($w - $width / $ratio) / 2;
  $w = ceil($width / $ratio);
  /* new file name */
//  $path = 'uploads/'.$width.'x'.$height.'_'.$_FILES['image']['name'];
  $path = $file_target;
  /* read binary data from image file */
  $imgString = file_get_contents($tmp_name);
  /* create image from string */
  $image = imagecreatefromstring($imgString);
  $tmp = imagecreatetruecolor($width, $height);
  imagecopyresampled($tmp, $image, 0, 0, $x, 0, $width, $height, $w, $h);
  /* Save image */
  switch ($file_type) {
    case 'image/jpeg':
      imagejpeg($tmp, $path, 100);
      break;
    case 'image/png':
      imagepng($tmp, $path, 0);
      break;
    case 'image/gif':
      imagegif($tmp, $path);
      break;
    default:
      exit;
      break;
  }
  return $path;
  /* cleanup memory */
  imagedestroy($image);
  imagedestroy($tmp);
}

function resize_image2($file_target, $w, $h, $crop = true) {
  list($width, $height, $type) = getimagesize($file_target);
  $r = $width / $height;
  if ($crop) {
    if ($width > $height) {
      $width = ceil($width - ($width * abs($r - $w / $h)));
    } else {
      $height = ceil($height - ($height * abs($r - $w / $h)));
    }
    $newwidth = $w;
    $newheight = $h;
  } else {
    if ($w / $h > $r) {
      $newwidth = $h * $r;
      $newheight = $h;
    } else {
      $newheight = $w / $r;
      $newwidth = $w;
    }
  }
  // Load the image
  switch ($type) {
    case IMAGETYPE_JPEG:
      $src_img = imagecreatefromjpeg($file_target);
      break;
    case IMAGETYPE_GIF:
      $src_img = imagecreatefromgif($file_target);
      break;
    case IMAGETYPE_PNG:
      $src_img = imagecreatefrompng($file_target);
      break;
    default:
      die('Error loading '.$file_target.' - File type '.$type.' not supported');
  }
  // $src = imagecreatefromjpeg($file);
  //$src = imagecreatefrompng($file_target);
  $dst_img = imagecreatetruecolor($newwidth, $newheight);
  imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
  // Save the new image over the top of the original photo
  switch ($type) {
    case IMAGETYPE_JPEG:
      imagejpeg($dst_img, $file_target, 100);
      break;
    case IMAGETYPE_GIF:
      imagegif($dst_img, $file_target);
      break;
    case IMAGETYPE_PNG:
      imagepng($dst_img, $file_target);
      break;
    default:
      die('Error saving image: '.$file_target);
  }
//  imagepng($dst, $file_target);
//  return $dst;
}

?>