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
		}
	</script>
	<span class='new-list-item-button'>
		<a href='#' onclick='newSheetClick(event)'>New Transaction</a>
		<div id='new-sheet-form' style='display:none;'>
			<form method='get' action='<?= Config::get('URL'); ?>finance/createTransaction'>
				<input type='hidden' name='sheet_id' value='<?= $this->sheet->id; ?>' />
				<input type='number' name='amount' placeholder='Amount' required />
				<input type='text' name='title' placeholder='Title' required />
				<select name='category' required>
					<option value=''>Select Category</option>
					<?php foreach($this->categories as $category) { ?>
						<option value='<?= $category->id ?>'><?= $category->name ?></option>
					<?php } ?>
				</select>
				<input type='submit' value='+' />
			</form>
		</div>
	</span>
<?php } ?>

<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php if ($this->sheet) { ?>
	<div class="sheet">
		<h1><?= $this->sheet->title; ?></h1>
		<table class="sheet-table">
			<tr>
				<th>Date</th>
				<th>Amount</th>
				<th>Category</th>
				<th>Comment</th>
			</tr>
			<?php foreach($this->transactions as $transaction) { ?>
				<tr>
					<td><?= $transaction->date; ?></td>
					<td><?= $transaction->amount; ?></td>
					<td><?= $transaction->category; ?></td>
					<td><?= $transaction->comment; ?></td>
				</tr>
			<?php } ?>
		<span class="sheet-footer">Created on <?= $this->sheet->created_at ?></span>
	</div>
<?php } ?>
