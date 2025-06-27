// Copyright 2023 TDZ Group. All rights reserved. MIT license.

var stringToBlob = function (str, mimetype) {
    var raw = str;
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    var bb = new Blob([uInt8Array.buffer], {
        type: mimetype
    });
    return bb;
};

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

window.onload = function () {
    function toastNotification(message) {
        var x = document.getElementById("snackbar");
        x.addEventListener("click", function () {
            x.className = x.className.replace("show", "");
        });
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    }

    function importFunc(e, encrypted) {
        if (e.currentTarget.files[0]) {
            if (e.currentTarget.files[0].type != "application/json") {
                toastNotification("Tệp không hợp lệ, vui lòng chọn tệp JSON");
            }
            var fr = new FileReader();
            fr.readAsText(e.currentTarget.files[0], "UTF-8");
            fr.onload = function (evt) {
                try {
                    let data = evt.target.result;

                    if (encrypted === "base64") {
                        data = b64_to_utf8(data);
                    }
                    else if (encrypted) {
                        // Asking for key
                        const pwdKey = prompt("Vui lòng nhập khóa để giải mã:");
                        const keyHash = [...sha256(pwdKey || "").match(/.{2}/g)].map(e => parseInt(e, 16));

                        const bytes = aesjs.utils.hex.toBytes(data);
                        const aesCtr = new aesjs.ModeOfOperation.ctr(keyHash);
                        const decryptedData = aesCtr.decrypt(bytes);

                        data = aesjs.utils.utf8.fromBytes(decryptedData);
                    }

                    var j = JSON.parse(data);
                    if (Array.isArray(j)) {
                        chrome.cookies.getAll({
                            domain: "facebook.com"
                        }, async function (cookies) {
                            for (let i in cookies) {
                                await new Promise(resolve => {
                                    chrome.cookies.remove({
                                        url: `https://facebook.com${cookies[i].path}`,
                                        name: cookies[i].name
                                    }, resolve);
                                });
                            }

                            for (let i in j) {
                                if (j[i].domain == "facebook.com") {
                                    await new Promise(resolve => {
                                        chrome.cookies.set({
                                            url: `https://facebook.com${j[i].path}`,
                                            name: j[i].key,
                                            value: j[i].value,
                                            expirationDate: (Date.now() / 1000) + (84600 * 30),
                                            domain: ".facebook.com"
                                        }, resolve);
                                    });
                                }
                            }
                            chrome.tabs.query({
                                active: true
                            }, function (tabs) {
                                var {
                                    host
                                } = new URL(tabs[0].url);
                                if (host.split(".")[1] == "facebook") {
                                    chrome.tabs.update(tabs[0].id, {
                                        url: tabs[0].url
                                    });
                                }
                            });
                        });
                        toastNotification("Nhập fbtool thành công!");
                    } else {
                        toastNotification("Tệp JSON không hợp lệ (không phải fbtool JSON)");
                    }
                } catch (_) {
                    toastNotification("Không thể tải tệp JSON (có thể tệp bị lỗi hoặc sai định dạng)");
                }
            }
        }
    }

    function exportFunc(encrypted) {
        chrome.cookies.getAll({
            domain: "facebook.com"
        }, function (cookies) {
            var cok = cookies.map(v => ({
                key: v.name,
                value: v.value,
                domain: "facebook.com",
                path: v.path,
                hostOnly: v.hostOnly,
                creation: new Date().toISOString(),
                lastAccessed: new Date().toISOString()
            }));
            var fbtool = JSON.stringify(cok, null, 4);

            if (encrypted === "base64") {
                fbtool = utf8_to_b64(fbtool);
            } else if (encrypted) {
                // Asking for key
                let pwdKey = prompt("Vui lòng nhập khóa để mã hóa:");
                let keyHash = [...sha256(pwdKey || "").match(/.{2}/g)].map(e => parseInt(e, 16));

                let bytes = aesjs.utils.utf8.toBytes(fbtool);
                let aesCtr = new aesjs.ModeOfOperation.ctr(keyHash);
                let encryptedData = aesCtr.encrypt(bytes);
                fbtool = aesjs.utils.hex.fromBytes(encryptedData);
            }
            const yourfbtool = document.getElementById("yourfbtool");
            const btnCopy = document.getElementById("btnCopy");
            const btnDownload = document.getElementById("btnDownload");
            yourfbtool.value = fbtool;

            btnCopy.onclick = function () {
                yourfbtool.select();
                document.execCommand("copy");
                toastNotification('Thành công! Đã sao chép vào bộ nhớ tạm');
            };

            btnDownload.onclick = function () {
                var blob = stringToBlob(fbtool, "application/json");
                var url = window.webkitURL || window.URL || window.mozURL || window.msURL;
                var a = document.createElement('a');
                a.download = 'fbtool.json';
                a.href = url.createObjectURL(blob);
                a.textContent = '';
                a.dataset.downloadurl = ['json', a.download, a.href].join(':');
                a.click();
                toastNotification('Thành công! fbtool đã được tải về: ' + a.download);
                a.remove();
            };
        });
    }

    function logout() {
        const result = confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (result) {
            chrome.cookies.getAll({
                domain: "facebook.com"
            }, function (cookies) {
                // * giúp bạn không bị mất danh sách tài khoản đã đăng nhập gần đây
                cookies = cookies.filter(c => c.name != "sb" && c.name != "dbln");

                for (let i in cookies) {
                    chrome.cookies.remove({
                        url: `https://facebook.com${cookies[i].path}`,
                        name: cookies[i].name
                    });
                }
                chrome.tabs.query({
                    active: true
                }, function (tabs) {
                    const {
                        host
                    } = new URL(tabs[0].url);
                    if (host.split(".")[1] == "facebook") {
                        chrome.tabs.update(tabs[0].id, {
                            url: tabs[0].url
                        });
                    }
                });
            });
        }
    }

    document.getElementById("import").onchange = (e) => importFunc(e, false);
    document.getElementById("importenc").onchange = (e) => importFunc(e, true);
    document.getElementById("importbase64").onchange = (e) => importFunc(e, "base64");

    document.getElementById("export").onclick = () => exportFunc(false);
    document.getElementById("exportenc").onclick = () => exportFunc(true);
    document.getElementById("exportbase64").onclick = () => exportFunc("base64");

    document.getElementById("logout").onclick = () => logout();
    exportFunc(false);
};
