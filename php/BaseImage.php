<?php

class BaseImage {

  public function setImage($file_image, $file_target) {
    $file_name = $file_image['name'];
    $file_type = $file_image['type'];
    $file_size = $file_image['size'];
    $file_error = $file_image['error'];
    $file_tmp_name = $file_image['tmp_name'];

    $errors = array();
    $set_extension = array('jpeg', 'jpg', 'png');
    $get_extension = strtolower(end(explode('.', $file_name)));

    $getimagesize = getimagesize($file_tmp_name);
    if (!$getimagesize) {
      $errors[] = "File is not an image.";
    }

    // 2000000 = 2MB
    if ($file_size > 2000000) {
      $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
    }

    if (!in_array($get_extension, $set_extension)) {
      $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
    }

    if (!empty($errors)) {
      return array('status' => 'E', 'message' => implode(" ", $errors));
    }

    $is_upload = move_uploaded_file($file_tmp_name, $file_target);
    if (!$is_upload) {
      return array('status' => 'E', 'message' => 'An error occurred somewhere. Try again or contact the admin');
    }

    return array('status' => 'S', 'message' => 'success');
  }

  public function resizeImage($file_target, $w, $h, $crop = true) {
    if (is_array($file_target)) {
      $file_src = $file_target[0];
      $file_dst = $file_target[1];
    } else {
      $file_src = $file_target;
      $file_dst = $file_target;
    }
    list($width, $height, $type) = getimagesize($file_src);
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
        $src_img = imagecreatefromjpeg($file_src);
        break;
      case IMAGETYPE_GIF:
        $src_img = imagecreatefromgif($file_src);
        break;
      case IMAGETYPE_PNG:
        $src_img = imagecreatefrompng($file_src);
        break;
      default:
        die('Error loading '.$file_src.' - File type '.$type.' not supported');
    }
    $dst_img = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
    // Save the new image over the top of the original photo
    switch ($type) {
      case IMAGETYPE_JPEG:
        imagejpeg($dst_img, $file_dst, 100);
        break;
      case IMAGETYPE_GIF:
        imagegif($dst_img, $file_dst);
        break;
      case IMAGETYPE_PNG:
        imagepng($dst_img, $file_dst);
        break;
      default:
        die('Error saving image: '.$file_dst);
    }
  }

}
