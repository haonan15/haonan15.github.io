function checkOpen() {}
function coverColor() {
    var e = document.getElementById("post-cover")?.src;
    void 0 !== e ? RGBaster.colors(e, {
        paletteSize: 30,
        exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
        success: function(e) {
            if ("rgb(66,90,239)" != e.dominant) {
                const o = e.dominant.match(/\d+/g);
                var t = `rgb(${o[0]},${o[1]},${o[2]})`;
                "light" == getContrastYIQ(colorHex(t)) && (t = LightenDarkenColor(colorHex(t), -40)),
                    document.styleSheets[0].addRule(":root", "--bywind-main:" + t + "!important"),
                    document.styleSheets[0].addRule(":root", "--bywind-main-op:" + t + "23!important"),
                    document.styleSheets[0].addRule(":root", "--bywind-main-op-deep:" + t + "dd!important"),
                    document.styleSheets[0].addRule(":root", "--bywind-main-none:" + t + "00!important"),
                    bywind.initThemeColor(),
                    document.getElementById("coverdiv").classList.add("loaded")
            }
        }
    }) : (document.styleSheets[0].addRule(":root", "--bywind-main: var(--bywind-theme)!important"),
        document.styleSheets[0].addRule(":root", "--bywind-main-op: var(--bywind-theme-op)!important"),
        document.styleSheets[0].addRule(":root", "--bywind-main-op-deep:var(--bywind-theme-op-deep)!important"),
        document.styleSheets[0].addRule(":root", "--bywind-main-none: var(--bywind-theme-none)!important"),
        bywind.initThemeColor())
}
function colorHex(e) {
    var t = e;
    if (/^(rgb|RGB)/.test(t)) {
        for (var o = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), n = "#", a = 0; a < o.length; a++) {
            var r = Number(o[a]).toString(16);
            "0" === r && (r += r),
                n += r
        }
        return 7 !== n.length && (n = t),
            n
    }
    if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))
        return t;
    var i = t.replace(/#/, "").split("");
    if (6 === i.length)
        return t;
    if (3 === i.length) {
        var l = "#";
        for (a = 0; a < i.length; a += 1)
            l += i[a] + i[a];
        return l
    }
}
function colorRgb(e) {
    var t = e.toLowerCase();
    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
            for (var o = "#", n = 1; n < 4; n += 1)
                o += t.slice(n, n + 1).concat(t.slice(n, n + 1));
            t = o
        }
        var a = [];
        for (n = 1; n < 7; n += 2)
            a.push(parseInt("0x" + t.slice(n, n + 2)));
        return "rgb(" + a.join(",") + ")"
    }
    return t
}
function LightenDarkenColor(e, t) {
    var o = !1;
    "#" == e[0] && (e = e.slice(1),
        o = !0);
    var n = parseInt(e, 16)
        , a = (n >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var r = (n >> 8 & 255) + t;
    r > 255 ? r = 255 : r < 0 && (r = 0);
    var i = (255 & n) + t;
    return i > 255 ? i = 255 : i < 0 && (i = 0),
    (o ? "#" : "") + String("000000" + (i | r << 8 | a << 16).toString(16)).slice(-6)
}
function getContrastYIQ(e) {
    var t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
        (t /= 255e3) >= .5 ? "light" : "dark"
}
function navTitle() {
    // "" === GLOBAL_CONFIG_SITE.title.replace("bywind", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text").innerHTML = document.title.split(" | bywind")[0]
    "" === GLOBAL_CONFIG_SITE.title.replace("bywind", "") ? document.getElementById("page-name-text").style.display = "none" :document.getElementById("page-name-text").innerText = document.title.split(" | 随风起")[0];

}
function showcopy() {
    if (void 0 !== GLOBAL_CONFIG.Snackbar)
        btf.snackbarShow(GLOBAL_CONFIG.copy.success);
    else {
        const e = ctx.previousElementSibling;
        e.innerText = GLOBAL_CONFIG.copy.success,
            e.style.opacity = 1,
            setTimeout((()=>{
                    e.style.opacity = 0
                }
            ), 700)
    }
}
checkOpen.toString = function() {
    this.opened = !0
}
    ,
    window.onload = function() {
        for (var e = document.getElementsByClassName("copybtn"), t = 0; t < e.length; t++)
            document.getElementsByClassName("copybtn")[t].addEventListener("click", (function() {
                    showcopy()
                }
            ));
        bywind.initThemeColor()
    }
;
var getTimeState = ()=>{
        var e = (new Date).getHours()
            , t = "";
        return e >= 0 && e <= 5 ? t = "晚安" : e > 5 && e <= 10 ? t = "早上好" : e > 10 && e <= 14 ? t = "中午好" : e > 14 && e <= 18 ? t = "下午好" : e > 18 && e <= 24 && (t = "晚上好"),
            t
    }
;
function fly_to_top() {
    document.getElementById("guli_top").classList.add("open_wing"),
        setTimeout((function() {
                document.getElementById("guli_top").classList.add("flying"),
                    btf.scrollToDest(0, 300)
            }
        ), 300),
        setTimeout((function() {
                document.getElementById("guli_top").classList.remove("flying"),
                    document.getElementById("guli_top").classList.remove("open_wing"),
                    document.getElementById("guli_top").style.cssText = "opacity: ''; transform: ''"
            }
        ), 600)
}
var navFn = {
    switchDarkMode: ()=>{
        "light" === ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(),
            saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, !1, 2e3)) : (activateLightMode(),
            saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, !1, 2e3)),
        "function" == typeof utterancesTheme && utterancesTheme(),
        "object" == typeof FB && window.loadFBComment();
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((()=>window.disqusReset()), 200);
        let e = "light" === document.documentElement.getAttribute("data-theme") ? "#363636" : "#F7F7FA";
        if (document.getElementById("posts-chart")) {
            let t = postsOption;
            t.textStyle.color = e,
                t.title.textStyle.color = e,
                t.xAxis.axisLine.lineStyle.color = e,
                t.yAxis.axisLine.lineStyle.color = e,
                postsChart.setOption(t)
        }
        if (document.getElementById("tags-chart")) {
            let t = tagsOption;
            t.textStyle.color = e,
                t.title.textStyle.color = e,
                t.xAxis.axisLine.lineStyle.color = e,
                t.yAxis.axisLine.lineStyle.color = e,
                tagsChart.setOption(t)
        }
        if (document.getElementById("categories-chart")) {
            let t = categoriesOption;
            t.textStyle.color = e,
                t.title.textStyle.color = e,
                t.legend.textStyle.color = e,
                categoriesChart.setOption(t)
        }
    }
};
function RemoveRewardMask() {
    $(".reward-main").attr("style", "display: none"),
        $("#quit-box").attr("style", "display: none")
}
function AddRewardMask() {
    $(".reward-main").attr("style", "display: flex")
}

function removeLoading() {
    setTimeout((function() {
            preloader.endLoading()
        }
    ), 3e3)
}
function addFriendLink() {
    var e = document.getElementsByClassName("el-textarea__inner")[0];
    let t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0),
        e.value = "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n",
        e.dispatchEvent(t),
        bywind.scrollTo("#post-comment"),
        e.focus(),
        e.setSelectionRange(-1, -1)
}
function getArrayItems(e, t) {
    var o = new Array;
    for (var n in e)
        o.push(e[n]);
    for (var a = new Array, r = 0; r < t && o.length > 0; r++) {
        var i = Math.floor(Math.random() * o.length);
        a[r] = o[i],
            o.splice(i, 1)
    }
    return a
}
function owoBig() {
    document.getElementById("post-comment").addEventListener("DOMNodeInserted", (e=>{
            if (e.target.classList && "OwO-body" == e.target.classList.value) {
                let t = e.target;
                if (t) {
                    let e = ""
                        , o = !0
                        , n = document.createElement("div");
                    n.id = "owo-big",
                        document.querySelector("body").appendChild(n),
                        t.addEventListener("contextmenu", (e=>e.preventDefault())),
                        t.addEventListener("mouseover", (t=>{
                                "LI" == t.target.tagName && o && (o = !1,
                                    e = setTimeout((()=>{
                                            let e = 3 * t.path[0].clientHeight
                                                , o = 3 * t.path[0].clientWidth
                                                , a = t.x - t.offsetX - (o - t.path[0].clientWidth) / 2
                                                , r = t.y - t.offsetY;
                                            n.style.height = e + "px",
                                                n.style.width = o + "px",
                                                n.style.left = a + "px",
                                                n.style.top = r + "px",
                                                n.style.display = "flex",
                                                n.innerHTML = `<img src="${t.target.querySelector("img").src}">`
                                        }
                                    ), 300))
                            }
                        )),
                        t.addEventListener("mouseout", (t=>{
                                n.style.display = "none",
                                    o = !0,
                                    clearTimeout(e)
                            }
                        ))
                }
            }
        }
    ))
}
function percent() {
    let e = document.documentElement.scrollTop || window.pageYOffset
        , t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight
        , o = Math.round(e / t * 100)
        , n = document.querySelector("#percent");
    var a = window.scrollY + document.documentElement.clientHeight
        , r = document.getElementById("post-tools") || document.getElementById("footer");
    r.offsetTop + r.offsetHeight / 2 < a || o > 90 ? (document.querySelector("#nav-totop").classList.add("long"),
        n.innerHTML = "返回顶部") : (document.querySelector("#nav-totop").classList.remove("long"),
        n.innerHTML = o),
        window.onscroll = percent
}
document.addEventListener("touchstart", (e=>{
        RemoveRewardMask()
    }
), !1)
$(document).unbind("keydown").bind("keydown", (function(e) {
        if ((e.ctrlKey || e.metaKey) && 67 == e.keyCode && "" != selectTextNow)
            return btf.snackbarShow("复制成功，复制和转载请标注本文地址"),
                rm.rightmenuCopyText(selectTextNow),
                !1
    }
))
document.addEventListener("scroll", btf.throttle((function() {
        bywind.initThemeColor()
    }
), 200))
//友链随机传送
function travelling() {
    var fetchUrl = "https://moments.bywind.xyz/randomfriend"
    fetch(fetchUrl)
        .then(res => res.json())
        .then(json => {
            var name = json.name;
            var link = json.link;
            var msg = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」";
            document.styleSheets[0].addRule(':root', '--bywind-snackbar-time:' + 8000 + 'ms!important');
            Snackbar.show({
                text: msg,
                duration: 8000,
                pos: 'top-center',
                actionText: '前往',
                onActionClick: function (element) {
                    //Set opacity of element to 0 to close Snackbar
                    $(element).css('opacity', 0);
                    window.open(link, '_blank');
                }
            });
        })
}
navigator.serviceWorker.getRegistrations().then((function(e) {
        for (let t of e)
            t.unregister()
    }
))
window.onkeydown = function(e) {
    123 === e.keyCode && btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3)
}
// ,
// document.querySelector("#algolia-search").addEventListener("wheel", (e=>{
//         e.preventDefault()
//     }
// )),
document.querySelector("#console").addEventListener("wheel", (e=>{
        e.preventDefault()
    }
)),
document.querySelector("#loading-box").addEventListener("wheel", (e=>{
        e.preventDefault()
    }
))
window.addEventListener("resize", (function() {
        document.querySelector("#waterfall") && bywind.refreshEssayWaterFall()
    }
))
$(".topGroup").hover((function() {}
), (function() {
        hoverOnCommentBarrage = !1,
            document.getElementById("todayCard").classList.remove("hide"),
            document.getElementById("todayCard").style.zIndex = 1
    }
))
document.getElementById("post-comment") && owoBig(),
    document.addEventListener("scroll", btf.throttle((function() {
            var e = window.scrollY + document.documentElement.clientHeight
                , t = (window.scrollY,
                document.getElementById("pagination"))
                , o = document.getElementById("post-tools");
            if (o && t) {
                var n = o.offsetTop + o.offsetHeight / 2;
                document.body.clientWidth > 1300 && (n < e ? t.classList.add("show-window") : t.classList.remove("show-window"))
            }
        }
    ), 200))
//检查是否开启快捷键
if (localStorage.getItem('keyboardToggle') !== 'false') {
    document.querySelector("#consoleKeyboard").classList.add("on");
} else {
    document.querySelector("#consoleKeyboard").classList.remove("on");
}

//响应esc键
$(window).on('keydown', function (ev) {

    // Escape
    if (ev.keyCode == 27) {
        bywind.hideLoading();
        bywind.hideConsole();
        rm.hideRightMenu();
    }
    if (bywind_keyboard && ev.shiftKey && !bywind_intype) {
        // 显示快捷键面板 shift键
        if (ev.keyCode == 16) {
            document.querySelector("#keyboard-tips").classList.add("show");
        }
        //关闭快捷键 shift+K
        if (ev.keyCode == 75) {
            bywind.keyboardToggle();
            return false;
        }
        //响应打开控制台键 shift+A
        if (ev.keyCode == 65) {
            bywind.showConsole();
            return false;
        }
        //音乐控制 shift+M
        if (ev.keyCode == 77) {
            bywind.musicToggle();
            return false;
        }
        //随机文章 shift+R
        if (ev.keyCode == 82) {
            toRandomPost();
            return false;
        }
        //回到首页 shift+H
        if (ev.keyCode == 72) {
            pjax.loadUrl("/");
            return false;
        }
        //深色模式 shift+D
        if (ev.keyCode == 68) {
            rm.switchDarkMode();
            return false;
        }
        //友链鱼塘 shift+F
        if (ev.keyCode == 70) {
            pjax.loadUrl("/moments/");
            return false;
        }
        //友情链接页面 shift+L
        if (ev.keyCode == 76) {
            pjax.loadUrl("/link/");
            return false;
        }
        //关于本站 shift+P
        if (ev.keyCode == 80) {
            pjax.loadUrl("/about/");
            return false;
        }
        //在线工具 shift+T
        if (ev.keyCode == 84) {
            pjax.loadUrl("/tlink/");
            return false;
        }
    }
});
$(window).on("keyup", (function(e) {
        16 == e.keyCode && document.querySelector("#keyboard-tips").classList.remove("show")
    }
)),
$("input").focus((function() {
        bywind_intype = !0
    }
)),
$("textarea").focus((function() {
        bywind_intype = !0
    }
)),
$("input").focusout((function() {
        bywind_intype = !1
    }
)),
$("textarea").focusout((function() {
        bywind_intype = !1
    }
)),
document.addEventListener("pjax:send", (function() {
        console.clear(),
            Pace.restart(),
            bywind.showLoading()
    }
)),
document.addEventListener("pjax:complete", (function() {
        coverColor()
        addRightMenuClickEvent()
        navTitle()
        percent()
        bywind.topPostScroll()
        bywind.topCategoriesBarScroll()
        bywind.sayhi()
        bywind.addTag()
        bywind.stopImgRightDrag()
        bywind.addFriendLinksInFooter()
        bywind.qrcodeCreate()
        bywind.hidecookie()
        // bywind.onlyHome()
        bywind.addNavBackgroundInit()
        bywind.initIndexEssay()
        bywind.changeTimeInEssay()
        bywind.refreshEssayWaterFall()
        bywind.darkModeStatus()
        bywind.categoriesBarActive()
        bywind.initThemeColor()
        bywind.hideLoading()
        bywind.tagPageActive()
    }
));
