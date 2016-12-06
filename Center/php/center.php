<?php
    header("Content-Type: text/css");

    $origColor1 = "0097d7";
    $origTransColor = "rgba(69, 85, 101, 0.8)";
    $origColor2 = "455565";

    //get the data from the query string
    $color1 = $_GET['c1'];
    $color2 = $_GET['c2'];

    // convert hex value to rgb based on $color2
    function hex2rgb($hex) {
      $hex = str_replace("#", "", $hex);

      if(strlen($hex) == 3) {
        $r = hexdec(substr($hex,0,1).substr($hex,0,1));
        $g = hexdec(substr($hex,1,1).substr($hex,1,1));
        $b = hexdec(substr($hex,2,1).substr($hex,2,1));
      } else {
        $r = hexdec(substr($hex,0,2));
        $g = hexdec(substr($hex,2,2));
        $b = hexdec(substr($hex,4,2));
      }
      $rgb = array($r, $g, $b);
      return implode(",", $rgb); // returns the rgb values separated by commas
    }
    $value = hex2rgb($color2);
    $color3 = "rgba($value, .8)";

    echo "/*";
    echo "\n\n";

    // get the data from the CSS file as a string
    $myCSS = file_get_contents('../css/center.css');

    // swap out color 1
    // does color exist and is it hexidecimal?
    if ( $color1 && preg_match('/^[a-f0-9]{6}$/i', $color1) ) {
        // syntax: str_replace(find,replace,string,count);
        $myCSS = str_ireplace($origColor1, $color1, $myCSS, $Count1);
        echo "$Count1 instances of $origColor1 replaced with Color1: $color1";
        echo "\n\n";
    } else {
        echo "Color 1 did not exist or was not hexidecimal";
        echo "\n\n";
    }

    // swap out color 2
    // does color exist and is it hexidecimal?
    if ( $color2 && preg_match('/^[a-f0-9]{6}$/i', $color2) ) {
        // syntax: str_replace(find,replace,string,count);
        $myCSS = str_ireplace($origColor2, $color2, $myCSS, $Count2);
        $myCSS = str_ireplace($origTransColor, $color3, $myCSS, $Count3);
        echo "$Count2 instances of $origColor2 replaced with Color2: $color2";
        echo "\n\n";
    } else {
        echo "Color 2 did not exist or was not hexidecimal.";
        echo "\n\n";
    }

    echo "*/";
    echo "\n\n";

    // output updated CSS to browser
    echo $myCSS;

?>
