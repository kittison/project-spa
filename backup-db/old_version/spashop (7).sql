-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2023 at 07:12 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spashop`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `f_name` text NOT NULL,
  `l_name` text NOT NULL,
  `address` text NOT NULL,
  `tel` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `position_id` int(11) NOT NULL,
  `flag_login` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `f_name`, `l_name`, `address`, `tel`, `username`, `password`, `position_id`, `flag_login`, `flag`) VALUES
(21, 'admin1', 'admin1', 'admin1', 'admin1', 'admin1', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 1, 1, 0),
(22, 'user1', 'user1', 'user1', 'user1', 'user1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 2, 1, 0),
(23, 'user2', 'user2', 'user2', 'user2', 'user2', '', 1, 0, 0),
(24, '12', '12312', '3123', '1231', '2312', '', 1, 0, 0),
(25, '1', '2', '3', '4', '5', '', 1, 0, 0),
(26, 'admin1213', 'admin1', '1', '123', '12', '', 1, 0, 0),
(27, '   1   ', '1', '1', '1', '1', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 2, 1, 0),
(28, 'admin', 'admin', 'admin', 'admin', 'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, 1, 1),
(29, 'user', 'user', 'user', 'user', 'user', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_position`
--

CREATE TABLE `employee_position` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_position`
--

INSERT INTO `employee_position` (`id`, `name`) VALUES
(1, 'เจ้าของร้าน'),
(2, 'พนักงาน');

-- --------------------------------------------------------

--
-- Table structure for table `employee_privileges`
--

CREATE TABLE `employee_privileges` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_privileges`
--

INSERT INTO `employee_privileges` (`id`, `name`) VALUES
(1, 'จัดการสินค้า'),
(2, 'ทดลอง');

-- --------------------------------------------------------

--
-- Table structure for table `employee_privileges_detail`
--

CREATE TABLE `employee_privileges_detail` (
  `id` int(11) NOT NULL,
  `privileges_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_privileges_detail`
--

INSERT INTO `employee_privileges_detail` (`id`, `privileges_id`, `emp_id`) VALUES
(14, 1, 22),
(15, 2, 22),
(16, 2, 27),
(27, 1, 29);

-- --------------------------------------------------------

--
-- Table structure for table `menu_category`
--

CREATE TABLE `menu_category` (
  `id` int(11) NOT NULL,
  `category_name` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_category`
--

INSERT INTO `menu_category` (`id`, `category_name`, `flag`) VALUES
(3, 'ขัดผิว', 0),
(4, 'นวดผ่อนคลาย', 1),
(8, 'นวดน้ำมัน', 1),
(9, 'ขัดผิว', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_cost`
--

CREATE TABLE `menu_cost` (
  `id` int(11) NOT NULL,
  `menu_list_id` int(11) NOT NULL,
  `time` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_cost`
--

INSERT INTO `menu_cost` (`id`, `menu_list_id`, `time`, `price`) VALUES
(1, 1, '1:30', 200);

-- --------------------------------------------------------

--
-- Table structure for table `menu_list`
--

CREATE TABLE `menu_list` (
  `id` int(11) NOT NULL,
  `menu_name` text NOT NULL,
  `menu_category_id` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_list`
--

INSERT INTO `menu_list` (`id`, `menu_name`, `menu_category_id`, `flag`) VALUES
(1, 'นวดแผนไทย', 4, 1),
(14, 'นวดเท้า', 4, 1),
(15, 'นวดน้ำมัน', 8, 1),
(16, 'นวดตัว บน/ล่าง', 8, 1),
(19, 'นวดทั่วไป', 4, 1),
(20, 'ABC', 9, 1),
(21, 'BBB', 9, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `position_id` (`position_id`);

--
-- Indexes for table `employee_position`
--
ALTER TABLE `employee_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_privileges`
--
ALTER TABLE `employee_privileges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_privileges_detail`
--
ALTER TABLE `employee_privileges_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `privileges_id` (`privileges_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `menu_category`
--
ALTER TABLE `menu_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_cost`
--
ALTER TABLE `menu_cost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_list_id` (`menu_list_id`);

--
-- Indexes for table `menu_list`
--
ALTER TABLE `menu_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_category_id` (`menu_category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `employee_position`
--
ALTER TABLE `employee_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_privileges`
--
ALTER TABLE `employee_privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee_privileges_detail`
--
ALTER TABLE `employee_privileges_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `menu_category`
--
ALTER TABLE `menu_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `menu_cost`
--
ALTER TABLE `menu_cost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `menu_list`
--
ALTER TABLE `menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `employee_position` (`id`);

--
-- Constraints for table `employee_privileges_detail`
--
ALTER TABLE `employee_privileges_detail`
  ADD CONSTRAINT `employee_privileges_detail_ibfk_1` FOREIGN KEY (`privileges_id`) REFERENCES `employee_privileges` (`id`),
  ADD CONSTRAINT `employee_privileges_detail_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `menu_cost`
--
ALTER TABLE `menu_cost`
  ADD CONSTRAINT `menu_cost_ibfk_1` FOREIGN KEY (`menu_list_id`) REFERENCES `menu_list` (`id`);

--
-- Constraints for table `menu_list`
--
ALTER TABLE `menu_list`
  ADD CONSTRAINT `menu_list_ibfk_1` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
