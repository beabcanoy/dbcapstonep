-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2023 at 11:19 AM
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
-- Database: `dbcrbsteel`
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
-- Table structure for table `tbl_colored_coil`
--

CREATE TABLE `tbl_colored_coil` (
  `colored_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `thickness_035MM` int(11) DEFAULT NULL,
  `thickness_040MM` int(11) DEFAULT NULL,
  `thickness_050MM` int(11) DEFAULT NULL,
  `thickness_050MM_BackToBack` int(11) DEFAULT NULL,
  `thickness_055MM` int(11) DEFAULT NULL,
  `thickness_060MM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `emp_contactNum` int(11) NOT NULL,
  `emp_email` varchar(20) NOT NULL,
  `emp_address` varchar(50) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `emp_status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`emp_id`, `emp_name`, `emp_username`, `emp_password`, `emp_gender`, `emp_contactNum`, `emp_email`, `emp_address`, `last_login`, `emp_status`) VALUES
(1, 'undefined', 'kyl', 'kyl123', 'Male', 0, 'undefined', 'undefined', '2023-10-16 19:07:02', 'active'),
(2, 'avy', 'bev', 'bev123', 'Female', 909, 'a@a', 'a', '2023-10-16 19:06:25', 'active'),
(3, 'bev', 'bev', 'bev123', 'female', 912345, 'bev@gmail.com', 'cugman', '2023-10-15 11:42:58', 'active'),
(4, 'bev', 'bev', 'bev123', 'female', 912345, 'bev@gmail.com', 'cugman', '2023-10-15 11:42:58', 'active'),
(7, 'kat', 'kyt', 'kyt123', 'Other', 1222, 'k@t', 'rpq', '2023-10-16 18:37:00', 'active'),
(11, 'v', 'v', 'v', 'Male', 2, 'a', 'a', '2023-10-16 15:04:01', 'active'),
(12, 'v', 'v', 'v', 'Male', 2, 'a', 'a', '2023-10-16 15:04:01', 'active'),
(13, '', '', '', 'Male', 0, '', '', '2023-10-16 15:04:57', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_steeldeck`
--

CREATE TABLE `tbl_steeldeck` (
  `steel_id` int(11) NOT NULL,
  `steel_roll` varchar(20) NOT NULL,
  `steel_actual_thickness` varchar(10) NOT NULL,
  `steel_total_weight` int(10) NOT NULL,
  `steel_total_weight_left` int(10) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_steeldeck_history`
--

CREATE TABLE `tbl_steeldeck_history` (
  `history_id` int(11) NOT NULL,
  `history_companyName` varchar(50) NOT NULL,
  `steel_id` int(11) NOT NULL,
  `history_item_actual_thickness` varchar(20) NOT NULL,
  `history_item_order_thickness` int(11) NOT NULL,
  `history_piece` int(11) NOT NULL,
  `history_weight` float NOT NULL,
  `emp_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_colored_coil`
--
ALTER TABLE `tbl_colored_coil`
  ADD PRIMARY KEY (`colored_id`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `tbl_steeldeck`
--
ALTER TABLE `tbl_steeldeck`
  ADD PRIMARY KEY (`steel_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `tbl_steeldeck_history`
--
ALTER TABLE `tbl_steeldeck_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `steel_id` (`steel_id`),
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
-- AUTO_INCREMENT for table `tbl_colored_coil`
--
ALTER TABLE `tbl_colored_coil`
  MODIFY `colored_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_steeldeck`
--
ALTER TABLE `tbl_steeldeck`
  MODIFY `steel_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_steeldeck_history`
--
ALTER TABLE `tbl_steeldeck_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
