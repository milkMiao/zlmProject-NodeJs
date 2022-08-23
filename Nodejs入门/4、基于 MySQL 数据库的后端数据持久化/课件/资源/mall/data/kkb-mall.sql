/*
 Navicat Premium Data Transfer

 Source Server         : 我的数据库
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost
 Source Database       : kkb-mall

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : utf-8

 Date: 04/20/2021 19:37:49 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `categories`
-- ----------------------------
BEGIN;
INSERT INTO `categories` VALUES ('1', '手机'), ('2', '笔记本'), ('3', '电视机');
COMMIT;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `comments`
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('1', '1', '3', '手机发货快，物流给力，前一天中午下单，第二天一早就收到了，包装很用心，手机质感非常好，系统流畅，颜值高，多种操作模式切换还有黑科技应用，方便快捷，值得购买。用了一段时间才来评价，手机性能优秀，感官上绿屏的影响几乎可以忽略，华为手机，作为凝聚科技力量的产品，品质是越来越好！', '1617415406000'), ('2', '1', '1', '超爱了，出乎意料的喜欢，第一次见面和它，感觉美美哒', '1617358080000'), ('3', '2', '2', '外观很惊艳，很难相信这是几百元的低端手机，屏幕效果心事很好，很细腻，拍照效果也不错，运行速度快，待机时间长，尤其是，5000毫安的大电池，续航时间长，不用担心电量的问题，而且价格便宜，以后买手机就是买红米，多买几个留着用，这可是我挣钱的工具，加油！', '1584974160000'), ('4', '2', '4', '首先，手机外观精致大气端庄，用着稳稳妥妥的蓝绸摩擦感，内有5000mAh电池，并支持18瓦快充——超方便Type-C接口，用了好几天才充电，6.22英寸大屏(刚贴膜沒多久起泡)，手握刚好，屏幕带有一定护眼效果，骁龙八核处理器，用着流畅如飞。手机，物超所值，值得拥有。', '1600263000000'), ('5', '2', '1', '买给婆婆的，可把他高兴坏了，之前他用的手机内存太小一直卡，买个新的给他，内存够用，款也不错，字体很大，非常适合老人家用，总之很方便，我买的是蓝色，耐看，好看！用了一段时间了，她很适应这手机，价格实惠值得推荐继续关注满意以后再来', '1590287280000'), ('6', '1', '1', '测试', '1617523624625'), ('7', '1', '1', '测试', '1617523627100'), ('8', '29', '1', 'asdasd', '1617681557706'), ('9', '29', '1', 'asd', '1617681646790'), ('10', '29', '1', 'asdsa', '1617681680132'), ('11', '29', '1', '123123', '1617681683371'), ('12', '29', '1', '12312321', '1617681686628'), ('13', '29', '1', '123123', '1617681689068'), ('14', '29', '1', 'asdasd', '1617681691723'), ('15', '29', '1', '1123123', '1617681694035'), ('16', '29', '1', 'zxczxc', '1617681696066'), ('17', '29', '1', '123123', '1617681701180'), ('18', '29', '1', '123123', '1617681702995'), ('19', '29', '1', 'sdasd', '1617681704859'), ('20', '29', '1', 'asd', '1617682659847'), ('21', '29', '1', 'asdasd', '1617682666400'), ('22', '29', '1', 'aaaaa', '1617682688480');
COMMIT;

-- ----------------------------
--  Table structure for `items`
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `items`
-- ----------------------------
BEGIN;
INSERT INTO `items` VALUES ('1', '1', '荣耀9X', '129900', 'dc5164850933d966.jpg', '荣耀9X系列正式发布。这款具备了多种旗舰机特性的新品，携带9大突破性的技术登场。荣耀9X采用了7nm制程的麒麟810芯片，并且配备了4800万镜头。'), ('2', '1', 'Redmi 8A', '69900', '68d0ac29ce4a326d.jpg', '红米8A,充电宝级大电量,潮流配色,告别电量焦虑,提升续航时间。'), ('3', '1', '荣耀20青春版', '119900', '79c4d1ea436ed9ea.jpg', '荣耀20青春版是荣耀公司旗下一款手机。于2019年10月22日在北京召开发布会正式推出。'), ('4', '1', '荣耀Play4T Pro', '149900', 'd2db1412dcce1d96.jpg', '荣耀Play4T系列正式发布，其中荣耀Play4T Pro靠1499元的起售价爆红。如果你正在留意这款手机的话，你还会发现它的口碑出奇的好，用户好评一边倒。'), ('5', '1', 'Apple iPhone SE', '379900', 'bb5874532c7633ab.jpg', 'iPhone SE 将 A13 仿生芯片、人像模式、4K 视频、触控 ID、视网膜高清显示屏,以及持久的电池续航,融于 4.7 英寸的设计之中。'), ('6', '1', '华为nova7', '299900', 'b03c1199e47f0661.jpg', '华为nova 7是华为公司于2020年4月23日在其官方线上新品发布会上发布的5G手机。华为nova 7系列的7号色，采用全新升级的双膜双镀工艺，另外，还有其它四种颜色，仲夏紫、绮境森林、蜜语红、亮黑色。'), ('7', '1', '荣耀Play4T', '119900', '993a7456c638b93b.jpg', '荣耀Play4T是荣耀在2020年4月9日发布的定位酷玩科技的全新Play系列手机，起售价格1199元。荣耀Play4T高度：159.81毫米；宽度：76.13毫米；厚度：8.13毫米；重量：176克。荣耀Play4T有幻夜黑，蓝水翡翠，极光蓝三种颜色。'), ('8', '1', '荣耀20 PRO', '229900', '62cf191f88e41447.jpg', '荣耀20Pro采用挖孔屏设计,摄像头开孔位于屏幕左上角,边框细窄,屏占比可观。机身后盖设计简洁,三款配色中冰岛幻镜最为浪漫动人,不同光线和不同角度下都会有颜色的渐变。'), ('9', '1', '荣耀Play3', '99900', '96717b886222b91b.jpg', '9月4日，全新系列荣耀Play3在武汉正式发布，售价999元起。荣耀Play3一举成为千元内首款搭载硬件直出4800万超广角AI三摄、魅眼全视屏及全场景加速引擎的手机。'), ('10', '2', '联想(Lenovo)小新Air14 2020性能版', '549900', '14ae6bae4f0ceea4.jpg', '这款联想(Lenovo)小新Air14 2020性能版采用是酷睿10代i5处理器，16G的双通道内存，512G的固态硬盘，mx350的独立显卡，100%sRGB高色域屏幕。'), ('11', '2', '联想(Lenovo)小新Pro13锐龙版', '499900', 'aa22c3af40ec7b52.jpg', '联想在5月份的时候发布了小新PRO13锐龙版,给原本波澜壮阔的笔记本市场再添一石,市场上对这款笔记本的响应相当好,并冠以“真香本”称号!'), ('12', '2', '联想(Lenovo)小新Pro13', '629900', 'de78d3d1c7630b3b.jpg', 'iPhone SE 将 A13 仿生芯片、人像模式、4K 视频、触控 ID、视网膜高清显示屏,以及持久的电池续航,融于 4.7 英寸的设计之中。'), ('13', '2', '联想(Lenovo)小新15', '559900', '87effede1b943c01.jpg', '联想让你超出想象,活力充沛,潮活力,永不言倦,轻薄造型设计,让你以灵活的姿态迎接一切挑战,游戏本绝对能够满足你的日常使用,独立显卡,领略傲世绝击,狂放挡不住。'), ('14', '2', '华为(HUAWEI) MateBook D', '429900', 'd0afc89316d02270.jpg', '轻薄易用但有点贵的超极本—HUAWEI 华为 Matebook D。'), ('15', '2', 'RedmiBook 14 增强版', '398900', '8ab1131edad29d20.jpg', 'RedmiBook将14英寸笔记本的性能和轻薄推动到一个全新的境界。 最高搭载全新第十代英特尔® 酷睿™ i7处理器、 GeForce® MX250 独立显卡 以及先进的散热系统、高速的内存和存储设备。'), ('16', '2', '荣耀MagicBook Pro', '459900', 'feb860a77684cb42.jpg', '有一款产品,很好的解决了轻薄本办公的使用痛点,它就是荣耀MagicBook Pro锐龙版。'), ('17', '2', 'Apple苹果MacBook Pro15.4英寸/16英寸', '2219900', '3b29d7c76c86d5a1.jpg', '苹果推出的16英寸MacBook Pro,它取代了流行的15英寸笔记本电脑系列。'), ('18', '2', 'Apple 2019款 MacBook Pro 13.3', '1108800', 'c39fe0cb7ab36c13.jpg', 'Apple 出品，值得拥有！'), ('19', '2', '外星人（Alienware）AREA-A51M M15M17新款', '2539900', '0215962626ec524b.jpg', '外星人(Alienware)AREA-A51M M15M17新款轻薄戴尔外星人美行电竞游戏笔记本电脑 51M I9-9900K 2080 144Hz 128G内存 4T固态 1T机械硬盘。'), ('20', '2', '机械革命(MECHREVO)S1 Pro', '397900', '66a2a483cbabb7b2.jpg', '机械革命S1 Pro是一款刚刚上市的轻薄本,其在拥有出色的性能和亲民的售价前提下,做工的精致程度也会让你感到惊讶。'), ('21', '3', '小米电视4X 43英寸', '109900', '8f46cb2c09a10ec4.jpg', '人工智能语音电视,小米电视4X 43英寸。全高清画质,强大的第 6 代画质引擎,细节清晰可见,色彩真实生动。'), ('22', '3', '长虹55D8P 55英寸液晶电视机', '369900', 'd30ebbc320873dbd.jpg', '长虹55D8P 55英寸液晶电视机长虹液晶电视55寸「京东」电视,超大视野,超强画质,沉浸观感,丝毫毕现,智慧互联,畅享新视界!'), ('23', '3', '康佳KKTV K32C 32英寸窄边高清节能护眼液晶平板电视', '59900', '1b0c619e070aed76.jpg', 'KKTV是康佳智能电视线上品牌。K32C 32英寸液晶电视,采用了32寸的1366x768分辨率的A++屏幕,单屏尺寸735*439*84mm,整体外观简洁,双V型底座也比较美观。'), ('24', '3', '飞利浦（PHILIPS）55PUF7294/T3 55英寸', '209900', '871f688468c19598.jpg', '畅享实用功能、优雅格调以及智能连接。飞利浦 7200 系列拥有 4K 高清画质,可呈现优质细节。此外,其内置的智能电视易于使用,使该系列成为轻松享受娱乐的理想选择。'), ('25', '3', 'TCL 55L680 55英寸液晶电视机', '169900', 'f98185309b92dd5b.jpg', 'TCL 55L680 55英寸 4K 液晶电视,8gb存储内存,A53架构芯片,杜比+dts双解码,4K分辨率屏幕,HDR显示技术,自然光调节,Q画质引擎,100%色域覆盖,金属背板。 '), ('26', '3', '海信（Hisense）HZ55E3D-J 55英寸 E3D京享版', '169900', 'ae9d5fbee103262b.jpg', '海信(Hisense)E3D京享版 55英寸 HZ55E3D-J 无边全面屏 AI语音 超高清4K HDR 丰富影视资源 人工智能电视机。'), ('27', '3', '乐视（Letv）超级电视 Y32 32英寸', '63900', '74af09c899df616d.jpg', '乐视(Letv)超级电视 Y32 32英寸 1GB+8GB大存储 HD高清屏人工智能网络液晶高保真音质平板小客厅卧室电视。'), ('28', '3', '康佳（KONKA）LED55D6 55英寸', '169900', '27c61e8fe9e921d3.jpg', '康佳(KONKA) LED55D6 55英寸 4K超高清 智能网络 语音操控 HDR 平板液晶电视。'), ('29', '3', '创维（SKYWORTH）50V20 50英寸4K超高清', '149900', '0c36b11834fa2ce5.jpg', '创维(SKYWORTH)50V20 50英寸 4K超高清 教育电视 1+8G内存 支持投屏 人工智能。');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `created_at` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', 'aaa', 'a952f60aac4fd8a936d9d7515421963a826f6eb3ae1c43b6d189b9a870ef02c4', '', '1522721006000'), ('2', 'lisi', 'a952f60aac4fd8a936d9d7515421963a826f6eb3ae1c43b6d189b9a870ef02c4', '', '1483416001000'), ('3', 'xiaohai', 'a952f60aac4fd8a936d9d7515421963a826f6eb3ae1c43b6d189b9a870ef02c4', '', '1447211471000'), ('4', 'zhaoliu', 'a952f60aac4fd8a936d9d7515421963a826f6eb3ae1c43b6d189b9a870ef02c4', '', '1420970896000'), ('5', 'bbb', 'a952f60aac4fd8a936d9d7515421963a826f6eb3ae1c43b6d189b9a870ef02c4', '', '1617457796332'), ('6', 'aaaaaa', 'a682d5e86d4f1580700e8cf6fbccc01927dc13493b674ff2f3fe474487e6239f', '', '1617632981846'), ('7', 'bbbbbbb', 'a682d5e86d4f1580700e8cf6fbccc01927dc13493b674ff2f3fe474487e6239f', '', '1617633035790'), ('8', 'asdasdasd', 'a682d5e86d4f1580700e8cf6fbccc01927dc13493b674ff2f3fe474487e6239f', '', '1617633060243');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
