<h1>Finance Sheets</h1>
<?php if (Session::userIsLoggedIn()) { ?>
	<script>
		function newSheetClick(event) {
			event.preventDefault();
			console.log('click');
			
			const newSheetForm = document.getElementById('new-sheet-form');
			if (newSheetForm === null) {
				console.error("Could not find '#new-sheet-form'");
				return;
			}

			const styles = newSheetForm.attributeStyleMap;
			const val = styles.get('display');
			const isHidden = val == 'none';

			styles.set('display', isHidden ? 'block' : 'none');
			if (isHidden) {
				const titleField = document.getElementById('new-sheet-title');
				if (titleField === null) {
					console.error("Could not find '#new-sheet-title'");
					return;
				}
				if (titleField.value.length <= 0) {
					const date = new Date();
					const month = date.toLocaleString('default', { month: 'long' });
					const year = date.toLocaleString('default', { year: 'numeric' });
					const defaultTitle = `${month}, ${year}`;
					console.log(defaultTitle);
					titleField.value = defaultTitle;
				}
			}
		}
	</script>
	<span class='new-list-item-button'>
		<a href='#' onclick='newSheetClick(event)'>New Sheet</a>
		<div id='new-sheet-form' style='display:none;'>
			<form method='get' action='<?= Config::get('URL'); ?>finance/create'>
				<input id='new-sheet-title' type='text' name='title' placeholder='Title' required />
				<input type='submit' value='+' />
			</form>
		</div>
	</span>
<?php } ?>

<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php if ($this->sheets) { ?>
    <?php foreach($this->sheets as $key => $value) { ?>
        <a href='<?= Config::get('URL'); ?>finance/sheet/<?= $value->id; ?>' class="list-item">
            <span href='' class="list-item-title"><?= $value->title; ?>
            <?php if (!$value->active) { ?>
                <i class="fas fa-rss"></i>
            <?php } ?></span>
            <br>
            <div class="list-item-body"><?php
                
            ?></div><br>
            <span class="list-item-footer">Created on <?= $value->created_at ?></span>
        </a>
    <?php } ?>
<?php } else { ?>
    <div>No sheets found.</div>
<?php } ?>
