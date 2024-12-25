-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 03:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET SESSION sql_require_primary_key = 0;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scandiwebdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` int(11) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordered_items`
--

CREATE TABLE `ordered_items` (
  `id` int(11) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `ordered_item_attributes`
--

CREATE TABLE `ordered_item_attributes` (
  `id` int(11) NOT NULL,
  `ordered_item_id` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `category` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `inStock`, `description`, `category`, `brand`) VALUES
('apple-airpods-pro', 'AirPods Pro', 0, '\\n<h3>Magic like you’ve never heard</h3>\\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.\\n\\n<h3>Active Noise Cancellation</h3>\\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\\n\\n<h3>Transparency mode</h3>\\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\\n\\n<h3>All-new design</h3>\\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\\n\\n<h3>Amazing audio quality</h3>\\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\\n\\n<h3>Even more magical</h3>\\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\\n', 'tech', 'Apple'),
('apple-airtag', 'Airtag', 1, '\\n<h1>Lose your knack for losing things.</h1>\\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\\n', 'tech', 'Apple'),
('apple-imac-2021', 'iMac 2021', 1, 'The new iMac!', 'tech', 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, 'This is iPhone 12. Nothing else to say.', 'tech', 'Apple'),
('huarache-x-stussy-le', 'Nike Air Huarache Le', 1, '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', 1, '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose'),
('ps-5', 'PlayStation 5', 1, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'tech', 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', 0, '\\n<div>\\n    <ul>\\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\\n    </ul>\\n</div>', 'tech', 'Microsoft');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_attribute` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_product` (`product_id`);

--
-- Indexes for table `ordered_items`
--
ALTER TABLE `ordered_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_ordered_item` (`product_id`),
  ADD KEY `fk_ordered_item_id` (`order_id`);

--
-- Indexes for table `ordered_item_attributes`
--
ALTER TABLE `ordered_item_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_price` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `ordered_items`
--
ALTER TABLE `ordered_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `ordered_item_attributes`
--
ALTER TABLE `ordered_item_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `fk_product_attribute` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `FK_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `ordered_items`
--
ALTER TABLE `ordered_items`
  ADD CONSTRAINT `fk_ordered_item_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `fk_product_price` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `product_id`, `amount`) VALUES
(1, 'huarache-x-stussy-le', '144.69'),
(2, 'jacket-canada-goosee', '518.47'),
(3, 'ps-5', '844.02'),
(4, 'xbox-series-s', '333.99'),
(5, 'apple-imac-2021', '1688.03'),
(6, 'apple-iphone-12-pro', '1000.76'),
(7, 'apple-airpods-pro', '300.23'),
(8, 'apple-airtag', '120.57');

-- --------------------------------------------------------

--
-- Dumping data for table `ordered_item_attributes`
--

INSERT INTO `ordered_item_attributes` (`id`, `ordered_item_id`, `type`, `value`) VALUES
(7, '32', 'Size', '40'),
(8, '32', 'Color', 'Orange'),
(9, '33', 'Size', '42'),
(10, '33', 'Color', 'Orange'),
(11, '34', 'Size', '43'),
(12, '34', 'Color', 'Orange'),
(13, '35', 'Size', '43'),
(14, '35', 'Color', 'Orange'),
(15, '36', 'Size', '43'),
(16, '36', 'Color', 'Orange'),
(17, '37', 'Size', '43'),
(18, '37', 'Color', 'Green'),
(19, '38', 'Size', '41'),
(20, '38', 'Color', 'Green');

-- --------------------------------------------------------

--
-- Dumping data for table `ordered_items`
--

INSERT INTO `ordered_items` (`id`, `product_id`, `order_id`, `quantity`) VALUES
(32, 'huarache-x-stussy-le', 28, 1),
(33, 'huarache-x-stussy-le', 29, 1),
(34, 'huarache-x-stussy-le', 30, 3),
(35, 'huarache-x-stussy-le', 30, 3),
(36, 'huarache-x-stussy-le', 30, 3),
(37, 'huarache-x-stussy-le', 31, 1),
(38, 'huarache-x-stussy-le', 31, 1);


--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `product_id`, `url`) VALUES
(1, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),
(2, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),
(3, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'),
(4, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'),
(5, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'),
(6, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),
(7, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'),
(8, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'),
(9, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'),
(10, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'),
(11, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'),
(12, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'),
(13, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),
(14, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'),
(15, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'),
(16, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'),
(17, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'),
(18, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),
(19, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'),
(20, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'),
(21, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'),
(22, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'),
(23, 'apple-imac-2021', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'),
(24, 'apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000'),
(25, 'apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000'),
(26, 'apple-airtag', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');



--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`) VALUES
(28),
(29),
(30),
(31);

-- --------------------------------------------------------

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `product_id`, `type`, `value`) VALUES
(1, 'huarache-x-stussy-le', 'Size', '40'),
(2, 'huarache-x-stussy-le', 'Size', '41'),
(3, 'huarache-x-stussy-le', 'Size', '42'),
(4, 'huarache-x-stussy-le', 'Size', '43'),
(7, 'jacket-canada-goosee', 'Size', 'S'),
(8, 'jacket-canada-goosee', 'Size', 'M'),
(9, 'jacket-canada-goosee', 'Size', 'L'),
(10, 'jacket-canada-goosee', 'Size', 'XL'),
(11, 'ps-5', 'Color', '#44FF03'),
(12, 'ps-5', 'Color', '#03FFF7'),
(13, 'ps-5', 'Color', '#030BFF'),
(14, 'ps-5', 'Color', '#000000'),
(15, 'ps-5', 'Color', '#FFFFFF'),
(16, 'ps-5', 'Capacity', '512G'),
(17, 'ps-5', 'Capacity', '1T'),
(18, 'xbox-series-s', 'Color', '#44FF03'),
(19, 'xbox-series-s', 'Color', '#03FFF7'),
(20, 'xbox-series-s', 'Color', '#030BFF'),
(21, 'xbox-series-s', 'Color', '#000000'),
(22, 'xbox-series-s', 'Color', '#FFFFFF'),
(23, 'xbox-series-s', 'Capacity', '512G'),
(24, 'xbox-series-s', 'Capacity', '1T'),
(25, 'apple-imac-2021', 'Capacity', '256GB'),
(26, 'apple-imac-2021', 'Capacity', '512GB'),
(27, 'apple-imac-2021', 'With USB 3 ports', 'Yes'),
(33, 'apple-imac-2021', 'With USB 3 ports', 'No'),
(34, 'apple-imac-2021', 'Touch ID in keyboard', 'Yes'),
(35, 'apple-imac-2021', 'Touch ID in keyboard', 'No'),
(36, 'apple-iphone-12-pro', 'Capacity', '512G'),
(37, 'apple-iphone-12-pro', 'Capacity', '1T'),
(38, 'apple-iphone-12-pro', 'Color', '#44FF03'),
(39, 'apple-iphone-12-pro', 'Color', '#03FFF7'),
(40, 'apple-iphone-12-pro', 'Color', '#030BFF'),
(41, 'apple-iphone-12-pro', 'Color', '#000000'),
(42, 'apple-iphone-12-pro', 'Color', '#FFFFFF');

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `type`) VALUES
(1, 'clothes'),
(2, 'tech');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
