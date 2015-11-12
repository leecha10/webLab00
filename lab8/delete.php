<?php
    # Ex 5 : Delete a tweet
    include "timeline.php";
    $tl = new TimeLine();
    try {
        /*
        call delete function
        header("Location:index.php");
        */
        $no = $_POST["no"];
        $tl->delete($no);
        header("Location:index.php");
    } catch(Exception $e) {
        /* header("Loaction:error.php"); */
        header("Location:error.php");
    }
?>
