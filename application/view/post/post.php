<span class='post-title'><?= $this->post->title; ?></span>
<script>
    var postID = <?= $this->post->id; ?>;
    var rootUrl = "<?= Config::get('URL'); ?>";

    function publishPost() {
        event.preventDefault();
        let jax = new XMLHttpRequest();
        jax.onreadystatechange = () => {
            if (jax.readyState === XMLHttpRequest.DONE) {
                window.location.reload();
            }
        }
        jax.open('GET', rootUrl + '/post/publish/' + postID, true);
        jax.send();
    }

    function deletePost() {
        event.preventDefault();
        if (!confirm("Are you sure you wish to delete this post?")) return;
        window.location.href = rootUrl + "post/delete/" + postID;
    }
</script>
<span class='new-list-item-button'>
    <?php
        $this->renderComponent('twitterShare', array(
            'url' => Config::get('URL') . 'post/post/' . $this->post->id,
            'text' => $this->post->title,
            'via' => 'kaho_nes'
        ));
    ?>
    <?php if (!$this->post->active) { ?><a title="Publish Post" onclick='publishPost();'><i class="fas fa-rss"></i></a><?php } ?>
    <?php if ($this->post->user_id === Session::get('user_id')) { ?>
        <a title="Edit Post" href="<?= Config::get('URL'); ?>post/edit/<?= $this->post->id; ?>"><i class="fas fa-edit"></i></a>
        <a title="Delete Post" onclick='deletePost();'><i class="fas fa-trash"></i></a>
    <?php } ?>
</span>
<span class='post-subtitle'>By <?= $this->post->user_name; ?> on <?= $this->post->created_at; ?></span>
<?php
    $this->renderComponent('seriesLine', array(
        'series_info' => $this->series_info
    ));
?>
<hr>
<div class='post-body'><?= $this->renderMarkdown($this->post->text); ?></div>