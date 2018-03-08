-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `HasRented` INT NULL,
  `EquipmentId` INT NOT NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Equipment` (
  `idEquipment` INT NOT NULL AUTO_INCREMENT,
  `EquipmentName` VARCHAR(45) NULL,
  PRIMARY KEY (`idEquipment`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Order` (
  `idOrder` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `orderFrom` DATETIME NOT NULL,
  `orderTo` DATETIME NOT NULL,
  `Department_Equipment_idEquipment` INT NOT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `fk_Order_Department1_idx` (`Department_Equipment_idEquipment` ASC),
  CONSTRAINT `fk_Order_Department1`
    FOREIGN KEY (`Department_Equipment_idEquipment`)
    REFERENCES `mydb`.`Department` (`Equipment_idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Bike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Bike` (
  `idBike` INT NOT NULL,
  `isRentable` TINYINT(1) NOT NULL,
  `bikeType` VARCHAR(45) NOT NULL,
  `wheelSize` DOUBLE NOT NULL,
  `gearSystem` VARCHAR(45) NOT NULL,
  `isRented` TINYINT(1) NOT NULL,
  `isStolen` TINYINT(1) NOT NULL,
  `Order_idOrder` INT NOT NULL,
  PRIMARY KEY (`idBike`, `Order_idOrder`),
  INDEX `fk_Bike_Order1_idx` (`Order_idOrder` ASC),
  CONSTRAINT `fk_Bike_Order1`
    FOREIGN KEY (`Order_idOrder`)
    REFERENCES `mydb`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Employee` (
  `idEmployee` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Equipment_idEquipment` INT NOT NULL,
  PRIMARY KEY (`idEmployee`),
  INDEX `fk_Employee_Equipment1_idx` (`Equipment_idEquipment` ASC),
  CONSTRAINT `fk_Employee_Equipment1`
    FOREIGN KEY (`Equipment_idEquipment`)
    REFERENCES `mydb`.`Equipment` (`idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Department` (
  `Equipment_idEquipment` INT NOT NULL,
  `Bike_idBike` INT NOT NULL,
  `Employee_idEmployee` INT NOT NULL,
  PRIMARY KEY (`Equipment_idEquipment`),
  INDEX `fk_Department_Bike1_idx` (`Bike_idBike` ASC),
  INDEX `fk_Department_Employee1_idx` (`Employee_idEmployee` ASC),
  CONSTRAINT `fk_Department_Equipment1`
    FOREIGN KEY (`Equipment_idEquipment`)
    REFERENCES `mydb`.`Equipment` (`idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Department_Bike1`
    FOREIGN KEY (`Bike_idBike`)
    REFERENCES `mydb`.`Bike` (`idBike`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Department_Employee1`
    FOREIGN KEY (`Employee_idEmployee`)
    REFERENCES `mydb`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User_has_Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User_has_Equipment` (
  `Bruker_UserId` INT NOT NULL,
  `Equipment_idEquipment` INT NOT NULL,
  PRIMARY KEY (`Bruker_UserId`, `Equipment_idEquipment`),
  INDEX `fk_Bruker_has_Equipment_Equipment1_idx` (`Equipment_idEquipment` ASC),
  INDEX `fk_Bruker_has_Equipment_Bruker1_idx` (`Bruker_UserId` ASC),
  CONSTRAINT `fk_Bruker_has_Equipment_Bruker1`
    FOREIGN KEY (`Bruker_UserId`)
    REFERENCES `mydb`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bruker_has_Equipment_Equipment1`
    FOREIGN KEY (`Equipment_idEquipment`)
    REFERENCES `mydb`.`Equipment` (`idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Records` (
  `idRecords` INT NOT NULL AUTO_INCREMENT,
  `Department_Equipment_idEquipment` INT NOT NULL,
  `User_has_Equipment_Bruker_UserId` INT NOT NULL,
  `User_has_Equipment_Equipment_idEquipment` INT NOT NULL,
  PRIMARY KEY (`idRecords`),
  INDEX `fk_Records_Department1_idx` (`Department_Equipment_idEquipment` ASC),
  INDEX `fk_Records_User_has_Equipment1_idx` (`User_has_Equipment_Bruker_UserId` ASC, `User_has_Equipment_Equipment_idEquipment` ASC),
  CONSTRAINT `fk_Records_Department1`
    FOREIGN KEY (`Department_Equipment_idEquipment`)
    REFERENCES `mydb`.`Department` (`Equipment_idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Records_User_has_Equipment1`
    FOREIGN KEY (`User_has_Equipment_Bruker_UserId` , `User_has_Equipment_Equipment_idEquipment`)
    REFERENCES `mydb`.`User_has_Equipment` (`Bruker_UserId` , `Equipment_idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Order_has_User` (
  `Order_idOrder` INT NOT NULL,
  `User_UserId` INT NOT NULL,
  `Records_idRecords` INT NOT NULL,
  PRIMARY KEY (`Order_idOrder`, `User_UserId`, `Records_idRecords`),
  INDEX `fk_Order_has_User_User1_idx` (`User_UserId` ASC),
  INDEX `fk_Order_has_User_Order1_idx` (`Order_idOrder` ASC),
  INDEX `fk_Order_has_User_Records1_idx` (`Records_idRecords` ASC),
  CONSTRAINT `fk_Order_has_User_Order1`
    FOREIGN KEY (`Order_idOrder`)
    REFERENCES `mydb`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_has_User_User1`
    FOREIGN KEY (`User_UserId`)
    REFERENCES `mydb`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_has_User_Records1`
    FOREIGN KEY (`Records_idRecords`)
    REFERENCES `mydb`.`Records` (`idRecords`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order_has_Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Order_has_Equipment` (
  `Order_idOrder` INT NOT NULL,
  `Equipment_idEquipment` INT NOT NULL,
  PRIMARY KEY (`Order_idOrder`, `Equipment_idEquipment`),
  INDEX `fk_Order_has_Equipment_Equipment1_idx` (`Equipment_idEquipment` ASC),
  INDEX `fk_Order_has_Equipment_Order1_idx` (`Order_idOrder` ASC),
  CONSTRAINT `fk_Order_has_Equipment_Order1`
    FOREIGN KEY (`Order_idOrder`)
    REFERENCES `mydb`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_has_Equipment_Equipment1`
    FOREIGN KEY (`Equipment_idEquipment`)
    REFERENCES `mydb`.`Equipment` (`idEquipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
