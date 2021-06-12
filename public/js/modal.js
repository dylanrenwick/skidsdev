window.modals = {};

let modalContainer = document.createElement("div");
modalContainer.classList.add("overlay");
modalContainer.style.background = "rgba(0,0,0,0.2)";
modalContainer.style.display = "none";

let modals = document.getElementsByTagName("modal");
for (let i = 0; i < modals.length; i++) {
    let m = modals[i];
    m.style.display = "none";
    buildModal(m);
}

let loadingOverlay = document.createElement("img");
loadingOverlay.id = "modal_loading-overlay";
loadingOverlay.src = "/img/loader.gif";
loadingOverlay.classList.add("centered");
loadingOverlay.setAttribute("style", "z-index: 2");
loadingOverlay.style.display = "none";
createModal(loadingOverlay);

let prompt = document.createElement("modal");
prompt.id = "prompt";
prompt.innerHTML = "<p class='prompt-text'></p><br><button class='prompt-yes'>Yes</button><button class='prompt-no'>No</button>";
buildModal(prompt);

document.body.appendChild(modalContainer);

function buildModal(m) {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add("centered");
    modal.id = 'modal_' + m.id;
    let children = Array.from(m.childNodes);
    for (let i = 0; i < children.length; i++) {
        let e = children[i];
        m.removeChild(e);
        modal.appendChild(e);
    }
    if (m.parentNode) m.parentNode.removeChild(m);
    createModal(modal);
}

function createModal(m) {
    m.style.display = "none";
    window.modals[m.id.split('modal_')[1]] = m;
    modalContainer.appendChild(m);
}

function isModalOpen() {
    return Object.values(window.modals).map(m => m.style.display !== "none").reduce((a,b) => a || b);
}

function showLoadingModal() {
    showModal("loading-overlay");
}

function hideLoadingModal() {
    hideModal("loading-overlay");
}

function showModal(id) {
    if (window.modals[id]) {
        modalContainer.style.display = "block";
        window.modals[id].style.display = "block";
    }
}

function hideModal(id) {
    if (window.modals[id]) {
        window.modals[id].style.display = "none";
    }
    if (!isModalOpen()) {
        modalContainer.style.display = "none";
    }
}

function hideAllModals() {
    Object.values(window.modals).forEach(m => m.style.display = "none");
    modalContainer.style.display = "none";
}

function showPrompt(text, yescb = ()=>{}, nocb = ()=>{}) {
    let m = window.modals["prompt"];
    let p = m.getElementsByClassName("prompt-text")[0];
    p.innerText = text;
    let yes = m.getElementsByClassName("prompt-yes")[0];
    let no = m.getElementsByClassName("prompt-no")[0];
    yes.onclick = () => {
        yescb();
        hideModal("prompt");
    };
    no.onclick = () => {
        nocb();
        hideModal("prompt");
    };
    showModal("prompt");
}

window.addEventListener('keyup', (e) => {
    if (e.key === "Escape" && isModalOpen()) hideAllModals();
});
