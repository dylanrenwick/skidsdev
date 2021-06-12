var lastText = "";

function onPreviewClick(e) {
    if (e !== undefined) event.preventDefault();

    let title = document.getElementById('new-list-item-form')['post_title'];
    if (title) {
        document.getElementById('preview-title').innerText = title.value;
    }

    let textArea = document.getElementById('new-list-item-form')['post_text'];
    if (textArea) {
        if (lastText === textArea.value) return;
        let block = document.getElementById('preview-body');
        let oldHtml = block.innerHTML;
        block.innerHTML = "<span class='loading'>Loading</span>";
        let jax = new XMLHttpRequest();
        jax.onreadystatechange = () => {
            if (jax.readyState === XMLHttpRequest.DONE) {
                block.innerHTML = jax.responseText;
            } else {
                block.innerHTML = oldHtml;
            }

            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
        jax.open('POST', '/post/preview', true);
        jax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        lastText = textArea.value;
        jax.send('text=' + encodeURIComponent(textArea.value));
    }
}

setInterval(onPreviewClick, 500);