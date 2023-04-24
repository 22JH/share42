-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: share42_together
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(20) NOT NULL COMMENT '유저 아이디',
  `PASSWORD` varchar(100) NOT NULL COMMENT '유저 비밀번호',
  `NAME` varchar(20) NOT NULL COMMENT '이름',
  `NICKNAME` varchar(20) NOT NULL COMMENT '유저 벌명',
  `PHONE_NUMBER` varchar(20) NOT NULL COMMENT '전화번호',
  `BIRTH` date NOT NULL COMMENT '생일',
  `SIDO` varchar(10) NOT NULL COMMENT '시도',
  `SIGUNGU` varchar(10) NOT NULL COMMENT '시군구',
  `DONG` varchar(10) NOT NULL COMMENT '동',
  `ADDRESS` varchar(30) NOT NULL COMMENT '유저 주소',
  `IMG` varchar(100) DEFAULT NULL COMMENT '프로필 사진',
  `REG_DT` datetime NOT NULL COMMENT '회원가입 일',
  `ROLE` varchar(10) NOT NULL COMMENT '역할',
  `WALLET_HASH` varchar(100) NOT NULL COMMENT '블록체인 지갑 주소',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='유저 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SIDO` varchar(10) NOT NULL COMMENT '시도',
  `SIGUNGU` varchar(10) NOT NULL COMMENT '시군구',
  `DONG` varchar(10) NOT NULL COMMENT '동',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='주소';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_number`
--

DROP TABLE IF EXISTS `auth_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `NUMBER` varchar(10) NOT NULL COMMENT '인증번호',
  `REG_DT` datetime NOT NULL COMMENT '등록시간',
  `UPT_DT` datetime NOT NULL COMMENT '변경시간',
  `STATUS` tinyint(4) NOT NULL COMMENT '인증여부',
  PRIMARY KEY (`ID`),
  KEY `auth_number_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `auth_number_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='인증번호';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_number`
--

LOCK TABLES `auth_number` WRITE;
/*!40000 ALTER TABLE `auth_number` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow`
--

DROP TABLE IF EXISTS `borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOCKER_ID` int(11) NOT NULL COMMENT '대여함 칸 아이디',
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '사용자 아이디',
  `SHARE_ARTICLE_ID` int(11) NOT NULL COMMENT '물건 아이디',
  `REG_DT` datetime NOT NULL COMMENT '사용 신청 시간',
  `USE_TYPE` int(11) NOT NULL COMMENT '0: 사용신청, 1:사용, 2:취소',
  `CONTRACT_HASH` varchar(100) NOT NULL COMMENT '블록체인 컨트랙트 정보',
  `METADATA_URI` varchar(100) NOT NULL COMMENT '메타데이터 정보',
  PRIMARY KEY (`ID`),
  KEY `borrow_locker_FK` (`LOCKER_ID`),
  KEY `borrow_account_FK` (`ACCOUNT_ID`),
  KEY `borrow_share_article_FK` (`SHARE_ARTICLE_ID`),
  CONSTRAINT `borrow_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `borrow_locker_FK` FOREIGN KEY (`LOCKER_ID`) REFERENCES `locker` (`ID`),
  CONSTRAINT `borrow_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='사용 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow`
--

LOCK TABLES `borrow` WRITE;
/*!40000 ALTER TABLE `borrow` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FROM_ID` int(11) NOT NULL COMMENT '보내는 사람',
  `TO_ID` int(11) NOT NULL COMMENT '받는 사람',
  `RESENT_MSG` varchar(100) NOT NULL COMMENT '최근 메시지',
  `RESENT_SEND` tinyint(4) NOT NULL COMMENT '누가 마지막으로 보냈는지 여부 0:보내는 사람, 1:받는 사람',
  `RESENT_TIME` datetime NOT NULL COMMENT '최근에 보낸 메시지 날짜',
  PRIMARY KEY (`ID`),
  KEY `chat_account_FK_1` (`FROM_ID`),
  KEY `chat_account_FK_2` (`TO_ID`),
  CONSTRAINT `chat_account_FK_1` FOREIGN KEY (`FROM_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `chat_account_FK_2` FOREIGN KEY (`TO_ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='채팅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collect`
--

DROP TABLE IF EXISTS `collect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collect` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOCKER_ID` int(11) NOT NULL COMMENT '대여함 칸 아이디',
  `SHARE_ARTICLE_ID` int(11) NOT NULL COMMENT '물건 아이디',
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '회수자 아이디',
  `REG_DT` datetime NOT NULL COMMENT '회수 시간',
  `CONTRACT_HASH` varchar(20) NOT NULL COMMENT '블록체인 컨트랙트 정보',
  `METADATA_URI` varchar(20) NOT NULL COMMENT '메타데이터 정보',
  PRIMARY KEY (`ID`),
  KEY `collect_locker_FK` (`LOCKER_ID`),
  KEY `collect_share_article_FK` (`SHARE_ARTICLE_ID`),
  KEY `collect_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `collect_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `collect_locker_FK` FOREIGN KEY (`LOCKER_ID`) REFERENCES `locker` (`ID`),
  CONSTRAINT `collect_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회수 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collect`
--

LOCK TABLES `collect` WRITE;
/*!40000 ALTER TABLE `collect` DISABLE KEYS */;
/*!40000 ALTER TABLE `collect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMMUNITY_ID` int(11) NOT NULL COMMENT '커뮤니티 글 아이디',
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `CONTENT` varchar(100) NOT NULL COMMENT '댓글 내용',
  `REG_DT` datetime NOT NULL COMMENT '등록 일시',
  `UPT_DT` datetime NOT NULL COMMENT '변경 일시',
  PRIMARY KEY (`ID`),
  KEY `comment_community_FK` (`COMMUNITY_ID`),
  KEY `comment_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `comment_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `comment_community_FK` FOREIGN KEY (`COMMUNITY_ID`) REFERENCES `community` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `CATEGORY` varchar(10) NOT NULL COMMENT '글 카테고리',
  `TITLE` varchar(30) NOT NULL COMMENT '제목',
  `CONTENT` varchar(200) NOT NULL COMMENT '내용',
  `HITS` int(11) NOT NULL COMMENT '조회 수',
  `REG_DT` datetime NOT NULL COMMENT '등록 일시',
  `UPT_DT` datetime NOT NULL COMMENT '변경 일자',
  `STATUS` tinyint(4) NOT NULL COMMENT '글 삭제 여부',
  PRIMARY KEY (`ID`),
  KEY `community_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `community_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='커뮤니티';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keep`
--

DROP TABLE IF EXISTS `keep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keep` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOCKER_ID` int(11) NOT NULL COMMENT '대여함 칸 아이디',
  `SHARE_ARTICLE_ID` int(11) NOT NULL COMMENT '물건 아이디',
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '보관자 아이디',
  `IMG` varchar(100) NOT NULL COMMENT '대여함 사진 경로',
  `REG_DT` datetime NOT NULL COMMENT '보관 일시',
  `CONTRACT_HASH` varchar(100) NOT NULL COMMENT '블록체인 컨트랙트 정보',
  `METADATA_URI` varchar(100) NOT NULL COMMENT '메타데이터 정보',
  PRIMARY KEY (`ID`),
  KEY `keep_locker_FK` (`LOCKER_ID`),
  KEY `keep_share_article_FK` (`SHARE_ARTICLE_ID`),
  KEY `keep_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `keep_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `keep_locker_FK` FOREIGN KEY (`LOCKER_ID`) REFERENCES `locker` (`ID`),
  CONSTRAINT `keep_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='보관 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keep`
--

LOCK TABLES `keep` WRITE;
/*!40000 ALTER TABLE `keep` DISABLE KEYS */;
/*!40000 ALTER TABLE `keep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `SHARE_ARTICLE_ID` int(11) NOT NULL COMMENT '물건 아이디',
  `REG_DT` datetime NOT NULL COMMENT '등록 일자',
  `UPT_DT` datetime NOT NULL COMMENT '변경 일자',
  `STATUS` tinyint(4) NOT NULL COMMENT '삭제 여부',
  PRIMARY KEY (`ID`),
  KEY `like_account_FK` (`ACCOUNT_ID`),
  KEY `like_share_article_FK` (`SHARE_ARTICLE_ID`),
  CONSTRAINT `like_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `like_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='찜하기 기능 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locker`
--

DROP TABLE IF EXISTS `locker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locker` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOCKER_STATION_ID` int(11) NOT NULL COMMENT '대여함 아이디',
  `SHARE_ARTICLE_ID` int(11) DEFAULT NULL COMMENT '물건 아이디',
  `LOCKER_NUMBER` int(11) NOT NULL COMMENT '대여함 번호',
  `ERROR` tinyint(4) NOT NULL COMMENT '고장 여부',
  `LOCK_STATUS` tinyint(4) NOT NULL COMMENT '잠금 여부',
  `NFC` varchar(100) NOT NULL COMMENT 'NFC 데이터',
  `ARDUINO_SERIAL` varchar(30) NOT NULL COMMENT '아두이노 시리얼번호',
  PRIMARY KEY (`ID`),
  KEY `locker_locker_station_FK` (`LOCKER_STATION_ID`),
  KEY `locker_share_article_FK` (`SHARE_ARTICLE_ID`),
  CONSTRAINT `locker_locker_station_FK` FOREIGN KEY (`LOCKER_STATION_ID`) REFERENCES `locker_station` (`ID`),
  CONSTRAINT `locker_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='대여함 각 칸';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locker`
--

LOCK TABLES `locker` WRITE;
/*!40000 ALTER TABLE `locker` DISABLE KEYS */;
/*!40000 ALTER TABLE `locker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locker_station`
--

DROP TABLE IF EXISTS `locker_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locker_station` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SIDO` varchar(10) NOT NULL COMMENT '시도',
  `SIGUNGU` varchar(10) NOT NULL COMMENT '시군구',
  `DONG` varchar(10) NOT NULL COMMENT '동',
  `ADDRESS` varchar(100) NOT NULL COMMENT '대여함 주소',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='대여함';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locker_station`
--

LOCK TABLES `locker_station` WRITE;
/*!40000 ALTER TABLE `locker_station` DISABLE KEYS */;
/*!40000 ALTER TABLE `locker_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CHAT_ID` int(11) NOT NULL COMMENT '채팅 아이디',
  `CONTENT` varchar(100) NOT NULL COMMENT '메시지',
  `READ` tinyint(4) NOT NULL COMMENT '읽음 여부',
  `FROM_CHECK` tinyint(4) NOT NULL COMMENT '보내는 사람이 작성한 건지',
  `REG_DT` datetime NOT NULL COMMENT '작성 날짜',
  PRIMARY KEY (`ID`),
  KEY `message_chat_FK` (`CHAT_ID`),
  CONSTRAINT `message_chat_FK` FOREIGN KEY (`CHAT_ID`) REFERENCES `chat` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='메시지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `BILLING_KEY` varchar(100) DEFAULT NULL COMMENT '계좌 관련 키 정보',
  `NUMBER` varchar(20) DEFAULT NULL COMMENT '계좌번호',
  PRIMARY KEY (`ID`),
  KEY `payment_method_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `payment_method_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='계좌 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '신고자 아이디',
  `LOCKER_ID` int(11) DEFAULT NULL COMMENT '신고 대여함 칸',
  `SHARE_ARTICLE_ID` int(11) DEFAULT NULL COMMENT '신고 물건 아이디',
  `CATEGORY` varchar(10) NOT NULL COMMENT '신고 유형',
  `TITLE` varchar(30) NOT NULL COMMENT '제목',
  `CONTENT` varchar(100) NOT NULL COMMENT '신고 내용',
  `IMG` varchar(100) NOT NULL COMMENT '이미지 경로',
  `REG_DT` datetime NOT NULL COMMENT '등록일자',
  PRIMARY KEY (`ID`),
  KEY `report_account_FK` (`ACCOUNT_ID`),
  KEY `report_locker_FK` (`LOCKER_ID`),
  KEY `report_share_article_FK` (`SHARE_ARTICLE_ID`),
  CONSTRAINT `report_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `report_locker_FK` FOREIGN KEY (`LOCKER_ID`) REFERENCES `locker` (`ID`),
  CONSTRAINT `report_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='신고';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return`
--

DROP TABLE IF EXISTS `return`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOCKER_ID` int(11) NOT NULL COMMENT '대여함 칸 아이디',
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '사용자 아이디',
  `SHARE_ARTICLE_ID` int(11) NOT NULL COMMENT '물건 아이디',
  `IMG` varchar(100) NOT NULL COMMENT '반납 사진 경로',
  `REG_DT` datetime NOT NULL COMMENT '반납 타입 등록 시간',
  `RETURN_TYPE` int(11) NOT NULL COMMENT '0: 반납신청, 1:반납, 2:취소',
  `CONTRACT_HASH` varchar(100) NOT NULL COMMENT '블록체인 컨트랙트 정보',
  `METADATA_URI` varchar(100) NOT NULL COMMENT '메타데이터 정보',
  `PRICE` int(11) NOT NULL COMMENT '반납 및 송금 가격',
  `PAY_DT` datetime NOT NULL COMMENT '결제 일시',
  `REMMITTANCE_DT` datetime NOT NULL COMMENT '송금 일시',
  `PAY_STATUS` tinyint(4) NOT NULL COMMENT '결제 성공 여부',
  `REMMITTANCE_STATUS` tinyint(4) NOT NULL COMMENT '송금 성공 여부',
  PRIMARY KEY (`ID`),
  KEY `return_locker_FK` (`LOCKER_ID`),
  KEY `return_account_FK` (`ACCOUNT_ID`),
  KEY `return_share_article_FK` (`SHARE_ARTICLE_ID`),
  CONSTRAINT `return_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `return_locker_FK` FOREIGN KEY (`LOCKER_ID`) REFERENCES `locker` (`ID`),
  CONSTRAINT `return_share_article_FK` FOREIGN KEY (`SHARE_ARTICLE_ID`) REFERENCES `share_article` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='반납 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return`
--

LOCK TABLES `return` WRITE;
/*!40000 ALTER TABLE `return` DISABLE KEYS */;
/*!40000 ALTER TABLE `return` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_article`
--

DROP TABLE IF EXISTS `share_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_article` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCOUNT_ID` int(11) NOT NULL COMMENT '유저 아이디',
  `CATEGORY` varchar(10) NOT NULL COMMENT '물건 유형',
  `NAME` varchar(10) NOT NULL COMMENT '물건 이름',
  `CONTENT` varchar(100) NOT NULL COMMENT '특이사항 및 내용',
  `PRICE` int(11) NOT NULL COMMENT '가격',
  `SHARE_PRICE` int(11) NOT NULL COMMENT '하루 당 공유 가격',
  `IMG` varchar(100) NOT NULL COMMENT '물건 사진 경로',
  `REG_DT` datetime NOT NULL COMMENT '등록 시간',
  `UPT_DT` datetime NOT NULL COMMENT '수정 시간',
  `SHARE_STATUS` int(11) NOT NULL COMMENT '0: 수납대기, 1:공유대기중, 2:공유중, 3:반납대기, 4:회수대기, 5:회수',
  `STATUS` tinyint(4) NOT NULL COMMENT '글 삭제 여부',
  `HITS` int(11) NOT NULL COMMENT '조회 수',
  PRIMARY KEY (`ID`),
  KEY `share_article_account_FK` (`ACCOUNT_ID`),
  CONSTRAINT `share_article_account_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='공유 물품 글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_article`
--

LOCK TABLES `share_article` WRITE;
/*!40000 ALTER TABLE `share_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `share_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms`
--

DROP TABLE IF EXISTS `terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CATEGORY` varchar(10) NOT NULL COMMENT '약관 유형',
  `CONTENT` varchar(15000) NOT NULL COMMENT '약관 내용',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='약관 관련';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms`
--

LOCK TABLES `terms` WRITE;
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'share42_together'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24 16:19:09
