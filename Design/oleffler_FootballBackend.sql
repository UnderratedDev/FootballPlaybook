-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 30, 2017 at 08:16 PM
-- Server version: 5.5.51-38.2
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `oleffler_FootballBackend`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_table`
--

CREATE TABLE IF NOT EXISTS `item_table` (
  `id` int(11) NOT NULL,
  `OptionSelect1` varchar(55) NOT NULL,
  `Months` int(11) NOT NULL,
  `mc_gross` decimal(9,2) NOT NULL DEFAULT '0.00',
  `mc_currency` enum('USD','CAD','EUR','GBP','JPY','CAD') NOT NULL DEFAULT 'USD'
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paypal_table`
--

CREATE TABLE IF NOT EXISTS `paypal_table` (
  `id` int(11) NOT NULL,
  `payer_id` varchar(60) DEFAULT NULL,
  `payment_date` varchar(50) DEFAULT NULL,
  `txn_id` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `payer_email` varchar(75) DEFAULT NULL,
  `payer_status` varchar(50) DEFAULT NULL,
  `payment_type` varchar(50) DEFAULT NULL,
  `memo` tinytext,
  `item_name` varchar(127) DEFAULT NULL,
  `item_number` varchar(127) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `mc_gross` decimal(9,2) DEFAULT NULL,
  `mc_currency` char(3) DEFAULT NULL,
  `address_name` varchar(255) NOT NULL DEFAULT '',
  `address_street` varchar(255) NOT NULL DEFAULT '',
  `address_city` varchar(255) NOT NULL DEFAULT '',
  `address_state` varchar(255) NOT NULL DEFAULT '',
  `address_zip` varchar(255) NOT NULL DEFAULT '',
  `address_country` varchar(255) NOT NULL DEFAULT '',
  `address_status` varchar(255) NOT NULL DEFAULT '',
  `payer_business_name` varchar(255) NOT NULL DEFAULT '',
  `payment_status` varchar(255) NOT NULL DEFAULT '',
  `pending_reason` varchar(255) NOT NULL DEFAULT '',
  `reason_code` varchar(255) NOT NULL DEFAULT '',
  `txn_type` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=1935 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PlayFull`
--

CREATE TABLE IF NOT EXISTS `PlayFull` (
  `PlayID` bigint(20) NOT NULL,
  `PlayString` longtext NOT NULL,
  `PlayName` varchar(50) DEFAULT NULL,
  `Playbook` varchar(50) NOT NULL DEFAULT 'Uncategorized',
  `ImageLocation` varchar(255) NOT NULL,
  `CreatedBy` varchar(50) NOT NULL COMMENT 'User created by',
  `CreateDate` datetime NOT NULL,
  `UpdateDate` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Premium`
--

CREATE TABLE IF NOT EXISTS `Premium` (
  `MemberName` varchar(80) NOT NULL,
  `PremiumFlag` tinyint(1) NOT NULL DEFAULT '0',
  `SubscriptionStartDate` date NOT NULL COMMENT 'Date subscruption starts',
  `SubscriptionLength` int(11) NOT NULL COMMENT 'Months',
  `SubscriptionCost` decimal(10,0) NOT NULL,
  `PromoCode` varchar(50) NOT NULL DEFAULT 'None'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PromoCode`
--

CREATE TABLE IF NOT EXISTS `PromoCode` (
  `PromoCode` varchar(50) NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  `Description` varchar(250) DEFAULT NULL,
  `SubscriptionLength` int(11) NOT NULL,
  `WhereUsed` varchar(250) NOT NULL,
  `Expiration` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_attachments`
--

CREATE TABLE IF NOT EXISTS `smf_attachments` (
  `ID_ATTACH` int(10) unsigned NOT NULL,
  `ID_THUMB` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `attachmentType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `filename` tinytext NOT NULL,
  `file_hash` varchar(40) NOT NULL DEFAULT '',
  `size` int(10) unsigned NOT NULL DEFAULT '0',
  `downloads` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `width` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `height` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_ban_groups`
--

CREATE TABLE IF NOT EXISTS `smf_ban_groups` (
  `ID_BAN_GROUP` mediumint(8) unsigned NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  `ban_time` int(10) unsigned NOT NULL DEFAULT '0',
  `expire_time` int(10) unsigned DEFAULT NULL,
  `cannot_access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cannot_register` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cannot_post` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cannot_login` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `reason` tinytext NOT NULL,
  `notes` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=197 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_ban_items`
--

CREATE TABLE IF NOT EXISTS `smf_ban_items` (
  `ID_BAN` mediumint(8) unsigned NOT NULL,
  `ID_BAN_GROUP` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ip_low1` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_high1` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_low2` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_high2` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_low3` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_high3` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_low4` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ip_high4` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `hostname` tinytext NOT NULL,
  `email_address` tinytext NOT NULL,
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `hits` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=783 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_boards`
--

CREATE TABLE IF NOT EXISTS `smf_boards` (
  `ID_BOARD` smallint(5) unsigned NOT NULL,
  `ID_CAT` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `childLevel` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `ID_PARENT` smallint(5) unsigned NOT NULL DEFAULT '0',
  `boardOrder` smallint(5) NOT NULL DEFAULT '0',
  `ID_LAST_MSG` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MSG_UPDATED` int(10) unsigned NOT NULL DEFAULT '0',
  `memberGroups` varchar(255) NOT NULL DEFAULT '-1,0',
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `numTopics` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `numPosts` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `countPosts` tinyint(4) NOT NULL DEFAULT '0',
  `ID_THEME` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `permission_mode` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `override_theme` tinyint(4) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_board_permissions`
--

CREATE TABLE IF NOT EXISTS `smf_board_permissions` (
  `ID_GROUP` smallint(5) NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `permission` varchar(30) NOT NULL DEFAULT '',
  `addDeny` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_calendar`
--

CREATE TABLE IF NOT EXISTS `smf_calendar` (
  `ID_EVENT` smallint(5) unsigned NOT NULL,
  `startDate` date NOT NULL DEFAULT '0001-01-01',
  `endDate` date NOT NULL DEFAULT '0001-01-01',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `title` varchar(48) NOT NULL DEFAULT '',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_calendar_holidays`
--

CREATE TABLE IF NOT EXISTS `smf_calendar_holidays` (
  `ID_HOLIDAY` smallint(5) unsigned NOT NULL,
  `eventDate` date NOT NULL DEFAULT '0001-01-01',
  `title` varchar(30) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=168 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_categories`
--

CREATE TABLE IF NOT EXISTS `smf_categories` (
  `ID_CAT` tinyint(4) unsigned NOT NULL,
  `catOrder` tinyint(4) NOT NULL DEFAULT '0',
  `name` tinytext NOT NULL,
  `canCollapse` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_collapsed_categories`
--

CREATE TABLE IF NOT EXISTS `smf_collapsed_categories` (
  `ID_CAT` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_actions`
--

CREATE TABLE IF NOT EXISTS `smf_log_actions` (
  `ID_ACTION` int(10) unsigned NOT NULL,
  `logTime` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ip` char(16) NOT NULL DEFAULT '',
  `action` varchar(30) NOT NULL DEFAULT '',
  `extra` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_activity`
--

CREATE TABLE IF NOT EXISTS `smf_log_activity` (
  `date` date NOT NULL DEFAULT '0001-01-01',
  `hits` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `topics` smallint(5) unsigned NOT NULL DEFAULT '0',
  `posts` smallint(5) unsigned NOT NULL DEFAULT '0',
  `registers` smallint(5) unsigned NOT NULL DEFAULT '0',
  `mostOn` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_banned`
--

CREATE TABLE IF NOT EXISTS `smf_log_banned` (
  `ID_BAN_LOG` mediumint(8) unsigned NOT NULL,
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ip` char(16) NOT NULL DEFAULT '',
  `email` tinytext NOT NULL,
  `logTime` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=54013 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_boards`
--

CREATE TABLE IF NOT EXISTS `smf_log_boards` (
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_errors`
--

CREATE TABLE IF NOT EXISTS `smf_log_errors` (
  `ID_ERROR` mediumint(8) unsigned NOT NULL,
  `logTime` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ip` char(16) NOT NULL DEFAULT '',
  `url` text NOT NULL,
  `message` text NOT NULL,
  `session` char(32) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=66330 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_floodcontrol`
--

CREATE TABLE IF NOT EXISTS `smf_log_floodcontrol` (
  `ip` char(16) NOT NULL DEFAULT '',
  `logTime` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_karma`
--

CREATE TABLE IF NOT EXISTS `smf_log_karma` (
  `ID_TARGET` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_EXECUTOR` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `logTime` int(10) unsigned NOT NULL DEFAULT '0',
  `action` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_mark_read`
--

CREATE TABLE IF NOT EXISTS `smf_log_mark_read` (
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_notify`
--

CREATE TABLE IF NOT EXISTS `smf_log_notify` (
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `sent` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_online`
--

CREATE TABLE IF NOT EXISTS `smf_log_online` (
  `session` varchar(32) NOT NULL DEFAULT '',
  `logTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ip` int(10) unsigned NOT NULL DEFAULT '0',
  `url` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_polls`
--

CREATE TABLE IF NOT EXISTS `smf_log_polls` (
  `ID_POLL` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_CHOICE` tinyint(3) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_search_messages`
--

CREATE TABLE IF NOT EXISTS `smf_log_search_messages` (
  `ID_SEARCH` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_search_results`
--

CREATE TABLE IF NOT EXISTS `smf_log_search_results` (
  `ID_SEARCH` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0',
  `relevance` smallint(5) unsigned NOT NULL DEFAULT '0',
  `num_matches` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_search_subjects`
--

CREATE TABLE IF NOT EXISTS `smf_log_search_subjects` (
  `word` varchar(20) NOT NULL DEFAULT '',
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_search_topics`
--

CREATE TABLE IF NOT EXISTS `smf_log_search_topics` (
  `ID_SEARCH` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ID_TOPIC` mediumint(9) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_log_topics`
--

CREATE TABLE IF NOT EXISTS `smf_log_topics` (
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_MSG` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_membergroups`
--

CREATE TABLE IF NOT EXISTS `smf_membergroups` (
  `ID_GROUP` smallint(5) unsigned NOT NULL,
  `groupName` varchar(80) NOT NULL DEFAULT '',
  `onlineColor` varchar(20) NOT NULL DEFAULT '',
  `minPosts` mediumint(9) NOT NULL DEFAULT '-1',
  `maxMessages` smallint(5) unsigned NOT NULL DEFAULT '0',
  `stars` tinytext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_members`
--

CREATE TABLE IF NOT EXISTS `smf_members` (
  `ID_MEMBER` mediumint(8) unsigned NOT NULL,
  `memberName` varchar(80) NOT NULL DEFAULT '',
  `dateRegistered` int(10) unsigned NOT NULL DEFAULT '0',
  `posts` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_GROUP` smallint(5) unsigned NOT NULL DEFAULT '0',
  `lngfile` tinytext NOT NULL,
  `lastLogin` int(10) unsigned NOT NULL DEFAULT '0',
  `realName` tinytext NOT NULL,
  `instantMessages` smallint(5) NOT NULL DEFAULT '0',
  `unreadMessages` smallint(5) NOT NULL DEFAULT '0',
  `buddy_list` text NOT NULL,
  `pm_ignore_list` tinytext NOT NULL,
  `messageLabels` text NOT NULL,
  `passwd` varchar(64) NOT NULL DEFAULT '',
  `emailAddress` tinytext NOT NULL,
  `personalText` tinytext NOT NULL,
  `gender` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `birthdate` date NOT NULL DEFAULT '0001-01-01',
  `websiteTitle` tinytext NOT NULL,
  `websiteUrl` tinytext NOT NULL,
  `location` tinytext NOT NULL,
  `ICQ` tinytext NOT NULL,
  `AIM` varchar(16) NOT NULL DEFAULT '',
  `YIM` varchar(32) NOT NULL DEFAULT '',
  `MSN` tinytext NOT NULL,
  `hideEmail` tinyint(4) NOT NULL DEFAULT '0',
  `showOnline` tinyint(4) NOT NULL DEFAULT '1',
  `timeFormat` varchar(80) NOT NULL DEFAULT '',
  `signature` text NOT NULL,
  `timeOffset` float NOT NULL DEFAULT '0',
  `avatar` tinytext NOT NULL,
  `pm_email_notify` tinyint(4) NOT NULL DEFAULT '0',
  `karmaBad` smallint(5) unsigned NOT NULL DEFAULT '0',
  `karmaGood` smallint(5) unsigned NOT NULL DEFAULT '0',
  `usertitle` tinytext NOT NULL,
  `notifyAnnouncements` tinyint(4) NOT NULL DEFAULT '1',
  `notifyOnce` tinyint(4) NOT NULL DEFAULT '1',
  `notifySendBody` tinyint(4) NOT NULL DEFAULT '0',
  `notifyTypes` tinyint(4) NOT NULL DEFAULT '2',
  `memberIP` tinytext NOT NULL,
  `memberIP2` tinytext NOT NULL,
  `secretQuestion` tinytext NOT NULL,
  `secretAnswer` varchar(64) NOT NULL DEFAULT '',
  `ID_THEME` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `is_activated` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `validation_code` varchar(10) NOT NULL DEFAULT '',
  `ID_MSG_LAST_VISIT` int(10) unsigned NOT NULL DEFAULT '0',
  `additionalGroups` tinytext NOT NULL,
  `smileySet` varchar(48) NOT NULL DEFAULT '',
  `ID_POST_GROUP` smallint(5) unsigned NOT NULL DEFAULT '0',
  `totalTimeLoggedIn` int(10) unsigned NOT NULL DEFAULT '0',
  `passwordSalt` varchar(5) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=215687 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_messages`
--

CREATE TABLE IF NOT EXISTS `smf_messages` (
  `ID_MSG` int(10) unsigned NOT NULL,
  `ID_TOPIC` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `posterTime` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_MSG_MODIFIED` int(10) unsigned NOT NULL DEFAULT '0',
  `subject` tinytext NOT NULL,
  `posterName` tinytext NOT NULL,
  `posterEmail` tinytext NOT NULL,
  `posterIP` tinytext NOT NULL,
  `smileysEnabled` tinyint(4) NOT NULL DEFAULT '1',
  `modifiedTime` int(10) unsigned NOT NULL DEFAULT '0',
  `modifiedName` tinytext NOT NULL,
  `body` text NOT NULL,
  `icon` varchar(16) NOT NULL DEFAULT 'xx'
) ENGINE=MyISAM AUTO_INCREMENT=4121 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_message_icons`
--

CREATE TABLE IF NOT EXISTS `smf_message_icons` (
  `ID_ICON` smallint(5) unsigned NOT NULL,
  `title` varchar(80) NOT NULL DEFAULT '',
  `filename` varchar(80) NOT NULL DEFAULT '',
  `ID_BOARD` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `iconOrder` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_moderators`
--

CREATE TABLE IF NOT EXISTS `smf_moderators` (
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_package_servers`
--

CREATE TABLE IF NOT EXISTS `smf_package_servers` (
  `ID_SERVER` smallint(5) unsigned NOT NULL,
  `name` tinytext NOT NULL,
  `url` tinytext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_permissions`
--

CREATE TABLE IF NOT EXISTS `smf_permissions` (
  `ID_GROUP` smallint(5) NOT NULL DEFAULT '0',
  `permission` varchar(30) NOT NULL DEFAULT '',
  `addDeny` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_personal_messages`
--

CREATE TABLE IF NOT EXISTS `smf_personal_messages` (
  `ID_PM` int(10) unsigned NOT NULL,
  `ID_MEMBER_FROM` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `deletedBySender` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `fromName` tinytext NOT NULL,
  `msgtime` int(10) unsigned NOT NULL DEFAULT '0',
  `subject` tinytext NOT NULL,
  `body` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=365 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_pm_recipients`
--

CREATE TABLE IF NOT EXISTS `smf_pm_recipients` (
  `ID_PM` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `labels` varchar(60) NOT NULL DEFAULT '-1',
  `bcc` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `is_read` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_polls`
--

CREATE TABLE IF NOT EXISTS `smf_polls` (
  `ID_POLL` mediumint(8) unsigned NOT NULL,
  `question` tinytext NOT NULL,
  `votingLocked` tinyint(1) NOT NULL DEFAULT '0',
  `maxVotes` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `expireTime` int(10) unsigned NOT NULL DEFAULT '0',
  `hideResults` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `changeVote` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `posterName` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_poll_choices`
--

CREATE TABLE IF NOT EXISTS `smf_poll_choices` (
  `ID_POLL` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_CHOICE` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `label` tinytext NOT NULL,
  `votes` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_sessions`
--

CREATE TABLE IF NOT EXISTS `smf_sessions` (
  `session_id` char(32) NOT NULL,
  `last_update` int(10) unsigned NOT NULL,
  `data` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_settings`
--

CREATE TABLE IF NOT EXISTS `smf_settings` (
  `variable` tinytext NOT NULL,
  `value` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_smileys`
--

CREATE TABLE IF NOT EXISTS `smf_smileys` (
  `ID_SMILEY` smallint(5) unsigned NOT NULL,
  `code` varchar(30) NOT NULL DEFAULT '',
  `filename` varchar(48) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '',
  `smileyRow` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `smileyOrder` smallint(5) unsigned NOT NULL DEFAULT '0',
  `hidden` tinyint(4) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_themes`
--

CREATE TABLE IF NOT EXISTS `smf_themes` (
  `ID_MEMBER` mediumint(8) NOT NULL DEFAULT '0',
  `ID_THEME` tinyint(4) unsigned NOT NULL DEFAULT '1',
  `variable` tinytext NOT NULL,
  `value` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_topics`
--

CREATE TABLE IF NOT EXISTS `smf_topics` (
  `ID_TOPIC` mediumint(8) unsigned NOT NULL,
  `isSticky` tinyint(4) NOT NULL DEFAULT '0',
  `ID_BOARD` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ID_FIRST_MSG` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_LAST_MSG` int(10) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER_STARTED` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_MEMBER_UPDATED` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_POLL` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `numReplies` int(10) unsigned NOT NULL DEFAULT '0',
  `numViews` int(10) unsigned NOT NULL DEFAULT '0',
  `locked` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=3950 DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_table`
--
ALTER TABLE `item_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paypal_table`
--
ALTER TABLE `paypal_table`
  ADD PRIMARY KEY (`id`), ADD KEY `txn_id` (`txn_id`);

--
-- Indexes for table `PlayFull`
--
ALTER TABLE `PlayFull`
  ADD PRIMARY KEY (`PlayID`), ADD KEY `CreatedBy` (`CreatedBy`);

--
-- Indexes for table `PromoCode`
--
ALTER TABLE `PromoCode`
  ADD PRIMARY KEY (`PromoCode`), ADD KEY `SubscriptionLength` (`SubscriptionLength`), ADD KEY `Active` (`Active`);

--
-- Indexes for table `smf_attachments`
--
ALTER TABLE `smf_attachments`
  ADD PRIMARY KEY (`ID_ATTACH`), ADD UNIQUE KEY `ID_MEMBER` (`ID_MEMBER`,`ID_ATTACH`), ADD KEY `ID_MSG` (`ID_MSG`);

--
-- Indexes for table `smf_ban_groups`
--
ALTER TABLE `smf_ban_groups`
  ADD PRIMARY KEY (`ID_BAN_GROUP`);

--
-- Indexes for table `smf_ban_items`
--
ALTER TABLE `smf_ban_items`
  ADD PRIMARY KEY (`ID_BAN`), ADD KEY `ID_BAN_GROUP` (`ID_BAN_GROUP`);

--
-- Indexes for table `smf_boards`
--
ALTER TABLE `smf_boards`
  ADD PRIMARY KEY (`ID_BOARD`), ADD UNIQUE KEY `categories` (`ID_CAT`,`ID_BOARD`), ADD KEY `ID_PARENT` (`ID_PARENT`), ADD KEY `ID_MSG_UPDATED` (`ID_MSG_UPDATED`), ADD KEY `memberGroups` (`memberGroups`(48));

--
-- Indexes for table `smf_board_permissions`
--
ALTER TABLE `smf_board_permissions`
  ADD PRIMARY KEY (`ID_GROUP`,`ID_BOARD`,`permission`);

--
-- Indexes for table `smf_calendar`
--
ALTER TABLE `smf_calendar`
  ADD PRIMARY KEY (`ID_EVENT`), ADD KEY `startDate` (`startDate`), ADD KEY `endDate` (`endDate`), ADD KEY `topic` (`ID_TOPIC`,`ID_MEMBER`);

--
-- Indexes for table `smf_calendar_holidays`
--
ALTER TABLE `smf_calendar_holidays`
  ADD PRIMARY KEY (`ID_HOLIDAY`), ADD KEY `eventDate` (`eventDate`);

--
-- Indexes for table `smf_categories`
--
ALTER TABLE `smf_categories`
  ADD PRIMARY KEY (`ID_CAT`);

--
-- Indexes for table `smf_collapsed_categories`
--
ALTER TABLE `smf_collapsed_categories`
  ADD PRIMARY KEY (`ID_CAT`,`ID_MEMBER`);

--
-- Indexes for table `smf_log_actions`
--
ALTER TABLE `smf_log_actions`
  ADD PRIMARY KEY (`ID_ACTION`), ADD KEY `logTime` (`logTime`), ADD KEY `ID_MEMBER` (`ID_MEMBER`);

--
-- Indexes for table `smf_log_activity`
--
ALTER TABLE `smf_log_activity`
  ADD PRIMARY KEY (`date`), ADD KEY `hits` (`hits`), ADD KEY `mostOn` (`mostOn`);

--
-- Indexes for table `smf_log_banned`
--
ALTER TABLE `smf_log_banned`
  ADD PRIMARY KEY (`ID_BAN_LOG`), ADD KEY `logTime` (`logTime`);

--
-- Indexes for table `smf_log_boards`
--
ALTER TABLE `smf_log_boards`
  ADD PRIMARY KEY (`ID_MEMBER`,`ID_BOARD`);

--
-- Indexes for table `smf_log_errors`
--
ALTER TABLE `smf_log_errors`
  ADD PRIMARY KEY (`ID_ERROR`), ADD KEY `logTime` (`logTime`), ADD KEY `ID_MEMBER` (`ID_MEMBER`), ADD KEY `ip` (`ip`);

--
-- Indexes for table `smf_log_floodcontrol`
--
ALTER TABLE `smf_log_floodcontrol`
  ADD PRIMARY KEY (`ip`);

--
-- Indexes for table `smf_log_karma`
--
ALTER TABLE `smf_log_karma`
  ADD PRIMARY KEY (`ID_TARGET`,`ID_EXECUTOR`), ADD KEY `logTime` (`logTime`);

--
-- Indexes for table `smf_log_mark_read`
--
ALTER TABLE `smf_log_mark_read`
  ADD PRIMARY KEY (`ID_MEMBER`,`ID_BOARD`);

--
-- Indexes for table `smf_log_notify`
--
ALTER TABLE `smf_log_notify`
  ADD PRIMARY KEY (`ID_MEMBER`,`ID_TOPIC`,`ID_BOARD`);

--
-- Indexes for table `smf_log_online`
--
ALTER TABLE `smf_log_online`
  ADD PRIMARY KEY (`session`), ADD KEY `logTime` (`logTime`), ADD KEY `ID_MEMBER` (`ID_MEMBER`);

--
-- Indexes for table `smf_log_polls`
--
ALTER TABLE `smf_log_polls`
  ADD PRIMARY KEY (`ID_POLL`,`ID_MEMBER`,`ID_CHOICE`);

--
-- Indexes for table `smf_log_search_messages`
--
ALTER TABLE `smf_log_search_messages`
  ADD PRIMARY KEY (`ID_SEARCH`,`ID_MSG`);

--
-- Indexes for table `smf_log_search_results`
--
ALTER TABLE `smf_log_search_results`
  ADD PRIMARY KEY (`ID_SEARCH`,`ID_TOPIC`);

--
-- Indexes for table `smf_log_search_subjects`
--
ALTER TABLE `smf_log_search_subjects`
  ADD PRIMARY KEY (`word`,`ID_TOPIC`), ADD KEY `ID_TOPIC` (`ID_TOPIC`);

--
-- Indexes for table `smf_log_search_topics`
--
ALTER TABLE `smf_log_search_topics`
  ADD PRIMARY KEY (`ID_SEARCH`,`ID_TOPIC`);

--
-- Indexes for table `smf_log_topics`
--
ALTER TABLE `smf_log_topics`
  ADD PRIMARY KEY (`ID_MEMBER`,`ID_TOPIC`), ADD KEY `ID_TOPIC` (`ID_TOPIC`);

--
-- Indexes for table `smf_membergroups`
--
ALTER TABLE `smf_membergroups`
  ADD PRIMARY KEY (`ID_GROUP`), ADD KEY `minPosts` (`minPosts`);

--
-- Indexes for table `smf_members`
--
ALTER TABLE `smf_members`
  ADD PRIMARY KEY (`ID_MEMBER`), ADD KEY `memberName` (`memberName`(30)), ADD KEY `dateRegistered` (`dateRegistered`), ADD KEY `ID_GROUP` (`ID_GROUP`), ADD KEY `birthdate` (`birthdate`), ADD KEY `posts` (`posts`), ADD KEY `lastLogin` (`lastLogin`), ADD KEY `lngfile` (`lngfile`(30)), ADD KEY `ID_POST_GROUP` (`ID_POST_GROUP`);

--
-- Indexes for table `smf_messages`
--
ALTER TABLE `smf_messages`
  ADD PRIMARY KEY (`ID_MSG`), ADD UNIQUE KEY `topic` (`ID_TOPIC`,`ID_MSG`), ADD UNIQUE KEY `ID_BOARD` (`ID_BOARD`,`ID_MSG`), ADD UNIQUE KEY `ID_MEMBER` (`ID_MEMBER`,`ID_MSG`), ADD KEY `ipIndex` (`posterIP`(15),`ID_TOPIC`), ADD KEY `participation` (`ID_MEMBER`,`ID_TOPIC`), ADD KEY `showPosts` (`ID_MEMBER`,`ID_BOARD`), ADD KEY `ID_TOPIC` (`ID_TOPIC`);

--
-- Indexes for table `smf_message_icons`
--
ALTER TABLE `smf_message_icons`
  ADD PRIMARY KEY (`ID_ICON`), ADD KEY `ID_BOARD` (`ID_BOARD`);

--
-- Indexes for table `smf_moderators`
--
ALTER TABLE `smf_moderators`
  ADD PRIMARY KEY (`ID_BOARD`,`ID_MEMBER`);

--
-- Indexes for table `smf_package_servers`
--
ALTER TABLE `smf_package_servers`
  ADD PRIMARY KEY (`ID_SERVER`);

--
-- Indexes for table `smf_permissions`
--
ALTER TABLE `smf_permissions`
  ADD PRIMARY KEY (`ID_GROUP`,`permission`);

--
-- Indexes for table `smf_personal_messages`
--
ALTER TABLE `smf_personal_messages`
  ADD PRIMARY KEY (`ID_PM`), ADD KEY `ID_MEMBER` (`ID_MEMBER_FROM`,`deletedBySender`), ADD KEY `msgtime` (`msgtime`);

--
-- Indexes for table `smf_pm_recipients`
--
ALTER TABLE `smf_pm_recipients`
  ADD PRIMARY KEY (`ID_PM`,`ID_MEMBER`), ADD UNIQUE KEY `ID_MEMBER` (`ID_MEMBER`,`deleted`,`ID_PM`);

--
-- Indexes for table `smf_polls`
--
ALTER TABLE `smf_polls`
  ADD PRIMARY KEY (`ID_POLL`);

--
-- Indexes for table `smf_poll_choices`
--
ALTER TABLE `smf_poll_choices`
  ADD PRIMARY KEY (`ID_POLL`,`ID_CHOICE`);

--
-- Indexes for table `smf_sessions`
--
ALTER TABLE `smf_sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `smf_settings`
--
ALTER TABLE `smf_settings`
  ADD PRIMARY KEY (`variable`(30));

--
-- Indexes for table `smf_smileys`
--
ALTER TABLE `smf_smileys`
  ADD PRIMARY KEY (`ID_SMILEY`);

--
-- Indexes for table `smf_themes`
--
ALTER TABLE `smf_themes`
  ADD PRIMARY KEY (`ID_THEME`,`ID_MEMBER`,`variable`(30)), ADD KEY `ID_MEMBER` (`ID_MEMBER`);

--
-- Indexes for table `smf_topics`
--
ALTER TABLE `smf_topics`
  ADD PRIMARY KEY (`ID_TOPIC`), ADD UNIQUE KEY `lastMessage` (`ID_LAST_MSG`,`ID_BOARD`), ADD UNIQUE KEY `firstMessage` (`ID_FIRST_MSG`,`ID_BOARD`), ADD UNIQUE KEY `poll` (`ID_POLL`,`ID_TOPIC`), ADD KEY `isSticky` (`isSticky`), ADD KEY `ID_BOARD` (`ID_BOARD`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_table`
--
ALTER TABLE `item_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `paypal_table`
--
ALTER TABLE `paypal_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1935;
--
-- AUTO_INCREMENT for table `smf_attachments`
--
ALTER TABLE `smf_attachments`
  MODIFY `ID_ATTACH` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `smf_ban_groups`
--
ALTER TABLE `smf_ban_groups`
  MODIFY `ID_BAN_GROUP` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=197;
--
-- AUTO_INCREMENT for table `smf_ban_items`
--
ALTER TABLE `smf_ban_items`
  MODIFY `ID_BAN` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=783;
--
-- AUTO_INCREMENT for table `smf_boards`
--
ALTER TABLE `smf_boards`
  MODIFY `ID_BOARD` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `smf_calendar`
--
ALTER TABLE `smf_calendar`
  MODIFY `ID_EVENT` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `smf_calendar_holidays`
--
ALTER TABLE `smf_calendar_holidays`
  MODIFY `ID_HOLIDAY` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=168;
--
-- AUTO_INCREMENT for table `smf_categories`
--
ALTER TABLE `smf_categories`
  MODIFY `ID_CAT` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `smf_log_actions`
--
ALTER TABLE `smf_log_actions`
  MODIFY `ID_ACTION` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `smf_log_banned`
--
ALTER TABLE `smf_log_banned`
  MODIFY `ID_BAN_LOG` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=54013;
--
-- AUTO_INCREMENT for table `smf_log_errors`
--
ALTER TABLE `smf_log_errors`
  MODIFY `ID_ERROR` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=66330;
--
-- AUTO_INCREMENT for table `smf_membergroups`
--
ALTER TABLE `smf_membergroups`
  MODIFY `ID_GROUP` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `smf_members`
--
ALTER TABLE `smf_members`
  MODIFY `ID_MEMBER` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=215687;
--
-- AUTO_INCREMENT for table `smf_messages`
--
ALTER TABLE `smf_messages`
  MODIFY `ID_MSG` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4121;
--
-- AUTO_INCREMENT for table `smf_message_icons`
--
ALTER TABLE `smf_message_icons`
  MODIFY `ID_ICON` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `smf_package_servers`
--
ALTER TABLE `smf_package_servers`
  MODIFY `ID_SERVER` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `smf_personal_messages`
--
ALTER TABLE `smf_personal_messages`
  MODIFY `ID_PM` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=365;
--
-- AUTO_INCREMENT for table `smf_polls`
--
ALTER TABLE `smf_polls`
  MODIFY `ID_POLL` mediumint(8) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `smf_smileys`
--
ALTER TABLE `smf_smileys`
  MODIFY `ID_SMILEY` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `smf_topics`
--
ALTER TABLE `smf_topics`
  MODIFY `ID_TOPIC` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3950;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
