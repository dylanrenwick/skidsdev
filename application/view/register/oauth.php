<div class="container">

    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>

    <!-- login box on left side -->
    <div class="login-box" style="width: 50%; display: block;">
        <h2>Register a new account</h2>

        <?php foreach (Config::get('OAUTH_PROVIDERS') as $oauth) { ?>
            <a href="<?=Config::get('URL');?>register/oauth_signup?provider=<?=$oauth?>" class="oauth-button">
                <img src="<?=Config::get('URL');?>img/<?=$oauth?>-signin.png" />
            </a>
        <?php } ?>
    </div>
</div>
