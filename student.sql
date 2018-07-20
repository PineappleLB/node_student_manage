/*
SQLyog Community
MySQL - 5.6.37-log : Database - student
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`student` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `student`;

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `sid` INT(5) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` VARCHAR(10) NOT NULL COMMENT '姓名',
  `age` INT(3) NOT NULL COMMENT '年龄',
  `class` VARCHAR(20) NOT NULL COMMENT '班级',
  PRIMARY KEY (`sid`)
) ENGINE=INNODB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `student` */

INSERT  INTO `student`(`sid`,`name`,`age`,`class`) VALUES 
(1,'stu19',19,'3-2'),
(2,'stu19',19,'3-2'),
(3,'stu19',19,'3-2'),
(4,'stu19',19,'3-2'),
(5,'stu19',19,'3-2'),
(6,'stu19',19,'3-2'),
(7,'stu19',19,'3-2'),
(8,'stu19',19,'3-2'),
(9,'stu19',19,'3-2'),
(10,'stu19',19,'3-2'),
(11,'stu19',19,'3-2'),
(12,'stu19',19,'3-2'),
(13,'stu19',19,'3-2'),
(14,'stu19',19,'3-2'),
(15,'stu19',19,'3-2'),
(16,'stu19',19,'3-2'),
(17,'stu19',19,'3-2'),
(18,'stu19',19,'3-2'),
(19,'stu19',19,'3-2'),
(20,'stu19',19,'3-2'),
(21,'stu21',18,'3-2'),
(22,'stu22',18,'3-2'),
(23,'stu23',18,'3-2'),
(24,'stu24',18,'3-2'),
(25,'stu25',18,'3-2'),
(26,'stu26',18,'3-2'),
(27,'stu27',18,'3-2'),
(28,'stu28',19,'3-2'),
(29,'stu28',19,'3-2'),
(30,'stu30',22,'3-3'),
(31,'stu111',18,'33-2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

UPDATE student SET NAME = CONCAT('stu', sid)