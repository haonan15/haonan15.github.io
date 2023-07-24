// 获取ip
function getIpInfo(){
    var fetchUrl = "https://api.ooomn.com/api/ip"
    fetch(fetchUrl)
        .then(res => res.json())
        .then(json =>{
            var country = json.country;
            var ip = json.ip;
            var province = json.province;
            var city = json.city;
            var isp = json.isp;
            document.getElementById("userAgentIp").innerHTML = ip;
            document.getElementById("userAgentCountry").innerHTML = country;
            document.getElementById("userAgentRegion").innerHTML = province;
            document.getElementById("userAgentCity").innerHTML = city;
            document.getElementById("userAgentIsp").innerHTML = isp;
            var uaInfo = navigator.userAgent;
            document.getElementById("userAgentDevice").innerHTML = uaInfo;
        })
}

getIpInfo()