<?php 
    if (!$this->component_args) return; 
    if (!array_key_exists('name', $this->component_args)) $this->component_args['name'] = '';
    if (!array_key_exists('class', $this->component_args)) $this->component_args['class'] = '';
    if (!array_key_exists('placeholder', $this->component_args)) $this->component_args['placeholder'] = '';
    if (!array_key_exists('form_id', $this->component_args)) return;
?>
<script>
    if (!window.tagBars) window.tagBars = [];

    function genTagBars(tags = []) {
        let containers = Array.from(document.getElementsByClassName('tag-bar-container'));
        containers.forEach(c => {
            if (c.id.includes('tag-bar-gen-')) return;
            genTagBar(c, tags);
        });
    }

    function genTagBar(container, tags) {
        let input = container.firstElementChild;
        input.onkeydown = handleTagBarKey;
        container.id ='tag-bar-gen-' + window.tagBars.length;
        window.tagBars.push([]);
        for (let tag of tags) {
            addNewTag(input, tag);
        }
    }

    function handleTagBarKey(e) {
        let tagBar = e.target;
        if (e.code === 'Enter' || e.code === 'Comma' || e.code === 'Space') {
            e.preventDefault();
            if (tagBar.value.trim() === '') return;
            let newTag = tagBar.value.trim();
            addNewTag(tagBar, newTag);
        } else if (e.code === 'Backspace' && tagBar.value.length === 0) {
            e.preventDefault();
            let tagBarId = parseInt(tagBar.parentElement.id.match(/tag-bar-gen-(\d+)/)[1]);
            let lastTag = document.getElementById(window.tagBars[tagBarId][window.tagBars[tagBarId].length - 1]);
            if (lastTag !== null) {
                tagBar.value = lastTag.firstElementChild.innerText;
                deleteTag(lastTag);
            }
        }
    }

    function addNewTag(tagBar, newTag) {
        let tagBarCont = tagBar.parentElement;
        let tagBarIndex = parseInt(tagBarCont.id.match(/tag-bar-gen-(\d+)/)[1]);
        let tagDOM = document.createElement('span');
        tagDOM.classList.add('tag-bar-tag');
        tagDOM.id ='tag-bar-' + tagBarIndex + '-tag-' + window.tagBars[tagBarIndex].length;
        let newTagText = document.createElement('span');
        newTagText.innerText = newTag;
        tagDOM.appendChild(newTagText);
        let newTagDel = document.createElement('span');
        newTagDel.classList.add('tag-bar-del-tag');
        newTagDel.innerText = 'x';
        newTagDel.onclick = onDeleteTagClick;
        tagDOM.appendChild(newTagDel);
        tagBar.parentElement.insertBefore(tagDOM, tagBar);
        tagBar.value = '';
        window.tagBars[tagBarIndex].push('tag-bar-' + tagBarIndex + '-tag-' + window.tagBars[tagBarIndex].length);
    }

    function onDeleteTagClick(e) {
        let tag = e.target.parentElement;
        deleteTag(tag);
    }

    function deleteTag(tag) {
        let tagInfo = tag.id.match(/tag-bar-(\d+)-tag-(\d+)/);
        let tagBarIndex = parseInt(tagInfo[1]);
        let tagIndex = parseInt(tagInfo[2]);
        tag.parentElement.removeChild(tag);
        window.tagBars[tagBarIndex].splice(tagIndex, 1);
    }
</script>
<span class='tag-bar-container'>
    <input id='<?= $this->component_args['name']; ?>' class='tag-bar <?= $this->component_args['class']; ?>' placeholder='<?= $this->component_args['placeholder']; ?>' type='text' />
</span>
<input id='<?= $this->component_args['name']; ?>_hidden' type='hidden' name='<?= $this->component_args['name']; ?>' />

<script>
    var tags = '<?= array_key_exists('tags', $this->component_args) ? $this->component_args['tags'] : ''; ?>';
    tags = tags.split(',').map(s => s.trim()).filter(s => s.length > 0);
    genTagBars(tags);

    var formID = '<?= $this->component_args['form_id'] ?>';
    var inputID = '<?= $this->component_args['name']; ?>';
    if (!window.tagForms) window.tagForms = {};
    if (!window.tagForms[formID]) window.tagForms[formID] = [];
    window.tagForms[formID].push(inputID);
    let form = document.getElementById(formID);
    form.addEventListener('submit', (event) => {
        for (let id of window.tagForms[formID]) {
            let input = document.getElementById(id);
            let hidden = document.getElementById(id + '_hidden');
            if (!input || !hidden) continue;
            let container = input.parentElement;

            let tagBarId = parseInt(container.id.match(/tag-bar-gen-(\d+)/)[1]);
            let tags = [];
            for (let tagId of window.tagBars[tagBarId])
            {
                let tag = document.getElementById(tagId);
                if (!tag) continue;
                tags.push(tag.firstElementChild.innerText);
            }

            console.log(tags);
            
            hidden.value = tags.join(',');
            console.log(hidden.value);
        }
    });
</script>