let bywind_cookiesTime = null
    , bywind_musicPlaying = !1
    , bywind_keyboard = 1
    , bywind_intype = !1;
let bywind_showFPS = false;
var selectTextNow = "";
// 定义变量存储上一个内容
let lastSayHello = '';
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
    onlyHome: function() {
        var e = window.location.pathname;
        "/" == (e = decodeURIComponent(e)) ? $(".only-home").attr("style", "display: flex") : $(".only-home").attr("style", "display: none")
    },
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
    // 标签页面
    //分类条
    tagPageActive: function() {
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo)
        // console.log(urlinfo);
        // 验证是否是分类链接
        var pattern = /\/tags\/.*?\//;
        var patbool = pattern.test(urlinfo);
        // console.log(patbool);
        // 获取当前的分类
        if (patbool) {
            var valuegroup = urlinfo.split("/");
            // console.log(valuegroup[2]);
            // 获取当前分类
            var nowCategorie = valuegroup[2];
            if (document.querySelector('#tag-page-tags')){
                $('a').removeClass('select')
                document.getElementById(nowCategorie).classList.add("select");
            }
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
        document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState())
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
    changeTimeFormat: function() {
        for (var e = document.getElementsByTagName("time"), t = 0; t < e.length; t++) {
            var o, n = e[t].getAttribute("datetime"), a = new Date(n), l = (new Date).getTime() - a.getTime(), i = Math.floor(l / 864e5);
            o = 0 === i ? "最近" : 1 === i ? "昨天" : 2 === i ? "前天" : i <= 7 ? i + "天前" : a.getFullYear() !== (new Date).getFullYear() ? a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate() : a.getMonth() + 1 + "/" + a.getDate(),
                e[t].textContent = o
        }
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
        let msgPlay = '<i class="hnfont icon-play-fill"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
        let msgPause = '<i class="hnfont icon-pause-fill"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
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
        const t = document.getElementById(e);
        if (t) {
            const e = t.getBoundingClientRect().top + window.pageYOffset - 80
                , o = window.pageYOffset
                , n = e - o;
            let a = null;
            window.requestAnimationFrame((function e(t) {
                    a || (a = t);
                    const l = t - a
                        , i = (c = Math.min(l / 0, 1)) < .5 ? 2 * c * c : (4 - 2 * c) * c - 1;
                    var c;
                    window.scrollTo(0, o + n * i),
                    l < 600 && window.requestAnimationFrame(e)
                }
            ))
        }
    },
    //隐藏侧边栏
    hideAsideBtn: () => { // Hide aside
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? saveToLocal.set('aside-status', 'show', 2)
            : saveToLocal.set('aside-status', 'hide', 2)
        $htmlDom.toggle('hide-aside')
        $htmlDom.contains('hide-aside')
            ? document.querySelector("#consoleHideAside").classList.remove("on")
            : document.querySelector("#consoleHideAside").classList.add("on")
    },

    //初始化console图标
    initConsoleState: function() {
        //初始化隐藏边栏
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? document.querySelector("#consoleHideAside").classList.remove("on")
            : document.querySelector("#consoleHideAside").classList.add("on")
    },
    //删除多余的class
    removeBodyPaceClass: function() {
        $('body').removeClass()
        $('body').addClass("pace-done")
    },

    //显示帧率
    FPSToggle: function() {
        if (bywind_showFPS) {
            bywind_showFPS = false;
            document.querySelector("#fps-group").classList.remove("show");
            document.querySelector("#consoleFPS").classList.remove("on");
            localStorage.setItem('showFPS', 'false');
        }else {
            bywind_showFPS = true;
            document.querySelector("#fps-group").classList.add("show");
            document.querySelector("#consoleFPS").classList.add("on");
            localStorage.setItem('showFPS', 'true');
        }

    },
    //跳转到指定页面
    toPage: function() {
        console.log("执行跳转");
        var e = document.querySelectorAll(".page-number")
            , t = parseInt(e[e.length - 1].innerHTML)
            , o = document.getElementById("toPageText")
            , n = parseInt(o.value);
        if (!isNaN(n) && n > 0 && "0" !== ("" + n)[0] && n <= t) {
            var a = "/page/" + n + "/";
            document.getElementById("toPageButton").href = a
        }
    },
    //作者卡片tips更改
    changeSayHelloText: function() {
        // 定义数组存储可选内容
        const contentArray = ['🤖️ 数码科技爱好者', '🔍 分享与热心帮助', '🏠 学习进步小能手', '🔨 设计开发一条龙', '🤝 热爱开发与设计','🏃 脚踏实地行动派',"🧱 团队小组发动机","🎨 分享生活乐趣多"];
        // 获取要更改内容的元素
        const contentElement = document.getElementById('author-info__sayhi');
        // 从数组中随机选择一个新内容
        let newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
        // 如果新内容与上一个重复，重新选择
        while (newContent === lastSayHello) {
            newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
        }
        // 将新内容赋值给元素的文本内容
        contentElement.textContent = newContent;

        // 更新上一个内容的变量
        lastSayHello = newContent;
    },
    scrollCategoryBarToRight: function() {
        var e = document.getElementById("category-bar-items")
            , t = document.getElementById("category-bar-next");
        function o() {
            t.style.transform = e.scrollLeft + e.clientWidth >= e.scrollWidth ? "rotate(180deg)" : ""
        }
        e.addEventListener("scroll", o);
        var n = e.clientWidth;
        e && (e.scrollLeft + e.clientWidth >= e.scrollWidth ? (e.scroll({
            left: 0,
            behavior: "smooth"
        }),
            t.style.transform = "",
            e.removeEventListener("scroll", o)) : (e.scrollBy({
            left: n,
            behavior: "smooth"
        }),
            t.style.transform = ""))
    },
    //匿名评论
    addRandomCommentInfo: function() {
        // 从形容词数组中随机取一个值
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        // 从蔬菜水果动物名字数组中随机取一个值
        const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

        // 将两个值组合成一个字符串
        const name = `${randomAdjective}${randomName}`;

        function dr_js_autofill_commentinfos() {
            var lauthor = ["#author","input[name='comname']","#inpName","input[name='author']","#ds-dialog-name","#name","input[name='nick']","#comment_author"],
                lmail =["#mail","#email","input[name='commail']","#inpEmail","input[name='email']","#ds-dialog-email","input[name='mail']","#comment_email"],
                lurl =["#url","input[name='comurl']","#inpHomePage","#ds-dialog-url","input[name='url']","input[name='website']","#website","input[name='link']","#comment_url"];
            for (var i = 0; i < lauthor.length; i++) {
                var author = document.querySelector(lauthor[i]);
                if (author != null) {
                    author.value = name;
                    author.dispatchEvent(new Event('input'));
                    author.dispatchEvent(new Event('change'));
                    break;
                }
            }
            for (var j = 0; j < lmail.length; j++) {
                var mail = document.querySelector(lmail[j]);
                if (mail != null) {
                    mail.value = 'visitor@bywind.xyz';
                    mail.dispatchEvent(new Event('input'));
                    mail.dispatchEvent(new Event('change'));
                    break;
                }
            }
            return ! 1;
        }

        dr_js_autofill_commentinfos();
        var input = document.getElementsByClassName('el-textarea__inner')[0];
        input.focus();
        input.setSelectionRange(-1,-1);
    },
    addCommentCount: function(e) {
        var t = document.getElementsByClassName("comment-headline");
        t.length > 0 && twikoo.getCommentsCount({
            envId: "https://twikoo.bywind.xyz",
            urls: [window.location.pathname],
            includeReply: !0
        }).then((function(o) {
                for (var n = 0; n < t.length; n++) {
                    var a = t[n]
                        , l = a.getElementsByTagName("span")[0];
                    if (l) {
                        var i = document.createElement("span");
                        i.innerText = " (" + e + ")",
                            a.insertBefore(i, l.nextSibling)
                    }
                }
            }
        )).catch((function(e) {
                console.error(e)
            }
        ))
    }
};
const adjectives = ["美丽的", "英俊的", "聪明的", "勇敢的", "可爱的", "慷慨的", "善良的", "可靠的", "开朗的", "成熟的", "稳重的", "真诚的", "幽默的", "豁达的", "有趣的", "活泼的", "优雅的", "敏捷的", "温柔的", "温暖的", "敬业的", "细心的", "耐心的", "深沉的", "朴素的", "含蓄的", "率直的", "开放的", "务实的", "坚强的", "自信的", "谦虚的", "文静的", "深刻的", "纯真的", "朝气蓬勃的", "慎重的", "大方的", "顽强的", "迷人的", "机智的", "善解人意的", "富有想象力的", "有魅力的", "独立的", "好奇的", "干净的", "宽容的", "尊重他人的", "体贴的", "守信的", "有耐性的", "有责任心的", "有担当的", "有远见的", "有智慧的", "有眼光的", "有冒险精神的", "有爱心的", "有同情心的", "喜欢思考的", "喜欢学习的", "具有批判性思维的", "善于表达的", "善于沟通的", "善于合作的", "善于领导的", "有激情的", "有幽默感的", "有思想的", "有个性的", "有正义感的", "有责任感的", "有创造力的", "有想象力的", "有艺术细胞的", "有团队精神的", "有协调能力的", "有决策能力的", "有组织能力的", "有学习能力的", "有执行能力的", "有分析能力的", "有逻辑思维的", "有创新能力的", "有专业素养的", "有商业头脑的"]
    , vegetablesAndFruits = ["萝卜", "白菜", "芹菜", "生菜", "青椒", "辣椒", "茄子", "豆角", "黄瓜", "西红柿", "洋葱", "大蒜", "土豆", "南瓜", "豆腐", "韭菜", "花菜", "西兰花", "蘑菇", "金针菇", "苹果", "香蕉", "橙子", "柠檬", "猕猴桃", "草莓", "葡萄", "桃子", "杏子", "李子", "石榴", "西瓜", "哈密瓜", "蜜瓜", "樱桃", "蓝莓", "柿子", "橄榄", "柚子", "火龙果"];
$(document).ready((function() {
        initBlog()
    }
)),
document.addEventListener("pjax:complete", (function() {
    initBlog()
}
))
