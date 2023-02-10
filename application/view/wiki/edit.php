<h1>Create/Edit Wiki Page</h1>

<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php
    $title = $this->wiki_page_name;
    $path = $this->wiki_page_path;

    if (isset($this->wiki_page_filepath)) {
        $filepath = $this->wiki_page_filepath;
        $text = file_get_contents($filepath);
    } else {
        $filepath = '';
        $text = '';
    }
    $textRowCount = count(explode("\n", $text));
    if ($textRowCount < 5) $textRowCount = 5;
?>
<script src="<?=Config::get('URL');?>js/editWikiPage.js?"></script>
<form method="POST" id="new-list-item-form" action="<?=Config::get('URL');?>post/editSave">
    <!-- we use htmlentities() here to prevent user input with " etc. break the HTML -->
    <h2><?= htmlentities($path) ?><b><?= htmlentities($title) ?></b></h2>
    <br>
    <textarea name="post_text" required class="new-list-item-text" rows=<?= $textRowCount; ?> placeholder="Post Body"><?= htmlentities($text); ?></textarea>
    <input type="submit" value='Save' />
</form>
<hr />
<div id="new-post-preview">
    <span id="preview-title" class='post-title'><?= $title; ?></span>
    <div id="preview-body" class='post-body'><?= $this->renderWikiPage($text); ?></div>
</div>
