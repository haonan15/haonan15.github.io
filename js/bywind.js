let bywind_cookiesTime = null
    , bywind_musicPlaying = !1
    , bywind_keyboard = 1
    , bywind_intype = !1;
var selectTextNow = "";

var bywind = {
    selectText: function(){
    var e;
    e = document.selection ? document.selection.createRange().text : window.getSelection() + "",
        selectTextNow = e || ""
    },
    darkModeStatus: function() {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? $(".menu-darkmode-text").text("深色模式") : $(".menu-darkmode-text").text("浅色模式")
    },
    changeTimeInEssay: function() {
        document.querySelector("#bber") && document.querySelectorAll("#bber time").forEach((e=>{
                const t = e
                    , o = t.getAttribute("datetime");
                t.innerText = btf.diffDate(o, !0),
                    t.style.display = "inline"
            }
        ))
    },
    initIndexEssay: function() {
        if (document.querySelector("#bber-talk"))
            new Swiper(".swiper-container",{
                direction: "vertical",
                loop: !0,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: !0
                }
            })
    },
    // onlyHome: function() {
    //     var e = window.location.pathname;
    //     "/" == (e = decodeURIComponent(e)) ? $(".only-home").attr("style", "display: flex") : $(".only-home").attr("style", "display: none")
    // },
    is_Post: function() {
        return window.location.href.indexOf("/posts/") >= 0
    },
    addNavBackgroundInit: function() {
        var e = 0
            , t = 0;
        document.body && (e = document.body.scrollTop),
        document.documentElement && (t = document.documentElement.scrollTop),
        0 != (e - t > 0 ? e : t) && (document.getElementById("page-header").classList.add("nav-fixed"),
            document.getElementById("page-header").classList.add("nav-visible"),
            $("#cookies-window").hide())
    },
    tagPageActive: function() {
        var e = window.location.pathname;
        e = decodeURIComponent(e);
        if (/\/tags\/.*?\//.test(e)) {
            var t = e.split("/")[2];
            document.querySelector("#tag-page-tags") && ($("a").removeClass("select"),
                document.getElementById(t).classList.add("select"))
        }
    },
    categoriesBarActive: function() {
        document.querySelector("#category-bar") && $(".category-bar-item").removeClass("select");
        var e = window.location.pathname;
        if ("/" == (e = decodeURIComponent(e)))
            document.querySelector("#category-bar") && document.getElementById("category-bar-home").classList.add("select");
        else {
            if (/\/categories\/.*?\//.test(e)) {
                var t = e.split("/")[2];
                document.querySelector("#category-bar") && document.getElementById(t).classList.add("select")
            }
        }
    },
    // 页脚友链
    addFriendLinksInFooter: function() {
        var fetchUrl = "https://moments.bywind.xyz/randomfriend?num=3"
        fetch(fetchUrl)
            .then(res => res.json())
            .then(json =>{
                var randomFriendLinks = getArrayItems(json,3);

                var htmlText = '';
                for (let i = 0; i < randomFriendLinks.length; ++i) {
                    var item = randomFriendLinks[i]
                    htmlText += `<a class='footer-item' href='${item.link}'  target="_blank" rel="noopener nofollow">${item.name}</a>`;
                }
                htmlText += `<a class='footer-item' href='/link/'>更多</a>`
                document.getElementById("friend-links-in-footer").innerHTML = htmlText;
            })
    },
    stopImgRightDrag: function() {
        $("img").on("dragstart", (function() {
                return !1
            }
        ))
    },
    topPostScroll: function() {
        if (document.getElementById("recent-post-top")) {
            let e = document.getElementById("recent-post-top");
            e.addEventListener("mousewheel", (function(t) {
                    let o = -t.wheelDelta / 2;
                    e.scrollLeft += o,
                    document.body.clientWidth < 1300 && t.preventDefault()
                }
            ), !1)
        }
    },
    topCategoriesBarScroll: function() {
        if (document.getElementById("category-bar-items")) {
            let e = document.getElementById("category-bar-items");
            e.addEventListener("mousewheel", (function(t) {
                    let o = -t.wheelDelta / 2;
                    e.scrollLeft += o,
                        t.preventDefault()
                }
            ), !1)
        }
    },
    sayhi: function() {
        document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = "👋" + getTimeState() + "！我是")
    },
    addTag: function() {
        document.querySelector(".bywind-tag-new") && $(".bywind-tag-new").append('<sup class="bywind-tag bywind-tag-new-view">N</sup>'),
        document.querySelector(".bywind-tag-hot") && $(".bywind-tag-hot").append('<sup class="bywind-tag bywind-tag-hot-view">H</sup>')
    },
    qrcodeCreate: function() {
        if (document.getElementById("qrcode")) {
            document.getElementById("qrcode").innerHTML = "";
            new QRCode(document.getElementById("qrcode"),{
                text: window.location.href,
                width: 250,
                height: 250,
                colorDark: "#000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            })
        }
    },
    refreshEssayWaterFall: function() {
        document.querySelector("#waterfall") && setTimeout((function() {
                waterfall("#waterfall"),
                    document.getElementById("waterfall").classList.add("show")
            }
        ), 500)
    },
    addMediumInEssay: function() {
        document.querySelector("#waterfall") && mediumZoom(document.querySelectorAll("[data-zoomable]"))
    },
    downloadImage: function(e, t) {
        rm.hideRightMenu(),
            0 == rm.downloadimging ? (rm.downloadimging = !0,
                btf.snackbarShow("正在下载中，请稍后", !1, 1e4),
                setTimeout((function() {
                        let o = new Image;
                        o.setAttribute("crossOrigin", "anonymous"),
                            o.onload = function() {
                                let e = document.createElement("canvas");
                                e.width = o.width,
                                    e.height = o.height,
                                    e.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
                                let n = e.toDataURL("image/png")
                                    , a = document.createElement("a")
                                    , c = new MouseEvent("click");
                                a.download = t || "photo",
                                    a.href = n,
                                    a.dispatchEvent(c)
                            }
                            ,
                            o.src = e,
                            btf.snackbarShow("图片已添加盲水印，请遵守版权协议"),
                            rm.downloadimging = !1
                    }
                ), "10000")) : btf.snackbarShow("有正在进行中的下载，请稍后再试")
    },
    switchCommentBarrage: function() {
        document.querySelector(".comment-barrage") && ($(".comment-barrage").is(":visible") ? ($(".comment-barrage").hide(),
            $(".menu-commentBarrage-text").text("显示热评"),
            document.querySelector("#consoleCommentBarrage").classList.remove("on"),
            localStorage.setItem("commentBarrageSwitch", "false")) : $(".comment-barrage").is(":hidden") && ($(".comment-barrage").show(),
            $(".menu-commentBarrage-text").text("关闭热评"),
            document.querySelector("#consoleCommentBarrage").classList.add("on"),
            localStorage.removeItem("commentBarrageSwitch"))),
            rm.hideRightMenu()
    },
    hidecookie: function() {
        bywind_cookiesTime = setTimeout((()=>{
                document.getElementById("cookies-window").classList.add("cw-hide"),
                    setTimeout((()=>{
                            $("#cookies-window").hide()
                        }
                    ), 1e3)
            }
        ), 3e3)
    },
    hideTodayCard: function() {
        document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
    },
    changeThemeColor: function(e) {
        null !== document.querySelector('meta[name="theme-color"]') && document.querySelector('meta[name="theme-color"]').setAttribute("content", e)
    },
    initThemeColor: function() {
        if (bywind.is_Post()) {
            if (0 === (window.scrollY || document.documentElement.scrollTop)) {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--bywind-main");
                bywind.changeThemeColor(e)
            } else {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--bywind-background");
                bywind.changeThemeColor(e)
            }
        } else {
            let e = getComputedStyle(document.documentElement).getPropertyValue("--bywind-background");
            bywind.changeThemeColor(e)
        }
    },
    jumpTo: function(e) {
        $(document).ready((function() {
                $("html,body").animate({
                    scrollTop: $(e).eq(i).offset().top
                }, 500)
            }
        ))
    },
    showLoading: function() {
        document.querySelector("#loading-box").classList.remove("loaded");
        let e = getComputedStyle(document.documentElement).getPropertyValue("--bywind-card-bg");
        bywind.changeThemeColor(e)
    },
    hideLoading: function() {
        document.querySelector("#loading-box").classList.add("loaded")
    },
    //切换音乐播放状态
    musicToggle: function() {
        let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
        let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
        if (bywind_musicPlaying) {
            document.querySelector("#nav-music").classList.remove("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPlay;
            document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
            document.querySelector("#consoleMusic").classList.remove("on");
            bywind_musicPlaying = false;
        }else {
            document.querySelector("#nav-music").classList.add("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPause;
            document.querySelector("#consoleMusic").classList.add("on");
            bywind_musicPlaying = true;
        }
        document.querySelector('meting-js').aplayer.toggle();
        rm.hideRightMenu();
    },
    //音乐上一曲
    musicSkipBack: function() {
        document.querySelector('meting-js').aplayer.skipBack();
        rm.hideRightMenu();
    },

    //音乐下一曲
    musicSkipForward: function() {
        document.querySelector('meting-js').aplayer.skipForward();
        rm.hideRightMenu();
    },

    //获取音乐中的名称
    musicGetName: function() {
        for (var e = $(".aplayer-title"), t = [], o = e.length - 1; o >= 0; o--)
            t[o] = e[o].innerText;
        return t[0]
    },
    showConsole: function() {
        document.querySelector("#console").classList.add("show"),
            bywind.initConsoleState()
    },
    hideConsole: function() {
        document.querySelector("#console").classList.remove("show")
    },
    keyboardToggle: function() {
        bywind_keyboard ? (bywind_keyboard = !1,
            document.querySelector("#consoleKeyboard").classList.remove("on"),
            localStorage.setItem("keyboardToggle", "false")) : (bywind_keyboard = !0,
            document.querySelector("#consoleKeyboard").classList.add("on"),
            localStorage.setItem("keyboardToggle", "true"))
    },
    scrollTo: function(e) {
        var t = document.querySelector(e).offsetTop;
        window.scrollTo(0, t - 80)
    },
    //隐藏侧边栏
    hideAsideBtn: () => { // Hide aside
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? saveToLocal.set('aside-status', 'show', 2)
            : saveToLocal.set('aside-status', 'hide', 2)
        $htmlDom.toggle('hide-aside')
        $htmlDom.contains('hide-aside')
            ? document.querySelector("#consoleHideAside").classList.add("on")
            : document.querySelector("#consoleHideAside").classList.remove("on")
    },

    //初始化console图标
    initConsoleState: function() {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.remove("on") : document.querySelector("#consoleHideAside").classList.add("on")
    }
};
