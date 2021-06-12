<div class="container">
    <h1>User Profile: <?= $this->user_name ?></h1>

    <div class="box">
        <h2>Your profile</h2>

        <!-- echo out the system feedback (error and success messages) -->
        <?php $this->renderFeedbackMessages(); ?>

        <div>Your username: <?= $this->user_name; ?></div>
        <div>Your email: <?= $this->user_email; ?></div>
        <div>Your account type is: <?= $this->user_account_type; ?></div>
    </div>
</div>
