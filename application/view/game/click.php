<script src="<?php echo Config::get('URL'); ?>js/big.js"></script>
<script src="<?php echo Config::get('URL'); ?>js/game/upgrades.js"></script>
<script src="<?php echo Config::get('URL'); ?>js/game/click.js"></script>
<style>
#gameScreen {
    position: relative;
    background: #fff;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    width: 900px;
    min-height: 667px;
    max-height: 667px;
    font-family: monospace;
}
#bigButton {
    width:304px;
    height:100px;
    font-size:26px;
    text-align:center;
    line-height:100px;
    margin:0 auto;
    position: absolute;
    left: 339px;
    bottom: 90px;
}
span.button {
    background: #ddd;
    border: 2px solid #888;
    border-radius: 10px;
    display: block;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    font-size: 15px;
}
span.button img {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    image-rendering: crisp-edges; /* moz */
}
span.tooltip {
    background: #444;
    color: #eee;
    border: 2px solid #222;
    border-radius: 10px;
    display: block;
    padding: 10px;
    position: relative;
    float: left;
    width: 300px;
    font-size: 15px;
}
.barOutline {
    border: 2px solid #888;
    display: block;
}
.barFill.horizontal {
    height: 100%;
    display: block;
}
.barFill.vertical {
    width: 100%;
    display: block;
}

#info {
    width: 100%;
    display: block;
}
</style>
<div id="gameScreen"></div>
<span id="version" style="width:100%;display:block;text-align:right;">v0.7.0</span>
<div id="info">
    <h2>F.A.Q.</h2>
    <p><b>Q. The game isn't working!</b><br/>
    A. First, check your browser. The game will only work on Firefox 68+, Chrome 67+ or Opera 54+.<br/>
    There are no plans to support IE, Edge, or Safari, as they do not currently support <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt">BigInts</a><br/><br/>
    If your browser is up to date, open the JavaScript console (Ctrl+Shift+J on most browsers) and type <code>wipeSave();</code> into the console, then hit enter.<br/>
    This will wipe your save data (sorry) and ensure there is no compatibility issue with your save in the current game version.</p>
    <br/>
    <p><b>Q. How do I win?</b><br/>
    A. As this is an Idle/Incremental clicker game, there is no "winning". The game keeps going as long as you care to play.<br/>
    Eventually though, you'll reach the end of new content to unlock. You could consider this the "end" of the game.</p>
</div>