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
				<input type='date' name='timestamp' value='<?= date('Y-m-d'); ?>' required />
				<input type='number' name='amount' step='.01' placeholder='Amount' required />
				<input type='text' name='title' placeholder='Title' required />
				<select name='category' required >
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
		<script>
			var currentEditId = null;
			const domCache = [];

			function fetchDomField(id, field) {
				let fieldId = `transaction-${id}-${field}`;
				return {
					label: document.getElementById(`${fieldId}-label`),
					edit: document.getElementById(`${fieldId}-edit`)
				};
			}
			function fetchDom(id) {
				if (domCache[id] === undefined) {
					domCache[id] = {
						amount: fetchDomField(id, 'amount'),
						category: fetchDomField(id, 'category'),
						date: fetchDomField(id, 'date'),
						title: fetchDomField(id, 'title'),
					};
				}

				return domCache[id];
			}

			function saveTransaction(id) {
				const dom = fetchDom(id);
				let uri = `<?= Config::get('URL'); ?>finance/updateTransaction?transaction_id=${id}`;
				for (const field in dom) {
					const fieldDom = dom[field].edit;
					uri += `&${encodeURI(fieldDom.name)}=${encodeURI(fieldDom.value)}`;
				}

				fetch(uri).then(r => console.log(r));
			}

			function enableEdit(id) {
				const dom = fetchDom(id);
				for (const field in dom) {
					const fieldDom = dom[field];
					fieldDom.label.attributeStyleMap.set('display', 'none');
					fieldDom.edit.attributeStyleMap.set('display', 'block');
				}
				currentEditId = id;
			}
			function disableEdit(id) {
				const dom = fetchDom(id);
				for (const field in dom) {
					const fieldDom = dom[field];
					fieldDom.label.attributeStyleMap.set('display', 'block');
					fieldDom.edit.attributeStyleMap.set('display', 'none');
				}
				currentEditId = null;
			}

			function onEditClick(event, id) {
				event.preventDefault();
				if (id === currentEditId) return;

				if (currentEditId !== null) {
					saveTransaction(currentEditId);
					disableEdit(currentEditId);
				}

				enableEdit(id);
			}
		</script>
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
					<tr id='transaction-<?= $transaction->id; ?>'>
						<td id='transaction-<?= $transaction->id; ?>-date'>
							<span id='transaction-<?= $transaction->id; ?>-date-label'><?php
								$date = $transaction->date;
								$parts = explode(' ', $date);
								echo $parts[0];
							?></span>
							<input name='timestamp' id='transaction-<?= $transaction->id; ?>-date-edit' type='date' style='display:none;' value='<?php
								$date = $transaction->date;
								$parts = explode(' ', $date);
								echo $parts[0];
							?>' />
						</td>
						<td class="transaction-amount <?= (($transaction->amount > 0) ? 'positive' : 'negative') ?>">
							<span id='transaction-<?= $transaction->id; ?>-amount-label'><?= $transaction->amount; ?></span>
							<input name='amount' id='transaction-<?= $transaction->id; ?>-amount-edit' type='number' step='.01' style='display:none;' value='<?= $transaction->amount; ?>' />
						</td>
						<td>
							<span id='transaction-<?= $transaction->id; ?>-title-label'><?= $transaction->description; ?></span>
							<input name='title' id='transaction-<?= $transaction->id; ?>-title-edit' type='text' style='display:none;' value='<?= $transaction->description; ?>' />
						</td>
						<td>
							<span id='transaction-<?= $transaction->id; ?>-category-label'><?= $transaction->category_name; ?></span>
							<select name='category' id='transaction-<?= $transaction->id; ?>-category-edit' style='display:none;' value='<?= $transaction->category_id; ?>'>
								<?php foreach($this->categories as $category) { ?>
									<option value='<?= $category->id ?>'><?= $category->name ?></option>
								<?php } ?>
							</select>
						</td>
						<td onclick='onEditClick(event, <?= $transaction->id; ?>)'><span style='border-radius: 3px;padding:5px;background:#9c3a43;'>EDIT</span></td>
					</tr>
				<?php } ?>
			</tbody>
		</table>
	</div>
<?php } ?>
