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
				<input type='number' name='amount' step='.01' placeholder='Amount' required />
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

<style>
table.sheet-table {
	border: 1px solid #888;
	width: 100%;
}
table.sheet-table tr {
	border: 1px solid #888;
}
table.sheet-table td {
	margin: 0;
	text-align: center;
	padding: 5px;
}
table.sheet-table td.transaction-amount.positive {
	background-color: #1a2;
}
table.sheet-table td.transaction-amount.negative {
	background-color: #a42;
}
</style>

<?php if ($this->sheet) { ?>
	<div class="sheet">
		<h1><?php
			$sum = array_reduce($this->transactions, function($a, $b){$a+=$b->amount;return $a;}, 0);
			echo $this->sheet->title . '  -=-  Total so far: $' . $sum;
		?></h1>
		<span class="sheet-footer">Created on <?= $this->sheet->created_at ?></span>
		<table class="sheet-table">
			<colgroup>
				<col span="1" style="width: 15%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 50%;">
				<col span="1" style="width: 20%;">
				<col span="1" style="width:  5%;">
			</colgroup>

			<tbody>
				<tr>
					<th>Date</th>
					<th>Amount</th>
					<th>Description</th>
					<th>Category</th>
					<th></th>
				</tr>
				<?php foreach($this->transactions as $transaction) { ?>
					<tr>
						<td><?php
							$date = $transaction->date;
							$parts = explode(' ', $date);
							echo $parts[0];
						?></td>
						<td class="transaction-amount <?= (($transaction->amount > 0) ? 'positive' : 'negative') ?>"><?= $transaction->amount; ?></td>
						<td><?= $transaction->description; ?></td>
						<td><?= $transaction->category_name; ?></td>
						<td>TODO:EDIT</td>
					</tr>
				<?php } ?>
			</tbody>
		</table>
	</div>
<?php } ?>
