<h1>Dylan's Blog</h1>
<?php if (Session::userIsLoggedIn()) { ?>
    <span class='new-list-item-button'><a href='post/edit'>New Post</a></span>
<?php } ?>

<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php if ($this->posts) { ?>
    <?php foreach($this->posts as $key => $value) { ?>
        <a href='<?= Config::get('URL'); ?>post/post/<?= $value->id; ?>' class="list-item">
            <span href='' class="list-item-title"><?= $value->title; ?>
            <?php if (!$value->active) { ?>
                <i class="fas fa-rss"></i>
            <?php } ?></span>
            <br>
            <div class="list-item-body"><?php
                $pd = new Parsedown();
                $safeText = htmlentities($value->text);
                // Don't include more than 4 lines
                $safeText = explode("\n", $safeText);
                $safeText = array_slice($safeText, 0, 4);
                $safeText = implode("\n", $safeText);
                // Stop before the first code block
                $safeText = explode("```", $safeText);
                $safeText = $safeText[0];
                $safeText = Filter::MarkdownFilter($safeText);
                $safeText = $pd->text($safeText);
                if (strlen($safeText) > 200) {
                    echo substr($safeText, 0, 197) . '...';
                } else {
                    echo $safeText;
                }
            ?></div><br>
            <span class="list-item-footer">By <?= $value->user_name; ?> on <?= $value->created_at ?></span>
        </a>
    <?php } ?>
<?php } else { ?>
    <div>No posts yet.</div>
<?php } ?>
