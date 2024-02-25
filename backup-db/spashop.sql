-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2023 at 04:08 AM
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
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `shop_name` text NOT NULL,
  `location` text NOT NULL,
  `contact` text NOT NULL,
  `opening_time` text NOT NULL,
  `closing_time` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `shop_name`, `location`, `contact`, `opening_time`, `closing_time`, `flag`) VALUES
(1, 'shop1', 'shop1', '0000000000', '8:00', '16:00', 1),
(2, 'shop2', 'shop2', '0000000000', '10:00', '18:00', 1),

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `f_name` text NOT NULL,
  `l_name` text NOT NULL,
  `n_name` text NOT NULL,
  `address` text NOT NULL,
  `tel` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `date_start` DATE,
  `date_end` DATE,
  `emp_type_id` int(11) NOT NULL,
  `job_level_id` int(11) NOT NULL,
  `bank_account` text NOT NULL,
  `wage` int(11) NOT NULL,
  `is_service` int(11) NOT NULL,
  `flag_login` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `f_name`, `l_name`, `n_name`, `address`, `tel`, `username`, `password`, 
`date_start`, `date_end`, `emp_type_id`, `job_level_id`, `bank_account`, `wage`, `is_service`, `flag_login`, `flag`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
 '2023-10-01 00:00:00', NULL, 1, 99, '00000000', 10000, 0, 1, 1),
(2, 'user', 'user', 'user', 'user', 'user', 'user', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 
 '2023-10-01 00:00:00', NULL, 2, 1, '00000000', 10000, 0, 1, 1),
(3, 'user2', 'user2', 'user2', 'user2', 'user2', 'user2', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 
 '2023-10-01 00:00:00', NULL, 2, 1, '00000000', 10000, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `f_name` text NOT NULL,
  `l_name` text NOT NULL,
  `gender` text NOT NULL,
  `address` text NOT NULL,
  `tel` text NOT NULL,
  `email` text NOT NULL,
  `cus_type` text NOT NULL,
  `member_point` int(11) NOT NULL,
  `is_member` int(11) NOT NULL,
  `is_walkin` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `f_name`, `l_name`, `gender`, `address`, `tel`, `email`, `cus_type`, 
`member_point`, `is_member`, `is_walkin`, `flag`) VALUES
(1, 'costomer1', 'costomer1', 'ชาย', 'address', '0987456321', 'mail', 'ทั่วไป', 0, 1, 0, 1),
(2, 'costomer2', 'costomer2', 'หญิง', 'address', '0987456321', 'mail', 'ทั่วไป', 0, 0, 0, 1)

-- --------------------------------------------------------

--
-- Table structure for table `employee_type`
--

CREATE TABLE `employee_type` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_type`
--

INSERT INTO `employee_type` (`id`, `name`, `flag`) VALUES
(1, 'เจ้าของร้าน', 1),
(2, 'พนักงาน', 1);

-- --------------------------------------------------------

--
-- Table structure for table `job_level`
--

CREATE TABLE `job_level` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `responsibilities` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `job_level`
--

INSERT INTO `job_level` (`id`, `description`, `responsibilities`, `flag`) VALUES
(1, 'ดูแลระบบ', 'ดูแลระบบ', 1),
(2, 'พนักงาน1', 'พนักงาน1', 1),
(3, 'พนักงาน2', 'พนักงาน2', 1)

-- --------------------------------------------------------

--
-- Table structure for table `shop_employee`
--

CREATE TABLE `shop_employee` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `shop_employee`
--

INSERT INTO `shop_employee` (`id`, `shop_id`, `emp_id`,`flag`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 1, 2, 1),
(4, 1, 3, 1)

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` double(11,4) NOT NULL,
  `stock` int(11) NOT NULL,
  `min_stock` int(11) NOT NULL,
  `max_stock` int(11) NOT NULL,
  `can_used` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `type_id`, `name`, `price`, `stock`, `min_stock`, `max_stock`, `can_used`, `flag`) VALUES
(1, 1, 'product1', 100.00, 10, 5, 20, 1, 1),
(2, 1, 'product2', 200.00, 3, 5, 20, 1, 1),
(3, 2, 'product3', 1500.00, 10, 2, 10, 8, 1),
(4, 2, 'product4', 2000.00, 10, 2, 10, 20, 1),
(5, 3, 'product5', 50.50, 40, 10, 30, 1, 1)

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `refill_by` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `name`, `refill_by`, `flag`) VALUES
(1, 'สินค้าประเภท1', '', 1),
(2, 'สินค้าประเภท2', '', 1),
(3, 'สินค้าประเภท3', '', 1)

-- --------------------------------------------------------

--
-- Table structure for table `product_reuse`
--

CREATE TABLE `product_reuse` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `remaining` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `product_reuse`
--

INSERT INTO `product_reuse` (`id`, `prod_id`, `remaining`, `flag`) VALUES
(1, 3, 7, 1),
(2, 3, 7, 1),
(3, 4, 18, 1)

-- --------------------------------------------------------

--
-- Table structure for table `product_stock_history`
--

CREATE TABLE `product_stock_history` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `date` DATETIME NOT NULL,
  `old_qty` int(11) NOT NULL,
  `new_qty` int(11) NOT NULL,
  `prod_act_id` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `product_stock_history`
--

INSERT INTO `product_stock_history` (`id`, `prod_id`, `date`, `old_qty`, `new_qty`, `prod_act_id`, 'flag') VALUES
(1, 1, '2023-10-01 10:01:00', 0, 10, 1, 1), -- 1 = add_stock, 2 = remove_stock, 3 = used, 4 = reused
(2, 2, '2023-10-01 10:02:00', 0, 5, 1, 1),
(3, 3, '2023-10-01 10:03:00', 0, 5, 1, 1),
(4, 4, '2023-10-01 10:04:00', 0, 5, 1, 1),
(5, 5, '2023-10-01 10:05:00', 0, 40, 1, 1),
(6, 2, '2023-10-01 10:30:00', 5, 4, 2, 1),
(7, 3, '2023-10-01 10:30:00', 5, 4, 2, 1),
(8, 3, '2023-10-01 10:30:00', 8, 7, 3, 1),
(9, 2, '2023-10-01 10:40:00', 4, 3, 2, 1),
(10, 3, '2023-10-01 10:40:00', 4, 3, 2, 1),
(11, 3, '2023-10-01 10:40:00', 8, 7, 3, 1),
(12, 4, '2023-10-01 11:00:00', 5, 4, 2, 1),
(13, 4, '2023-10-01 11:00:00', 20, 19, 3, 1),
(14, 4, '2023-10-01 13:00:00', 19, 18, 4, 1)

-- --------------------------------------------------------

--
-- Table structure for table `product_stock_action`
--

CREATE TABLE `product_stock_action` (
  `id` int(11) NOT NULL,
  `code` text NOT NULL,
  `desc` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `product_stock_action`
--

INSERT INTO `product_stock_action` (`id`, `code`, `desc`, `flag`) VALUES
(1, 'ADD_STOCK', 'เพิ่มสินค้าเข้าคลัง', 1),
(2, 'REMOVE_STOCK', 'เบิกสินค้าจากคลัง', 1),
(3, 'USE', 'ใช้สินค้าที่เบิกออกมา(เริ่ม)', 1),
(4, 'REUSE', 'ใช้สินค้าที่เบิกออกมา', 1)

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `shop_ratio` decimal(11,4) NOT NULL,
  `emp_ratio` decimal(11,4) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `type_id`, `name`, `shop_ratio`, `emp_ratio`, `flag`) VALUES
(1, 1, 'sevice1', 50, 50, 1),
(2, 1, 'sevice2', 50, 50, 1),
(3, 2, 'sevice3', 50, 50, 1),
(4, 2, 'sevice4', 50, 50, 1),
(5, 3, 'sevice5', 50, 50, 1),
(6, 3, 'sevice6', 50, 50, 1),
(7, 4, 'sevice7', 50, 50, 1),
(8, 4, 'sevice8', 50, 50, 1),
(9, 5, 'sevice9', 50, 50, 1)

-- --------------------------------------------------------

--
-- Table structure for table `service_type`
--

CREATE TABLE `service_type` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_type`
--

INSERT INTO `service_type` (`id`, `group_id`, `name`,`flag`) VALUES
(1, 1, 'ประเภท1', 1),
(2, 1, 'ประเภท2', 1),
(3, 2, 'ประเภท3', 1),
(4, 2, 'ประเภท4', 1),
(5, 2, 'ประเภท5', 1)

-- --------------------------------------------------------

--
-- Table structure for table `service_group`
--

CREATE TABLE `service_group` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `service_group`
--

INSERT INTO `service_group` (`id`, `name`, `flag`) VALUES
(1, 'กลุ่ม1', 1),
(2, 'กลุ่ม2', 1)

-- --------------------------------------------------------

--
-- Table structure for table `service_function`
--

CREATE TABLE `service_function` (
  `id` int(11) NOT NULL,
  `serv_id` int(11) NOT NULL,
  `time` int(11) NOT NULL, -- minute
  `price` decimal(11,4) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `service_function`
--

INSERT INTO `service_function` (`id`, `serv_id`, `time`, `price`, `flag`) VALUES
(1, 1, 30, 150, 1),
(2, 1, 60, 280, 1),
(3, 2, 60, 300, 1),
(4, 3, 60, 350, 1),
(5, 4, 30, 150, 1),
(6, 4, 60, 280, 1),
(7, 5, 60, 300, 1),
(8, 6, 60, 350, 1),
(9, 7, 30, 150, 1),
(10, 7, 60, 280, 1),
(11, 8, 60, 300, 1),
(12, 9, 60, 500, 1)

-- --------------------------------------------------------

--
-- Table structure for table `service_product`
--

CREATE TABLE `service_product` (
  `id` int(11) NOT NULL,
  `sv_func_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

--
-- Dumping data for table `service_product`
--

INSERT INTO `service_product` (`id`, `sv_func_id`, `prod_id`, `qty`, `flag`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 5, 1, 1),
(3, 2, 1, 1, 1),
(4, 2, 5, 1, 1),
(5, 3, 3, 1, 1),
(6, 4, 1, 1, 1),
(7, 4, 5, 1, 1),
(8, 5, 4, 1, 1),
(9, 5, 5, 1, 1),
(10, 6, 4, 2, 1),
(11, 6, 5, 1, 1),
(12, 7, 3, 1, 1),
(13, 8, 2, 1, 1),
(14, 8, 5, 1, 1),
(15, 9, 3, 2, 1),
(16, 9, 5, 1, 1),
(17, 10, 3, 3, 1),
(18, 10, 5, 1, 1),
(19, 11, 4, 2, 1),
(20, 12, 4, 1, 1),
(21, 12, 5, 2, 1)

-- --------------------------------------------------------

--
-- Table structure for table `employee_queue`
--

CREATE TABLE `employee_queue` (
  `id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `status` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_queue`
--

INSERT INTO `employee_queue` (`id`, `emp_id`, `number`, `created_date`, `status`, `flag`) VALUES
(1, 2, 1, '2023-10-01 09:55:00', 0, 1),
(2, 3, 2, '2023-10-01 09:58:00', 0, 1),
(3, 1, 3, '2023-10-01 10:00:00', 0, 1),

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL,
  `cust_id` int(11) NOT NULL,
  `serv_id` int(11) NOT NULL,
  `emp_id` int(11) NULL,
  `room_id` int(11) NOT NULL,
  `vip_id` int(11) NULL,
  `shop_id` int(11) NOT NULL,
  `status` text NOT NULL,
  `is_vip` int(11) NOT NULL,
  `is_confirmed` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `start_date`, `end_date`, `cust_id`, `serv_id`, `emp_id`, `room_id`, `vip_id`, `shop_id`, 
`status`, `is_vip`, `is_confirmed`, `flag`) VALUES
(1, '2023-10-01 13:00:00', '2023-10-04 14:00:00', 1, 1, 2, 1, NULL, 1, "Completed", 0, 1, 1),
(2, '2023-10-01 13:00:00', '2023-10-04 14:00:00', 2, 1, 3, 2, NULL, 1, "Completed", 0, 1, 1),
(3, '2023-10-10 14:00:00', '2023-10-04 15:00:00', 2, 1, 2, 2, NULL, 1, "Onprocess", 0, 0, 1),
(4, '2023-10-10 14:00:00', '2023-10-04 15:00:00', 1, 1, 1, 1, NULL, 1, "Cancelled", 0, 0, 1),
(5, '2023-10-10 14:30:00', '2023-10-04 15:30:00', 1, 1, 1, 1, NULL, 1, "Scheduled", 0, 0, 1)

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `status` int(11) NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `shop_id`, `name`, `type`, `status`, `flag`) VALUES
(1, 1, 'room1', 'standard', 0, 1),
(2, 1, 'room2', 'standard', 0, 1),
(3, 1, 'vip1', 'vip', 0, 1),

-- --------------------------------------------------------

--
-- Table structure for table `vip_member`
--

CREATE TABLE `vip_member` (
  `id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `serv_course_id` int(11) NOT NULL,
  `join_date` DATETIME NOT NULL,
  `expire_date` DATETIME NOT NULL,
  `service_times` int(11) NOT NULL,
  `acc_val` int(11) NOT NULL,
  `remain_val` int(11) NOT NULL,
  `password` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vip_member`
--

INSERT INTO `vip_member` (`id`, `cust_id`, `serv_course_id`, `join_date`, `expire_date`, `service_times`, 
`acc_val`, `remain_val`, `flag`) VALUES
(1, 1, 1, '2024-01-04 14:00:00', '2024-04-04 14:00:00', 0, 0, 2000, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 1)

-- --------------------------------------------------------

--
-- Table structure for table `service_course`
--

CREATE TABLE `service_course` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `times` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_course`
--

INSERT INTO `service_course` (`id`, `name`, `description`, `times`, `price`, `flag`) VALUES
(1, 'course1', 'description course1', 90, 600, 1),
(2, 'course2', 'description course2', 90, 780, 1),

-- --------------------------------------------------------

--
-- Table structure for table `service_in_course`
--

CREATE TABLE `service_in_course` (
  `id` int(11) NOT NULL,
  `serv_course_id` int(11) NOT NULL,
  `serv_func_id` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_in_course`
--

INSERT INTO `service_in_course` (`id`, `serv_course_id`, `serv_func_id`, `flag`) VALUES
(1, 1, 1, 1),
(2, 1, 3, 1),
(3, 1, 5, 1),
(4, 2, 4, 1),
(5, 2, 5, 1),
(6, 2, 6, 1),


-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `appt_id` int(11) NOT NULL,
  `cust_id` int(11) NULL,
  `shop_id` int(11) NULL,
  `emp_id` int(11) NULL,
  `serv_id` int(11) NULL,
  `prod_id` int(11) NULL,
  `prom_id` int(11) NULL,
  `quantity` int(11) NULL,
  `datetime` DATETIME NOT NULL,
  `total_price` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`id`, `appt_id`, `cust_id`, `shop_id`, `emp_id`, `serv_id`, `prod_id`, `prom_id`, 
`quantity`, `datetime`, `total_price`, `flag`) VALUES
(1, 1, null, null, null, null, null, null, null, '2023-10-04 14:00:00', 500, 1),
(2, 2, null, null, null, null, null, null, null, '2023-10-04 14:00:00', 500, 1),


-- --------------------------------------------------------

--
-- Table structure for table `satisfaction_rating`
--

CREATE TABLE `satisfaction_rating` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `serv_rating` int(11) NOT NULL,
  `emp_rating` int(11) NOT NULL,
  `room_rating` int(11) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `comment` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satisfaction_rating`
--

INSERT INTO `satisfaction_rating` (`id`, `sale_id`, `serv_rating`, `emp_rating`, `room_rating`, `datetime`, `comment`, `flag`) VALUES
(1, 1, 5, 5, 5, '2023-10-04 14:00:00', '', 1)

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`, `flag`) VALUES
(1, 'เงินสด', 1)

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `payment_meth_id` int(11) NULL,
  `amount` int(11) NULL,
  `datetime` DATETIME NULL,
  `status` text NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `sale_id`, `payment_meth_id`, `amount`, `datetime`, `status`, `flag`) VALUES
(1, 1, 1, 500, '2023-10-04 14:00:00', 'PAID', 1),
(2, 2, NULL, NULL, NULL, 'PENDING', 1)

-- --------------------------------------------------------

--
-- Table structure for table `pre_vip_member`
--

CREATE TABLE `pre_vip_member` (
  `id` int(11) NOT NULL,
  `id` int(11) NULL,
  `createE_date` DATETIME NOT NULL,
  `serv_course_id` int(11) NOT NULL,
  `f_name` text NOT NULL,
  `l_name` text NOT NULL,
  `gender` text NOT NULL,
  `address` text NOT NULL,
  `tel` text NOT NULL,
  `email` text NOT NULL,
  `tel` text int NULL,
  `price` int(11) NOT NULL,
  `omise_id` text NOT NULL,
  `omise_qr` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pre_vip_member`
--

-- INSERT INTO `pre_vip_member` (`id`, `vip_id`, `create_date`, `serv_course_id`, `f_name`, `l_name`, `gender`, `address`, `tel`, `email`, 
--  `price`, `omise_id`, `omise_qr`, `flag`) VALUES
-- (1, NULL, '2024-01-04 14:00:00', 1, "ลูกค้า", "วีไอพี", "เพศ", "ที่อยู่", "0987452163", "เมลล", 600, 'chrg_test_5yw075rajycujsr6ye8', 'https://api.omise.co/charges/chrg_test_5yw075rajycujsr6ye8/documents/docu_test_5yw075t5wtj69t74fbf/downloads/3C0FE352B1ADFCC2', 1)




--
-- Indexes for dumped tables
--

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_level_id` (`job_level_id`),
  ADD KEY `emp_type_id` (`emp_type_id`)

--
-- Indexes for table `employee_position`
--
ALTER TABLE `employee_type`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `employee_level`
--
ALTER TABLE `job_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_employee`
--
ALTER TABLE `shop_employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `emp_id` (`emp_id`)

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`)

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `product_reuse`
--
ALTER TABLE `product_reuse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prod_id` (`prod_id`)

--
-- Indexes for table `product_stock_history`
--
ALTER TABLE `product_stock_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `prod_act_id` (`prod_act_id`)

--
-- Indexes for table `product_stock_action`
--
ALTER TABLE `product_stock_action`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`)

--
-- Indexes for table `service_group`
--
ALTER TABLE `service_group`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `service_type`
--
ALTER TABLE `service_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`)

--
-- Indexes for table `service_function`
--
ALTER TABLE `service_function`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serv_id` (`serv_id`)

--
-- Indexes for table `service_product`
--
ALTER TABLE `service_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sv_func_id` (`sv_func_id`),
  ADD KEY `prod_id` (`prod_id`)

--
-- Indexes for table `employee_queue`
--
ALTER TABLE `employee_queue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emp_id` (`emp_id`)

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cust_id` (`cust_id`),
  ADD KEY `serv_id` (`serv_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `vip_id` (`vip_id`),
  ADD KEY `shop_id` (`shop_id`)

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `vip_member`
--
ALTER TABLE `vip_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cust_id` (`cust_id`),
  ADD KEY `serv_course_id` (`serv_course_id`)

--
-- Indexes for table `service_course`
--
ALTER TABLE `service_course`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `service_in_course`
--
ALTER TABLE `service_in_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serv_course_id` (`serv_course_id`),
  ADD KEY `serv_func_id` (`serv_func_id`)

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appt_id` (`appt_id`),
  ADD KEY `cust_id` (`cust_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `serv_id` (`serv_id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `prom_id` (`prom_id`)

--
-- Indexes for table `satisfaction_rating`
--
ALTER TABLE `satisfaction_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_id` (`sale_id`)

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`)

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_meth_id` (`payment_meth_id`)


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `employee_position`
--
ALTER TABLE `employee_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `employee_privileges`
--
ALTER TABLE `job_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `employee_privileges_detail`
--
ALTER TABLE `shop_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `product_reuse`
--
ALTER TABLE `product_reuse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `product_stock_action`
--
ALTER TABLE `product_stock_action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `product_stock_history`
--
ALTER TABLE `product_stock_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10

--
-- AUTO_INCREMENT for table `service_group`
--
ALTER TABLE `service_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6

--
-- AUTO_INCREMENT for table `service_function`
--
ALTER TABLE `service_function`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13

--
-- AUTO_INCREMENT for table `service_product`
--
ALTER TABLE `service_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22

--
-- AUTO_INCREMENT for table `employee_queue`
--
ALTER TABLE `employee_queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `vip_member`
--
ALTER TABLE `vip_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4

--
-- AUTO_INCREMENT for table `service_course`
--
ALTER TABLE `service_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `service_in_course`
--
ALTER TABLE `service_in_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7

--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `satisfaction_rating`
--
ALTER TABLE `satisfaction_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3

--
-- AUTO_INCREMENT for table `vip_member`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2

--
-- AUTO_INCREMENT for table `vip_member`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3





--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`emp_type_id`) REFERENCES `employee_type` (`id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`job_level_id`) REFERENCES `job_level` (`id`)

--
-- Constraints for table `shop_employee`
--
ALTER TABLE `shop_employee`
  ADD CONSTRAINT `shop_employee_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `shop_employee_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`)

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `product_type` (`id`)

--
-- Constraints for table `product_reuse`
--
ALTER TABLE `product_reuse`
  ADD CONSTRAINT `product_reuse_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`)

--
-- Constraints for table `product_stock_history`
--
ALTER TABLE `product_stock_history`
  ADD CONSTRAINT `product_stock_history_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_stock_history_ibfk_2` FOREIGN KEY (`prod_act_id`) REFERENCES `product_stock_action` (`id`)

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `service_type` (`id`)

--
-- Constraints for table `service_type`
--
ALTER TABLE `service_type`
  ADD CONSTRAINT `service_type_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `service_group` (`id`)

--
-- Constraints for table `service_function`
--
ALTER TABLE `service_function`
  ADD CONSTRAINT `service_function_ibfk_1` FOREIGN KEY (`serv_id`) REFERENCES `service` (`id`)

--
-- Constraints for table `service_product`
--
ALTER TABLE `service_product`
  ADD CONSTRAINT `service_product_ibfk_1` FOREIGN KEY (`sv_func_id`) REFERENCES `service_function` (`id`),
  ADD CONSTRAINT `service_product_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`)

--
-- Constraints for table `employee_queue`
--
ALTER TABLE `employee_queue`
  ADD CONSTRAINT `employee_queue_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`)

--
-- Constraints for table `service_in_course`
--
ALTER TABLE `service_in_course`
  ADD CONSTRAINT `service_in_course_ibfk_1` FOREIGN KEY (`serv_course_id`) REFERENCES `service_course` (`id`),
  ADD CONSTRAINT `service_in_course_ibfk_2` FOREIGN KEY (`serv_func_id`) REFERENCES `service_function` (`id`)

--
-- Constraints for table `vip_member`
--
ALTER TABLE `vip_member`
  ADD CONSTRAINT `vip_member_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `vip_member_ibfk_2` FOREIGN KEY (`serv_course_id`) REFERENCES `service_course` (`id`)

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`serv_id`) REFERENCES `service_function` (`id`),
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `appointment_ibfk_4` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `appointment_ibfk_5` FOREIGN KEY (`vip_id`) REFERENCES `vip_member` (`id`),
  ADD CONSTRAINT `appointment_ibfk_6` FOREIGN KEY (`shop_id`) REFERENCES `employee` (`id`)

--
-- Constraints for table `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`appt_id`) REFERENCES `appointment` (`id`),
  ADD CONSTRAINT `sale_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `sale_ibfk_3` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `sale_ibfk_4` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `sale_ibfk_5` FOREIGN KEY (`serv_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `sale_ibfk_6` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`)

--
-- Constraints for table `satisfaction_rating`
--
ALTER TABLE `satisfaction_rating`
  ADD CONSTRAINT `satisfaction_rating_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`)

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`payment_meth_id`) REFERENCES `payment_method` (`id`)





/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
