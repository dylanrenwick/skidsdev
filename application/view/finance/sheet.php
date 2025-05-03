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
