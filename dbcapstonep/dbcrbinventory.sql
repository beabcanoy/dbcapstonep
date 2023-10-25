-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2023 at 07:57 AM
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
-- Database: `dbcrbinventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(50) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_name`, `admin_username`, `admin_password`) VALUES
(1, 'Kylander', 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coloredcoil`
--

CREATE TABLE `tbl_coloredcoil` (
  `colored_id` int(11) NOT NULL,
  `colored_date` date NOT NULL,
  `colored_color` varchar(20) NOT NULL,
  `colored_thickness` decimal(3,2) NOT NULL,
  `colored_net_weight` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_coloredcoil`
--

INSERT INTO `tbl_coloredcoil` (`colored_id`, `colored_date`, `colored_color`, `colored_thickness`, `colored_net_weight`, `emp_id`, `admin_id`) VALUES
(3, '2023-10-23', 'Blue', 0.50, 4131, 1, 1),
(5, '2023-10-23', 'Red', 0.30, 4131, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cpurlin`
--

CREATE TABLE `tbl_cpurlin` (
  `cpurlin_id` int(11) NOT NULL,
  `cpurlin_date` date NOT NULL,
  `cpurlin_roll` varchar(20) NOT NULL,
  `cpurlin_thickness` varchar(20) NOT NULL,
  `cpurlin_width` varchar(20) NOT NULL,
  `cpurlin_netweight` int(20) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cpurlin`
--

INSERT INTO `tbl_cpurlin` (`cpurlin_id`, `cpurlin_date`, `cpurlin_roll`, `cpurlin_thickness`, `cpurlin_width`, `cpurlin_netweight`, `emp_id`, `admin_id`) VALUES
(8, '2023-10-23', '1', '0.20', '2x3', 4670, 0, 0),
(9, '2023-10-23', '1', '0.30', '2x5', 2030, 0, 0),
(10, '2023-10-24', '1', '0.30', '2x4', 4670, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

CREATE TABLE `tbl_employee` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_username` varchar(50) NOT NULL,
  `emp_password` varchar(50) NOT NULL,
  `emp_gender` varchar(20) NOT NULL,
  `emp_contactNum` varchar(50) NOT NULL,
  `emp_email` varchar(20) NOT NULL,
  `emp_address` varchar(50) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `emp_status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`emp_id`, `emp_name`, `emp_username`, `emp_password`, `emp_gender`, `emp_contactNum`, `emp_email`, `emp_address`, `last_login`, `emp_status`) VALUES
(1, 'Charls', 'Charly', '123', 'Female', '09069447790', 'CharlsV@gmail.com', 'KSY, Cagayan de Oro', '2023-10-21 01:38:21', 'active'),
(2, 'Kenneth', 'Kenny', '789', 'Other', '09059223371', 'Ken2@gmail.com', 'Bulua, Cagayan de Oro', '2023-10-21 02:02:53', 'active'),
(3, 'Beverly Canoy', 'bev', 'bev123', 'Female', '0912345678', 'canoypenlai@gmail.co', 'Cagayan De Oro City', '2023-10-23 03:05:10', 'active'),
(4, 'Beverly Canoy', 'bev', 'bev123', 'Female', '09265536090', 'canoy@gmail.com', 'Zone 2 Cugman', '2023-10-24 08:06:52', 'active'),
(5, 'Beverly Canoy', 'bev', 'bev123', 'Female', '0912345678', 'canoypenlai@gmail.co', 'Cagayan De Oro City', '2023-10-24 08:07:29', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_finish_materials`
--

CREATE TABLE `tbl_finish_materials` (
  `fm_id` int(11) NOT NULL,
  `fm_date` date NOT NULL,
  `fm_companyName` varchar(20) NOT NULL,
  `fm_productName` varchar(20) NOT NULL,
  `fm_rawType` enum('C-Purlin','Colored Coil','Steel Deck') NOT NULL,
  `fm_color` varchar(10) NOT NULL,
  `fm_thickness` decimal(3,2) NOT NULL,
  `fm_width` varchar(20) NOT NULL,
  `fm_length` int(11) NOT NULL,
  `fm_netweight` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_steeldeck`
--

CREATE TABLE `tbl_steeldeck` (
  `steeldeck_id` int(11) NOT NULL,
  `steeldeck_regisDate` date NOT NULL,
  `steeldeck_roll` varchar(20) NOT NULL,
  `steeldeck_thickness` varchar(10) NOT NULL,
  `roll_net_weight` int(10) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_steeldeck`
--

INSERT INTO `tbl_steeldeck` (`steeldeck_id`, `steeldeck_regisDate`, `steeldeck_roll`, `steeldeck_thickness`, `roll_net_weight`, `emp_id`, `admin_id`) VALUES
(3, '2023-10-23', '1', '0.30', 5400, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_coloredcoil`
--
ALTER TABLE `tbl_coloredcoil`
  ADD PRIMARY KEY (`colored_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `tbl_cpurlin`
--
ALTER TABLE `tbl_cpurlin`
  ADD PRIMARY KEY (`cpurlin_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `tbl_finish_materials`
--
ALTER TABLE `tbl_finish_materials`
  ADD PRIMARY KEY (`fm_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `tbl_steeldeck`
--
ALTER TABLE `tbl_steeldeck`
  ADD PRIMARY KEY (`steeldeck_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_coloredcoil`
--
ALTER TABLE `tbl_coloredcoil`
  MODIFY `colored_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_cpurlin`
--
ALTER TABLE `tbl_cpurlin`
  MODIFY `cpurlin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_finish_materials`
--
ALTER TABLE `tbl_finish_materials`
  MODIFY `fm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_steeldeck`
--
ALTER TABLE `tbl_steeldeck`
  MODIFY `steeldeck_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_finish_materials`
--
ALTER TABLE `tbl_finish_materials`
  ADD CONSTRAINT `tbl_finish_materials_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `tbl_admin` (`admin_id`),
  ADD CONSTRAINT `tbl_finish_materials_ibfk_3` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employee` (`emp_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
