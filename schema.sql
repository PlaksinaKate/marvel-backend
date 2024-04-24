-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2024 at 10:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beauty-salon`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id_client` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id_client`, `name`, `phone`) VALUES
(1, 'Иванов Иван Иванович', '8952948г432н');

-- --------------------------------------------------------

--
-- Table structure for table `master`
--

CREATE TABLE `master` (
  `id_master` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master`
--

INSERT INTO `master` (`id_master`, `name`, `position`, `description`) VALUES
(1, 'Чика', 'Маникюралист', 'Крутая чика');

-- --------------------------------------------------------

--
-- Table structure for table `master_work_time`
--

CREATE TABLE `master_work_time` (
  `id` smallint(6) NOT NULL,
  `date` date NOT NULL,
  `time_interval` varchar(255) NOT NULL,
  `master_id` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_work_time`
--

INSERT INTO `master_work_time` (`id`, `date`, `time_interval`, `master_id`) VALUES
(1, '2024-04-19', '10:00-19:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE `record` (
  `id_record` smallint(6) NOT NULL,
  `id_service` smallint(6) NOT NULL,
  `id_master` smallint(6) NOT NULL,
  `id_client` smallint(6) NOT NULL,
  `data_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`id_record`, `id_service`, `id_master`, `id_client`, `data_time`) VALUES
(1, 1, 1, 1, '2024-04-19 17:42:16');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_group` smallint(6) NOT NULL,
  `price` varchar(255) NOT NULL,
  `id_master` smallint(6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `id_group`, `price`, `id_master`, `description`, `time`) VALUES
(1, 'Педикюр с пятками', 1, '50000', 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_group`
--

CREATE TABLE `service_group` (
  `id_group` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_group`
--

INSERT INTO `service_group` (`id_group`, `name`) VALUES
(1, 'Педикюр'),
(2, 'Маникюр');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`id_master`);

--
-- Indexes for table `master_work_time`
--
ALTER TABLE `master_work_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `master_id` (`master_id`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id_record`),
  ADD KEY `id_service` (`id_service`,`id_master`,`id_client`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_master` (`id_master`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_group` (`id_group`),
  ADD KEY `id_master` (`id_master`);

--
-- Indexes for table `service_group`
--
ALTER TABLE `service_group`
  ADD PRIMARY KEY (`id_group`),
  ADD KEY `id_group` (`id_group`),
  ADD KEY `id_group_2` (`id_group`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `id_master` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_work_time`
--
ALTER TABLE `master_work_time`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `record`
--
ALTER TABLE `record`
  MODIFY `id_record` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service_group`
--
ALTER TABLE `service_group`
  MODIFY `id_group` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `master_work_time`
--
ALTER TABLE `master_work_time`
  ADD CONSTRAINT `master_work_time_ibfk_1` FOREIGN KEY (`master_id`) REFERENCES `master` (`id_master`);

--
-- Constraints for table `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`id_master`) REFERENCES `master` (`id_master`),
  ADD CONSTRAINT `record_ibfk_3` FOREIGN KEY (`id_service`) REFERENCES `service` (`id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `service_group` (`id_group`),
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`id_master`) REFERENCES `master` (`id_master`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
