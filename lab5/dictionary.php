<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <meta charset="utf-8" />
    <link href="dictionary.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>My Dictionary</h1>
<!-- Ex. 1: File of Dictionary -->
  <?php
    $filename = "dictionary.tsv";
    $lines = file($filename);
  ?>
    <p>
        My dictionary has <?= count($lines) ?> total words
        and
        size of <?= filesize($filename) ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's words</h2>
<!-- Ex. 2: Today’s Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByNumber($listOfWords, $numberOfWords){
                $resultArray = array();
                $temp_array = $listOfWords;
                shuffle($temp_array);
                $i = 1;
                foreach ($temp_array as $word) {
                  $resultArray[] = $word;
                  if ($i == $numberOfWords) break;
                  $i++;
                }

                return $resultArray;
            }
            if(!isset($_GET["number_of_words"])) $numberOfWords = 3;
            else if ($_GET["number_of_words"] == "") $numberOfWords = 3;
            else $numberOfWords = $_GET["number_of_words"];
            $todaysWords = getWordsByNumber($lines, $numberOfWords);
            asort($todaysWords);'' ?>
          <ol>
            <?php
            foreach ($todaysWords as $word) {
                $temp = explode("	", $word);
                $i = 0; ?>
                <li>
                  <?php
                  foreach ($temp as $tword) {
                    print $tword;
                    if ($i == 0) print " - ";
                    $i++;
                  } ?>
                </li>

            <?php } ?>
          </ol>

    </div>
    <div class="section">
        <h2>Searching Words</h2>
<!-- Ex. 3: Searching Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByCharacter($listOfWords, $startCharacter){
                $resultArray = array();
                foreach ($listOfWords as $sword) {
                  if ( strtoupper($sword[0]) == $startCharacter ) $resultArray[] = $sword;
                }
                return $resultArray;
            }
            if(!isset($_GET["character"])) $startCharacter = "C";
            else if(($_GET["character"]) == "") $startCharacter = "C";
            else $startCharacter = strtoupper($_GET["character"]);

            $searchedWords = getWordsByCharacter($lines, $startCharacter);
        ?>
        <p>
            Words that started by <strong>'<?= $startCharacter ?>'</strong> are followings :
        </p>
        <ol>
          <?php
          foreach ($searchedWords as $sword) {
              $temp = explode("	", $sword);
              $i = 0; ?>
              <li>
                <?php
                foreach ($temp as $tword) {
                  print $tword;
                  if ($i == 0) print " - ";
                  $i++;
                } ?>
              </li>
          <?php } ?>
        </ol>

    </div>
    <div class="section">
        <h2>List of Words</h2>
<!-- Ex. 4: List of Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByOrder($listOfWords, $orderby){
                $resultArray = $listOfWords;
                if ($orderby == 0) asort($resultArray);
                elseif ($orderby == 1) rsort($resultArray);
                return $resultArray;
            }
            if(!isset($_GET["orderby"])) $orderby = 0;
            else if(($_GET["orderby"]) == "") $orderby = 0;
            else $orderby = $_GET["orderby"];

            $orderedWords = getWordsByOrder($lines, $orderby);
        ?>
        <p>
            All of words ordered by
            <strong>
              <?php
                if ($orderby == 0) print "alphabetical order";
                elseif ($orderby == 1) print "alphabetical reverse order";
              ?>
              </strong> are followings :
        </p>
        <ol>
          <?php
          foreach ($orderedWords as $oword) {
              $temp = explode("	", $oword);
              $i = 0;
              if (strlen($temp[0]) > 6) { ?>
                <li class="long">
              <?php } else { ?>
              <li>
                <?php
              }
                foreach ($temp as $tword) {
                  print $tword;
                  if ($i == 0) print " - ";
                  $i++;
                } ?>
              </li>
          <?php } ?>


        </ol>
    </div>
    <div class="section">
        <h2>Adding Words</h2>
<!-- Ex. 5: Adding Words & Ex 6: Query Parameters -->
          <?php
          if ( isset($_GET["new_word"]) and isset($_GET["meaning"]) ) {
            $newWord = $_GET["new_word"];
            $meaning = $_GET["meaning"];
            file_put_contents($filename, $newWord."	".$meaning."\n", FILE_APPEND);
             ?>
            <p>Adding a word is success!.</p>
          <?php
          }
          else { ?>
            <p>Input word or meaning of the word doesn't exist.</p>
          <?php } ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>
