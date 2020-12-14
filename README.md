### 程序简介
> 五子棋
### 程序使用说明
>1.	项目打包
>2.	安装composer之后在项目根目录下使用composer install命令安装vendor目录
>3.	Database目录下必须有factories、migrations、seeds目录
>4.	必须先配置.env文件，链接数据库、填写key（php artisan key:generate）
>5.	必须先建表（建议使用php artisan migrate）
>6.	如果第一次建表，则需要先执行php artisan migrate:install

### 期望实现功能
>**以下功能仅用HTML+CSS+Javascript实现**
>1. 人机对战(电脑先手)
>2. 加入选择先后手功能，并且尽可能加入先手禁手规则(双活三、双四或长连等三种棋形)的判定
>3. 悔棋

>**以下功能使用laravel框架，在上面的基础上加入PHP后台管理，MySQL存储信息实现**
>1. 多人对战
>2. 棋盘复现
>3. 分数排名

### 更新
>**一、人机对战**
>1. 2020/12/04 棋盘的初步绘制，黑白两玩家下棋。
>2. 2020/12/05 美化棋子，界面。编写完人机对战大体框架，接下来应专注于赢法判断、人机策略。
>3. 2020/12/14 添加悔棋功能。

### 开发笔记
1. 在做web开发过程中，经常需要调试js代码，而在这个时候我们修改过的代码可能不能生效。这是因为浏览器默认是有缓存的，但是这个时候缓存就会影响我们的调试工作。
解决方案一：在浏览器里面使用 ctrl+shift+R 强制刷新，不使用浏览器缓存来刷新页面。
解决方案二：浏览器会缓存css或js文件，通过设置和改变版本号，浏览器就会重新下载新的js或css文件，在js或css后加?v= 版本号的用法如下:
``` html
<script type=”text/javascript” src=”jsex.js?version=1.1.6″></script> 
<link rel=’stylesheet’ href=’cssex.css?version=1.3.1′ type=’text/css’ />
```
