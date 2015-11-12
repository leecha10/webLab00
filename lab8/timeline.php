<?php
    class TimeLine {
        # Ex 2 : Fill out the methods
        private $db;
        function __construct()
        {
            # You can change mysql username or password
            $this->db = new PDO("mysql:host=localhost;dbname=timeline", "root", "root");
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        public function add($tweet) // This function inserts a tweet
        {
            //Fill out here
            // hash
            $tweet = preg_replace("/(#)([_]*[a-zA-Z0-9]+[\w]*)/", "<a href=index.php?query=%23$2&type=Content>"."$1$2"."</a>", $tweet);

            $author = $_POST["author"];
            $author = $this->db->quote($author);
            $tweet = $this->db->quote($tweet);
            $this->db->query("insert into tweets (author, contents, time) values ($author, $tweet, now())");
        }
        public function delete($no) // This function deletes a tweet
        {
            //Fill out here
            $no = $this->db->quote($no);
            $this->db->query("delete from tweets where no = $no");
        }
        # Ex 6: hash tag
        # Find has tag from the contents, add <a> tag using preg_replace() or preg_replace_callback()
        public function loadTweets() // This function load all tweets
        {
            //Fill out here
            $rows = $this->db->query("select no, author, contents, date_format(time,'%T %d/%m/%Y') as time from tweets order by time desc");

            return $rows;
        }
        public function searchTweets($type, $query) // This function load tweets meeting conditions
        {
            //Fill out here
            //$query = $this->db->quote($query);
            $rows;

            if ($type == "Author") {
              $rows = $this->db->query("select no, author, contents, date_format(time,'%T %d/%m/%Y') as time from tweets where author = '$query' order by time desc");
            }
            else if ($type == "Content") {            
              $rows = $this->db->query("select no, author, contents, date_format(time,'%T %d/%m/%Y') as time from tweets where contents like '%$query%' order by time desc");
            }

            return $rows;
        }
    }
?>
