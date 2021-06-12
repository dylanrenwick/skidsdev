function ajax(method, url, send, cb, showLoading = true, headers = {}) {
    let httpReq = new XMLHttpRequest();
    if (showLoading) showLoadingModal();
    httpReq.onreadystatechange = () => {
        if (httpReq.readyState === XMLHttpRequest.DONE) {
            if (httpReq.status === 200) {
                if (showLoading) hideLoadingModal();
                cb(httpReq);
            }
        }
    };
    httpReq.open(method, url);
    for (let header in headers) {
        httpReq.setRequestHeader(header, headers[header]);
    }
    httpReq.send(send || undefined);
}

function ajaxGET(url, cb, showLoading = true, headers = {}) {
    ajax("GET", url, null, cb, headers);
}

function ajaxPOST(url, cb, data = null, showLoading = true, headers = {}) {
    ajax("POST", url, data, cb, headers);
}
