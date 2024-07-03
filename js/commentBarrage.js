var commentBarrageConfig = {
    //同时最多显示弹幕数
    maxBarrage: 1,
    //弹幕显示间隔时间ms
    barrageTime: 6000,
    //twikoo部署地址腾讯云的为环境ID
    twikooUrl: "https://twikoo.bywind.xyz/",
    //token获取见上方
    accessToken: "d764a789c7ead1853daf549a3b3e6ad3",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    dom: document.querySelector('.comment-barrage'),
}
, commentInterval = null
, hoverOnCommentBarrage = !1;
function initCommentBarrage() {
    var e = JSON.stringify({
        event: "COMMENT_GET",
        "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
        url: commentBarrageConfig.pageUrl
    })
    , a = new XMLHttpRequest;
    a.withCredentials = !0,
    a.addEventListener("readystatechange", (function() {
            4 === this.readyState && (commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data),
                commentBarrageConfig.dom.innerHTML = "")
        }
    )),
    a.open("POST", commentBarrageConfig.twikooUrl),
    a.setRequestHeader("Content-Type", "application/json"),
    a.send(e),
    clearInterval(commentInterval),
    commentInterval = null,
    commentInterval = setInterval((()=>{
            commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage && (popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]),
                commentBarrageConfig.barrageIndex += 1,
                commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length),
            commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length) && !hoverOnCommentBarrage && removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    ), commentBarrageConfig.barrageTime)
}
function commentLinkFilter(e) {
    e.sort(((e,a)=>e.created - a.created));
    let a = [];
    return e.forEach((e=>{
            a.push(...getCommentReplies(e))
        }
    )),
        a
}
function getCommentReplies(e) {
    if (e.replies) {
        let a = [e];
        return e.replies.forEach((e=>{
                a.push(...getCommentReplies(e))
            }
        )),
            a
    }
    return []
}
function popCommentBarrage(e) {
    let a = document.createElement("div");
    a.className = "comment-barrage-item",
        a.innerHTML = `\n\t\t<div class="barrageHead">\n      <a class="barrageTitle" href="javascript:bywind.scrollTo('post-comment')"">热评</a>\n\t\t\t<div class="barrageNick">${e.nick}</div>\n\t\t\t<img class="barrageAvatar" src="https://cravatar.cn/avatar/${e.mailMd5}"/>\n\t\t\t<a class="comment-barrage-close" href="javascript:bywind.switchCommentBarrage()"><i class="hnfont icon-close-fill"></i></a>\n\t\t</div>\n\t\t<a class="barrageContent" href="javascript:bywind.scrollTo('${e.id}');">${e.comment}</a>\n\t`,
        commentBarrageConfig.barrageTimer.push(a),
        commentBarrageConfig.dom.append(a)
}
function removeCommentBarrage(e) {
    e.className = "comment-barrage-item out",
        setTimeout((()=>{
                commentBarrageConfig.dom.removeChild(e)
            }
        ), 1e3)
}
$(".comment-barrage").hover((function() {
        hoverOnCommentBarrage = !0,
            console.log("热评悬浮")
    }
), (function() {
        hoverOnCommentBarrage = !1,
            console.log("停止悬浮")
    }
)),
document.addEventListener("scroll", btf.throttle((function() {
        var e = window.scrollY + document.documentElement.clientHeight
            , a = (window,
            document.querySelector(".comment-barrage"))
            , r = document.getElementById("post-tools");
        r && a && (document.body.clientWidth > 768 && (a.style.bottom = r.offsetTop + r.offsetHeight / 2 > e ? "0" : "-200px"))
    }
), 200)),
initCommentBarrage(),
"false" !== localStorage.getItem("commentBarrageSwitch") ? ($(".comment-barrage").show(),
    $(".menu-commentBarrage-text").text("关闭热评"),
    document.querySelector("#consoleCommentBarrage").classList.add("on")) : ($(".comment-barrage").hide(),
    $(".menu-commentBarrage-text").text("显示热评"),
    document.querySelector("#consoleCommentBarrage").classList.remove("on")),
document.addEventListener("pjax:send", (function() {
        clearInterval(commentInterval)
    }
));
