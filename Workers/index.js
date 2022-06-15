addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  const headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'User-Agent': 'Mobile/16D57 MicroMessenger/7.0.3(0x17000321) NetType/WIFI Language/zh_CN',
    'Content-Type': 'text/html; charset=utf-8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  }
  if (pathname.startsWith("/new")||pathname.startsWith("/old")) {
    const nowtime=(new Date()).toLocaleDateString();
    const updatetime=await titles.get("updatetime");
    let keys;
    if(nowtime==updatetime){
      const cachedkeys = await titles.get("keys");
      keys = cachedkeys.split(',');
    }else{
      const response = await fetch("https://h5.cyol.com/special/weixin/sign.json",headers);
      keys = Object.keys(await response.json());
      await titles.put("updatetime",nowtime);
      await titles.put("keys",keys.toString());
    }
    key1=keys.pop();
    key2=keys.pop();
    key=key1;
    if (pathname.startsWith("/old")){
      key=key2;
    }
    let title = await titles.get(key);
    if (title === null) {
      const response2 = await fetch("http://h5.cyol.com/special/daxuexi/"+key+"/m.html?t=1",headers);
      title = (await response2.text()).match(/<title>(.*?)<\/title>/)[1];
      await titles.put(key,title);
    }
    const pic="http://h5.cyol.com/special/daxuexi/"+key+"/images/end.jpg";
    const html=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
</head>
<body>
<div>
<img src="${pic}" style="position: absolute;width: 100%;height: 100%;top:0;left: 0 ;">
</div>
</body>
</html>`
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  }
  guidehtml=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>青年大学习</title>
</head>
<body style="display: flex;flex-direction: column;justify-content: center;align-content: center;height:100vh;">
<script src="https://cdn.jsdelivr.net/gh/yyang49/static@latest/jquery.particleground.min.js"></script>
<div id="particles" style="width: 100%;height: 100vh;overflow: hidden;position: fixed;z-index: -1;top: 0;left: 0;background-color:#4B4B4B"></div>
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function () {particleground(document.getElementById('particles'), {dotColor: 'rgba(0,0,0,0.2)',lineColor: 'rgba(0,0,0,0.2)',directionX: 'left',directionY: 'up'});}, false);
</script>
<p style="margin: 0 auto 0 auto;font-size: 150px;height: 200px;opacity: 0.5;color:white;">学习新思想</p>
<p style="margin: 0 auto 200px auto;font-size: 150px;height: 200px;opacity: 0.5;color:white;">争做新青年</p>
<button onclick="window.location.href='/new'" style="margin: 0 auto 50px auto;font-size: 100px;width: 800px;height: 200px;opacity: 0.5;border-radius: 100px;">最新一期</button>
<button onclick="window.location.href='/old'" style="margin: 50px auto 0 auto;font-size: 100px;width: 800px;height: 200px;opacity: 0.5;border-radius: 100px;">上一期</button>
</body>
</html>`
  return new Response(guidehtml, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}
