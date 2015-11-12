<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Simple Timeline</title>
        <link rel="stylesheet" href="timeline.css">
    </head>
    <body>
        <div>
            <a href="index.php"><h1>Simple Timeline</h1></a>
            <div class="search">
                <!-- Ex 3: Modify forms -->
                <form class="search-form" action="index.php" method="get">
                    <input type="submit" value="search">
                    <input type="text" name="query" placeholder="Search">
                    <select name="type">
                        <option>Author</option>
                        <option>Content</option>
                    </select>
                </form>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <!-- Ex 3: Modify forms -->
                    <form class="write-form" action="add.php" method="post">
                        <input type="text" name="author" placeholder="Author">
                        <div>
                            <input type="text" name="content" placeholder="Content">
                        </div>
                        <input type="submit" value="write">
                    </form>
                </div>
                <!-- Ex 3: Modify forms & Load tweets -->
                <?php
                include "timeline.php";
                $tl = new TimeLine();
                $rows;

                if (isset($_GET["type"]) and isset($_GET["query"])) {
                  $type = $_GET["type"];
                  $query = $_GET["query"];

                  if ($query == "") {
                    $rows = $tl->loadTweets();
                  }
                  else {
                    $rows = $tl->searchTweets($type, $query);
                  }

                }
                else {
                  $rows = $tl->loadTweets();
                }
                foreach ($rows as $row) {

                ?>
                <div class="tweet">
                    <form class="delete-form" action="delete.php" method="post">
                        <input type="submit" value="delete">
                        <input type="hidden" name="no" value=<?= $row["no"] ?>>
                    </form>
                    <div class="tweet-info">
                        <span><?= $row["author"] ?></span>
                        <span><?= $row["time"] ?></span>
                    </div>
                    <div class="tweet-content">
                        <?= $row["contents"] ?>
                    </div>
                </div>
                <?php
                }
                ?>
            </div>
        </div>
    </body>
</html>
