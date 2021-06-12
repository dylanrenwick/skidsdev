<h1>Create/Edit Post</h1>

<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php
    if (isset($this->post)) {
        $id = $this->post->id;
        $text = $this->post->text;
        $title = $this->post->title;
        $tags = $this->post->tags;
    } else {
        $id = -1;
        $text = '';
        $title = '';
        $tags = '';
    }
    $textRowCount = count(explode("\n", $text));
    if ($textRowCount < 5) $textRowCount = 5;
?>
<script src="<?=Config::get('URL');?>js/editPost.js"></script>
<form method="POST" id="new-list-item-form" action="<?=Config::get('URL');?>post/editSave">
    <!-- we use htmlentities() here to prevent user input with " etc. break the HTML -->
    <input type="hidden" name="post_id" value="<?= htmlentities($id); ?>" />
    <input type="text" required name="post_title" class="new-list-item-title" placeholder="Post Title" value="<?= htmlentities($title); ?>" />
    <br>
    <textarea name="post_text" required class="new-list-item-text" rows=<?= $textRowCount; ?> placeholder="Post Body"><?= htmlentities($text); ?></textarea>
    <?php
        $this->renderComponent('tagBar', array(
            'name' => 'post_tags',
            'placeholder' => 'Post Tags',
            'form_id' => 'new-list-item-form',
            'tags' => $tags
        ));
        $this->renderComponent('seriesSelector', array(
            'name' => 'post_series'
        ));
    ?>
    <input type="submit" value='Save' />
</form>
<hr />
<div id="new-post-preview">
    <span id="preview-title" class='post-title'><?= $title; ?></span>
    <div id="preview-body" class='post-body'><?= $this->renderMarkdown($text); ?></div>
</div>
