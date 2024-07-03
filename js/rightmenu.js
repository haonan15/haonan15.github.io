var rm = {};
rm.stopdragimg = $("img"),
rm.stopdragimg.on("dragstart", (function() {
        return !1
    }
)),
rm.showRightMenu = function(e, n=0, t=0) {
    let o = $("#rightMenu");
    o.css("top", n + "px").css("left", t + "px"),
    e ? (o.show(),
    stopMaskScroll()) : o.hide()
}
,
rm.hideRightMenu = function() {
    rm.showRightMenu(!1),
    $("#rightmenu-mask").attr("style", "display: none")
}
;
var rmWidth = $("#rightMenu").width()
, rmHeight = $("#rightMenu").height();
rm.reloadrmSize = function() {
rmWidth = $("#rightMenu").width(),
rmHeight = $("#rightMenu").height()
}
;
var domhref = ""
    , domImgSrc = ""
    , globalEvent = null;
function imageToBlob(e) {
    const n = new Image
        , t = document.createElement("canvas")
        , o = t.getContext("2d");
    return n.crossOrigin = "",
        n.src = e,
        new Promise((e=>{
                n.onload = function() {
                    t.width = this.naturalWidth,
                        t.height = this.naturalHeight,
                        o.drawImage(this, 0, 0),
                        t.toBlob((n=>{
                                e(n)
                            }
                        ), "image/png", .75)
                }
            }
        ))
}
async function copyImage(e) {
    const n = await imageToBlob(e)
        , t = new ClipboardItem({
        "image/png": n
    });
    navigator.clipboard.write([t])
}
function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        document.getElementById("rightmenu-mask").addEventListener("mousewheel", (function(e) {
                rm.hideRightMenu()
            }
        ), !1)
    }
    if (document.getElementById("rightMenu")) {
        document.getElementById("rightMenu").addEventListener("mousewheel", (function(e) {
                rm.hideRightMenu()
            }
        ), !1)
    }
}
window.oncontextmenu = function(e) {
    if (document.body.clientWidth > 768) {
        let n = e.clientX + 10
            , t = e.clientY
            , o = $(".rightMenuOther")
            , i = $(".rightMenuPlugin")
            , c = $("#menu-copytext")
            , r = $("#menu-pastetext")
            , m = $("#menu-commenttext")
            , a = $("#menu-newwindow")
            , u = $("#menu-copylink")
            , l = $("#menu-copyimg")
            , d = $("#menu-downloadimg")
            , h = $("#menu-search")
            , s = $("#menu-searchBaidu")
            , g = $("#menu-music-toggle")
            , w = $("#menu-music-back")
            , f = $("#menu-music-forward")
            , p = $("#menu-music-playlist")
            , k = $("#menu-music-copyMusicName")
            , y = e.target.href
            , M = e.target.currentSrc
            , b = !1;
        return o.show(),
            globalEvent = e,
            selectTextNow && window.getSelection() ? (b = !0,
                c.show(),
                m.show(),
                h.show(),
                s.show()) : (c.hide(),
                m.hide(),
                s.hide(),
                h.hide()),
            y ? (b = !0,
                a.show(),
                u.show(),
                domhref = y) : (a.hide(),
                u.hide()),
            M ? (b = !0,
                l.show(),
                d.show(),
                domImgSrc = M) : (l.hide(),
                d.hide()),
            "input" === e.target.tagName.toLowerCase() || "textarea" === e.target.tagName.toLowerCase() ? (console.log("这是一个输入框"),
                b = !0,
                r.show()) : r.hide(),
            "METING-JS" == e.target.nodeName ? (console.log("这是一个音乐"),
                b = !0,
                g.show(),
                w.show(),
                f.show(),
                p.show(),
                k.show()) : (g.hide(),
                w.hide(),
                f.hide(),
                p.hide(),
                k.hide()),
            b ? (o.hide(),
                i.show()) : i.hide(),
            rm.reloadrmSize(),
        n + rmWidth > window.innerWidth && (n -= rmWidth + 10),
        t + rmHeight > window.innerHeight && (t -= t + rmHeight - window.innerHeight),
            rm.showRightMenu(!0, t, n),
            $("#rightmenu-mask").attr("style", "display: flex"),
            !1
    }
}
    ,
    rm.downloadimging = !1,
    rm.writeClipImg = function(e) {
        console.log("按下复制"),
            rm.hideRightMenu(),
            btf.snackbarShow("正在下载中，请稍后", !1, 1e4),
        0 == rm.downloadimging && (rm.downloadimging = !0,
            setTimeout((function() {
                    copyImage(e),
                        btf.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议"),
                        rm.downloadimging = !1
                }
            ), "10000"))
    }
    ,
    rm.switchDarkMode = function() {
        navFn.switchDarkMode(),
            rm.hideRightMenu(),
            bywind.darkModeStatus()
    }
    ,
    rm.copyUrl = function(e) {
        $("body").after("<input id='copyVal'></input>");
        var n = e
            , t = document.getElementById("copyVal");
        t.value = n,
            t.select(),
            t.setSelectionRange(0, t.value.length),
            document.execCommand("copy"),
            $("#copyVal").remove()
    }
    ,
    rm.rightmenuCopyText = function(e) {
        navigator.clipboard && navigator.clipboard.writeText(e),
            rm.hideRightMenu()
    }
    ,
    rm.copyPageUrl = function() {
        var e = window.location.href;
        rm.copyUrl(e),
            btf.snackbarShow("复制本页链接地址成功", !1, 2e3),
            rm.hideRightMenu()
    }
    ,
    rm.sharePage = function() {
        window.location.href;
        rm.copyUrl(url),
            btf.snackbarShow("复制本页链接地址成功", !1, 2e3),
            rm.hideRightMenu()
    }
;
var selectTextNow = "";
function selceText() {
    var e;
    e = document.selection ? document.selection.createRange().text : window.getSelection() + "",
        selectTextNow = e || ""
}
function replaceAll(e, n, t) {
    return e.split(n).join(t)
}
function addRightMenuClickEvent() {
    $("#menu-backward").on("click", (function() {
            window.history.back(),
                rm.hideRightMenu()
        }
    )),
        $("#menu-forward").on("click", (function() {
                window.history.forward(),
                    rm.hideRightMenu()
            }
        )),
        $("#menu-refresh").on("click", (function() {
                window.location.reload()
            }
        )),
        $("#menu-top").on("click", (function() {
                btf.scrollToDest(0, 500),
                    rm.hideRightMenu()
            }
        )),
        $(".menu-link").on("click", rm.hideRightMenu),
        $("#menu-darkmode").on("click", rm.switchDarkMode),
        $("#menu-home").on("click", (function() {
                window.location.href = window.location.origin
            }
        )),
        $("#menu-randomPost").on("click", (function() {
                toRandomPost()
            }
        )),
        $("#menu-commentBarrage").on("click", bywind.switchCommentBarrage),
        $("#rightmenu-mask").on("click", rm.hideRightMenu),
        $("#rightmenu-mask").contextmenu((function() {
                return rm.hideRightMenu(),
                    !1
            }
        )),
        $("#menu-translate").on("click", (function() {
                rm.hideRightMenu(),
                translateInitialization()
            }
        )),
        $("#menu-copy").on("click", rm.copyPageUrl),
        $("#menu-pastetext").on("click", rm.pasteText),
        $("#menu-copytext").on("click", (function() {
                rm.rightmenuCopyText(selectTextNow),
                    btf.snackbarShow("复制成功，复制和转载请标注本文地址")
            }
        )),
        $("#menu-commenttext").on("click", (function() {
                rm.rightMenuCommentText(selectTextNow)
            }
        )),
        $("#menu-newwindow").on("click", (function() {
                window.open(domhref),
                    rm.hideRightMenu()
            }
        )),
        $("#menu-copylink").on("click", rm.copyLink),
        $("#menu-downloadimg").on("click", (function() {
                bywind.downloadImage(domImgSrc, "bywind")
            }
        )),
        $("#menu-copyimg").on("click", (function() {
                rm.writeClipImg(domImgSrc)
            }
        )),
        $("#menu-searchBaidu").on("click", rm.searchBaidu),
        $("#menu-music-toggle").on("click", bywind.musicToggle),
        $("#menu-music-back").on("click", bywind.musicSkipBack),
        $("#menu-music-forward").on("click", bywind.musicSkipForward),
        $("#menu-music-copyMusicName").on("click", (function() {
                rm.rightmenuCopyText(bywind.musicGetName()),
                    btf.snackbarShow("复制歌曲名称成功", !1, 3e3)
            }
        ))
}
document.onmouseup = document.ondbclick = selceText,
    rm.readClipboard = function() {
        navigator.clipboard && navigator.clipboard.readText().then((e=>rm.insertAtCaret(globalEvent.target, e)))
    }
    ,
    rm.insertAtCaret = function(e, n) {
        const t = e.selectionStart
            , o = e.selectionEnd;
        if (document.selection)
            e.focus(),
                document.selection.createRange().text = n,
                e.focus();
        else if (t || "0" == t) {
            var i = e.scrollTop;
            e.value = e.value.substring(0, t) + n + e.value.substring(o, e.value.length),
                e.focus(),
                e.selectionStart = t + n.length,
                e.selectionEnd = t + n.length,
                e.scrollTop = i
        } else
            e.value += n,
                e.focus()
    }
    ,
    rm.pasteText = function() {
        rm.readClipboard();
        rm.hideRightMenu()
    }
    ,
    rm.rightMenuCommentText = function(e) {
        rm.hideRightMenu();
        var n = document.getElementsByClassName("el-textarea__inner")[0];
        let t = document.createEvent("HTMLEvents");
        t.initEvent("input", !0, !0);
        let o = replaceAll(e, "\n", "\n> ");
        n.value = "> " + o + "\n\n",
        n.dispatchEvent(t);
        var i = document.querySelector("#post-comment").offsetTop;
        window.scrollTo(0, i - 80),
        n.focus(),
        n.setSelectionRange(-1, -1),
        document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show")
    }
    ,
    rm.searchBaidu = function() {
        btf.snackbarShow("即将跳转到百度搜索", !1, 2e3),
            setTimeout((function() {
                    window.open("https://www.baidu.com/s?wd=" + selectTextNow)
                }
            ), "2000"),
            rm.hideRightMenu()
    }
    ,
    rm.copyLink = function() {
        rm.rightmenuCopyText(domhref),
            btf.snackbarShow("已复制链接地址")
    }
;
