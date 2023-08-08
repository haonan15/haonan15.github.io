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
                "light" == getContrastYIQ(colorHex(t)) && (t = LightenDarkenColor(colorHex(t), -50)),
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
function padZero(e, t=2) {
    return (Array(t).join("0") + e).slice(-t)
}
function colorHex(e) {
    if (/#([0-9a-f]{3}|[0-9a-f]{6})/i.test(e))
        return e;
    if (/^(rgb|RGB)/.test(e)) {
        let t = e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
            , o = "#";
        for (let e of t) {
            o += padZero((+e).toString(16))
        }
        return o
    }
    return e
}
function colorRgb(e) {
    let t = e.toLowerCase();
    if (t && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(t)) {
        if (4 === t.length) {
            let e = "#";
            for (let o = 1; o < 4; o += 1)
                e += t.slice(o, o + 1).repeat(2);
            t = e
        }
        let e = [];
        for (let o = 1; o < 7; o += 2)
            e.push(parseInt("0x" + t.slice(o, o + 2)));
        return `rgb(${e.join(",")})`
    }
    return t
}
function LightenDarkenColor(e, t) {
    let o = !1;
    "#" == e[0] && (e = e.slice(1),
        o = !0);
    let n = parseInt(e, 16)
        , a = (n >> 16) + t
        , i = (n >> 8 & 255) + t
        , r = (255 & n) + t;
    return a = Math.min(255, Math.max(0, a)),
        i = Math.min(255, Math.max(0, i)),
        r = Math.min(255, Math.max(0, r)),
    (o ? "#" : "") + (r | i << 8 | a << 16).toString(16).padStart(6, "0")
}
function getContrastYIQ(e) {
    var t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
        (t /= 255e3) >= .5 ? "light" : "dark"
}
function navTitle() {
    // "" === GLOBAL_CONFIG_SITE.title.replace("bywind", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text").innerHTML = document.title.split(" | bywind")[0]
    // "" === GLOBAL_CONFIG_SITE.title.replace("bywind", "") ? document.getElementById("page-name-text").style.display = "none" :document.getElementById("page-name-text").innerText = document.title.split(" | 随风起")[0];
    var e = document.title.replace(" | 随风起", "");
    document.getElementById("page-name-text").innerHTML = e
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
    return e >= 0 && e <= 5 ? t = "睡个好觉，保证精力充沛" : e > 5 && e <= 10 ? t = "一日之计在于晨" : e > 10 && e <= 14 ? t = "吃饱了才有力气干活" : e > 14 && e <= 18 ? t = "集中精力，攻克难关" : e > 18 && e <= 24 && (t = "不要太劳累了，早睡更健康"),
        t
};
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
    $(".reward-main").attr("style", "display: flex"),
    $("#quit-box").attr("style", "display: flex")
}
function travelling() {
    fetch("https://moments.bywind.xyz/randomfriend").then((e=>e.json())).then((e=>{
            var t = e.link
                , o = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + e.name + "」";
            // document.styleSheets[0].addRule(":root", "--bywind-snackbar-time:8000ms!important"),
            Snackbar.show({
                text: o,
                duration: 6000,
                pos: "top-center",
                actionText: "前往",
                onActionClick: function(e) {
                    $(e).css("opacity", 0),
                    window.open(t, "_blank")
                }
            })
        }
    ))
}
function totraveling() {
    btf.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", !1, 5e3),
        setTimeout((function() {
                window.open("https://www.travellings.cn/go.html")
            }
        ), "5000")
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
                        n.id = "owo-big"
                    document.querySelector("body").appendChild(n),
                        t.addEventListener("contextmenu", (e=>e.preventDefault())),
                        t.addEventListener("mouseover", (t=>{
                                "LI" == t.target.tagName && o && (o = !1,
                                    e = setTimeout((()=>{
                                            let e = 3 * t.target.clientWidth
                                                , o = t.x - t.offsetX - (e - t.target.clientWidth) / 2
                                                , a = t.y - t.offsetY;
                                            n.style.height = 3 * t.target.clientHeight + "px",
                                                n.style.width = e + "px",
                                                n.style.left = o + "px",
                                                n.style.top = a + "px",
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
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
        result = Math.round(a / b * 100), // 计算百分比
        btn = document.querySelector("#percent"); // 获取按钮
    //滚动条高度+视窗高度 = 可见区域底部高度
    var visibleBottom = window.scrollY + document.documentElement.clientHeight;
    // 获取位置监测容器，此处采用评论区
    var eventlistner = document.getElementById('post-tools') || document.getElementById('footer');
    var centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
    if ((centerY < visibleBottom) || (result > 90)) {
        document.querySelector("#nav-totop").classList.add("long");
        btn.innerHTML = "返回顶部";
    } else {
        document.querySelector("#nav-totop").classList.remove("long");
        if (result >= 0) {
            btn.innerHTML = result;
        }
    }
    //隐藏aplayer和弹幕窗口
    endresult = b - a
    if (endresult < 100) {
        $(".needEndHide").addClass("hide")
    }else {
        $(".needEndHide").removeClass("hide")
    }
    window.onscroll = percent;
}
function addKeyShotListener() {
    $(window).off("keydown"),
        $(window).off("keyup"),
        $(window).on("keydown", keyDownEvent),
        $(window).on("keyup", keyUpEvent)
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
))
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
));
//检查是否开启FPS
if (localStorage.getItem('showFPS') == 'true') {
    bywind_showFPS = true;
    document.querySelector("#fps-group").classList.add("show");
    document.querySelector("#consoleFPS").classList.add("on");
} else {
    bywind_showFPS = false;
    document.querySelector("#fps-group").classList.remove("show");
    document.querySelector("#consoleFPS").classList.remove("on");
}

// fps
var showFPS = (function(){
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
    var e,pe,pid,fps,last,offset,step,appendFps;

    fps = 0;
    last = Date.now();
    step = function(){
        offset = Date.now() - last;
        fps += 1;
        if( offset >= 1000 ){
            last += offset;
            appendFps(fps);
            fps = 0;
        }
        requestAnimationFrame( step );
    };
    appendFps = function(fps){
        $('#fps').html(fps);
    };
    step();
})();
$("input").focus((function() {
        bywind_intype = !0
    }
));
$("textarea").focus((function() {
        bywind_intype = !0
    }
));
$("input").focusout((function() {
        bywind_intype = !1
    }
));
$("textarea").focusout((function() {
        bywind_intype = !1
    }
));
document.addEventListener("pjax:send", (function() {
        console.clear(),
        Pace.restart(),
        bywind.showLoading()
        $(window).prop("keydown", null).off("keydown");
    }
))


//监听跳转页面输入框是否按下回车
function listenToPageInputPress() {
    var input = document.getElementById("toPageText");
    var button = document.getElementById("toPageButton");
    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                // 如果按下的是回车键，则执行特定的函数
                bywind.toPage();
                var href = button.href;
                pjax.loadUrl(href);
            }
        });

        // 监听输入框变化
        input.addEventListener("input", function() {
            // 检查输入框是否为空
            if (input.value === "" || input.value === "0") {
                // 如果是空的，执行您的函数
                button.classList.remove("haveValue")
            }else {
                button.classList.add("haveValue")
            }

            var e = document.querySelectorAll(".page-number"),
                t = e[e.length - 1].innerHTML,
                n = Number(t),
                a = document.getElementById("toPageText"),
                o = Number(a.value);
            if (o > n) {
                input.value = n;
            };
        });
    }
}
function initBlog() {
    coverColor()
    addRightMenuClickEvent()
    navTitle()
    percent()
    listenToPageInputPress()
    bywind.topPostScroll()
    bywind.topCategoriesBarScroll()
    bywind.sayhi()
    bywind.addTag()
    bywind.stopImgRightDrag()
    bywind.addFriendLinksInFooter()
    bywind.qrcodeCreate()
    bywind.hidecookie()
    bywind.onlyHome()
    bywind.addNavBackgroundInit()
    bywind.initIndexEssay()
    bywind.changeTimeFormat()
    bywind.changeTimeInEssay()
    bywind.refreshEssayWaterFall()
    bywind.darkModeStatus()
    bywind.categoriesBarActive()
    bywind.initThemeColor()
    bywind.hideLoading()
    bywind.tagPageActive()
    bywind.removeBodyPaceClass()
}
