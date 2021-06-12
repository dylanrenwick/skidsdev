<style>
.collapsible {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 32px;
}

.activeCollapsible, .collapsible:hover {
    background-color: #ccc;
}

.collapsible:after {
    content: '+';
    font-size: 32px;
    position: relative;
    left: 7%;
    top: 2px;
}

.activeCollapsible:after {
    content: '-';
    top: 1px;
}

.collapsibleContent {
    overflow: hidden;
    background-color: #f1f1f1;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
}

.collapsibleTitle {
    display: inline-block;
    width: 90%;
}

#essayList,
#essayList ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

#essayList ul li>a {
    display: block;
    width: 100%;
    height: 100%;
}

.yt-image {
    border-radius: 50px;
    border: 5.5px solid #D02F52;
    box-sizing: border-box;
}

.random-button {
    color: #D02F52;
    cursor: pointer;
}

.list-item:hover {
    background-color: #ccc;
}
</style>
<h1>Video Essays</h1>
<p>Unfortunately, I don't make video essays (Yet? Watch this space, I guess), but I do love watching them. They're my favourite kind of content on youtube, and I often find myself binging them for hours on end.</p>
<br />
<p>Here's a categorized list of video essay channels. This is designed to be an exhaustive list, but I can't possibly know every channel out there, so if you know of a great video essay channel, whether they have 1 million subscribers, or 1 subscriber, let me know via email or twitter (find them in the sidebar on the left)</p>
<br />
<p>Can't decide? <span class="random-button" onclick="openRandom();">Try a random channel!</span></p>
<br />
<ul id="essayList">
    <?php
        foreach (array_keys($this->channels) as $category) {
    ?>
            <li>
                <div class="collapsibleContainer">
                    <button type="button" class="collapsible"><span class="collapsibleTitle"><?=ucwords($category)?></span></button>
                    <div class="collapsibleContent">
                        <ul>
                            <?php
                                foreach ($this->channels[$category] as $channel) {
                            ?>
                                <li class="list-item">
                                    <a href="https://www.youtube.com/<?=$channel->url?>">
                                        <img src="<?php if (!preg_match('/^https:\/\/yt3.ggpht.com\/a/', $channel->image_url)) echo '/img/yt/'; echo $channel->image_url; ?>" class="list-item-image <?php if (preg_match('/^https:\/\/yt3.ggpht.com\/a/', $channel->image_url)) echo 'yt-image'; ?>" />
                                        <h2 class="list-item-title"><?=$channel->name?></h2>
                                        <p class="list-item-body"><?=$channel->description?></p>
                                    </a>
                                </li>
                            <?php
                                }
                            ?>
                        </ul>
                    </div>
                </div>
            </li>
    <?php
        }
    ?>
</ul>

<script>
    window.addEventListener("load", function() {
        let collapsibles = document.getElementsByClassName("collapsibleContainer");

        for (let i = 0; i < collapsibles.length; i++) {
            let buttons = collapsibles[i].getElementsByClassName("collapsible");
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].addEventListener("click", function() {
                    this.classList.toggle("activeCollapsible");
                    let content = collapsibles[i].getElementsByClassName("collapsibleContent");
                    for (let k = 0; k < content.length; k++) {
                        if (content[k].style.maxHeight) content[k].style.maxHeight = null;
                        else content[k].style.maxHeight = content[k].scrollHeight + "px";
                    }
                });
            }
        }
    });

    var channelUrls = <?php
    function getUrl($channel) { return $channel->url; }

    $channels = array();
    foreach ($this->channels as $cat) { $channels = array_merge($channels, $cat); }

    $urls = array_map('getUrl', $channels);

    echo json_encode($urls);
    ?>;

    function openRandom() {
        let rand = Math.floor(Math.random() * channelUrls.length);
        window.open("https://www.youtube.com/" + channelUrls[rand]);
    }

</script>