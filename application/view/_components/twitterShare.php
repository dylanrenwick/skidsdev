<?php if (!isset($this->component_args)) return;
$refer = urlencode($this->component_args['url']);
$text = urlencode($this->component_args['text']);
$via = urlencode($this->component_args['via']);

$shareLink = "https://twitter.com/intent/tweet?original_referer=$refer&ref_src=twsrc%5Etfw&text=$text&tw_p=tweetbutton&url=$refer&via=$via";
?>
<a href="<?= $shareLink; ?>" class="tweet-button">
    <i class="fab fa-twitter"></i>
</a>