## Usage

1. 用`index.py`中的代码在腾讯云SCF创建一个函数服务，函数类型：事件函数，运行环境：Python3.6。
2. 进入第一步创建的函数服务详情，创建触发器，触发方式：API网关触发。
3. 进入API网关触发器的详情页，点击编辑，打开“支持CORS”选项，点击立即完成并发布服务。
4. 用API网关触发器的公网访问路径替换`index.html`中第八行处的网址。
3. 将index.html部署到网络上。
