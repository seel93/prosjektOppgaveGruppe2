﻿-- MySQL Script generated by MySQL Workbench
-- ti. 24. april 2018 kl. 09.42 +0200
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema AS_sykkelUtleie
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema AS_sykkelUtleie
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AS_sykkelUtleie` ;
USE `AS_sykkelUtleie` ;

-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`poststed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`poststed` (
  `poststed` VARCHAR(45) NULL,
  `postnr` CHAR(4) NOT NULL,
  PRIMARY KEY (`postnr`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`steder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`steder` (
  `sted_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'kunne vært koblet direkte til bestilling, men er gjerne ikke nødvendig, siden den har 2 relasjoner som kan kobles mot bestilling.',
  `stedsnavn` VARCHAR(45) NULL,
  `poststed_postnr` CHAR(4) NOT NULL,
  PRIMARY KEY (`sted_id`),
  UNIQUE INDEX `sted_id_UNIQUE` (`sted_id` ASC),
  INDEX `fk_steder_poststed1_idx` (`poststed_postnr` ASC),
  CONSTRAINT `fk_steder_poststed1`
    FOREIGN KEY (`poststed_postnr`)
    REFERENCES `AS_sykkelUtleie`.`poststed` (`postnr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`Utstyr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`Utstyr` (
  `utstyr_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `utstyr_Navn` VARCHAR(45) NOT NULL,
  `utstyr_Type` VARCHAR(45) NULL,
  `dagspris` DECIMAL NULL,
  `timepris` DECIMAL NULL,
  `utstyrkode` VARCHAR(45) NULL,
  `var_sist_paa_sted` INT UNSIGNED NOT NULL,
  `tilhoerer_sted` INT UNSIGNED NOT NULL,
  `hjulstoerrelse` VARCHAR(45) NULL,
  `ramme` VARCHAR(45) NULL,
  `utstyr_status` VARCHAR(45) NULL,
  PRIMARY KEY (`utstyr_id`),
  UNIQUE INDEX `utstyr_id_UNIQUE` (`utstyr_id` ASC),
  INDEX `fk_Utstyr_steder3_idx` (`var_sist_paa_sted` ASC),
  INDEX `fk_Utstyr_steder1_idx` (`tilhoerer_sted` ASC),
  CONSTRAINT `fk_Utstyr_steder3`
    FOREIGN KEY (`var_sist_paa_sted`)
    REFERENCES `AS_sykkelUtleie`.`steder` (`sted_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Utstyr_steder1`
    FOREIGN KEY (`tilhoerer_sted`)
    REFERENCES `AS_sykkelUtleie`.`steder` (`sted_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`ansatt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`ansatt` (
  `ansatt_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Kunne laget underdelinger av ansatte, om det er hensikt. F.eks lagerarbeider, transportør, salgsperson, administrerende ansatt.',
  `Jobb` VARCHAR(45) NULL,
  `fulltid` TINYINT(1) NOT NULL COMMENT 'BOOLEAN!?!??!??',
  `loenn` VARCHAR(45) NULL,
  `ansatt_password` VARCHAR(256) NOT NULL,
  `steder_sted_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`ansatt_id`),
  UNIQUE INDEX `ansatt_id_UNIQUE` (`ansatt_id` ASC),
  INDEX `fk_ansatt_steder1_idx` (`steder_sted_id` ASC),
  CONSTRAINT `fk_ansatt_steder1`
    FOREIGN KEY (`steder_sted_id`)
    REFERENCES `AS_sykkelUtleie`.`steder` (`sted_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`kunde`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`kunde` (
  `kunde_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fnavn` VARCHAR(45) NULL,
  `enavn` VARCHAR(45) NULL,
  `mob_nr` VARCHAR(18) NULL,
  `epost` VARCHAR(60) NULL,
  `kunde_password` VARCHAR(256) NOT NULL,
  `steder_sted_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`kunde_id`),
  UNIQUE INDEX `kunde_id_UNIQUE` (`kunde_id` ASC),
  INDEX `fk_kunde_steder1_idx` (`steder_sted_id` ASC),
  CONSTRAINT `fk_kunde_steder1`
    FOREIGN KEY (`steder_sted_id`)
    REFERENCES `AS_sykkelUtleie`.`steder` (`sted_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`bestilling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`bestilling` (
  `bestilling_id` INT NOT NULL AUTO_INCREMENT,
  `pris` VARCHAR(45) NULL,
  `gruppe` TINYINT(1) NULL COMMENT 'BOOLEAN?',
  `kunde_kunde_id` INT UNSIGNED NOT NULL,
  `ansatt_ansatt_id` INT UNSIGNED NOT NULL,
  `bestillingsdato` DATETIME NULL COMMENT 'Datoer burde være i bestilling, fordi alt utstyr innen en bestilling har felles dato. Slik unngår vi dobbeltlagring.',
  `kan_hentes` DATETIME NULL,
  `maa_leveres_foer` DATETIME NULL,
  PRIMARY KEY (`bestilling_id`),
  INDEX `fk_bestilling_kunde1_idx` (`kunde_kunde_id` ASC),
  INDEX `fk_bestilling_ansatt1_idx` (`ansatt_ansatt_id` ASC),
  CONSTRAINT `fk_bestilling_kunde1`
    FOREIGN KEY (`kunde_kunde_id`)
    REFERENCES `AS_sykkelUtleie`.`kunde` (`kunde_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bestilling_ansatt1`
    FOREIGN KEY (`ansatt_ansatt_id`)
    REFERENCES `AS_sykkelUtleie`.`ansatt` (`ansatt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AS_sykkelUtleie`.`Utstyr_has_bestilling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AS_sykkelUtleie`.`Utstyr_has_bestilling` (
  `Utstyr_utstyr_id` INT UNSIGNED NOT NULL,
  `bestilling_bestilling_id` INT NOT NULL,
  PRIMARY KEY (`Utstyr_utstyr_id`, `bestilling_bestilling_id`),
  INDEX `fk_Utstyr_has_bestilling_bestilling1_idx` (`bestilling_bestilling_id` ASC),
  INDEX `fk_Utstyr_has_bestilling_Utstyr1_idx` (`Utstyr_utstyr_id` ASC),
  CONSTRAINT `fk_Utstyr_has_bestilling_Utstyr1`
    FOREIGN KEY (`Utstyr_utstyr_id`)
    REFERENCES `AS_sykkelUtleie`.`Utstyr` (`utstyr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Utstyr_has_bestilling_bestilling1`
    FOREIGN KEY (`bestilling_bestilling_id`)
    REFERENCES `AS_sykkelUtleie`.`bestilling` (`bestilling_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
