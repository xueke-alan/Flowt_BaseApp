## SGS Flowt. For GZMR

项目从 2022 年 9 月 16 日开始启动，旨在解决实验室流程上的结构话，数据化，使用数据驱动的方式。管理实验室进程，另外添加一些其他员工、公式政策、培训、考核等多类 OA，希望可以提供一站式实验室解决方案

这篇文档是写给所有开发者，涵盖了系统开发进度，系统技术栈，技术细节，debug 等开发日志。

### 系统架构

#### 前端

前端采用微前端技术，最大程度保护系统的持续开发，所有后来者开发人员，可以在基座应用上开发独立子应用而不依赖于项目本身的技术栈

##### 基座应用

基座应用使用框架是 [Naive Ui Admin]([Naive Ui Admin 开箱即用中台前端框架 | Naive Ui Admin 开箱即用中台前端框架 (naiveadmin.com)](https://docs.naiveadmin.com/)/) ，基于 [Vue3.0](https://github.com/vuejs/vue-next)、[Vite](https://github.com/vitejs/vite)、 [Naive UI](https://www.naiveui.com/)、[TypeScript](https://www.typescriptlang.org/) 的中后台解决方案，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能。Flowt 在框架上进行二次开发，去掉无相关功能，保留有意义部分，并添加了一些其他风格。

###### 动态菜单

使用 qiankun 框架搭建的子应用，只需要提供 qiankun 子应用地址，则自动生成基座应用路由结构，时基座应用与子应用之间的功能进一步解耦。

###### 权限校验

###### 全局搜索

##### 子应用

为了风格的统一，考虑到有人可能使用 React 开发子应用，最好使用与 [Naive UI](https://www.naiveui.com/) 相似的 UI 框架，以获得最好的界面 UI 效果。

#### 后端

后端采用 nodejs 开发，考虑到系统规模暂时优先，未考虑使用 java 开发，nodejs 搭建 next 框架已经可以满足要求

#### 数据库

数据库搭建

RBAC 权限表

密码存储

使用 SHA-256 加密用户密码，盐值，迭代次数均与 Hash 密码一起存在数据库中，此时单个用户的密码仍然可以通过建立彩虹表计算出原始密码。故每个用户的

盐值是一个随机数，

迭代次数可以是破解成本变高，但是固定的迭代次数仍然有风险，在这里每一个用户的迭代次数都不一致，通常来讲，不超过 8ms 的加密被认为是一个合理的迭代次数，如果你有更好的假面方式，可以继续进行修改。

登录逻辑：

前端用户输入明文密码，明文用户名，前端首先使用明文用户名向后端发送请求，后端在数据库表中查询该用户名的盐值与迭代次数，并返回给前端，前端通过获取的盐值与迭代次数，使用 SHA-256 计算出 Hash 密码，并再额外生成一个随机盐值 Hash 密码，将此 Hash 密码以及随机 Hash 密码明文用户名发送给后端，后端验证用户名对应的 hash 密码是否正确。如果正确，返回登陆成功，然后将新的随机哈希密码替换原密码，并交给用户一个时效 Token 值。

每当用户登录后，验证一次 GPO 可用性，如果不可用，显示不可用。

#### 服务器部署

腾讯云服务器+宝塔面板傻瓜式部署

这里讲一下自动化部署，以及子应用部署方案，考虑到子应用可能存在许多个，不可能每一个子应用都单独创建一个解析。这里使用 ngix 将所有子应用部署在一个域名下。

自动化部署

前后端部署顺序

CDN 加速

### 版本号

1.1.1

初代版本

####

# TODOS:

- 移动端页面
- 路由组件从乾坤微组件获取，高内聚，低耦合。
- 单组件宕机不影响全局组件运行。
- 单节点宕机后的提示信息。

### 忘记密码逻辑：

登陆页面点击忘记密码->后端获取 StaffID 发送给对应的邮箱，->忘记密码的用户进入自己的邮箱->点击发送过来的重置密码链接->进入一个含有校验码的重置密码页面-> 发送新密码的 SHA256 加密字符串以及重置密码校验码给后端->后端判断重置密码校验码的合法性，如果合法，修改密码成功，携带 StaffID 跳转到登陆界面

### 管理员重置密码逻辑：

管理员在管理界面点击重置用户密码，一封邮件发送到对应邮箱，后续同上无法登陆邮箱，一封邮件发送到管理员邮箱，点击重置，密码重置为 123456。
