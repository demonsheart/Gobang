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
>1. 人机对战
>2. 悔棋
>3. 多人对战
>4. 棋盘复现
>5. 分数排名

### 更新
>1. 2020/12/04 棋盘的初步绘制，黑白两玩家下棋。
>2. 2020/12/05 美化棋子，界面。编写完人机对战大体框架，接下来应专注于赢法判断、人机策略。