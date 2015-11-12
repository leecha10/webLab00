<?php
    # Ex 4 : Write a tweet
    include "timeline.php";
    $tl = new TimeLine();
    try {
        /*
        if () { validate author & content
            call add function
            header("Location:index.php"); redirect to index.php
        } else {
            header("Loaction:error.php");
        }
        */
        $author = $_POST["author"];
        if (preg_match("/^[a-zA-Z]+([-\s]?[a-zA-Z]+)*[a-zA-Z]*$/", $author) and (strlen($author) <= 20 and strlen($author) >= 1)) { // validate author & content
            // call add function
            $tweet = $_POST["content"];
            $tl->add($tweet);
            header("Location:index.php"); // redirect to index.php
        } else {
            header("Location:error.php");
        }
    } catch(Exception $e) {
        /* header("Loaction:error.php"); */
        header("Location:error.php");
    }
?>
