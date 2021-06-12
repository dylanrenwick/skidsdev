<?php
if ($this->component_args['series_info']['series'] === null) return;
$series_info = $this->component_args['series_info'];
?>
<div class="series-info">
    <p>Part of the series '<?=$series_info['series']->name;?>'</p><br>
    <?php if ($series_info['prev']) {
        $prev = $series_info['prev']; ?>        
        <span><a href='<?=Config::get('URL')?>post/post/<?=$prev->id;?>'>&lt;&lt; Previous Post</a></span>
    <?php } ?>
    <?php if ($series_info['next']) {
        $next = $series_info['next']; ?>        
        <span><a href='<?=Config::get('URL')?>post/post/<?=$next->id;?>'>Next Post &gt;&gt;</a></span>
    <?php } ?>
</div>
