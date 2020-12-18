### 程序简介

> 五子棋

### 程序使用说明

> 1.  项目打包
> 2.  安装 composer 之后在项目根目录下使用 composer install 命令安装 vendor 目录
> 3.  Database 目录下必须有 factories、migrations、seeds 目录
> 4.  必须先配置.env 文件，链接数据库、填写 key（php artisan key:generate）
> 5.  必须先建表（建议使用 php artisan migrate）
> 6.  如果第一次建表，则需要先执行 php artisan migrate:install

### 期望实现功能

> **单机版仅用 HTML+CSS+Javascript 实现**
>
> 1.  人机对战(电脑先手)
> 2.  加入选择先后手功能，并且尽可能加入先手禁手规则(双活三、双四或长连等三种棋形)的判定
> 3.  悔棋

> **联机版使用GatewayWorker框架实现 近期会专注于框架的学习 学习完再继续更新**
>
> 1.  多人对战
> 2.  棋盘复现
> 3.  分数排名

### 更新

> **一、人机对战**
>
> 1.  2020/12/04 棋盘的初步绘制，黑白两玩家下棋。
> 2.  2020/12/05 美化棋子，界面。编写完人机对战大体框架，接下来应专注于赢法判断、人机策略。
> 3.  2020/12/14 添加悔棋功能。

### 开发笔记

1. 在做 web 开发过程中，经常需要调试 js 代码，而在这个时候我们修改过的代码可能不能生效。这是因为浏览器默认是有缓存的，但是这个时候缓存就会影响我们的调试工作。
   解决方案一：在浏览器里面使用 ctrl+shift+R 强制刷新，不使用浏览器缓存来刷新页面。
   解决方案二：浏览器会缓存 css 或 js 文件，通过设置和改变版本号，浏览器就会重新下载新的 js 或 css 文件，在 js 或 css 后加?v= 版本号的用法如下:

```html
<script type="text/javascript" src="jsex.js?version=1.1.6"></script>
<link rel="stylesheet" href="cssex.css?version=1.3.1" type="text/css" />
```
