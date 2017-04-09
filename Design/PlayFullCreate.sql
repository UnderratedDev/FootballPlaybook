use playbookdatabase;

DROP TABLE IF EXISTS `PlayFull`;

CREATE TABLE IF NOT EXISTS `PlayFull` (
  `PlayID` bigint(20) PRIMARY KEY AUTO_INCREMENT NOT NULL ,
  `PlayString` longtext NOT NULL,
  `PlayName` varchar(50) DEFAULT NULL,
  `Playbook` varchar(50) NOT NULL DEFAULT 'Uncategorized',
  `CanvasObj` json NOT NULL,
  `CreatedBy` varchar(50) NOT NULL COMMENT 'User created by',
  `CreateDate` datetime NOT NULL,
  `UpdateDate` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

SELECT * FROM playbookdatabase.playfull;