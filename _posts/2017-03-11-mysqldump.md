---
layout: post
title: "mysql数据迁移记录"
categories: 编程学习
date: 2017-03-11
tags: [mysql,mysqldump]
---

## mysql数据迁移记录

  记录一下迁移mysql数据中部分表的部分数据过程中，使用的备份方式。因为不是整个数据库的迁移，而是迁移一个数据库中的部分表，而且是这些表的部分数据。简单的可以使用mysqldump命令来导出数据，复杂最后是使用navicat工具来完成的。navicat工具还是挺强大的，实际整个备份的过程都是可以使用其来完成的。

<!-- more -->

### 提前的一些条件

    数据库名称：db_demo
    数据库用户和密码：docUser 123456
    导出数据设置的路径为：/mnt/d/
    数据库中有两个表：doc_user,doc_contact

### 1 导出结构

    整个数据库：mysqldump -u docUser -p123456 db_demo -d > /mnt/d/doc_demo.sql
    单表：mysqldump -u docUser -p123456 db_demo doc_user -d > /mnt/d/doc_user.sql
    多表：mysqldump -u docUser -p123456 db_demo doc_user doc_contact -d > /mnt/d/doc_two.sql

如果需要连接的是远程的数据库，可以添加参数-P 端口和-h 主机名，例如：

    mysqldump -h localhost -P 3306 -u docUser -p123456 db_demo doc_user doc_contact -d > /mnt/d/doc_two.sql    

### 2 导出数据

如果需要将结构和数据同时导出来，使用`mysqldump -u docUser -p123456 db_demo > /mnt/d/doc_demo.sql`

#### 2.1 导出全部

    整个数据库：mysqldump -u docUser -p123456 db_demo -t > /mnt/d/doc_demo.sql

#### 2.2 导出表

    单表: mysqldump -u docUser -p123456 db_demo -t doc_user > /mnt/d/doc_user.sql
    多表：mysqldump -u docUser -p123456 db_demo -t doc_user doc_contact > /mnt/d/doc_two.sql

#### 2.2.1 导出带条件

这里的条件只能是单表的条件，没有连表的导出查询

    带条件：mysqldump -u docUser -p123456 db_demo -t doc_user --where='id>1' > /mnt/d/doc_user.sql

#### 脚本

我们的导出数据可能不止导一次，所以我们可以写成脚本的形式，每次到处数据运行脚本就好了。下面就是一个导出多个表的脚本例子

{% highlight bash %}
userName="docUser"
password="123456"
backupPath="/mnt/d/sql"
databaseName="db_demo"
port="3306"
host="localhost"
if [ ! -d $backupPath ]; then
mkdir $backupPath
fi
## all table output
tables=(
doc_user
doc_contact
)
for table in ${tables[@]}
do
    mysqldump -u $userName -p${password} -P $port -h $host $databaseName $table>"${backupPath}/{table}.sql"
    echo "${table} is outputed!"
done
{% endhighlight %}

#### 2.2.2 导出联表查询

复杂的查询，可以使用工具来导出了。例如我们要导出的数据如下。

    SELECT
	    dc.*
    FROM
	    doc_contact dc
    JOIN doc_user du ON du.id = dc.user_id
    WHERE
	    du.`name` = '张三';

##### 步骤一：创建查询并保存

保存的查询的名字最后会写入sql生成对应的表名，这里将查询名称保存为doc_contact

![图片]({{site.blog.qiniu}}/QQ截图20170311154336.png)

##### 步骤二：设置导出任务

点击导出，设置保存路径，最后将该导出任务保存就好了。

![图片]({{site.blog.qiniu}}/QQ截图20170311155011.png)

![图片]({{site.blog.qiniu}}/QQ截图20170311155053.png)

##### 步骤三：创建计划

最后创建计划，将导出任务添加到计划中，这里可以添加多个任务道计划中，而且计划能够设置执行的时间。

![图片]({{site.blog.qiniu}}/QQ截图20170311155348.png)




