<div class="container">
    <h1>ProfileController/index</h1>
    <div class="box">

        <!-- echo out the system feedback (error and success messages) -->
        <?php $this->renderFeedbackMessages(); ?>

        <h3>Profile of <?=$this->user['user_name']?></h3>
        <div class="flex-col">
            <?php if (Session::get("user_account_type") == 7) : ?>
                <div class="flex-row">
                    <label style="flex-grow:1;">User ID</label>
                    <input
                        style="flex-grow:1;"
                        type="number"
                        value=<?=$this->user['user_id']?>
                        disabled
                    />
                </div>
            <?php endif; ?>
            <div class="flex-row">
                <label style="flex-grow:1;">Username</label>
                <input
                    style="flex-grow:1;"
                    type="number"
                    value=<?=$this->user['user_name']?>
                    disabled
                />
            </div>
            <div class="flex-row">
                <label style="flex-grow:1;">Email</label>
                <input
                    style="flex-grow:1;"
                    type="number"
                    value=<?=$this->user['user_email']?>
                    disabled
                />
            </div>
        </div>
    </div>
</div>
