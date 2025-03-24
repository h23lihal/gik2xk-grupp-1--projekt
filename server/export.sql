/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for osx10.19 (x86_64)
--
-- Host: localhost    Database: teaTime
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `teaTime`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `teaTime` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `teaTime`;

--
-- Dumping data for table `cart_rows`
--

LOCK TABLES `cart_rows` WRITE;
/*!40000 ALTER TABLE `cart_rows` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_rows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'Sommar dröm','Svart te medsmak av hallon och jordgubb 100g',23,'https://quickbutik.imgix.net/50291i/products/636a5f64eef14.jpeg','2025-03-21 08:50:03','2025-03-21 08:58:59'),
(2,'Vinter dröm','Svart te medsmak av kanel och apelsin 40g',45,'https://feelvivid.fi/3292-large_default/apelsin-kanel-te-20-ps-.jpg','2025-03-21 08:56:09','2025-03-21 08:57:38'),
(3,'Ingefära och apelsin','Grönt te med kryddig smak av ingefära och mjuksmak av apelsin 40g',37.98,'https://d1ax460061ulao.cloudfront.net/1000x1000/8/1/819a4559fddc1c6ef3d438b060c30c36.jpg','2025-03-21 09:02:05','2025-03-21 09:02:05'),
(4,'Sweet chai','Sött chai te 34g',42,'https://www.b-bio.fr/wp-content/uploads/2021/10/yogi-tea-sweet-chai-fr.600x0.png','2025-03-21 09:05:15','2025-03-21 09:05:15'),
(5,'rooibos','Milt te med smak av rooibos 30.6g',42,'https://ec.nice-cdn.com/upload/image/product/large/default/yogi-tea-rooibos-ekologiskt-te-17-paasar-2082513-sv.png','2025-03-21 09:08:05','2025-03-21 09:08:05');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-03-21 10:20:19
