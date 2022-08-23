# 3-基于 MySQL 数据库的后端数据持久化

[toc]



## 1、MySQL 的安装

> 录播



## 2、应用数据的持久化

写在应用程序中的数据（变量）随着程序的运行而创建并保存在内存中，随着程序的进程的退出而销毁。所以我们需要对那些需要长期保存的数据进行持久化的存储，比如保存在硬盘文件中。



## 3、使用简单文本持久化数据

对于少量的、结构简单且没有太多复杂操作需求的数据，我们可以使用类似 xml、json、yml……等格式存储在一个文本文件中。

```json
// J3-0-1 users.json
[
  {
    "id": 1,
    "username": "DaHai"
  },
  {
    "id": 2,
    "username": "zMouse"
  }
]
```

```javascript
// C3-0-1
```



## 4、使用MYSQL进行数据持久化

如果数据量庞大、更多的数据操作需求（查找、排序……），那么这个时候我们就需要使用一些专业的数据管理软件（数据库）来存储这些数据。

- MySQL
- Oracle
- MSSQL
- Redis
- MongoDB
- SQLLite
- ……



## 5、mysql基本概念介绍

### 5-1、数据库（MySQL）术语

**C/S**

`MySQL` 使用 `C/S` 模式（客户端/服务端），由客户端发起连接请求 `MySQL` 服务器来完成对数据库数据的各种操作。

**结构**

```js
'XX数据库' = {
  "用户表": [ // 一组具有相同特性的记录的集合
    // 记录
    {
      // 字段：id，值：1
      "id": 1,
      // 字段：username，值："DaHai"
      "username": "DaHai"
    },
    {
      "id": 2,
      "username": "zMouse"
    }
  ],
  "商品表": [],
  ...
}
```

### 5-2、SQL

SQL (Structured Query Language:结构化查询语言)：用户管理数据库（插入、更新、查询、删除数据，创建数据库、表结构等）的语言。

#### 5-2-1、分类

**数据定义语言（DDL）**

数据库结构操作：`CREATE TABLE`、`DROP TABLE`。

**数据查询语言（DQL: Data Query Language）：**

数据查询：`SELECT`。

**数据操作语言（DML：Data Manipulation Language）：**

数据操作：`INSERT`、`UPDATE`、`DELETE`。

**事务控制语言（TCL）**

事务控制：`COMMIT`、`ROLLBACK`。

**数据控制语言（DCL）：**

数据库使用用户角色管理：`GRANT`、`DENY`、`REVOKE`。

## 6、在Node.js中链接使用mysql

- https://www.npmjs.com/package/@mysql/xdevapi
- https://www.npmjs.com/package/mysql2

### 6-1、Node MySQL 2

#### 6-1-1、安装

```sh
npm i mysql2
```

**回调版本**

```js
const mysql = require('mysql2');
```

**基于 Promise 版本**

```js
const mysql = require('mysql2/promise');
```

#### 6-1-2、链接

```js
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});
```



## 7、常见mysql应用场景案例

### 7-1、添加数据

`MySQL` 使用 `INSERT INTO` 语句向指定的表中插入数据：

```sql
INSERT INTO 
`表名称` (`字段名称一`, `字段名称二`, ...`字段名称N`) 
VALUES 
(`值一`, `值二`, ...`值N`);
```

> Tips：
>
> - `SQL` 关键字（如：`SELECT`、`INTO` 等 不区分大小写）
>
>   - ```sql
>     INSERT INTO `users` (`from`) VALUES ('1');
>     // 等价
>     insert into `users` (`from`) values ('1');
>     ```
>
> - 字段名称、表名称 等建议使用 ` 进行引用，避免出现 字段名称、表名称 等中包含一些   SQL 关键字而导致的错误：
>
>   - ```sql
>     INSERT INTO users (from) VALUES ('1');	// ❎，from 为 `SQL` 关键字
>     INSERT INTO users (`from`) VALUES ('1');	// ✅
>     ```

### 7-2、查询数据

`MySQL` 使用 `SELECT` 语句从指定的表中查询数据：

```sql
SELECT `字段名称一`, `字段名称二`, ...`字段名称N`
FROM `表名称`
[WHERE 条件]
[ORDER BY `字段名称一` [ASC | DESC]], ...[`字段名称N` [ASC | DESC]]
[LIMIT 数量]
[OFFSET 数量]
```

> Tips:
>
> - `SELECT * ...` ; 中的 `*` 表示通配符，表所有字段，但不建议使用（性能、歧义、不直观……）。
> - `[]` 表示为可选项。

#### 7-2-1、where 子句

使用 `where` 子句可以有条件的查询数据。

| 操作符 | 描述     | 用例                                             |
| ------ | -------- | ------------------------------------------------ |
| =      | 等于     | SELECT * FROM \`users\` WHERE \`gender\` = '男'; |
| <>, != | 不等于   | SELECT * FROM \`users\` WHERE \`gender\` = '';   |
| \>     | 大于     | SELECT * FROM \`users\` WHERE \`age\` > 20;      |
| <      | 小于     | SELECT * FROM \`users\` WHERE \`age\` < 20;      |
| \>=    | 大于等于 | SELECT * FROM \`users\` WHERE \`age\` >= 20;     |
| <=     | 小于等于 | SELECT * FROM \`users\` WHERE \`age\` <= 20;     |

#### 7-2-2、组合条件

还可以使用 `AND` 和 `OR` 来指定多个条件。

| 名称 | 描述 | 用例                                                         |
| ---- | ---- | ------------------------------------------------------------ |
| AND  | 并且 | SELECT * FROM \`users\` WHERE \`gender\` = '男' AND \`age\` > 20; |
| OR   | 或者 | SELECT * FROM \`users\` WHERE \`age\` < 10 OR \`age\` > 20;  |

#### 7-2-3、排序

使用 `ORDER BY` 对查询出来的数据按照指定的规则进行排序。

| 名称      | 描述                   | 用例                                                         |
| --------- | ---------------------- | ------------------------------------------------------------ |
| ASC       | 升序（从小到大），默认 | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` ASC; |
| DESC      | 降序（从大到小）       | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` DESC; |
| ASC, DESC | 组合                   | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` DESC, \`age\` ASC; |

#### 7-2-4、限制查询位置与条数

使用 `limit`  和 `offset` 限制查询记录的最大条数和起始位置。

| 名称             | 描述                                                | 用例                                                         |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| LIMIT n          | 最大 n 条                                           | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` ASC LIMIT 1; |
| LIMIT n OFFSET m | 从 m 条开始查询 n 条（LIMIT 在前，OFFSET 在后）     | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` DESC LIMIT 1 OFFSET 5; |
| LIMIT m,n        | 从 m 条开始查询 n 条（OFFSET 值在前，LIMIT 值在后） | SELECT * FROM \`users\` WHERE \`age\` > 20 ORDER BY \`age\` DESC, \`age\` ASC LIMIT 5,1; |

> Tips:
>
> `OFFSET` 表示偏移（跳过、忽略） 默认为 0。

### 7-3、更新数据

`MySQL` 使用 `UPDATE` 语句从指定的表中更新数据：

```sql
UPDATE `表名称`
SET `字段名称一`=字段值一, ...`字段名称N`=字段值N
[WHERE 条件]
```

> Tips:
>
> 更新强烈建议使用 `where` 条件来进行约束，即使无条件，避免忽略导致的全量更新。

### 7-4、删除数据

`MySQL` 使用 `DELETE` 语句从指定的表中删除数据：

```sql
DELETE
FROM `表名称`
[WHERE 条件]
```

> Tips:
>
> 删除强烈建议使用 `where` 条件来进行约束，即使无条件，避免忽略导致的全量删除。

### 7-5、函数

`MySQL` 也内置了许多函数：

> 参考：https://dev.mysql.com/doc/refman/8.0/en/sql-function-reference.html

## 8、案例：使用 msyql 重构商城应用