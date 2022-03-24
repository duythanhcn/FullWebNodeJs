-- MySQL dump 10.13  Distrib 5.7.28, for osx10.15 (x86_64)
--
-- Host: 0.0.0.0    Database: db_template
-- ------------------------------------------------------
-- Server version	5.7.21



--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--


--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` VALUES (2,1581823834407,'dbInit1581823834407');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL COMMENT 'The token access to server',
  `refreshToken` varchar(255) NOT NULL COMMENT 'The token to refresh token to access server',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES (3,'duythanhcn@gmail.com','adadfasdasdadf','$2b$10$JBSxLtdjJDkhVmyLgwMsLO5HZ3aH7WImEXq/Cbsm6cCmcnnSp5nF.','duythanhcn@gmail.com','string','','','2020-02-15 08:37:39','2020-02-15 08:37:39'),(6,'duythanhcn@gmail.com','ThanhLD','$2b$10$KxaplVB3cCnU4QPdwt4LAemCCESRlWOu6wffDDDPl3bvkgy8CFhtq','duythanhcn@gmail.com','0','','','2020-02-16 03:05:24','2020-02-16 03:05:24');
