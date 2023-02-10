<!-- echo out the system feedback (error and success messages) -->
<?php $this->renderFeedbackMessages(); ?>

<?php
    if (isset($this->letter)) {
        $letter_date = $this->letter->letter_date;
        $letter_contents = $this->letter->letter_contents;
    }
?>