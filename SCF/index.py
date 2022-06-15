# -*- coding: utf8 -*-
import json
import re
import requests
def main_handler(event, context):
  old="0"
  try:
    old=event['queryString']['old']
  except BaseException:
    pass
  url = "https://h5.cyol.com/special/weixin/sign.json"
  headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'User-Agent': 'Mobile/16D57 MicroMessenger/7.0.3(0x17000321) NetType/WIFI Language/zh_CN',
    'Content-Type': 'text/html; charset=utf-8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  }
  response = requests.request("GET", url, headers=headers).json()
  result=list(response)[-1]
  if old=='1':
    result=list(response)[-2]

  link2="http://h5.cyol.com/special/daxuexi/"+result+"/m.html?t=1"
  str3 = requests.request("GET", link2, headers=headers)
  str3.encoding="utf-8"
  c=re.finditer(r"<title>(.*?)</title>",str3.content.decode())
  title=""
  for match in c: 
    title=match.group(1)

  link3="http://h5.cyol.com/special/daxuexi/"+result+"/images/end.jpg"

  jsonData={}
  jsonData['link']=link3
  jsonData['title']=title
  json_data = json.dumps(jsonData, ensure_ascii=False)
  return {
    "isBase64Encoded": False,
    "statusCode": 200,
    "headers": {'Content-Type': 'application/json'},
    "body": json_data
  }
