<!doctype html>
<html>
<head>
    <?php if(!Request::doNotTrack()) { ?>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141370303-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-141370303-1');
        </script>
    <?php } ?>

    <?php if (isset($this->meta)) { ?>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:title" content="<?= $this->meta['title']; ?>" />
        <?php
            $safeText = htmlentities($this->meta['desc']);
            // Don't include more than 4 lines
            $safeText = explode("\n", $safeText);
            $safeText = array_slice($safeText, 0, 4);
            $safeText = implode("\n", $safeText);
            // Stop before the first code block
            $safeText = explode("```", $safeText);
            $safeText = $safeText[0];
        ?>
        <meta name="twitter:description" content="<?= $safeText; ?>" />
        <?php if (!empty($this->meta['image'])) { ?>
            <meta name="twitter:image" content="<?= $this->meta['image']; ?>" />
        <?php } ?>
        <meta property="og:title" content="<?= $this->meta['title']; ?>" />
        <meta property="og:url" content="<?= Config::get('URL'); ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="<?= Config::get('NAME'); ?>" />
        <meta property="og:description" content="<?= $safeText; ?>" />
    <?php } ?>
    
    <title>SkidsDev</title>
    <!-- META -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="manifest" href="<?=Config::get('URL');?>site.webmanifest">
    <!-- send empty favicon fallback to prevent user's browser hitting the server for lots of favicon requests resulting in 404s -->
    <link rel="icon" href="data:;base64,=">
    <link rel="apple-touch-icon" href="data:;base64,=">
    <!-- CSS -->
    <link rel="stylesheet" href="<?=Config::get('URL');?>css/animate.min.css">
    <link rel="stylesheet" href="<?=Config::get('URL');?>css/font.css" />
    <link rel="stylesheet" href="<?=Config::get('URL');?>css/normalize.css" />
    <link rel="stylesheet" href="<?=Config::get('URL');?>css/style.css" />
    <link rel="stylesheet" href="<?=Config::get('URL');?>css/vs2015.css" />

    <script defer src="<?=Config::get('URL');?>fontawesome/js/all.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML' async></script>
</head>
<body>
    <div id="sidebar">
        <div class="sidebar-head">
            <div class="sidebar-head-content">
                <p class="sidebar-title animated zoomInLeft slower">Dylan Renwick</p>
                <div class="sidebar-icons animated zoomInLeft slower">
                    <a href="mailto:dylan.renwick96@gmail.com" target="_blank" title="email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a href="https://twitter.com/kaho_nes" target="_blank" title="twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://github.com/dylanrenwick" target="_blank" title="github">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://soundcloud.com/kaho-music" target="_blank" title="soundcloud">
                        <i class="fab fa-soundcloud"></i>
                    </a>
                </div>
            </div>      
        </div>
        <div class="sidebar-body">
            <div class="sidebar-body-content">
                <a href="<?=Config::get('URL');?>" class="sidebar-link 
                    <?= View::checkForActiveController($filename, "index") ? 'active-link' : ''; ?> 
                    animated zoomInLeft slower">Home</a>
                <a href="<?=Config::get('URL');?>post" class="sidebar-link 
                    <?= View::checkForActiveController($filename, "post") ? 'active-link' : ''; ?> 
                    animated zoomInLeft slower">Blog</a>
                <?php if (Session::userIsLoggedIn()) : ?>
                    <?php if (Session::get("user_account_type") == 7) : ?>
                        <a href="<?=Config::get('URL');?>admin/" class="sidebar-link
                            <?= View::checkForActiveController($filename, "admin") ? 'active-link' : ''; ?>
                            animated zoomInLeft slower">Admin</a>
                    <?php endif; ?>
                    <a href="<?=Config::get('URL');?>user" class="sidebar-link 
                        <?= View::checkForActiveController($filename, "user") ? 'active-link' : ''; ?> 
                        animated zoomInLeft slower">My Account
                    </a>
                    <a href="<?=Config::get('URL');?>login/logout?return=<?=urlencode(Request::get('url'))?>" class="sidebar-link
                        animated zoomInLeft slower">Logout
                    </a>
                <?php else : ?>
                    <a href="<?=Config::get('URL');?>login" class="sidebar-link 
                        <?= View::checkForActiveController($filename, "login") ? 'active-link' : ''; ?> 
                        animated zoomInLeft slower">Log In
                    </a>
                <?php endif; ?>
            </div>      
        </div>
    </div>

    <div class="home-body">
        <div class="home-body-content animated fadeIn slowest animation-delay-1000">