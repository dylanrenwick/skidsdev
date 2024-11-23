<?php

$URL = Config::get('URL');
$subdir = 'js/game/click/';
$root = $URL.$subdir;

$scripts = [
	'lib/big.js',

	'framework/math.js',
	'framework/input.js',
	'framework/node.js',
	'framework/render.js',

	'data/storage.js',
	'data/upgrades.js',
	'data/buildings.js',
	//'data/achievements.js',
	'data/user.js',
];
$scripts[] = 'click.js';

foreach ($scripts as $script) {
	echo '<script src="'.$root.$script.'"></script>'."\n";
}
?>

<canvas id="gameScreen" width="900" height="667" style="position:relative;display:block;margin:0 auto;"></canvas>
<span id="version" style="width:100%;display:block;text-align:right;">v0.7.0</span>
<div id="info" style="width:100%;display:block;">
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
