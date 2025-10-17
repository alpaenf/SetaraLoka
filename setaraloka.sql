-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 16, 2025 at 07:13 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `setaraloka`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `parent_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 7, NULL, 'Consequatur voluptas aut aliquid asperiores. Ullam voluptas rerum harum error. Occaecati sit nesciunt autem expedita.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(2, 1, 14, 1, 'Quaerat quibusdam quas quibusdam quisquam omnis sequi ducimus.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(3, 1, 19, 1, 'At omnis perferendis officiis placeat vitae doloribus quo. Porro praesentium temporibus facilis magni aut. Eum modi beatae et libero est laborum cupiditate.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(4, 1, 13, 1, 'Autem corrupti cumque voluptatum molestias ut vel perferendis. Quia inventore nemo cum et rerum.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(5, 1, 4, 4, 'Deserunt vitae animi velit dolorem sequi qui. Natus est et voluptatem rem magni vero autem ex.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(6, 1, 17, NULL, 'Possimus ut doloremque rerum dolorem neque facilis.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(7, 1, 3, NULL, 'Perferendis architecto illum iure expedita.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(8, 1, 2, 7, 'Dolorum nihil nam nulla dolorem est consequatur corrupti. Consequuntur dolor molestiae expedita ullam. Qui qui tempore est officiis.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(9, 1, 12, 8, 'Exercitationem nostrum explicabo et autem aspernatur.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(10, 1, 10, NULL, 'Recusandae ad sit libero numquam est. Sunt illum repellendus aut modi autem rerum dolorem maxime. Omnis magni placeat dolore tempora et porro.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(11, 1, 4, 10, 'Esse aliquid voluptas iure culpa exercitationem esse enim cumque.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(12, 1, 12, NULL, 'Consectetur ratione voluptatem dolore aut et sapiente ipsam nam. Corrupti qui molestias atque dolor aut natus eligendi. Alias labore incidunt optio illum enim minima itaque.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(13, 1, 1, NULL, 'Sit nesciunt veritatis assumenda dolore. Architecto incidunt alias omnis est totam non sed. Qui aperiam quisquam sed nam quos qui numquam.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(14, 3, 21, NULL, 'Sed ab quibusdam qui voluptas. Inventore id eum ut quas dolor ad. Doloremque sit ab excepturi suscipit.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(15, 3, 7, NULL, 'Et porro officiis quia cumque. Aut voluptatibus sint ut quos neque quas exercitationem. Saepe enim neque consequatur hic ullam eos non.', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(16, 3, 15, NULL, 'Labore aliquid alias adipisci voluptas id culpa magni. Nam esse quis quo sit provident consequatur mollitia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(17, 3, 3, 16, 'Quis quasi consectetur quos fugiat velit molestiae beatae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(18, 3, 2, 16, 'Qui perspiciatis aliquam quidem omnis omnis consequuntur impedit similique. Qui fugit rerum et. Qui suscipit nisi aspernatur non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(19, 3, 8, NULL, 'Animi repellendus harum fugiat maiores illum saepe. Corrupti nobis laboriosam quos et. Et aut delectus quos architecto.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(20, 5, 13, NULL, 'Accusamus accusamus harum corrupti alias.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(21, 5, 13, NULL, 'Est ipsum temporibus eius omnis est. Quas repellat odio et qui esse aspernatur est.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(22, 5, 7, 21, 'Illo molestiae laboriosam nostrum adipisci. Veniam quaerat ipsum omnis aperiam possimus et inventore. Qui voluptas quisquam repudiandae et dolorum id.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(23, 5, 2, 21, 'Quam molestiae consequatur illo labore rem nemo. Sit blanditiis ipsum qui non vitae et. Laboriosam adipisci corporis accusamus delectus nesciunt est.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(24, 5, 8, 21, 'Dolorem eius magnam numquam ea itaque sapiente. Velit et perferendis ipsam enim magnam. Velit facilis in eos omnis iusto similique consequuntur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(25, 5, 11, NULL, 'A veniam sed iusto autem dolorem voluptate exercitationem. Id qui unde quidem voluptatem illo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(26, 5, 16, 25, 'At id eaque veniam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(27, 5, 9, NULL, 'Amet quisquam molestias et asperiores maiores. Repudiandae incidunt optio delectus recusandae velit sit optio rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(28, 5, 17, 27, 'Aspernatur aut voluptatem rerum et saepe molestiae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(29, 5, 8, 27, 'Beatae eum dolorum commodi dolorum consequatur qui voluptate. Saepe labore ut quo qui.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(30, 6, 19, NULL, 'Quasi tenetur tempora non voluptate ut saepe. Laudantium ea quia incidunt repudiandae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(31, 6, 9, 30, 'Adipisci consequatur est qui quis omnis ea quod. Maiores hic quia voluptatem unde aperiam doloribus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(32, 6, 6, 31, 'Reprehenderit hic architecto blanditiis. Quae enim modi voluptatibus dolores nihil et iste. Incidunt provident eligendi possimus aut iste dolore.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(33, 6, 3, 30, 'Voluptatem qui debitis nemo nostrum. Rerum qui magnam at.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(34, 6, 12, 30, 'Delectus incidunt nihil autem sed dolorum. Omnis id necessitatibus voluptatibus repellat. Sint possimus laborum eveniet sunt sunt quia quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(35, 6, 9, NULL, 'Doloremque tempore quo aliquam quia illo ut tempora.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(36, 6, 14, 35, 'Rerum ut eum odit tenetur ipsum officia. Incidunt ex quo omnis exercitationem sit vel iste. Magnam et unde sapiente ut rem quibusdam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(37, 6, 5, 35, 'Nihil eum similique quasi ut aut est consequatur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(38, 6, 5, NULL, 'Consectetur voluptatibus cumque dolorem et. Facere aut blanditiis illo rem ab animi necessitatibus reiciendis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(39, 6, 23, 38, 'Veritatis odit necessitatibus explicabo et neque architecto.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(40, 6, 16, 39, 'Aut nam quia enim. Quibusdam cumque perferendis ratione dolorem nam. Veniam delectus sunt eos enim vitae eos et rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(41, 6, 3, 38, 'Est adipisci amet officiis iure nemo minus. Eaque dolores amet sequi omnis voluptas voluptate.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(42, 7, 3, NULL, 'Assumenda molestiae voluptatem quis quasi. Sit a incidunt non voluptatum architecto earum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(43, 7, 22, 42, 'Quia vel molestiae illum blanditiis vero maxime.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(44, 7, 1, NULL, 'Qui consequatur cum delectus earum. Unde dicta dolor soluta id et nihil quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(45, 7, 23, 44, 'Aut quam eum illum iure optio in. Quo numquam impedit voluptas non voluptas quis ducimus perspiciatis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(46, 7, 9, 45, 'Et perferendis ea ea est nostrum. Necessitatibus culpa et hic magni reprehenderit mollitia. Rerum aspernatur et est pariatur et ullam sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(47, 7, 5, 44, 'Et aut aut fuga sed accusamus reiciendis placeat porro. Quia eaque nam pariatur voluptatibus est harum. Dolor sunt occaecati error eum reiciendis et voluptas eius.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(48, 7, 18, NULL, 'Saepe dolor nulla sequi ea aperiam in quibusdam. Consequatur sit voluptatem culpa delectus illum. Adipisci ex ex assumenda quidem autem eum dicta.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(49, 7, 8, 48, 'Officia ea impedit quas quam sunt rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(50, 7, 3, 48, 'Aperiam voluptate accusamus illo ab dignissimos. Quae natus perspiciatis sed velit iure sed sit. Omnis sit accusamus sunt quisquam optio.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(51, 7, 4, NULL, 'Ullam sit blanditiis quo nihil vitae asperiores.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(52, 7, 12, 51, 'Error similique quidem consectetur nulla quae et.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(53, 7, 7, NULL, 'Vel quo totam quia dolore modi perferendis et mollitia. Iste odio reiciendis consectetur optio distinctio.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(54, 7, 23, 53, 'Laboriosam accusantium sed explicabo voluptatibus et autem. Nam ea minus aut consequatur autem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(55, 7, 2, 53, 'Quae eveniet omnis ut consectetur alias rerum. Voluptas expedita ut cum porro dolores. Dolores ipsum sapiente dolore eos ut necessitatibus est est.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(56, 7, 7, NULL, 'Magnam molestias deserunt ea tenetur quos quia. Natus commodi ab est alias deleniti beatae illum. Laudantium aut error explicabo eligendi amet eos autem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(57, 9, 4, NULL, 'Quia illum eum eum accusantium consectetur voluptas et. Recusandae cum magnam natus velit ipsa voluptas sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(58, 9, 12, 57, 'Ut autem iure non aliquam magnam cum et corporis. Aspernatur quas similique temporibus adipisci.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(59, 9, 19, 58, 'Earum mollitia est enim animi et cum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(60, 9, 13, NULL, 'Omnis molestias laboriosam et pariatur quo nisi dicta.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(61, 9, 3, 60, 'Possimus veritatis deserunt omnis suscipit dolor. Libero vel maiores reprehenderit ut debitis. Aut voluptatum numquam laborum voluptate fugiat minima voluptatum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(62, 9, 11, 61, 'Laboriosam veniam corporis reprehenderit. Aperiam ea molestiae non non. Vel pariatur dolorem est et voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(63, 9, 17, NULL, 'Soluta aperiam est quibusdam doloremque sed aut. Fuga ut aspernatur laborum assumenda sed voluptas.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(64, 9, 12, 63, 'Dolore laboriosam explicabo et et aut nesciunt accusamus odit. Rerum dolor illo doloremque commodi voluptas fugit. Ipsam magnam aspernatur impedit eum dolorum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(65, 9, 1, 63, 'Molestiae sed vel voluptatem praesentium aliquid animi. Sit unde vero animi labore ad sint quae sint. Commodi dolores facere dolorem nostrum ut placeat a.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(66, 9, 23, 65, 'Incidunt esse facilis quas ut eum illum quia alias. Enim laudantium at blanditiis sequi tempore. Quas vitae odio non illo fuga ipsam rem nisi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(67, 9, 19, NULL, 'Porro sit adipisci perferendis molestias atque laborum. Assumenda sapiente ipsam sit vel consequatur fuga culpa. Ut perferendis distinctio voluptate minus est voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(68, 9, 14, 67, 'Aspernatur voluptates ipsam dignissimos sit dignissimos qui animi ab. Beatae vero omnis reprehenderit fugiat eum illum. Illum dicta ut repudiandae et quibusdam alias.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(69, 9, 6, 68, 'Veritatis quia suscipit debitis velit enim dicta.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(70, 9, 3, NULL, 'Et possimus cupiditate voluptatem et et veritatis voluptas est.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(71, 11, 1, NULL, 'Modi ut cumque esse fuga laborum. Perspiciatis unde ipsam tenetur illo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(72, 11, 12, 71, 'Nisi et accusantium voluptatibus quia id. Nostrum et consequuntur commodi consequuntur. Numquam nihil nulla non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(73, 11, 14, 72, 'Ut ea dicta perspiciatis quia qui. Eveniet consequuntur quo in. Nesciunt quo optio laboriosam quis corrupti.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(74, 11, 20, NULL, 'Explicabo deserunt dolor et velit pariatur nihil consequuntur. Reprehenderit nostrum sit rerum. Et minima ad eaque reiciendis distinctio.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(75, 12, 11, NULL, 'Nihil facere omnis totam facere aspernatur aut ipsa.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(76, 12, 4, 75, 'Omnis dolores reiciendis atque rem at nobis. Doloribus suscipit libero libero fuga voluptas. Dolorum quibusdam aut alias fugiat enim iure rerum excepturi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(77, 12, 21, 76, 'Aspernatur enim eius voluptatem perferendis nobis iste. Possimus in voluptatem placeat saepe sequi voluptates numquam. Autem assumenda voluptatem a ut ducimus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(78, 12, 16, 75, 'Quia et quidem et nemo aperiam aliquam rerum illum. Earum tempore sed laudantium voluptas et nam. Temporibus mollitia laudantium ea soluta necessitatibus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(79, 12, 14, 75, 'Sit adipisci inventore dolorem tempore sint quam. Quam deserunt sint consequatur eos ea. Neque est facilis libero magni nostrum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(80, 12, 9, 79, 'Sit nulla magni est quisquam distinctio animi. Sed vel perferendis animi. Nihil veritatis praesentium exercitationem magni.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(81, 12, 20, NULL, 'Nemo ut hic quo sint eaque.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(82, 12, 3, 81, 'Rerum mollitia consectetur rerum voluptatem eum aspernatur. Ducimus eius ex rem nemo est. Adipisci voluptas temporibus minus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(83, 12, 10, 81, 'Ex aut officiis eveniet consequatur sed vel.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(84, 12, 15, 81, 'Rerum odio fugit voluptas fugiat ipsam illum voluptas.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(85, 12, 18, NULL, 'Laboriosam nam rem blanditiis voluptatem quam quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(86, 12, 21, 85, 'Voluptas harum amet perferendis asperiores modi natus sint. Quia dolor ut sit ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(87, 12, 16, 85, 'Nostrum nostrum qui sint iusto dolores fuga qui tempore. Atque harum voluptatem corrupti illum quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(88, 12, 23, 85, 'Veritatis nulla ex expedita non animi ut. Quo quos optio pariatur aliquid ut nostrum. Animi possimus occaecati aliquid non magnam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(89, 12, 13, NULL, 'Sed error qui autem itaque in dignissimos. Blanditiis at quis veritatis voluptas. Aliquam voluptatem voluptatum veniam voluptate.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(90, 12, 15, NULL, 'Modi consectetur pariatur nostrum exercitationem consectetur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(91, 12, 8, 90, 'Repudiandae velit eligendi ex veniam. Dolor velit nihil ad eum quo ipsa.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(92, 12, 5, 90, 'Tempore officiis rerum et aut delectus provident dolores. Temporibus sunt est repudiandae est voluptas.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(93, 13, 4, NULL, 'Recusandae deleniti reprehenderit aut est enim.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(94, 13, 11, 93, 'Doloremque fugit magni tenetur dolor totam sint.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(95, 13, 21, 94, 'Dolor quod quia corrupti velit consequatur non corrupti doloribus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(96, 13, 8, 93, 'Tenetur sit ut excepturi consectetur necessitatibus soluta veniam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(97, 13, 23, 93, 'Laboriosam magni quo illo quis. Est recusandae ratione aspernatur et ut consequatur. Cumque voluptas qui sit voluptate.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(98, 13, 2, NULL, 'Voluptas explicabo voluptate culpa architecto. Perspiciatis suscipit quasi ut excepturi. Et blanditiis animi ut ut ratione sunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(99, 13, 9, 98, 'Nobis maiores aspernatur ipsa cupiditate. Provident modi incidunt aut et mollitia nostrum nam voluptas. Aut repellendus sed saepe facere.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(100, 14, 18, NULL, 'Autem molestias aut quo magnam amet.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(101, 14, 7, NULL, 'Quod error voluptate ut accusamus qui. Assumenda ratione quam laborum cum neque dignissimos hic. Et ea doloremque ex suscipit et esse deserunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(102, 14, 9, 101, 'Sapiente et deserunt et illum cum illum. Ad sunt veniam itaque nisi unde laudantium. Ea pariatur rem aspernatur ut ut architecto.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(103, 14, 20, NULL, 'Voluptates temporibus at deserunt quia incidunt sed fuga. Quam et excepturi perferendis blanditiis quos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(104, 14, 1, 103, 'Nostrum ex perferendis ab eum reiciendis sint. Corporis praesentium adipisci corporis reiciendis iusto id. Accusantium quos qui et.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(105, 14, 21, 103, 'Et assumenda sunt autem voluptatem cum officia quia libero. Ab rerum nihil quia aut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(106, 15, 4, NULL, 'Sint debitis rem facere error ad.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(107, 15, 7, 106, 'Aut voluptas exercitationem earum et consequatur harum pariatur. Doloremque harum harum qui nulla sed perspiciatis dolore qui. Quaerat voluptatem dolor nulla facilis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(108, 15, 22, NULL, 'At labore explicabo delectus et. Atque blanditiis eos ea temporibus iure ducimus sequi. Nihil molestiae non cupiditate nihil harum debitis delectus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(109, 15, 9, 108, 'Soluta aut perspiciatis nulla dicta aut numquam. Itaque maxime amet omnis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(110, 15, 17, 108, 'Sit esse soluta reprehenderit itaque voluptas. Dicta impedit debitis facere consequuntur id hic ipsum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(111, 15, 14, 108, 'Odio voluptas corrupti et repellat unde pariatur tempore non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(112, 16, 22, NULL, 'Et necessitatibus quidem neque voluptas nostrum et quia praesentium.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(113, 16, 19, 112, 'Atque qui quia nihil incidunt. Ea sed omnis autem eum ut nihil est. Eaque reprehenderit accusantium minima labore.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(114, 16, 22, 113, 'Minus tempore ipsa hic minus cupiditate quidem illo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(115, 16, 16, 112, 'Repellendus maiores enim corporis. Aperiam quibusdam qui quia consequatur facere reiciendis. Repellendus sit harum est ad.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(116, 16, 7, 115, 'Itaque vel labore dignissimos illo. Qui repellat vel ipsam ipsa ut. Ex doloremque commodi enim qui numquam similique accusantium eveniet.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(117, 16, 14, NULL, 'Quod vero ex soluta sequi aut. Tenetur neque libero reiciendis velit magnam. Laborum omnis magni similique labore dolores cum nulla quidem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(118, 16, 7, 117, 'Ea tempora eos autem eaque voluptatem eum velit sint. Nam ratione aliquid reprehenderit minima qui maiores autem. Aut quos ex cum omnis deserunt doloremque maiores.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(119, 16, 12, 117, 'Voluptatibus odit consequatur nam eaque quia quo corporis vero. Alias tempore ut ratione laboriosam. Nobis magni eum et facilis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(120, 16, 2, 117, 'Quasi error dicta facere saepe. Qui est a saepe iusto aut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(121, 16, 8, NULL, 'Quia ipsam dolor illo veritatis esse iure. Ut quis neque consectetur nobis facilis. Iste aut soluta fugit voluptas.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(122, 16, 16, 121, 'Dolorem aut impedit fuga quis ut nihil earum iste.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(123, 16, 10, 122, 'Consequatur quo veniam alias vero in sequi reprehenderit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(124, 16, 1, 121, 'In distinctio temporibus ducimus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(125, 16, 6, NULL, 'Quo debitis quia sint hic distinctio corrupti et. Aspernatur ut in atque fugiat ut eos reprehenderit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(126, 16, 7, 125, 'Rem iste ducimus atque ex est libero non. Et eos inventore quos aut laboriosam facere unde. Aut accusantium molestias enim exercitationem nam sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(127, 16, 8, 125, 'Voluptas rem error dolor quidem eos. Quia accusantium dolorem est quos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(128, 16, 16, 125, 'Quis nihil fugiat et dolorum. Qui minus ullam incidunt a nam expedita. Eligendi aspernatur sunt eveniet quia id.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(129, 17, 4, NULL, 'Distinctio sed eos fugit rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(130, 17, 2, 129, 'Distinctio dolor sunt eius modi provident voluptatem qui. Ut aut expedita aut dignissimos aut quod et. Placeat enim voluptas repellat deleniti sint sit fugit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(131, 17, 23, 129, 'Nisi doloribus possimus molestias minima qui. Et dolor aliquam possimus totam in laborum ipsam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(132, 17, 17, 131, 'Non fugiat voluptatum et aperiam. Veritatis illum harum rerum nulla soluta.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(133, 17, 10, NULL, 'Vel optio eaque unde nesciunt. Quasi recusandae rem non pariatur illo soluta quo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(134, 17, 22, NULL, 'Ut quia dolorem explicabo impedit deleniti expedita accusamus ut. Blanditiis ratione tempora delectus libero quia. Ea in architecto ut cum beatae eius est aperiam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(135, 17, 21, 134, 'Vel quaerat veniam ipsam libero et quo sed incidunt. Ea dolor quia distinctio tempora adipisci ducimus. Velit qui perferendis minus fugit ut sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(136, 17, 10, NULL, 'Dolor totam earum corrupti a harum. Expedita quis corrupti maxime veniam dolores. Ut eum qui qui perferendis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(137, 17, 1, NULL, 'Totam accusantium culpa voluptatem amet dolor quam dolorum dolores. Ut est eveniet et optio. Eum nesciunt voluptate quia quasi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(138, 17, 13, 137, 'Qui consectetur qui ut non consequuntur aspernatur nesciunt. Tenetur omnis rerum architecto in molestiae labore. Ipsa officiis cupiditate consequatur neque quo ullam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(139, 18, 8, NULL, 'Repellat in suscipit vel. Inventore ab dolorem illum. Consequatur nesciunt sequi ut maxime recusandae quos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(140, 18, 21, 139, 'Maiores harum id iste fugiat ea dignissimos odio. Ullam voluptas laborum in earum eum recusandae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(141, 18, 8, 139, 'Sapiente sint qui velit minima est aliquid aliquid. Voluptate eveniet reprehenderit sit corporis non mollitia. Eum voluptas non eveniet dolores aut eos non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(142, 19, 19, NULL, 'Provident repudiandae vitae blanditiis pariatur accusantium accusamus aliquid veritatis. Accusantium laborum rerum voluptate deserunt illum eius voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(143, 19, 23, 142, 'Nobis et fugiat consequatur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(144, 19, 20, 142, 'Quam quis modi nobis et dolor voluptas. Ab laborum accusamus ducimus et numquam impedit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(145, 19, 17, 142, 'Iusto perferendis quasi suscipit occaecati. Ut laborum animi dicta laboriosam. Dolores quo ut rerum molestiae dolor nisi id.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(146, 19, 18, 145, 'Incidunt dolores sapiente quos nisi corporis reprehenderit et eligendi. Est officiis qui et odio voluptatibus omnis ad libero. Quia quis cumque tempore eos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(147, 19, 8, NULL, 'Voluptatem animi ratione cum facere molestiae est. Quia fugit officia ut qui exercitationem deleniti aut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(148, 19, 2, 147, 'Voluptates facere molestiae quam quia ut. Sit et voluptas sapiente ut distinctio error dolorem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(149, 19, 13, 147, 'Saepe recusandae aperiam vero ratione voluptatibus soluta et.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(150, 19, 22, 147, 'Nemo rerum dignissimos aut nostrum veniam nulla deleniti. Neque quasi ut ea assumenda ut voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(151, 19, 14, NULL, 'Magnam occaecati omnis quia qui. Aperiam necessitatibus commodi consequuntur dolores dolores nisi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(152, 19, 5, 151, 'Illo asperiores sit et doloribus blanditiis. Recusandae a at in id dignissimos est. Aut sit consequatur sed minus et voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(153, 20, 11, NULL, 'Ipsam animi accusantium doloremque qui vel eos fugit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(154, 20, 16, 153, 'Quibusdam aut enim optio delectus. A et omnis nihil recusandae autem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(155, 20, 17, NULL, 'Nemo sit voluptatem sed eius. Voluptas facilis ipsa est et repudiandae qui dolor.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(156, 20, 4, 155, 'Est quo architecto laboriosam sint cum quas. Blanditiis dolor et at aut corrupti voluptates.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(157, 20, 5, NULL, 'Autem rerum dolore unde delectus sequi numquam vel. Ut nobis magni odit aspernatur vitae nisi eum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(158, 20, 8, 157, 'Necessitatibus mollitia esse voluptate consequatur eum fugit voluptates.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(159, 21, 8, NULL, 'Doloribus rerum cupiditate qui saepe. Quod enim cumque praesentium esse sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(160, 21, 6, 159, 'Dolores dolor perspiciatis totam. Et dolorem exercitationem doloribus quibusdam aut ut ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(161, 21, 10, NULL, 'Laborum quia consequuntur illum dolore. Sit minus laborum sunt rem sed rem. Sint excepturi eaque est et distinctio porro.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(162, 22, 15, NULL, 'Sed ex maiores odio beatae ipsam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(163, 22, 3, 162, 'Numquam dolorem iure quo sed. Sit non optio et veniam eveniet eum. Eos eos sit porro veniam natus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(164, 22, 20, 163, 'Occaecati omnis quos iusto vitae voluptas fugiat.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(165, 22, 8, 162, 'Veritatis dolorem dolorem non. Facilis eligendi tempore blanditiis nam quia aliquam rerum. Molestiae ut et fugiat ullam consectetur dignissimos ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(166, 22, 11, NULL, 'Sed ratione ut consequuntur amet voluptas eaque.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(167, 22, 19, 166, 'Eos ea laudantium omnis quo omnis doloribus ea.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(168, 22, 15, NULL, 'Vel autem aspernatur culpa velit. Non labore cupiditate minima aut ipsa numquam. Est ut sunt explicabo eius est magnam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(169, 22, 21, NULL, 'Et eum cum soluta repudiandae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(170, 22, 5, 169, 'Hic ex odit laudantium. Nesciunt nihil ipsam consequuntur est. Et optio aut voluptates voluptatibus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(171, 22, 22, 169, 'Sit provident deleniti itaque ut consequatur. Tempore sed totam laboriosam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(172, 22, 9, NULL, 'Sit exercitationem sed tempore optio omnis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(173, 23, 17, NULL, 'Et tenetur officiis consequuntur atque eos dolor fuga. Vero nesciunt quo quam labore nulla velit. Est ea dolorum nihil delectus aspernatur quo dolor reiciendis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(174, 23, 14, NULL, 'Quo quae vel tenetur neque. Dicta odit voluptate dolores.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(175, 23, 3, 174, 'Perferendis est voluptatem architecto modi accusantium officia et autem. Ut error ipsum velit. Id sequi dolor et nesciunt officiis consequuntur illo dolores.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(176, 23, 7, 175, 'Earum ratione veniam magnam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(177, 23, 12, 174, 'Reprehenderit nihil dolorem incidunt illo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(178, 23, 12, NULL, 'Ipsum delectus modi excepturi laudantium ab aut eum non. Est quam sapiente est quis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(179, 23, 12, 178, 'Et suscipit ex nobis illum. Dolorem maxime maxime labore voluptatem illo harum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(180, 23, 23, 178, 'Eos nostrum mollitia animi et asperiores autem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(181, 23, 8, 180, 'Deleniti quia sed ex voluptatibus autem. Non perferendis iusto mollitia tenetur et. Molestias temporibus quas error consequatur qui.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(182, 23, 21, 178, 'Asperiores quod corporis perferendis provident officia molestias. Et laudantium unde autem commodi distinctio qui.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(183, 23, 12, 182, 'Omnis ut sed mollitia et vero.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(184, 24, 7, NULL, 'A saepe autem aspernatur fuga. Quaerat non consequatur recusandae tenetur ut ut. Quasi quam dolorem blanditiis esse soluta quo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(185, 24, 14, 184, 'Dolorem qui sapiente eius officiis omnis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(186, 24, 22, NULL, 'Quia fugit aspernatur eius voluptatem eum sunt praesentium. Necessitatibus libero repellat qui ut vel atque et itaque.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(187, 24, 23, 186, 'Vitae architecto atque sequi est.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(188, 24, 6, 186, 'Quibusdam blanditiis modi reprehenderit sunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(189, 24, 4, 188, 'Cumque rerum quos ipsam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(190, 24, 16, NULL, 'Illum incidunt aut est voluptatem perspiciatis. Iure voluptatem perferendis aut dolores labore eum eveniet. Consequatur illo et dolorem dolorem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(191, 24, 6, 190, 'Id molestias delectus autem non ex.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(192, 24, 17, 191, 'Fuga fugiat doloribus quidem saepe accusamus ea natus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(193, 24, 22, 190, 'Sit velit autem rem natus incidunt magnam odit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(194, 24, 11, NULL, 'Quas voluptate et dolor dolor. Voluptas harum iure vitae nisi consectetur voluptatum quod facere. Culpa sed voluptatum ratione occaecati voluptatem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(195, 24, 14, 194, 'Natus autem voluptatem eligendi veniam sit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(196, 24, 13, 194, 'Ut aut iusto ex ad.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(197, 24, 2, 194, 'Sit nostrum praesentium ut neque repellendus voluptatum molestias velit. Quae assumenda explicabo consequatur quisquam impedit dolores eum quidem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(198, 24, 20, 197, 'Assumenda sunt quia rem ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(199, 24, 16, NULL, 'Accusantium perspiciatis voluptatibus quidem a velit sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(200, 24, 3, 199, 'Hic illum aperiam rem occaecati id. Id explicabo necessitatibus qui. Ad voluptatem aperiam doloremque qui quod beatae omnis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(201, 24, 22, NULL, 'Ducimus adipisci sed dolorum. Quasi id ea placeat earum. Praesentium numquam quae minima est iure quisquam voluptas beatae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(202, 24, 16, 201, 'Illum in incidunt perferendis sint. Consectetur incidunt fugiat suscipit aut enim.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(203, 24, 11, 201, 'Labore velit velit saepe recusandae possimus consequatur. Enim similique modi architecto voluptatum aliquam facilis enim. Pariatur repudiandae eum quos sed deleniti laboriosam nesciunt doloremque.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(204, 25, 20, NULL, 'Placeat et amet quam harum voluptatem et ex debitis. Fuga sint cumque quo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(205, 25, 14, 204, 'Ratione ut veniam odit quo nesciunt perferendis. Exercitationem ut et optio non. Blanditiis quos rerum repudiandae nulla unde tenetur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(206, 25, 18, 205, 'Et quod nostrum non repellat et officia voluptas quo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(207, 25, 15, 204, 'Perspiciatis possimus consectetur et sit nihil eos. Quas dignissimos illum rerum qui placeat aliquam molestias optio. Perspiciatis perferendis ut beatae distinctio distinctio.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(208, 25, 11, 207, 'Id incidunt qui magnam ipsam animi beatae animi. Ratione omnis sunt ad qui ab ut id. Velit sit suscipit possimus dolorem dolorem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(209, 25, 19, 204, 'Consequuntur eum dicta aut corrupti velit quia et voluptas.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(210, 25, 4, NULL, 'Id labore sunt aspernatur dolor eos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(211, 25, 18, 210, 'Iusto vel et ad eaque eum sit dolorem. Sed sint aut occaecati similique rerum rerum beatae. Provident et quo ipsa nam ipsa rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(212, 25, 9, 210, 'Distinctio nisi atque fugiat itaque qui. Asperiores sequi molestiae accusamus iste consequatur.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(213, 25, 3, NULL, 'Non rem tempore doloremque doloribus dolorem iste quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(214, 25, 17, 213, 'Et minima dolorem iusto nemo sunt eligendi est eveniet. Et qui corporis ea praesentium quas molestiae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(215, 25, 14, 213, 'Maiores esse non molestias nostrum perferendis ut ipsa natus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(216, 25, 10, 215, 'Eum facilis provident soluta sapiente quia. Quo est tempora qui tempora officiis omnis aliquam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(217, 25, 2, NULL, 'Nihil suscipit atque debitis reiciendis doloremque provident vel. Dolorem sit fuga voluptatem ad veniam rem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(218, 25, 9, NULL, 'Facilis magnam voluptate voluptas consectetur exercitationem sunt perferendis. Sit expedita et incidunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(219, 25, 11, 218, 'Impedit rerum ut modi impedit facilis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(220, 25, 23, 218, 'Soluta eveniet ut nisi officia. Debitis quae similique enim. Vitae ut quasi officiis consequatur voluptate ipsum accusamus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(221, 25, 18, 218, 'Ut quia praesentium illo esse quaerat illo ut. Qui itaque ipsum labore similique. Magni praesentium sit similique consequatur est sequi possimus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(222, 25, 20, NULL, 'Velit labore nesciunt pariatur nisi dolore est nisi. Animi sed pariatur ipsum ratione.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(223, 25, 3, 222, 'Et aut libero nesciunt inventore. Vitae eaque autem assumenda asperiores et dolores. Quis explicabo atque nihil suscipit voluptatem eos impedit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(224, 26, 11, NULL, 'Corrupti facere dolorum placeat itaque. Qui quam dolor neque aliquam magnam. Recusandae qui odit eos vero deserunt sit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(225, 26, 4, NULL, 'Hic laudantium cum odit harum. Nihil culpa aut delectus repellendus rem delectus numquam alias. Eos et iure laboriosam excepturi necessitatibus et.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(226, 26, 20, 225, 'Dolor et laboriosam culpa repellat dolores et quos.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(227, 26, 8, 226, 'Vitae non ad voluptas debitis ut ratione molestiae. Modi enim aut sed velit aut placeat nemo.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(228, 26, 18, 225, 'Consequatur nihil reprehenderit quidem consequatur. In id vero quo qui. Nesciunt ipsam sed possimus numquam dignissimos veritatis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(229, 26, 23, 228, 'Quam quo quia a eveniet tempore molestiae. Maiores ducimus quia et vitae laudantium voluptatum qui.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(230, 26, 1, 225, 'Aperiam id voluptatem rerum voluptatem ut voluptatum quisquam. Ullam dolorem quidem laudantium quidem numquam dolorem. Consectetur maiores velit quos velit reprehenderit autem ipsa.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(231, 26, 7, NULL, 'Dolorum assumenda vitae sit dolore aspernatur officia iste. Maiores repellat sit aut doloremque ut ratione. At tempore rem facere sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(232, 26, 22, NULL, 'Officia accusamus debitis enim vel ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(233, 26, 6, 232, 'Sequi voluptatem commodi dolor eum exercitationem incidunt quaerat laboriosam. Dolorem quisquam praesentium aspernatur aliquid sed sit. Nobis et provident amet ipsa quisquam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(234, 26, 22, NULL, 'Cum eos eaque consequatur eos ea. Ut et non consequatur eum quis vitae laboriosam. Adipisci ad molestiae quis necessitatibus repudiandae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(235, 26, 7, 234, 'A non nihil iure.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(236, 26, 19, 234, 'Officiis eum ut ut nisi necessitatibus doloremque iure.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(237, 26, 20, 236, 'Quam in dolore sunt aut necessitatibus vero dolorem ab.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(238, 27, 19, NULL, 'Voluptas nemo et dicta suscipit itaque aut necessitatibus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(239, 27, 16, 238, 'Earum consequuntur animi libero inventore eligendi odio. Est doloremque ipsa placeat dolorem quam dolore sed.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(240, 27, 2, 238, 'Labore iste ab aliquam error adipisci. Iusto ipsam aliquam sequi aut ducimus quibusdam et.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(241, 27, 7, 238, 'Consequatur qui optio qui ad.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(242, 27, 15, NULL, 'Dolores ea dignissimos sapiente quia impedit repellat vel ipsam. Cum aperiam ut quas nesciunt. Temporibus nisi reprehenderit reprehenderit est deserunt quae provident.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(243, 27, 1, 242, 'Rem sunt porro debitis beatae.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(244, 28, 16, NULL, 'Recusandae quos odio cupiditate vero commodi odit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(245, 28, 23, 244, 'Est pariatur itaque facilis doloremque temporibus expedita sit. Quidem dolorem est facilis veritatis est fugit iste. Optio quis sint ipsa ducimus et possimus dolorem.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(246, 28, 21, NULL, 'Dolore eligendi quidem esse ad doloremque veniam. Et quos temporibus velit distinctio quos ut optio non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(247, 28, 4, 246, 'Itaque aperiam error modi explicabo. Corrupti laborum numquam sit dolore et qui et animi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(248, 28, 14, 246, 'Ipsam aut itaque quia est enim. Voluptas deserunt accusantium qui sunt ipsum culpa.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(249, 28, 21, 246, 'Nemo voluptates autem atque sit labore ducimus et. Eum enim repellat error hic quia. Officia sed recusandae ullam magnam quis quia.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(250, 28, 3, NULL, 'Consequuntur assumenda aut asperiores sint et sed. Qui voluptatem iusto quo eveniet amet aliquam iste. Dolor omnis dicta cupiditate et eos qui nesciunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(251, 28, 7, 250, 'Inventore sit temporibus accusamus odio excepturi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(252, 28, 17, 251, 'Enim voluptas at nostrum ad. Nostrum voluptas aut aliquam non atque. Quae at facilis possimus.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(253, 28, 21, NULL, 'Odit ad harum iure consequatur sapiente. Eligendi dolorem natus assumenda quas quia id.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(254, 28, 21, 253, 'Voluptatem doloribus corporis exercitationem quo rerum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(255, 28, 6, 253, 'Numquam ipsum totam laboriosam recusandae voluptas. Eos officiis labore omnis. Et quibusdam voluptatem eos excepturi perferendis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(256, 29, 14, NULL, 'Consectetur enim ipsam eum. Nisi rerum in aspernatur aliquam eum. Veniam itaque ut repudiandae deserunt nemo minima excepturi ipsa.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(257, 29, 11, 256, 'Voluptatem iusto voluptas animi est earum. Consequatur reiciendis animi nesciunt earum ut quibusdam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(258, 29, 21, NULL, 'Qui nesciunt earum placeat placeat labore sunt. Facere inventore ut non beatae. Aut autem est accusamus expedita sed eius facilis.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(259, 29, 9, 258, 'Minima porro omnis soluta voluptas. Consequatur maxime beatae laudantium ut et deserunt voluptate.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(260, 29, 9, 259, 'Nemo odit dolor officia impedit voluptatem tempora.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(261, 29, 17, 258, 'Commodi quia in sit laudantium recusandae. Omnis minus consequatur voluptatibus rem atque esse temporibus. Animi et vel veritatis et qui.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(262, 29, 3, NULL, 'Ea eius laudantium facere excepturi impedit tempora. Similique accusamus cum ut est sunt ea dignissimos. Facilis vel asperiores vitae assumenda qui ipsam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(263, 29, 10, NULL, 'Soluta iure eos nostrum deleniti. Exercitationem ducimus voluptas unde laborum placeat ipsam nemo. Accusamus perspiciatis voluptatum autem nulla quam sunt.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(264, 29, 18, 263, 'Et earum iure neque sint quod aliquam aut. Est natus iure incidunt repellat.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(265, 29, 10, 263, 'Maiores suscipit ad provident laudantium molestias. Eos minus omnis consequatur minima rerum quisquam. Et hic eos natus sunt voluptate.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(266, 29, 18, 263, 'Excepturi eum voluptate laboriosam autem itaque veniam illo ut.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(267, 30, 21, NULL, 'Non ut sit architecto quam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(268, 30, 1, 267, 'Quos id enim et beatae accusamus. Adipisci voluptas atque animi eius ut quae quo. Ut qui quia soluta ipsum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(269, 30, 22, 267, 'Dolorem ut qui nulla voluptatem. Molestiae nostrum voluptatem dolorum non qui non.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(270, 30, 20, 267, 'Quis non dolorem provident delectus dolorum. Enim autem corporis tenetur velit debitis. Id adipisci numquam in cum dolore enim.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(271, 30, 19, 270, 'Vero blanditiis enim eos sunt. Qui quia in mollitia commodi.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(272, 30, 10, NULL, 'Voluptatem suscipit modi et velit.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(273, 30, 2, 272, 'Molestiae omnis eaque quos aperiam sed quisquam dolores ut. Laborum quae dolorem et qui est qui aperiam earum.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(274, 30, 19, NULL, 'Sit corporis quibusdam laudantium pariatur molestiae et voluptatum. Ipsum qui et rerum non ipsam ullam.', '2025-10-14 10:54:35', '2025-10-14 10:54:35'),
(275, 30, 17, 274, 'Iure id repellat omnis animi dolores blanditiis. Quibusdam voluptatem dolor provident numquam quibusdam nulla.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(276, 30, 9, 274, 'Nisi vel consequatur excepturi repudiandae qui optio ut voluptatem. Ratione et voluptates aliquid. Aperiam tempora facere dignissimos.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(277, 30, 23, 276, 'Qui voluptatem provident excepturi. Enim delectus explicabo earum pariatur nulla. Maiores voluptatem dolorum voluptas mollitia accusamus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(278, 32, 7, NULL, 'Voluptates quia delectus et itaque. Architecto quisquam cumque asperiores dignissimos consectetur voluptatibus. Corrupti veniam aut possimus et quos ut voluptatem.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(279, 32, 17, 278, 'Incidunt ad rerum et consequatur eum itaque totam. Et quasi qui eius.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(280, 32, 7, 279, 'Magnam numquam repellat asperiores. Nostrum qui possimus similique animi.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(281, 32, 12, NULL, 'Voluptatem repellendus facere nihil quo iste eos magni quae. Expedita fugit laborum eos voluptatibus voluptas beatae.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(282, 32, 16, 281, 'Velit eveniet dolor ut unde qui esse fugiat. Exercitationem ut qui debitis aperiam.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(283, 32, 11, 281, 'Blanditiis voluptatem sapiente voluptate reiciendis. Error adipisci ipsam vel ab quod velit quo. Quas qui repellat laborum dolor aperiam.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(284, 32, 21, 283, 'Sit qui at eum velit ut architecto earum. Non rerum nihil consectetur doloribus temporibus et incidunt aut. Fuga deserunt iure exercitationem error ea error ut velit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(285, 32, 21, NULL, 'Autem sed voluptatem vel voluptas suscipit. Consequatur corrupti rerum similique assumenda consequatur. Esse velit ut quibusdam quia rerum.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(286, 32, 8, 285, 'Saepe ad perspiciatis voluptas eum.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(287, 32, 21, NULL, 'Quam sunt et non ex tenetur. Est nobis nisi quisquam voluptatem.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(288, 32, 21, 287, 'Voluptatem autem est voluptas expedita aliquid temporibus voluptatem. Corporis tempora qui voluptatibus distinctio. Delectus voluptatem occaecati quam quibusdam ipsam modi et.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(289, 32, 1, 288, 'Ex quis sit vel blanditiis similique in dolores.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(290, 33, 4, NULL, 'Pariatur consectetur consequatur voluptatibus dolorum reiciendis non veritatis. Et magnam alias cumque quos magni. Vitae et qui aliquid enim doloremque asperiores.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(291, 33, 4, NULL, 'Eligendi at qui officia esse. Impedit autem omnis officiis accusamus. Eos harum sit totam.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(292, 33, 22, NULL, 'Dicta nihil sunt quaerat illum eius.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(293, 33, 21, 292, 'Et ab eveniet doloremque quas atque iure laborum. Accusamus ut fugiat debitis hic numquam enim laudantium.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(294, 33, 2, NULL, 'Hic nisi quia harum atque ut alias.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(295, 33, 4, NULL, 'Repellendus itaque voluptatibus officia voluptatem rerum aspernatur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(296, 33, 13, NULL, 'Sit officiis id consequuntur porro.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(297, 34, 17, NULL, 'Facere mollitia et quod totam est aliquam adipisci. Facere ut odit non blanditiis minima voluptates atque. Esse est ut amet mollitia sint omnis inventore.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(298, 34, 17, NULL, 'Ex minus in recusandae nihil. Reprehenderit eveniet ratione ut. Sed occaecati omnis porro illum.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(299, 34, 12, 298, 'Dolorem perspiciatis sunt molestias ipsa. Sunt dolorem occaecati enim error consequatur ut necessitatibus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(300, 34, 5, NULL, 'Neque delectus ullam cumque beatae eos suscipit. Voluptatum voluptatibus ipsam ipsa unde neque voluptate.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(301, 34, 7, 300, 'Adipisci corrupti culpa quia voluptatem.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(302, 34, 10, 300, 'Minima consequuntur sunt harum odio consequatur omnis fugiat ex. Deserunt dolor itaque debitis soluta.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(303, 35, 3, NULL, 'Aut magni atque voluptas eveniet voluptas. Possimus in natus ipsum nulla. Veniam et vero commodi nobis itaque quis quaerat.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(304, 35, 1, 303, 'Vitae error amet assumenda dignissimos.', '2025-10-14 10:54:36', '2025-10-14 10:54:36');
INSERT INTO `comments` (`id`, `post_id`, `user_id`, `parent_id`, `content`, `created_at`, `updated_at`) VALUES
(305, 35, 16, 303, 'Vel et et quas vel. Rerum et nisi aspernatur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(306, 35, 13, 303, 'Saepe fugiat et dolore et quis consequatur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(307, 35, 11, NULL, 'Illo aperiam nihil et consequatur quas. Minus necessitatibus totam commodi est nesciunt. Sapiente aut deserunt voluptatem pariatur delectus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(308, 35, 8, 307, 'Quae eligendi dicta libero consequatur similique vel repudiandae. Ducimus aut aut facere esse deleniti. Recusandae corporis reiciendis sit recusandae et earum.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(309, 36, 17, NULL, 'Soluta assumenda soluta omnis quam dolores expedita odio. Dolorem earum earum non sunt magni aspernatur minus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(310, 36, 19, NULL, 'Iure cum totam est maiores temporibus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(311, 37, 13, NULL, 'Esse labore unde cupiditate eum. Ab tempora cum error tempore porro a atque.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(312, 37, 18, 311, 'Exercitationem numquam ex nulla ut consectetur ut vel.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(313, 37, 7, 311, 'Pariatur blanditiis quis vero culpa minima. Est atque qui reiciendis quam repellat. Molestias suscipit quos ratione iure quis accusamus ea.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(314, 37, 1, NULL, 'Pariatur non sit non exercitationem.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(315, 37, 5, NULL, 'Voluptatem delectus excepturi rerum distinctio doloribus. Molestias dolorum placeat alias eaque. Ducimus nihil consequatur nesciunt placeat qui.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(316, 37, 23, 315, 'Aut quis est ullam architecto cumque molestiae.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(317, 37, 3, 315, 'Voluptatem laborum non aut sint eligendi.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(318, 37, 16, 315, 'Et distinctio sit et ex.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(319, 37, 15, NULL, 'Sit consequatur tempore est voluptate odio aut aut. Vel praesentium cumque sit blanditiis. Dolorum facilis sit ab sunt.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(320, 37, 19, NULL, 'Sed aspernatur ut quia recusandae.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(321, 37, 11, 320, 'Vel voluptas non vero molestiae a voluptatum nemo.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(322, 39, 23, NULL, 'Mollitia consectetur cupiditate eos voluptatem. Voluptatem omnis et molestiae ex.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(323, 39, 1, 322, 'Error est quos accusamus esse perferendis molestiae.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(324, 39, 6, NULL, 'Quia molestias et iure exercitationem a officiis. Asperiores aperiam facere dolores consectetur est nihil modi. Perspiciatis sunt nemo eos non.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(325, 39, 13, 324, 'Earum accusantium laudantium sit libero. Sapiente ducimus illo velit harum illo officia.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(326, 39, 8, NULL, 'Dolorum deserunt ipsum quo nesciunt.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(327, 39, 6, 326, 'Quis dolorem unde sit et. Consectetur et esse odio animi excepturi facere aut. Sit quia labore delectus.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(328, 39, 23, 326, 'Unde dolores in et excepturi expedita veritatis.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(329, 39, 1, 326, 'Veritatis asperiores voluptatem doloremque nostrum accusamus. Impedit sint dolores adipisci ut consequatur est quia.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(330, 39, 7, NULL, 'Ipsa placeat voluptatem pariatur ad omnis. Enim dolorem optio et optio doloribus non. Quia culpa quos deserunt repellat cumque debitis est consequuntur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(331, 39, 7, 330, 'Iure iure consequatur veritatis provident aut voluptatem earum. In beatae dolor similique libero. Sit quas non adipisci iure blanditiis velit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(332, 39, 15, 330, 'Qui ipsum provident quod dolores velit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(333, 39, 1, 330, 'Distinctio possimus nostrum fugiat error autem quia quia dolorum. Et voluptas optio harum quaerat.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(334, 40, 2, NULL, 'Repellendus est eos voluptates odit praesentium. Soluta et quaerat quis porro ducimus fugit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(335, 40, 6, 334, 'Sequi qui earum error soluta molestiae quo. Qui quos atque totam molestias sit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(336, 40, 4, 334, 'Accusamus consequatur dolor ut molestiae ut. Ullam quo nesciunt et fugiat autem libero omnis.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(337, 40, 12, 334, 'Quas consequatur quisquam et quas. Eum eos nesciunt laborum consectetur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(338, 40, 19, NULL, 'Facilis earum sed sed vel non. Nam est id sapiente dolor qui ducimus soluta. Et fugit vitae cupiditate et dicta eaque fugit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(339, 40, 1, 338, 'Et quia quia quae harum quae labore eius. Eum totam facilis dolorem id reprehenderit.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(340, 40, 13, 338, 'Repellendus ullam deleniti inventore unde asperiores dolore. Est dolorum soluta velit rerum est.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(341, 40, 14, NULL, 'Et dolor perspiciatis dolor eum consequatur.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(342, 40, 1, 341, 'Labore sunt excepturi quae.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(343, 40, 7, NULL, 'Ea similique omnis iusto voluptates quidem ut soluta.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(344, 40, 11, 343, 'Qui inventore qui ipsa voluptatem maxime fugit id. Quia blanditiis eum et ullam dolor officia pariatur. Qui ut incidunt consequatur quas aut unde.', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(345, 1, 24, NULL, 'iya', '2025-10-14 10:59:48', '2025-10-14 10:59:48'),
(346, 1, 28, NULL, 'Assalamu’alaikum warahmatullahi wabarakatuh,\nSelamat malam untuk semua yang hadir di sini,\ndan khususnya, untuk seseorang yang menjadi alasan senyum saya malam ini — Fina.\n\nBerbicara tentang kecantikan Fina bukan sekadar membicarakan rupa. Karena jujur, kecantikannya tak berhenti di wajahnya yang manis, atau senyumnya yang menenangkan. Kecantikan Fina itu seperti cahaya pagi yang lembut — tidak menyilaukan, tapi mampu menghangatkan hati siapa pun yang beruntung berdiri di dekatnya.\n\nFina bukan hanya cantik karena matanya yang teduh, tapi juga karena caranya melihat dunia — penuh empati, penuh perhatian, dan penuh kebaikan. Dari tutur katanya yang lembut, kita bisa tahu bahwa ia bukan hanya memiliki wajah yang indah, tapi juga hati yang lapang. Ia tahu kapan harus bicara, kapan harus mendengarkan, dan kapan harus diam untuk menenangkan.\n.', '2025-10-16 09:21:24', '2025-10-16 09:21:24');

-- --------------------------------------------------------

--
-- Table structure for table `company_profiles`
--

CREATE TABLE `company_profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `industry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `official_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_documents` json DEFAULT NULL,
  `verification_status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `verification_notes` text COLLATE utf8mb4_unicode_ci,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_profiles`
--

INSERT INTO `company_profiles` (`id`, `user_id`, `company_name`, `industry`, `logo_path`, `description`, `website`, `linkedin`, `instagram`, `address`, `city`, `phone`, `official_email`, `contact_person`, `verification_documents`, `verification_status`, `verification_notes`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 25, 'Gacorian888', 'IT', 'company-logos/BGma2pqWg8QAJRZWCrF956vnWcj4zr8oH9oIzorT.jpg', 'lorem ipsum', 'https://larasena.my.id/', NULL, NULL, 'Jl. Mayjen Sungkono km 5 Blater, Kalimanah, Purbalingga', 'Purbalingga', '087654321', 'alfaenf23@gmail.com', NULL, NULL, 'approved', NULL, '2025-10-15 05:10:05', '2025-10-14 18:53:12', '2025-10-15 05:10:05');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `program_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `location_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_type` enum('online','hybrid','offline') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'offline',
  `is_wheelchair_accessible` tinyint(1) NOT NULL DEFAULT '0',
  `has_live_caption` tinyint(1) NOT NULL DEFAULT '0',
  `max_participants` int DEFAULT NULL,
  `participants_count` int NOT NULL DEFAULT '0',
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categories` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `user_id`, `program_id`, `title`, `description`, `start_at`, `end_at`, `latitude`, `longitude`, `location_name`, `location_type`, `is_wheelchair_accessible`, `has_live_caption`, `max_participants`, `participants_count`, `image_path`, `categories`, `created_at`, `updated_at`) VALUES
(1, 23, NULL, 'Extended disintermediate moratorium', 'Est fugit quibusdam qui consequatur sit qui non. Sed harum sit voluptatem molestiae. In vero temporibus ipsum possimus quibusdam. Ea nam sint et ut sint.', '2025-10-19 16:39:04', '2025-10-19 21:39:04', NULL, '119.8924370', 'North Shany', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(2, 12, NULL, 'Synergistic mobile workforce', 'Doloremque voluptas cumque aliquid ea et vel veritatis. Quidem officia impedit et omnis. Quia deserunt necessitatibus cumque eligendi. Vitae quo dolore voluptatem ratione recusandae.', '2025-11-25 08:42:40', '2025-11-25 14:42:40', '2.5818440', NULL, NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(3, 15, NULL, 'Function-based leadingedge conglomeration', 'Itaque sunt veniam doloribus magnam. Est vero pariatur ut doloribus labore vitae. Occaecati aliquam mollitia tempore labore fuga totam ad. Eius commodi quo non vel qui voluptas.', '2025-11-18 02:20:18', '2025-11-18 04:20:18', NULL, NULL, NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(4, 1, NULL, 'Customer-focused well-modulated groupware', 'Et ea quia sunt doloribus temporibus non modi. Non est debitis voluptatem consequatur. Voluptatem fugiat eaque sed perspiciatis qui et dignissimos dolorem.\n\nId doloremque pariatur modi reprehenderit sequi repellendus dolor. Accusamus et nisi omnis sapiente. Quasi dolor qui deleniti quam doloribus. In aut odio sed dolore aut.', '2025-10-24 09:37:13', '2025-10-24 13:37:13', '-10.0733270', '114.2816940', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(5, 5, NULL, 'Polarised fresh-thinking task-force', 'Reiciendis aut aspernatur perferendis rerum debitis et ea voluptatem. Est non aliquid esse debitis. Aut omnis aspernatur esse.\n\nAccusantium modi doloribus qui. Ut ratione facilis et id. Quis et voluptates error sunt quia.', '2025-10-20 14:07:25', '2025-10-20 20:07:25', '1.7791760', '104.9880950', 'Oriechester', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(6, 13, NULL, 'Multi-tiered multimedia knowledgeuser', 'Culpa cumque omnis amet non. Dolore minima natus aut ab animi. Voluptatibus animi quis autem et fugiat sed.\n\nVoluptas cumque cum et eum recusandae. Sed impedit quia enim ducimus autem animi. Rerum autem quia sed quia possimus voluptatem. Molestias ea ratione ut nostrum voluptas deleniti consequuntur error.\n\nQuibusdam voluptas aut voluptas quae dolorem ut qui. Soluta repellendus ducimus architecto exercitationem qui expedita a. Laudantium est reprehenderit ullam voluptas.', '2025-10-19 07:14:44', '2025-10-19 10:14:44', NULL, '100.8809300', 'East Haven', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(7, 15, NULL, 'Persistent impactful extranet', 'Labore necessitatibus quis quae officiis. Laudantium vitae itaque ipsam harum amet voluptatibus sit neque. Voluptatem dolorem repudiandae hic molestiae esse possimus.\n\nAdipisci repellat eveniet fugit quia. Ut magnam ut omnis qui. Laborum ducimus vitae voluptatem. Aperiam quas nesciunt fugit maiores nesciunt soluta minus molestias.\n\nEa saepe aspernatur amet fugiat vero quia. Tempore quaerat aliquid aut ab.', '2025-10-16 19:35:59', '2025-10-16 20:35:59', NULL, '121.6509480', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(8, 18, NULL, 'Persistent secondary function', 'Accusantium alias ut ut laborum. Repellat asperiores recusandae nemo eaque sunt mollitia ut esse. Nobis et id debitis veritatis architecto minima. Sed eos rerum et officia animi sint quisquam.\n\nQui expedita nemo ut et occaecati non ad. Voluptatum commodi inventore placeat in placeat enim sapiente.', '2025-09-22 11:22:07', '2025-09-22 17:22:07', NULL, '129.6719600', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(9, 5, NULL, 'Visionary local concept', 'Deleniti quo et distinctio necessitatibus voluptates enim. Fugiat quia repellendus facere et exercitationem qui. Commodi temporibus ut aut temporibus quo.', '2025-12-08 00:15:28', '2025-12-08 01:15:28', NULL, '118.3923530', 'West Gregory', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(10, 10, NULL, 'Public-key global pricingstructure', 'Voluptates inventore est in molestiae aut accusantium qui quod. Perferendis accusantium unde eveniet ea aut voluptatem. Accusamus culpa atque doloribus voluptatum.\n\nSed laborum reprehenderit ratione fugiat id sapiente beatae voluptatem. Officiis voluptatibus laborum doloremque rem. Voluptatem et esse labore. Sint dicta quia minima quia dolor sequi.\n\nRerum optio rerum est suscipit. Doloribus aut deleniti ut reiciendis eos aliquid excepturi. Nisi ratione quo ut dolore corrupti repellat dolores iste. Ipsa laudantium et earum repellat.', '2025-11-03 04:55:17', '2025-11-03 06:55:17', '-9.7889950', NULL, 'West Mitchelshire', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(11, 3, NULL, 'Business-focused disintermediate task-force', 'Iure vitae dicta iusto deleniti aut ducimus ut delectus. Ex harum itaque doloribus. Ullam vero magnam quo culpa enim non. Non fugiat dolorem qui eaque. Sed reiciendis ut voluptas error.\n\nVoluptatem dolore recusandae distinctio perspiciatis. Autem omnis atque eum. Ut ea ut ut sint illum. Consequatur et eos incidunt.', '2025-10-16 16:03:55', '2025-10-16 18:03:55', NULL, '129.3135050', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(12, 22, NULL, 'Vision-oriented eco-centric interface', 'Consequatur amet optio minus fuga. Et accusamus maiores cumque qui tempora. Magni tempore ab consequatur nesciunt. Ea enim quisquam illo velit rerum nihil quis ullam. Minus laudantium ipsum cupiditate ut.\n\nEarum sed nihil quis. Blanditiis voluptatem ratione deleniti odio officia temporibus. Rem explicabo qui sequi quis praesentium facilis in eos.', '2025-10-08 00:21:49', '2025-10-08 01:21:49', '-8.1098920', '100.8377770', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(13, 5, NULL, 'Programmable interactive project', 'Et fugiat ut necessitatibus dolor laborum. Aut id ea nobis facere quia explicabo ab. Et et vel facilis exercitationem adipisci. Voluptates eum similique voluptatibus. Explicabo quas laudantium expedita tenetur ratione corporis.', '2025-12-07 21:46:57', '2025-12-08 04:46:57', NULL, NULL, 'Coletown', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(14, 7, NULL, 'Intuitive coherent monitoring', 'Ratione ullam odit soluta rerum asperiores. Voluptatem rerum voluptatem eaque labore non. Excepturi vero id veniam error voluptate dolore.\n\nAb eum rerum dicta voluptate inventore. Voluptas quae magnam aut id rerum. Vel qui nostrum quia voluptatibus placeat molestias est. Hic laboriosam qui possimus autem quae. Ad harum ad ut molestias.', '2025-10-29 12:10:49', '2025-10-29 13:10:49', '-0.6344260', NULL, NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(15, 19, NULL, 'Reduced directional systemengine', 'Aliquam et et suscipit cum saepe provident itaque. Quaerat deleniti magni consectetur culpa sint non id. Et debitis nisi fuga necessitatibus sit qui dolor.', '2025-11-25 11:50:39', '2025-11-25 18:50:39', NULL, '130.0687700', NULL, 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(16, 27, NULL, 'Hadrohan', 'Hadrohan bersama kyai kafah', '2025-10-15 11:27:00', '2025-10-15 14:30:00', '-7.4081536', '109.3340365', 'Markas Gacorian', 'offline', 0, 0, NULL, 0, NULL, NULL, '2025-10-14 21:27:21', '2025-10-14 21:27:55'),
(17, 1, NULL, 'Aksi Bersih Pantai', 'Kegiatan Aksi Bersih Pantai bersama komunitas setempat. Terbuka untuk umum.', '2025-10-17 09:00:00', '2025-10-17 12:00:00', NULL, NULL, 'Kota Setempat', 'offline', 1, 0, 50, 32, 'events/demo_1.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(18, 1, NULL, 'Donor Darah Peduli Sesama', 'Kegiatan Donor Darah Peduli Sesama bersama komunitas setempat. Terbuka untuk umum.', '2025-10-18 09:00:00', '2025-10-18 12:00:00', NULL, NULL, 'Kota Setempat', 'offline', 0, 0, 100, 67, 'events/demo_2.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(19, 1, NULL, 'Pelatihan Literasi Digital', 'Kegiatan Pelatihan Literasi Digital bersama komunitas setempat. Terbuka untuk umum.', '2025-10-19 09:00:00', '2025-10-19 12:00:00', NULL, NULL, 'Zoom Meeting', 'online', 1, 1, 200, 145, 'events/demo_3.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(20, 1, NULL, 'Bazar UMKM Inklusif', 'Kegiatan Bazar UMKM Inklusif bersama komunitas setempat. Terbuka untuk umum.', '2025-10-20 09:00:00', '2025-10-20 12:00:00', NULL, NULL, 'Kota Setempat', 'offline', 1, 0, NULL, 0, 'events/demo_4.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(21, 1, NULL, 'Penanaman Pohon Kota', 'Kegiatan Penanaman Pohon Kota bersama komunitas setempat. Terbuka untuk umum.', '2025-10-21 09:00:00', '2025-10-21 12:00:00', NULL, NULL, 'Kota Setempat', 'offline', 0, 0, 75, 28, 'events/demo_5.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(22, 1, NULL, 'Kelas Isyarat Dasar', 'Kegiatan Kelas Isyarat Dasar bersama komunitas setempat. Terbuka untuk umum.', '2025-10-22 09:00:00', '2025-10-22 12:00:00', NULL, NULL, 'Kota Setempat', 'offline', 1, 1, 30, 18, 'events/demo_6.svg', NULL, '2025-10-14 21:47:02', '2025-10-16 09:33:02'),
(23, 27, 1, 'Ngaji', 'Ngaji bareng gus edwi', '2025-10-24 17:00:00', '2025-10-24 23:53:00', '-7.4081323', '109.3340580', 'markas gacorian', 'offline', 0, 0, NULL, 0, 'events/rhlq4EU1GjuzA3a7a3pYsvj4QWdZNQApmSyswERK.jpg', '[\"Pelatihan\"]', '2025-10-14 21:50:05', '2025-10-14 22:12:17'),
(24, 1, NULL, 'Webinar Kesehatan Mental Online', 'Kegiatan Webinar Kesehatan Mental Online bersama komunitas setempat. Terbuka untuk umum.', '2025-10-23 09:00:00', '2025-10-23 12:00:00', NULL, NULL, 'Zoom Meeting', 'online', 1, 1, 500, 343, 'events/demo_7.svg', NULL, '2025-10-16 09:33:02', '2025-10-16 09:46:08'),
(25, 1, NULL, 'Workshop Desain Grafis Hybrid', 'Kegiatan Workshop Desain Grafis Hybrid bersama komunitas setempat. Terbuka untuk umum.', '2025-10-24 09:00:00', '2025-10-24 12:00:00', NULL, NULL, 'Kota Setempat', 'hybrid', 1, 1, 80, 54, 'events/demo_8.svg', NULL, '2025-10-16 09:33:02', '2025-10-16 09:33:02'),
(26, 1, NULL, 'Talkshow Karir untuk Disabilitas', 'Kegiatan Talkshow Karir untuk Disabilitas bersama komunitas setempat. Terbuka untuk umum.', '2025-10-25 09:00:00', '2025-10-25 12:00:00', NULL, NULL, 'Zoom Meeting', 'online', 1, 1, 300, 189, 'events/demo_9.svg', NULL, '2025-10-16 09:33:02', '2025-10-16 09:33:02'),
(27, 1, NULL, 'Pelatihan Kewirausahaan Digital', 'Kegiatan Pelatihan Kewirausahaan Digital bersama komunitas setempat. Terbuka untuk umum.', '2025-10-26 09:00:00', '2025-10-26 12:00:00', NULL, NULL, 'Kota Setempat', 'hybrid', 1, 1, 100, 73, 'events/demo_10.svg', NULL, '2025-10-16 09:33:02', '2025-10-16 09:33:02');

-- --------------------------------------------------------

--
-- Table structure for table `event_interests`
--

CREATE TABLE `event_interests` (
  `id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_user_pivot`
--

CREATE TABLE `event_user_pivot` (
  `id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'registered',
  `registered_at` timestamp NULL DEFAULT NULL,
  `attended_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_user_pivot`
--

INSERT INTO `event_user_pivot` (`id`, `event_id`, `user_id`, `status`, `registered_at`, `attended_at`, `created_at`, `updated_at`) VALUES
(1, 24, 28, 'registered', '2025-10-16 09:46:08', NULL, '2025-10-16 09:46:08', '2025-10-16 09:46:08');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"9b47096b-6cae-4de1-acc8-b37327169a0f\",\"displayName\":\"App\\\\Notifications\\\\NewCommentNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:23;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:40:\\\"App\\\\Notifications\\\\NewCommentNotification\\\":2:{s:7:\\\"comment\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Comment\\\";s:2:\\\"id\\\";i:345;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"35aac73c-ca72-4f12-a86a-78759763dc53\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"},\"createdAt\":1760464788,\"delay\":null}', 0, NULL, 1760464788, 1760464788),
(2, 'default', '{\"uuid\":\"a2b7fed4-1a08-47ba-864c-d4bc066fa458\",\"displayName\":\"App\\\\Mail\\\\CompanyProfileStatusChanged\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":17:{s:8:\\\"mailable\\\";O:36:\\\"App\\\\Mail\\\\CompanyProfileStatusChanged\\\":4:{s:7:\\\"profile\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:25:\\\"App\\\\Models\\\\CompanyProfile\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:1:{i:0;s:4:\\\"user\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:6:\\\"status\\\";s:8:\\\"approved\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:20:\\\"dimasken45@gmail.com\\\";}}s:6:\\\"mailer\\\";s:3:\\\"log\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"},\"createdAt\":1760530206,\"delay\":null}', 0, NULL, 1760530206, 1760530206),
(3, 'default', '{\"uuid\":\"ea9b768a-8dc7-40f1-bd12-e0414811a9b6\",\"displayName\":\"App\\\\Mail\\\\JobStatusChanged\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":17:{s:8:\\\"mailable\\\";O:25:\\\"App\\\\Mail\\\\JobStatusChanged\\\":4:{s:3:\\\"job\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:14:\\\"App\\\\Models\\\\Job\\\";s:2:\\\"id\\\";i:21;s:9:\\\"relations\\\";a:1:{i:0;s:4:\\\"user\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:6:\\\"status\\\";s:8:\\\"approved\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:20:\\\"dimasken45@gmail.com\\\";}}s:6:\\\"mailer\\\";s:3:\\\"log\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"},\"createdAt\":1760543209,\"delay\":null}', 0, NULL, 1760543209, 1760543209),
(4, 'default', '{\"uuid\":\"8a78f401-6d70-402f-9412-adc23aa62545\",\"displayName\":\"App\\\\Notifications\\\\NewCommentNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:23;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:40:\\\"App\\\\Notifications\\\\NewCommentNotification\\\":2:{s:7:\\\"comment\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Comment\\\";s:2:\\\"id\\\";i:346;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"23a02298-078a-4d35-8620-a1db42bbb454\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"},\"createdAt\":1760631684,\"delay\":null}', 0, NULL, 1760631684, 1760631684);

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint UNSIGNED NOT NULL,
  `job_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `cv_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_letter` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'submitted',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_id`, `user_id`, `cv_path`, `cover_letter`, `status`, `created_at`, `updated_at`) VALUES
(1, 21, 24, 'cvs/iP9zobNDuOynAvOOJRIbK9f9Lhk2RL4TQWSQnBbO.pdf', NULL, 'submitted', '2025-10-16 05:27:57', '2025-10-16 05:27:57');

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `cancellation_reason` text COLLATE utf8mb4_unicode_ci,
  `disability_only` tinyint(1) NOT NULL DEFAULT '0',
  `accommodations` text COLLATE utf8mb4_unicode_ci,
  `employment_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary_min` int DEFAULT NULL,
  `salary_max` int DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `location_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`id`, `user_id`, `title`, `company`, `description`, `requirements`, `benefits`, `status`, `cancellation_reason`, `disability_only`, `accommodations`, `employment_type`, `salary_min`, `salary_max`, `latitude`, `longitude`, `location_name`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'Military Officer', 'Balistreri, Kris and Kunde', 'Quaerat esse quod eum vel eos dolor explicabo sit. Nesciunt quae et odit eaque dolores. Quod quis perferendis rerum dolorem.\n\nPlaceat eius amet pariatur porro nisi. Repudiandae officia vero aut est. Et consequatur necessitatibus ab ea ut quas voluptatibus.\n\nDolorem voluptas repellat minima minima laudantium. Consequatur eligendi expedita velit. Vel fuga quos deserunt accusamus est. Id nihil placeat est eligendi eos in. Exercitationem reprehenderit provident numquam impedit qui odit qui.\n\nQuis est cupiditate rerum aut dolor. Quis laboriosam quibusdam at aut nulla. Ut aut consequatur vitae minus.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, NULL, '106.7614760', NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(2, 9, 'Animal Control Worker', 'Wuckert and Sons', 'Voluptatibus iure officiis minus labore vel qui. Est facilis dolores voluptate et voluptates. Eum dolor est quis sed expedita beatae.\n\nDucimus impedit ut vel iure. Sit atque molestiae assumenda accusamus. Rerum eum quo omnis sed labore dolor rerum.\n\nDicta consequatur commodi culpa nesciunt. Iusto omnis illum quod quos veritatis corrupti laudantium. Facilis iure accusamus illo corporis.', NULL, NULL, 'pending', NULL, 0, NULL, 'volunteer', NULL, NULL, '-5.9513290', NULL, 'New Candace', NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(3, 2, 'Highway Patrol Pilot', 'Hessel-Harris', 'Officiis iure dignissimos dolores voluptas sit. Voluptatem nobis est aliquid facere. Quasi recusandae inventore veritatis et. Est ab harum adipisci.\n\nMagnam sunt itaque ducimus unde aut. Minus consequatur quae enim amet ea. Reprehenderit at qui voluptatem ipsum.\n\nRerum amet alias ipsa beatae non autem vel. Repudiandae et et magni eaque vel iste. Aut facilis vitae ipsa odit distinctio exercitationem. Soluta velit qui sed non illum molestiae voluptatibus voluptatibus.', NULL, NULL, 'pending', NULL, 0, NULL, 'volunteer', NULL, NULL, '-7.8481210', '96.4312310', NULL, '2025-10-10 09:43:14', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(4, 22, 'Advertising Manager OR Promotions Manager', 'Schoen and Sons', 'Sed accusamus quia corporis. Et quasi quis distinctio consectetur voluptatem quia. Laborum molestias recusandae dolor voluptatum ducimus et est. Explicabo aut culpa est voluptate quia facere id. Eos omnis ullam odit consequatur.\n\nEos suscipit cupiditate quos dolor sunt maiores. Dolores cumque quod deserunt repellat optio magnam. Sed qui consequatur commodi id sapiente quia deleniti est.\n\nConsequuntur inventore et et voluptatem ducimus. Maiores voluptas pariatur explicabo sit voluptatem. A ut dicta quisquam. Est facere aliquid repudiandae.\n\nRem quo porro unde ullam. Modi quia animi ex sit libero ullam. Fugit reprehenderit eum sit numquam provident.\n\nEt ut assumenda deleniti cupiditate sed. Quod nihil consectetur ab nobis. Ut ut ut vitae.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, '3.2849690', '122.7574000', NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(5, 6, 'Silversmith', 'Osinski-Little', 'Iure cum rem fuga rerum. Aliquid dolores sit voluptas dicta suscipit amet cum. Et aspernatur animi deleniti at amet.\n\nId consequuntur magni animi magni. Debitis recusandae et excepturi quos ratione illo. Laudantium sed molestias ut sit delectus sed ut. Dicta nobis numquam voluptatem ab amet dolorum voluptate.\n\nIpsum et in aut quasi. Laboriosam explicabo voluptatem dolor omnis expedita assumenda. Autem laborum numquam animi quibusdam.\n\nSequi maxime autem saepe autem est vero. Ut sit harum rerum et. Labore eveniet sed architecto quisquam assumenda consequatur.\n\nDolores voluptatum suscipit quos ut. In adipisci harum aut. Harum quasi et nihil dolores modi voluptatem labore vitae. Rem et voluptatem aperiam omnis. A voluptatem nihil corrupti non.', NULL, NULL, 'pending', NULL, 0, NULL, 'contract', NULL, NULL, '-6.6227060', NULL, NULL, '2025-10-04 08:43:59', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(6, 9, 'Food Servers', 'Koss, Beatty and Wiegand', 'Minus libero minus pariatur. Quas fuga rerum animi distinctio quod maiores est. Repudiandae repellat impedit repellat ex distinctio.\n\nSit ex repellat eum. Itaque provident saepe harum. Aut nulla enim in recusandae accusantium optio occaecati est. Vel nobis ea totam sint optio.', NULL, NULL, 'pending', NULL, 0, NULL, 'volunteer', NULL, NULL, '-10.5948790', '126.4474960', 'Lexibury', NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(7, 15, 'Construction Manager', 'Waters-Cole', 'Explicabo sapiente odio consequatur et sit dicta aut ipsum. Ut mollitia illo quod minima necessitatibus temporibus. Quo tempora voluptas est suscipit adipisci sit dolor. Sit molestias quia in.\n\nVelit a est iusto eveniet illo. Ratione laudantium natus dolor esse nobis. Aut recusandae rerum aut consequatur aut doloremque id ut.\n\nVeniam iste fugiat accusantium occaecati qui. Accusamus harum maxime quae rerum in fugiat voluptas eos. Quia optio pariatur qui necessitatibus officiis et aliquam.\n\nNostrum culpa suscipit exercitationem recusandae inventore atque sit. Expedita et earum delectus. Ad repellendus quis repellendus esse sed.\n\nAspernatur qui velit voluptatem ab laborum. Delectus et ex deserunt quas. Et consequuntur animi et blanditiis aut. Minus ea cumque voluptates eos eveniet magni.', NULL, NULL, 'pending', NULL, 0, NULL, 'contract', NULL, NULL, '5.1934680', NULL, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(8, 11, 'Social Sciences Teacher', 'Daugherty-Renner', 'Occaecati voluptate modi voluptatum sint deleniti ex sint. Ea dolor voluptas praesentium voluptate debitis sapiente. Cumque qui sequi reprehenderit quas velit omnis vel.\n\nAnimi asperiores minima natus rerum similique. Itaque eaque eius hic. Cupiditate mollitia sint consequatur aut provident aliquam asperiores voluptatem. Quos non quod aperiam sequi veritatis sed sapiente.\n\nFacilis amet voluptatibus sequi et non. Est ea quasi possimus facilis excepturi non. Tempora voluptas laborum laudantium nihil nesciunt. Rem sunt ut et unde. Quas nemo reiciendis aut assumenda voluptatibus sed ut.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, '2.5775310', '125.8901140', NULL, '2025-10-07 01:24:29', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(9, 2, 'Manager of Weapons Specialists', 'Jaskolski, Klocko and Jones', 'Earum et maiores mollitia eveniet aliquam cum consequatur. Amet omnis in ut voluptatum commodi iusto. Iusto repudiandae voluptatem sequi distinctio. Fugiat non voluptatem alias vero porro iste omnis omnis.\n\nHic pariatur assumenda quis nostrum dolore eius sit voluptatem. Fugiat quo beatae ut porro laborum alias et dicta. Et est eveniet eveniet sit necessitatibus.\n\nRem molestias aut veritatis accusamus magni voluptatem omnis. Placeat reiciendis consectetur et. Et maiores quaerat et non. Rerum repellat molestias dolorem facere.', NULL, NULL, 'pending', NULL, 0, NULL, 'full-time', NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(10, 19, 'Central Office and PBX Installers', 'Rogahn, Cremin and White', 'Dolorum perferendis incidunt consequatur dolores voluptates est. Asperiores vero placeat omnis nulla et eos ducimus. Est soluta doloremque doloremque et et quaerat.\n\nIpsa ea officiis sit ullam sequi laudantium consequatur. Perspiciatis corporis sit aut nihil culpa. Et error nemo cum.\n\nNemo facilis veritatis illo ipsam eius. Qui rerum necessitatibus debitis sint modi. Voluptas voluptas fugiat soluta omnis quam placeat dolores. Optio neque et corrupti minus sint cupiditate officiis sed. Reprehenderit odit laboriosam eligendi aliquid.\n\nNumquam consectetur consequatur ducimus est repellat qui minima. Eum non vero laboriosam molestiae in ut. Distinctio placeat harum nihil aut sed quae reiciendis.\n\nPlaceat perspiciatis aut vel omnis incidunt doloribus. Et maxime enim nemo doloremque incidunt exercitationem. Repellat perspiciatis accusamus quas est reprehenderit neque enim quibusdam. Error et aut et aut.', NULL, NULL, 'pending', NULL, 0, NULL, 'part-time', NULL, NULL, '-7.2122760', '104.2441010', NULL, '2025-10-05 22:20:31', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(11, 8, 'Photographic Processing Machine Operator', 'Hermiston-Berge', 'Culpa voluptas cumque dolore non sint et odio iure. Nam voluptates est officiis illo est aspernatur. Vel delectus quia sed minus. Animi autem repellendus mollitia voluptate.\n\nImpedit sit perferendis molestiae qui aliquid. Et ipsa sunt natus omnis minima qui. Minima voluptas sint rerum commodi quidem nihil aperiam. Aliquam velit libero minus quaerat. Quisquam facere suscipit et alias ipsa.\n\nError quae illo ea repudiandae quas voluptatem mollitia. Consequatur minus autem vel nisi accusamus. Recusandae molestias qui temporibus doloremque. Assumenda totam possimus sint aut nihil est.\n\nAmet non non dolorum sunt temporibus. Tempora voluptatem placeat expedita tempore deleniti qui non. Ullam est dolor quidem voluptatum.\n\nRerum quia praesentium blanditiis vitae minus magnam placeat. Velit qui aperiam quisquam dolorum dolorem.', NULL, NULL, 'pending', NULL, 0, NULL, 'volunteer', NULL, NULL, NULL, NULL, 'East Henriette', NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(12, 21, 'Night Shift', 'Langworth, Waters and Considine', 'Maxime itaque et ea. Magni id optio laboriosam nesciunt. Maiores est doloribus magnam. Ut consequuntur ipsam quos labore et et aut quos. Expedita est optio quis veritatis odio autem.\n\nDistinctio veritatis non et voluptatem autem. Voluptas voluptatem asperiores consequuntur voluptas dolores quam qui atque. Accusantium est ea modi ab consequatur.\n\nQuia nostrum repellendus nihil quasi quia. Consequuntur eos velit aut eaque aliquid adipisci tempora. Dolorum dolorum dolore iure nihil. Minima delectus necessitatibus voluptatem sit.\n\nIpsam voluptas deserunt aut maiores consequatur sit aut. Nemo dolores voluptates nihil ut recusandae.', NULL, NULL, 'pending', NULL, 0, NULL, 'volunteer', NULL, NULL, NULL, '99.9843260', 'North Felicita', '2025-10-06 09:28:06', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(13, 22, 'Mathematician', 'Bauch, Goldner and Koepp', 'Ut laudantium fugiat aliquam nihil. Officia aut id quas. Ad odio quis qui eum earum repellendus vel sapiente. Doloribus eligendi tenetur quod aliquid molestias illum.\n\nAnimi similique eius nemo expedita exercitationem. Aut in voluptatem necessitatibus dolorum facere sed.', NULL, NULL, 'pending', NULL, 0, NULL, 'part-time', NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(14, 23, 'Host and Hostess', 'Marks-Conroy', 'Sit dolor fuga dicta cum. Ipsam sint sed molestias porro. Eveniet molestias sit assumenda laudantium expedita. Ratione labore et sunt mollitia.\n\nVelit placeat fuga est sequi omnis. Ipsum voluptas id nam pariatur saepe quo nemo. Et officiis provident veritatis fugiat et dolor facere.\n\nIusto asperiores aspernatur sint qui fuga dolorem eos. Magnam ex laudantium corrupti minus ducimus et et est. Corporis hic minima et quia aspernatur mollitia numquam nemo.\n\nModi aspernatur mollitia reiciendis rerum. Cum fugit aut ut et perferendis voluptas. Ipsa ullam non provident quam et vitae. Blanditiis eligendi voluptas commodi corporis quos et.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, '-9.1381970', '134.6083030', NULL, '2025-10-07 05:34:20', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(15, 22, 'Payroll Clerk', 'Funk, Larson and Fay', 'Eligendi non aspernatur ab nisi possimus quo molestiae. Numquam nisi voluptatem temporibus qui quasi quia est. Quasi harum quis blanditiis modi ipsa nulla. Temporibus quis vel expedita placeat nihil ea.\n\nItaque est sed aut magni et est quia. Corrupti maiores asperiores quis at et ut error veniam. Aut dolor eligendi tempora officia tenetur quo ipsum in.', NULL, NULL, 'pending', NULL, 0, NULL, 'contract', NULL, NULL, '-3.0266810', NULL, NULL, NULL, '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(16, 6, 'Ambulance Driver', 'Rohan and Sons', 'Voluptatem tempore aspernatur ipsam iste eum. Atque non provident incidunt qui a dolorem. Alias provident officia quod assumenda eum cum voluptas. Suscipit nihil et et qui tempora exercitationem. Quo quo consequatur eaque minus molestias consequatur.\n\nTempore aut qui mollitia est soluta incidunt. Esse fugiat odit accusamus non officiis autem. Minus animi qui velit possimus consequatur voluptate.\n\nQuo ut consequuntur nihil veritatis perferendis neque alias id. Temporibus non dolores ab ad cum ea dicta. Ut omnis esse exercitationem. Corrupti dolor aut sequi vel nemo.\n\nLaudantium error assumenda natus qui. Soluta eaque fugiat eveniet error quae. In eveniet exercitationem delectus est eum praesentium minus. Molestiae recusandae qui est tempora ut qui. Nostrum suscipit molestias ea aperiam.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, NULL, NULL, 'South Kyla', '2025-10-09 22:50:16', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(17, 10, 'Percussion Instrument Repairer', 'Reilly-Treutel', 'Quia unde voluptatem laboriosam fugiat. Dolorem rerum asperiores ea voluptatum voluptatem molestias dignissimos dolor. Molestiae atque at quia aut necessitatibus.\n\nMinus saepe at voluptas voluptate dolores. Harum commodi laboriosam ex expedita sed facere. Occaecati dicta quam harum deleniti facere. Ea officiis maiores voluptas reprehenderit ipsa dolores.\n\nQui id voluptatibus quos quam et. Qui voluptatem quia et est. A porro quae ut ut porro omnis.', NULL, NULL, 'pending', NULL, 0, NULL, 'full-time', NULL, NULL, '-9.1659500', NULL, 'Durwardtown', '2025-10-09 15:22:05', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(18, 17, 'Animal Scientist', 'Kerluke-Little', 'Earum aliquid quod omnis fuga ut eius. Sed et voluptate perferendis itaque. Voluptatem quidem nisi vero provident modi ut. Velit dolorem quia aliquid ea possimus enim qui.\n\nA nihil quis deleniti quaerat corporis inventore soluta. Non quisquam dolorem eos non cumque. Non distinctio harum explicabo consequatur nisi fuga. Similique in ut facere. Cum eligendi sed non consequatur quos quasi dicta totam.\n\nRerum ut sit amet ipsum sunt dolor. Assumenda laudantium quo aut architecto repudiandae. Fuga eum rerum eius et voluptas dolorem. At odit et repellendus. Non quia repellendus aut.', NULL, NULL, 'pending', NULL, 0, NULL, 'contract', NULL, NULL, '-9.3070370', NULL, 'South Jeramy', '2025-09-29 20:07:23', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(19, 15, 'Soil Scientist', 'Kreiger, Maggio and Walker', 'Quo modi veniam explicabo nisi repellendus. Quia qui et veritatis dolor recusandae sunt.\n\nIn necessitatibus aut harum quasi. Quia tempora laboriosam quo et ratione omnis. Distinctio fuga et voluptas dicta id.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, NULL, '110.9055800', 'Goyetteborough', '2025-10-10 07:03:11', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(20, 4, 'Forest Fire Fighter', 'Rutherford Ltd', 'Doloribus repellendus aliquid aliquid necessitatibus aliquid. Dignissimos et et deserunt incidunt ratione dolores placeat. Hic suscipit in earum autem quaerat molestiae molestias.\n\nOmnis est a aliquam voluptatem quis et perspiciatis repellendus. Molestiae et sint voluptatem ratione doloribus amet exercitationem ullam. Id rerum quo qui eos earum eligendi necessitatibus.\n\nQuas eum sed doloremque hic. Aut ut quisquam sapiente vel earum. Nobis necessitatibus sed modi est fuga.\n\nQuaerat et voluptatem vel sequi unde sed officia. Ad et quos nihil voluptas voluptas quaerat voluptate. Qui recusandae nemo odit dolor. Sit temporibus voluptatibus quo veniam veniam.\n\nDoloremque quia adipisci rerum sed. Repellat et nam occaecati. Et deleniti dolor illum consequatur quae quia.', NULL, NULL, 'pending', NULL, 0, NULL, 'internship', NULL, NULL, '-6.1687750', NULL, 'East Macie', '2025-10-05 21:15:55', '2025-10-14 10:54:36', '2025-10-14 10:54:36'),
(21, 25, 'Di Buka Lowongan sebagai Admin', 'Dimas Kendika', 'lorem ipsum', '', '', 'approved', NULL, 1, 'jam kerja Fleksibel, Bisa kerja dimana aja', 'IT', 4000000, 5999999, '-6.9680920', '110.4093470', 'Lawang Sewu Building', '2025-10-15 08:46:49', '2025-10-14 18:29:40', '2025-10-15 08:46:49');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_14_154810_create_permission_tables', 1),
(5, '2025_10_14_154811_create_notifications_table', 1),
(6, '2025_10_14_154840_create_posts_table', 1),
(7, '2025_10_14_154841_create_comments_table', 1),
(8, '2025_10_14_154841_create_events_table', 1),
(9, '2025_10_14_154841_create_jobs_table', 1),
(10, '2025_10_14_154842_create_resumes_table', 1),
(11, '2025_10_14_154853_add_role_id_to_users_table', 1),
(12, '2025_10_15_000001_add_image_path_to_events_table', 2),
(13, '2025_10_15_000002_create_event_interests_table', 2),
(14, '2025_10_15_010000_add_details_to_job_postings_table', 3),
(15, '2025_10_15_010100_create_job_applications_table', 3),
(16, '2025_10_15_000001_add_status_to_job_postings_table', 4),
(17, '2025_10_15_020000_add_disability_fields_to_job_postings_table', 5),
(18, '2025_10_15_030000_create_company_profiles_table', 6),
(19, '2025_10_15_040000_add_fields_to_company_profiles_table', 7),
(20, '2025_10_15_000001_add_verified_at_to_event_interests_table', 8),
(21, '2025_10_15_100000_create_programs_table', 9),
(22, '2025_10_15_110000_create_organization_profiles_table', 10),
(23, '2025_10_15_120000_add_program_and_categories_to_events_table', 11),
(24, '2025_10_15_050000_add_contact_and_documents_to_company_profiles', 12),
(25, '2025_10_15_030000_add_cancellation_reason_to_job_postings_table', 13),
(26, '2025_10_16_115130_add_kategori_disabilitas_to_users_table', 13),
(27, '2025_10_16_115136_add_kategori_disabilitas_to_users_table', 13),
(28, '2025_10_16_163135_add_accessibility_fields_to_events_table', 14),
(29, '2025_10_16_164126_create_event_user_pivot_table', 15),
(30, '2025_10_16_173206_add_profile_photo_to_users_table', 16),
(31, '2025_10_16_173948_add_profile_fields_to_users_table', 17);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(5, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 2),
(1, 'App\\Models\\User', 3),
(1, 'App\\Models\\User', 4),
(1, 'App\\Models\\User', 5),
(1, 'App\\Models\\User', 6),
(1, 'App\\Models\\User', 7),
(1, 'App\\Models\\User', 8),
(1, 'App\\Models\\User', 9),
(2, 'App\\Models\\User', 10),
(2, 'App\\Models\\User', 11),
(2, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 15),
(3, 'App\\Models\\User', 16),
(3, 'App\\Models\\User', 17),
(3, 'App\\Models\\User', 18),
(3, 'App\\Models\\User', 19),
(4, 'App\\Models\\User', 20),
(4, 'App\\Models\\User', 21),
(4, 'App\\Models\\User', 22),
(4, 'App\\Models\\User', 23),
(1, 'App\\Models\\User', 24),
(3, 'App\\Models\\User', 25),
(2, 'App\\Models\\User', 26),
(4, 'App\\Models\\User', 27),
(1, 'App\\Models\\User', 28);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('13f6c1d0-9526-44a2-8e12-e4bd719d0d49', 'App\\Notifications\\CompanyProfileStatusNotification', 'App\\Models\\User', 25, '{\"company_profile_id\":1,\"status\":\"approved\",\"message\":\"Profil perusahaan Anda telah disetujui.\"}', NULL, '2025-10-15 05:10:06', '2025-10-15 05:10:06'),
('15472709-d475-4c99-b964-69368260dad0', 'App\\Notifications\\JobStatusNotification', 'App\\Models\\User', 25, '{\"job_id\":21,\"title\":\"Di Buka Lowongan sebagai Admin\",\"status\":\"approved\",\"message\":\"Lowongan Anda telah disetujui.\"}', NULL, '2025-10-15 08:46:50', '2025-10-15 08:46:50'),
('3cb256dc-0d71-4424-a923-b05b35f7b55b', 'App\\Notifications\\CompanyProfileStatusNotification', 'App\\Models\\User', 25, '{\"company_profile_id\":1,\"status\":\"approved\",\"message\":\"Profil perusahaan Anda telah disetujui.\"}', NULL, '2025-10-15 01:36:42', '2025-10-15 01:36:42');

-- --------------------------------------------------------

--
-- Table structure for table `organization_profiles`
--

CREATE TABLE `organization_profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `org_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organization_profiles`
--

INSERT INTO `organization_profiles` (`id`, `user_id`, `org_name`, `city`, `website`, `phone`, `email`, `address`, `description`, `logo_path`, `created_at`, `updated_at`) VALUES
(1, 27, 'Moreno', NULL, NULL, NULL, NULL, NULL, NULL, 'org-logos/PGamUqTU1qDqgS2qoPr6TCwEjaTrCTPrb6V9MeYU.jpg', '2025-10-14 21:41:43', '2025-10-14 21:42:05');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` enum('public','private') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `visibility`, `created_at`, `updated_at`) VALUES
(1, 23, 'Qui blanditiis quo optio aliquam qui molestiae doloremque cum.', 'Voluptates reprehenderit perferendis aut. Quam non repudiandae deserunt in consectetur molestias et ut. Molestiae vero iure et maiores. Aut corrupti eos sit.\n\nMagnam explicabo unde atque animi quibusdam nesciunt. Architecto sit quae veniam. Et cupiditate minima corrupti aut temporibus. Iste est dolorem labore et adipisci reprehenderit. Illum veritatis et sint eos.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(2, 14, 'Eveniet expedita.', 'Assumenda sint qui dolorem tempore dolor enim. Reprehenderit et sunt rerum ratione aut dolores doloribus. Officiis velit sunt quo adipisci omnis et sint. Aut non quis reiciendis maxime qui voluptas.\n\nCum fugiat non voluptate ut facere consequatur ut. Aut excepturi adipisci blanditiis esse.\n\nEt voluptates perferendis voluptatem vitae. Sunt cumque porro nemo amet qui incidunt.\n\nEt neque autem aperiam cupiditate maxime at. Non consequuntur vel porro qui placeat labore repellat. Ut quia minima sint inventore. Eos et quia error aut sit a.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(3, 14, 'Non necessitatibus.', 'Excepturi consectetur tempore perferendis. Rerum velit molestiae possimus voluptatem. Ducimus illo blanditiis ab qui ut officiis. Nesciunt harum distinctio ab cumque recusandae recusandae est.\n\nEst laborum enim blanditiis cumque. Et minima sed minima unde porro. Assumenda velit est dolor quia quia odio. Consectetur mollitia omnis reiciendis.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(4, 13, 'Sapiente enim molestiae nam.', 'Sunt odit incidunt dolorum quis a. Velit quia architecto asperiores reiciendis. Veniam sit autem rerum ipsa mollitia. Harum sequi quisquam quia blanditiis molestiae molestias.\n\nModi nobis eos occaecati nulla omnis et aut. Sint ut cum quia occaecati iusto exercitationem. Officia fugiat quasi minus id saepe minus qui doloribus. Ipsum corrupti est repellat et consequuntur animi ut. Consequuntur modi mollitia et beatae beatae expedita minima.\n\nNisi voluptatem recusandae quisquam in debitis reiciendis aut. Repellendus odio laudantium sint quibusdam. Error sed sapiente et quo. Autem numquam nostrum dolores molestiae eius nesciunt. Quia ut molestiae culpa veritatis et. Ut sint et fugit qui dolorem dolores.\n\nDoloremque tempore in asperiores repellat mollitia. Dicta natus nulla iste at pariatur laudantium praesentium. Et fuga accusamus qui velit voluptatem quia eum.\n\nHarum hic omnis dolorum quasi vitae quisquam dolorum. Amet ipsam fugiat quia. Placeat aut qui vitae quaerat. Assumenda repellat libero sapiente voluptas dolorem. Et at adipisci et nesciunt dolorem sit. Modi sit sint velit enim in blanditiis nobis.\n\nEt dignissimos delectus at velit sapiente in. Magni sed earum odio esse veniam. Quos autem ratione omnis voluptatem.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(5, 5, 'Ducimus qui consequuntur sed nam voluptatum sed accusantium dolorum nam.', 'Enim similique fugit recusandae dolorum et occaecati aperiam. Nihil ab reiciendis laboriosam optio cumque quia doloribus. Maiores asperiores et est amet occaecati. Qui minus deleniti praesentium omnis. Voluptatem voluptatum alias non aspernatur optio dolorem necessitatibus.\n\nConsequatur natus et enim. Et et deleniti velit quos odit.\n\nPorro ullam non eius aspernatur sunt vel ut. Qui dolor quae dignissimos ad odit amet. Totam sed minima facilis quae fugit ratione. Et repellat placeat laboriosam adipisci illo eos sit. Laudantium expedita nesciunt aliquam aut eaque.\n\nQuia et aut nobis explicabo ea ex vel. Quia esse omnis eveniet qui aut. Fugiat in illum quidem ab facilis ut. Quas molestias debitis harum amet unde repellendus et. Recusandae magni tempore quibusdam suscipit quibusdam et. Natus rem sapiente et earum odit et quidem.\n\nConsequatur voluptas libero sit delectus corrupti. Saepe qui doloribus voluptatem officiis. Autem quo temporibus ut.', 'private', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(6, 19, 'Facere quae rerum voluptas repellendus omnis.', 'Corporis accusantium nihil laborum recusandae. Culpa est omnis omnis explicabo quisquam aliquam dolor.\n\nIn ab in ullam. Suscipit odit hic explicabo. At aut omnis pariatur. Ducimus quia aut aut eaque. Repellendus libero labore quas perspiciatis commodi repellendus. Aut qui consequuntur perferendis aut consequuntur eos cupiditate.\n\nSint accusantium impedit maiores. Illum aut dolorem perspiciatis qui mollitia quia saepe. Est ut voluptas mollitia architecto soluta. Sit id ut sequi. Quasi amet consequatur eum voluptas iure aliquid. Occaecati qui consequuntur similique ipsum.\n\nIn qui repudiandae dolor esse earum maiores. Sunt reprehenderit ullam explicabo dolorum et modi. Aut ipsum officiis voluptatum ipsam voluptates.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(7, 21, 'Officiis rem iste et ut.', 'Dignissimos pariatur et error voluptatem. Inventore voluptatem voluptatibus quisquam nobis quibusdam enim velit. Vel occaecati et voluptas eum quasi.\n\nPossimus aut alias et voluptates. Fugit ea dolorum neque. Magnam quia neque voluptatum voluptatem qui. Ea voluptas maiores natus a vel blanditiis accusantium. Dolorem eius consequatur ad.\n\nQui enim in aspernatur consectetur ducimus tenetur placeat. Autem quam facilis harum autem eos voluptate repellat distinctio. Hic optio velit ut facere culpa.', 'private', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(8, 22, 'Assumenda recusandae nesciunt aut.', 'Modi similique ut quae aut laudantium dolorum. Animi quaerat repudiandae minima sit aperiam nostrum earum. Quo atque qui qui fuga cumque cum quia. Eveniet delectus quia eligendi aut qui dolorem.\n\nEum molestiae qui corrupti et rerum officiis corrupti. Id doloribus corrupti rerum debitis excepturi. Ut vel ducimus quo in. Et dolorem suscipit et qui quis. Quis incidunt soluta beatae. Ducimus consequatur rerum saepe ea ut rem laborum.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(9, 9, 'Reiciendis laudantium.', 'Dicta dolor esse dolores facilis perspiciatis. Sed molestiae voluptate quod amet. Impedit occaecati nam assumenda aut qui est.\n\nAlias ea aut omnis. Debitis ex et esse occaecati. Est natus impedit molestiae excepturi error dolores nemo est. Et aperiam distinctio voluptas consequatur non laboriosam. Soluta velit facere eaque molestias quae molestias earum. Libero consequuntur aliquam voluptatem alias. Aliquid laborum fuga quia voluptas exercitationem.\n\nQuaerat ut maxime veniam et excepturi. Sed aliquam molestias exercitationem fuga id sunt voluptatem velit. Cum quas reiciendis omnis tenetur perferendis eligendi. Quam eos omnis eaque et dolores. Incidunt tempora ullam porro. Veniam sint a sequi provident deleniti quasi.\n\nFugiat consequatur excepturi velit delectus. Omnis labore sequi recusandae ex quod corrupti. Accusamus deleniti pariatur laboriosam dolorem occaecati facere sed. Itaque eveniet enim laborum quae. Voluptas id libero tempora vel.\n\nEt earum natus perferendis ea maxime soluta sint. Autem error excepturi provident quo atque. Possimus autem aut nam ut repellendus.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(10, 20, 'Esse tempore occaecati nisi.', 'Dolor aperiam sint ab et nulla sint. Numquam quia laudantium omnis et dolor accusantium illum. Voluptas illo natus aut et officiis exercitationem. Fugiat sint incidunt commodi magni culpa magnam. Repellendus quia molestiae eius numquam. Cupiditate molestiae eaque impedit quia est. Sunt sint iure commodi quod soluta debitis consequatur.\n\nQui maiores ut maiores soluta. Nulla id non nisi voluptates. Ab est inventore consequuntur ea. Ratione doloribus consequatur cupiditate quam velit aut.\n\nAut a voluptatibus rerum doloribus officiis id aut. Fugiat impedit voluptas excepturi unde enim. Reiciendis aut ipsam ullam quo doloremque qui. Eveniet provident non corrupti eos provident distinctio pariatur.\n\nItaque incidunt animi adipisci. Amet et non corporis voluptatibus corporis reiciendis. Et veritatis magni rerum omnis eligendi nam. Consequuntur amet quod accusantium eveniet voluptatibus.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(11, 14, 'Minima consequatur rerum debitis quia.', 'Rem porro nihil amet debitis ut eius. Quis id eveniet facilis odio vel consequuntur et non. Facilis magnam asperiores sit fugiat sit ut dignissimos. Debitis quisquam ad sit atque.\n\nEa accusantium minus esse quo delectus aut quibusdam. Perspiciatis quia et beatae quibusdam qui voluptatem. Quos reprehenderit ut porro eum eveniet cumque qui. Accusamus nulla ratione fugit quia. Perferendis iste necessitatibus nemo.\n\nSit beatae numquam qui. Libero ut itaque architecto deserunt sint accusantium quis voluptatum. Quidem ab et eum et et. Est inventore et consequatur incidunt voluptatem. Cumque odit optio voluptatum.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(12, 4, 'Dignissimos eveniet qui doloremque.', 'Eos ipsa enim facilis. Amet velit aut magnam quia odio dolorum. Asperiores ad at aut corporis voluptatum architecto aspernatur.\n\nIn consequatur reprehenderit laboriosam facere et facere. Accusantium est accusamus aut quia rem et rem reiciendis. Ut itaque repudiandae mollitia excepturi. Excepturi veritatis et officiis eius ratione ipsam. Provident facere labore et voluptas voluptatem voluptates sunt iusto. Dolores distinctio accusantium cupiditate enim.\n\nEt doloribus dicta rem repellat maxime repellat. Est nostrum ut officiis eos excepturi placeat libero.\n\nConsequatur voluptate laudantium dolor tempore ut. Maiores incidunt veritatis nesciunt est omnis blanditiis. Asperiores aut recusandae harum impedit facilis in non.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(13, 23, 'Explicabo voluptate.', 'Cumque laboriosam neque voluptatem architecto quam consequuntur. Ullam est atque natus sapiente omnis fugiat. Nam doloribus soluta ut sequi. Quae vel sunt aut reprehenderit aliquam et sunt. Libero aut quisquam harum quibusdam pariatur dolor dolor. Maxime voluptatibus quo architecto qui et iste alias.\n\nAut vel ut debitis enim. Maxime qui beatae esse est est totam pariatur. Possimus amet similique vero iusto quasi. Laboriosam exercitationem et tenetur quasi placeat doloribus qui. Consectetur illum doloribus reiciendis eos nemo. Pariatur et libero autem. Error atque modi excepturi eos dolor.\n\nError consequatur corrupti voluptate aspernatur architecto nihil similique. Aliquid aut consequuntur sapiente quo quo. Quisquam officia repellat nam minima quo commodi dolores odit. Vel sapiente a quaerat tenetur animi omnis eaque.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(14, 23, 'Accusantium repudiandae quasi odit sit possimus.', 'Sed qui in consectetur dolores at esse tempore. Culpa cum quos debitis culpa.\n\nDolor assumenda nihil voluptatem laboriosam. Totam in voluptatem harum. Ratione distinctio esse magni placeat culpa culpa. At voluptatum deleniti amet deleniti fugiat. In nobis maiores voluptas accusamus facere. Assumenda nulla omnis vero cupiditate unde ullam dolorem. Eaque cupiditate omnis tenetur voluptatum aut.\n\nRepellendus vel ratione molestias quia. Nisi doloremque fugit praesentium non. Sit consequuntur animi iste. Maiores recusandae velit voluptatem quo. Quibusdam ipsum qui ipsam debitis qui provident eum.\n\nFacilis enim temporibus fuga aut iure officia. Iure aliquid eaque alias ut et et neque.\n\nNulla quia amet voluptatem ea cum. Ex quia at expedita sit rem. Odio et et ut corporis. Non placeat recusandae ut non dolor. Est aut aut necessitatibus porro soluta.\n\nAsperiores eligendi expedita ratione consectetur possimus. Eveniet facere non laboriosam autem et iure voluptatem. Nulla officia rem ut. Quae consequatur repellat delectus officiis ducimus qui illum.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(15, 6, 'Ipsam sequi accusamus aperiam.', 'Odio repellendus omnis autem aliquam. Velit pariatur aut ab et dolorem. Dolorem est consequuntur commodi voluptas voluptatem. Eum odio consequatur praesentium in perspiciatis. Minima hic qui sapiente voluptas rem laborum. Assumenda totam illum molestiae eum suscipit enim. Corporis omnis consectetur dolores autem hic.\n\nNesciunt at omnis est atque ut praesentium. Inventore animi eos nesciunt. Quasi dolorum sint non autem. Aliquid unde similique velit qui assumenda est.\n\nAccusamus omnis quam expedita autem qui nesciunt et. Repudiandae molestias necessitatibus nisi dicta facilis eligendi unde. Occaecati voluptas aut earum autem dicta dolores. Amet laboriosam qui nisi libero quia quae sequi corporis. Quis et enim est fuga numquam quaerat. Modi qui et et praesentium autem. Velit corporis accusamus pariatur ut neque.\n\nDignissimos aut aut aperiam soluta perferendis. Ut deleniti nobis architecto voluptas quia dolorum. Id maiores sapiente incidunt iure quae itaque. Nihil ea dolor enim provident libero. Aut amet amet totam qui dolor enim deleniti.\n\nEsse sapiente rem eum et consectetur quasi. Saepe et tenetur assumenda velit fugit voluptatem. Aut est architecto et aut voluptatem. Tempora optio dolor neque iste ex in. Et beatae ad blanditiis ut.\n\nQuam exercitationem vel atque autem dolores aut. Nihil hic minus voluptatem omnis. Magnam maiores nihil dicta repudiandae ratione est. Aut qui aliquam enim natus.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(16, 6, 'Qui laboriosam et doloribus minus aspernatur repellat et autem.', 'Beatae ipsam ut ea error quibusdam. Est occaecati amet sint dolorem commodi officia. Ut aut iure nostrum molestiae eos.\n\nVoluptatibus repellendus id repellendus sapiente. Earum voluptatem nesciunt doloribus dicta esse maiores distinctio. Dolorum tempora laudantium dolorem odit itaque.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(17, 18, 'Autem nulla omnis consectetur ipsa quia ut eos aut illo.', 'Omnis in est provident enim atque rem illum voluptatibus. Labore reprehenderit repellendus ad dolorem praesentium. Vitae odio eum excepturi distinctio quae voluptas.\n\nOfficia molestiae sint omnis numquam. Necessitatibus maiores ut temporibus magni dolor. Amet est omnis accusamus asperiores. Dolores a quia facere aut sequi accusantium.\n\nRepellat ipsam velit nisi sint sunt. Vel eos atque alias animi odio.\n\nOmnis at et et sunt molestiae. Voluptatibus molestiae qui quam cum reprehenderit accusamus.\n\nIste repudiandae et est quisquam laboriosam. Est et non nemo explicabo. Id in id rerum iste vero qui. Quisquam omnis placeat tempora eum nisi sed sed.\n\nDolor harum nulla reprehenderit reprehenderit perspiciatis in odit quis. Deleniti dolores voluptatem in placeat. Earum natus sint deserunt. Repellendus ut eum dolores.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(18, 15, 'Itaque distinctio enim aut est.', 'Rerum provident ea ratione vel voluptates totam culpa. Libero voluptas minus nam reiciendis voluptas laudantium quis. Ducimus ea consequuntur amet fugit eaque aut asperiores.\n\nVoluptates minus totam aspernatur ab rem. Enim perspiciatis magni praesentium sed accusamus. Ea ea doloremque pariatur rerum aut eum. Fugiat id mollitia minima iure repellat provident enim. Provident consectetur tempore quibusdam ut.\n\nQui amet officia sunt officia ab modi qui magnam. Illum aspernatur illum aut. Enim repudiandae soluta autem excepturi quae ut tempore et.\n\nConsequatur et pariatur omnis sit. Nulla iusto voluptatum dicta. At laudantium voluptas atque et consequatur et in. Velit est non porro dolor omnis laudantium consequatur. Quia qui quo eum et dolores error eveniet.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(19, 18, 'Voluptate quidem enim consequuntur.', 'Quidem dolorem ut tenetur quia quos. Eligendi voluptate rerum velit ut. Ratione nesciunt voluptas ipsa quo nisi facilis cum. Quasi quasi quia vitae architecto molestias. Omnis ratione atque non et. Minima tempore dignissimos quibusdam est.\n\nArchitecto sit ipsam nemo in unde. Perspiciatis rerum aut voluptatem sunt. Voluptatibus quaerat nisi labore voluptatem quaerat occaecati. Sapiente qui amet quod id maiores. Vero dicta aspernatur vel tempore consequatur veritatis. Autem animi magnam est ducimus accusantium maxime.\n\nArchitecto autem aut praesentium et quod. Nesciunt quasi debitis aut dolores ut exercitationem deserunt. Voluptatum eaque dolor quia asperiores soluta. Delectus doloremque officiis suscipit voluptas aperiam deserunt laudantium. Aspernatur saepe dolor enim omnis.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(20, 19, 'Neque esse ab et.', 'Aut voluptas repellat voluptas eos sunt. Autem aut qui a et voluptate. Reprehenderit dolorem vitae praesentium natus sit ut. Quia aliquam corporis ut voluptatem sapiente laborum.\n\nConsectetur laudantium sunt placeat sint quos vel. Magnam repudiandae natus veniam deleniti velit cumque accusamus. Soluta beatae magni quo sed nostrum. Deleniti delectus laboriosam incidunt nihil temporibus eligendi. Tenetur eos commodi vel earum quis. Amet autem repellendus quibusdam asperiores et eos.\n\nDolor aperiam debitis est ut voluptate dolorum harum culpa. Voluptatem autem enim maiores placeat architecto. Eius voluptatem in minus asperiores blanditiis modi. Perferendis tenetur ut sit perferendis. Corporis quia quos ipsam atque voluptate ut natus.\n\nFacere nisi minus explicabo nemo voluptatibus eum. Odit laudantium dignissimos id tempora. Ut aliquam modi est hic. Aliquam est similique ad dolor. Quo maxime asperiores quae quia reiciendis sunt. Quisquam aut temporibus ut cumque optio aliquid. Est ea illo numquam tempore rem et repellendus. Ut quis et facere possimus.\n\nVelit est repellendus assumenda. Consequuntur omnis autem minima voluptas et illum. Est voluptatem consequuntur dolores aperiam omnis explicabo debitis.\n\nIllo sunt itaque quo et optio quia. Soluta ut voluptatem quod perferendis. Quia ut earum possimus dolor.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(21, 5, 'Unde atque non dolore.', 'Aperiam aut assumenda tempora cumque cum deleniti. Sed rerum recusandae maxime voluptatem. Est natus non beatae non.\n\nNobis magnam aut occaecati quis accusantium. Doloribus ut illum esse impedit vitae quaerat mollitia magnam. Ab eaque quis consequatur est placeat. Impedit quisquam nulla rerum qui suscipit. Modi et harum deleniti dolor atque at debitis.\n\nRerum et ex dolor velit quae. Odit ea quas perferendis vitae sed ut qui. Dolorum quis ratione perferendis temporibus laudantium illum vero rerum. Soluta ut nobis sunt praesentium officiis. Ad perferendis sapiente reiciendis dolores.\n\nDoloremque consequatur quibusdam occaecati qui dolore hic voluptas harum. Ut qui enim aut laborum. Voluptates aperiam sunt voluptas quia beatae dolores.', 'private', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(22, 21, 'Ut deleniti quis quaerat voluptatem dicta quisquam tempora.', 'Mollitia pariatur alias nesciunt dolorum eum odit voluptatem. Fuga impedit sapiente minima sapiente qui recusandae sunt. Et quidem voluptatem eaque enim. Enim delectus explicabo non facere quia cumque distinctio.\n\nOmnis deleniti similique itaque corrupti. Qui ducimus aut totam dolor placeat. Distinctio et suscipit quis cupiditate esse nihil ut omnis.\n\nEt nobis minima perferendis quis molestias error tenetur. Magnam doloremque cumque quas vel vero.\n\nIpsa autem velit corporis dolorum. Pariatur eius fugit molestias ut minus rerum. Nihil doloribus rerum beatae dolor qui. Quis in similique id et. In deleniti et reprehenderit minima ratione doloremque ab. Rerum non dolore soluta culpa qui.\n\nVel quos eaque laborum accusamus fuga natus nesciunt. Quos aut natus expedita. Voluptas sint temporibus quo harum provident omnis rerum.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(23, 10, 'Vel nesciunt aut repellendus ea minima quisquam ea voluptatibus.', 'Qui tempore ut ipsum soluta vero. Ipsam maiores fugiat reiciendis eaque. Dolorem magni quia quia vel aut voluptatem.\n\nAsperiores ab ratione repellendus sunt. Sed minima deleniti dolores natus dicta. In rerum necessitatibus molestiae libero.\n\nRerum fuga excepturi sequi magni. Ut error inventore quia ut maiores exercitationem nisi. Alias dolores doloribus corrupti. Possimus neque consequatur nesciunt.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(24, 12, 'Perspiciatis reprehenderit laboriosam sed.', 'Neque reiciendis soluta et. Modi labore necessitatibus quia corporis nihil. Magnam rerum vel qui quia dolore ab in. Et dolorem nulla ipsam vitae quae. Neque ea perspiciatis ut. Possimus natus ab officiis ex aliquid at laboriosam commodi.\n\nRerum doloremque ipsam repudiandae sunt accusamus nemo. Aut ut qui reiciendis ipsa labore et ducimus officia.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(25, 1, 'Tempora et mollitia itaque explicabo mollitia architecto.', 'In blanditiis minima labore ut ut aut amet. Alias nihil sit quia earum cumque sed repellendus. Temporibus consequuntur sed maiores deserunt. Non vel facere sed illum fugit numquam.\n\nQuibusdam corrupti consequatur inventore amet ipsa odit in temporibus. Pariatur magni illum dolore saepe voluptatem et. Omnis rerum accusamus incidunt autem.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(26, 8, 'Quos aut deleniti dolorem sequi.', 'Minima vitae deserunt placeat illum dolores quae et. Voluptatem saepe at saepe similique et voluptatem blanditiis. Velit et in nostrum laudantium cupiditate voluptas. Ut tempore animi maiores ipsam qui.\n\nOccaecati earum ipsa doloremque voluptas dolore. Eius ex saepe qui magnam exercitationem dolores vel ex.\n\nSequi voluptatem ut nobis aut ad illo est. Asperiores earum et quasi quod voluptate ipsam. Laudantium impedit rerum eaque amet corporis quia error. Aut delectus in dolorem et quos repellendus. Unde sunt est dolorem. Voluptas quibusdam fugiat tempora molestiae placeat in qui dolorem.\n\nPerferendis ea dolorem aut et quae iusto quia. Aspernatur voluptatem voluptas sunt qui beatae aut.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(27, 21, 'Voluptatem odit maiores.', 'Sed vitae aut nulla est dolor et. Sed incidunt delectus quia alias itaque. Voluptates dolor sit quam ut saepe.\n\nQuis iste totam et culpa natus. Dolor soluta consequuntur eligendi hic. Dicta voluptatibus magnam sit quo saepe non aut. Explicabo amet quaerat accusamus labore eos.\n\nAutem sunt velit nostrum et ratione debitis quas animi. Voluptatem deleniti autem enim quasi. Cupiditate molestias qui est sunt soluta. Recusandae libero nihil iste eum. Adipisci vel consequatur quis aut. Ullam cupiditate et voluptatem sint impedit.\n\nQuia soluta autem blanditiis necessitatibus recusandae sit expedita reprehenderit. Ullam perspiciatis ad consequuntur qui. Numquam delectus nihil nemo corrupti molestiae ut.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(28, 13, 'At omnis sit voluptatem sunt.', 'Doloremque rerum et dolorum libero ea exercitationem ipsum sequi. Ratione atque est officia ut sed enim. Quasi praesentium doloremque repellendus sit laboriosam et vitae.\n\nNihil vel ea rerum sit iusto quis assumenda reprehenderit. Consectetur dignissimos eum animi rerum sunt culpa rem. Placeat consequuntur doloribus et aut. Qui est nobis aut ipsa illum illo. Neque ut iusto esse quae autem ratione assumenda.\n\nIste quasi itaque quis laudantium ut. Tempore error sequi vel voluptate dolore magnam. Quia ut ullam voluptate rem quibusdam optio et.\n\nEt earum consequatur est soluta repellendus similique voluptatem. Laborum sint sed non dolorem vel nesciunt. Adipisci et et eaque placeat deserunt delectus sint. Maiores quis eaque nobis.\n\nSed dignissimos numquam recusandae aspernatur recusandae porro quia. Eveniet nobis voluptas iste odit dolores eum sint. Illo aut magni eligendi aspernatur odit eaque repudiandae et. Odio optio ut laboriosam fugit repudiandae quia. Aut error vitae quas est dolor similique et. Porro debitis asperiores vel maxime placeat sint.\n\nEum sed ducimus repellat similique. Tempora eos eligendi velit ex necessitatibus. Id ut animi consequatur quo illum nobis.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(29, 12, 'Aut beatae doloremque optio.', 'Consectetur et minus qui nulla nobis aut. Perferendis illo est culpa quae consequatur.\n\nMagnam nihil sit ullam vero enim. Dolores nobis id harum doloribus dolor autem architecto. Voluptatem dolor velit et est rerum. Consequatur vel laboriosam ab cupiditate numquam unde quidem rem. Aperiam sit eum et. Eveniet enim repudiandae aut nostrum odit ut.\n\nEligendi fugit unde id maiores error. Fugit molestias adipisci velit illum. Quia ex est nobis dolorum nemo velit. Amet laudantium est fugit eligendi. Ea et consequatur corporis consequatur. Ipsam sint sequi nam dignissimos rerum necessitatibus nihil.\n\nRatione iusto in et autem doloremque quaerat quis. Accusantium magnam voluptas repellat accusamus suscipit. Consequuntur deserunt ut commodi pariatur.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(30, 3, 'Cumque maxime voluptas.', 'Magnam minus quo ut aspernatur nihil et voluptas. Molestiae illum in molestiae. Expedita assumenda adipisci laborum minus et et ut. Tenetur facilis aut voluptatum.\n\nProvident non dolorem voluptatem voluptates rerum ea ut. Sapiente mollitia illum sit expedita debitis est. Quo ratione assumenda quo corrupti accusamus. Aut rerum fugiat quidem qui.\n\nQuam deleniti laboriosam accusantium libero expedita qui dolor non. Et ducimus amet mollitia. Culpa quidem qui provident. Iusto reprehenderit magnam repellendus ipsum debitis nihil.\n\nQuod nam eos suscipit. Id aut vitae iure et quidem ut. Repellendus cum sit voluptatum autem. Aut quia facilis omnis soluta. Ut omnis illo repellat pariatur non. Veritatis deleniti dolorem modi qui nostrum sint architecto.\n\nSit atque esse aliquam libero. Labore qui dolor odio nulla explicabo eaque. Consequuntur commodi cumque sequi ipsum sit. Corrupti est assumenda fugiat.\n\nAliquam voluptas quam consectetur excepturi et. Illo debitis voluptatem quidem dolores assumenda. Dolorem doloremque expedita incidunt ab velit minus libero. Unde asperiores soluta asperiores sed.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:35'),
(31, 4, 'Quia similique veritatis doloremque voluptatibus maiores ut ad.', 'Est possimus numquam accusantium non. Sunt harum qui dolores provident aspernatur. Magni natus reiciendis corrupti ullam quis in. Fugiat sapiente vitae ab. Ratione accusamus cupiditate beatae consequatur. Vel ex beatae aliquid et temporibus voluptas. Sapiente hic enim pariatur placeat quasi non.\n\nVelit quia animi voluptatum sit quia. Voluptas commodi id libero quia ut harum.\n\nNihil qui iusto perferendis rerum. Deserunt labore dignissimos esse similique dolorem ullam. Eveniet odit aut nam nobis quis.\n\nAliquid aut modi quia rem. Sequi aut tempora enim voluptate. Quia in molestias laudantium. Amet tempore non consequatur quis unde.\n\nSoluta voluptas et et libero iure. Excepturi soluta ex eos similique. Eveniet maiores inventore mollitia.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(32, 6, 'Nobis dolores nesciunt impedit.', 'Quo hic officiis ipsum ipsa autem ut ad. Totam delectus molestiae quos aperiam recusandae et et.\n\nSed voluptatum explicabo fuga quia. Cumque tempore sit dolores voluptas quo voluptas cumque veritatis. Rem vero omnis voluptatem eaque magnam dolor voluptatibus ut. Velit doloremque atque sit deserunt excepturi vitae. Et unde similique aut non non dolores esse. Dolor et voluptatem qui corrupti in.\n\nSoluta rerum rem sunt eaque dicta. Aspernatur error quas iste ullam non. Et neque et quia. Sunt iure sunt aut ex aut rem.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(33, 19, 'Fugiat sint repellat adipisci pariatur voluptas consequuntur saepe provident eos.', 'Alias eum accusamus molestias nemo. Aperiam et libero et quidem id. Qui in voluptates illo veniam. Asperiores vel laudantium eum vel.\n\nDignissimos suscipit id voluptas et et accusantium ea. Quaerat aut commodi est velit sequi. Doloribus ut voluptatem aspernatur. Deleniti assumenda odio dicta non. Optio nostrum accusantium enim doloribus corporis dolorum.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(34, 17, 'Aut ullam voluptatem architecto facilis veniam.', 'Sunt sit harum nemo libero eos quaerat. Fugit ad adipisci qui culpa pariatur non.\n\nAlias ducimus nulla consequatur assumenda recusandae et praesentium. Fuga enim odio suscipit a tempora non. Fugiat repellat quia nemo rerum ipsa nulla animi. Placeat voluptas nostrum nemo voluptas provident dignissimos sint voluptatem. Repudiandae molestiae quia autem repudiandae.\n\nExcepturi exercitationem sed non animi esse autem. Nulla perspiciatis saepe laudantium eligendi necessitatibus magnam necessitatibus. Veritatis consequatur labore ut inventore. Iure autem earum quisquam omnis beatae nulla.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:36'),
(35, 8, 'Animi rerum iure qui.', 'Aut hic et ea doloribus et. Aut voluptatem itaque est deserunt. Corporis enim qui eveniet architecto.\n\nDignissimos accusamus ea dolorem ratione harum. Est dolorum reprehenderit sapiente veritatis libero nesciunt. Error porro aut quae ad quia animi quidem.\n\nDolore vitae facere veniam. Quisquam asperiores voluptas quas debitis rerum voluptatem. Quos fugiat molestias magni illo. Velit consectetur quia error quo sint.\n\nTenetur et dignissimos nihil architecto odit. Quia nostrum est quasi voluptatem maiores eum commodi praesentium. Tempora debitis ut esse dicta. Quis odit et voluptatem. Ab natus ipsa molestiae accusantium et at ea. Voluptas pariatur maiores qui.\n\nFacere porro voluptatem quaerat ab dolorem. Ex est inventore voluptatem voluptas placeat delectus. Ab harum possimus molestiae dolore eligendi.\n\nQuia nihil rerum doloremque perferendis sint iusto praesentium. Aut quia exercitationem enim optio.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:36'),
(36, 15, 'In consequatur reprehenderit veritatis sequi et facilis.', 'Officia molestias eos et soluta culpa architecto qui. Dolores omnis explicabo debitis ratione. Expedita fuga modi dolorem quidem ducimus dolorem quam. Beatae dolore aut et amet autem magnam eaque. Ea quasi dolorem consequatur.\n\nEos commodi iusto aut vitae odit doloribus. Officiis dignissimos repudiandae harum in harum. Nesciunt totam est labore vel et magnam ipsa voluptate. Minus consectetur consequatur eum qui id voluptas voluptas sed.\n\nMagni consequuntur laudantium consectetur officiis libero suscipit voluptas. Voluptas cum vel aut maiores deserunt. Ab quis tempora omnis qui maiores et commodi aperiam.\n\nIure magni quae eius esse esse similique. Deserunt nostrum tempora exercitationem itaque et quidem.\n\nConsequatur sed dolor ullam ea ut. Ratione at ad ut assumenda illum velit. Placeat aspernatur in non autem dicta quia autem. Quam qui ut nam eius et asperiores sed sed.\n\nPerferendis debitis fugiat consectetur sunt. Autem doloremque quia eum possimus sunt omnis fugit est. Et atque fugit non occaecati deleniti quis. Et officiis esse dolorem ut porro aperiam aut. Officia ullam dicta iure iusto aut id.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(37, 10, 'Magni et voluptas laborum non ut laboriosam et dolorem et.', 'Est voluptas assumenda reprehenderit perferendis adipisci deserunt ut est. Asperiores quibusdam quae et non. Est voluptatum dolor eligendi unde alias dolorem. Eos omnis doloremque quos voluptatum nostrum ea.\n\nOdit et quidem voluptate est commodi tempora. Incidunt itaque et sint ipsa reprehenderit. Quo non provident et praesentium. Reiciendis laudantium possimus omnis deserunt. Aliquid sit quae expedita expedita est ea.\n\nNon beatae alias accusamus nisi expedita voluptas. Nisi pariatur explicabo rerum. Hic voluptatem itaque mollitia dolorem adipisci fugit. Iure cupiditate dolorem magnam et incidunt id.\n\nHarum ut incidunt cupiditate iste commodi nostrum explicabo saepe. Expedita nisi ut error possimus.\n\nVelit quam atque eum delectus vero assumenda praesentium. Reiciendis dolor quia vel aut libero delectus. Hic est vero quo perferendis dolorum sunt. Tempore debitis maxime reprehenderit aliquid modi quia.\n\nConsequatur minima quas neque voluptatem. Sit quae rerum ex illum error blanditiis. Et dolor et sint doloribus.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:36'),
(38, 11, 'Sit inventore laboriosam animi ipsum accusantium nemo.', 'Quis nobis quis aliquid provident tenetur vitae molestiae. Eos id qui inventore id suscipit sint. Assumenda expedita recusandae et eligendi suscipit. Qui odio sed temporibus voluptates exercitationem accusantium quidem quo. Quo maxime consequatur ea nobis.\n\nConsequuntur esse non voluptas accusantium mollitia veniam consequatur. Distinctio eligendi ut explicabo et et. Quibusdam libero ad nobis excepturi non. Excepturi sint nisi rerum corrupti quis aut sunt. Sapiente maxime rem eos nisi vitae.\n\nExcepturi reprehenderit deleniti ex quidem culpa. Esse esse quo et ea.\n\nQuos vel harum magnam. Consequuntur sed facere quasi laboriosam cumque. Itaque laudantium cupiditate sed labore cupiditate quibusdam esse. Voluptatem officiis et laboriosam quis doloremque dignissimos. Nemo voluptas aut vero ut fugit et minima. Odit aut dolor laborum. Aperiam esse neque sit rerum aut.\n\nEst dignissimos vel atque officia eaque. Possimus vel sed dolorem laboriosam iure. Commodi est itaque eveniet omnis. Minima magni in nesciunt assumenda deleniti.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(39, 8, 'Voluptate occaecati debitis enim.', 'Ad ipsam iusto fugit eligendi quasi. Aut voluptatem aliquid vero voluptatem quis quam fugiat. Molestiae officia omnis veniam et commodi facere nihil. Vero quaerat cupiditate facilis quia voluptatem.\n\nEt maxime eaque molestias dicta. Dicta et aut asperiores optio itaque ea. Cupiditate et in aliquam.\n\nEst sequi eos accusantium voluptas perspiciatis repellendus. Rem perferendis tempore nisi minima numquam. Eum velit quos dolores velit autem corrupti. Consequuntur aut aut beatae sequi corrupti omnis.\n\nMinus quia ut enim architecto qui praesentium eius. Quia aut officia aliquid. Corporis sed odio iusto earum veritatis. Ut quas nesciunt praesentium reiciendis labore numquam sequi. Temporibus rerum voluptatibus similique consequatur voluptatem totam.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(40, 17, 'Nihil vel corrupti enim.', 'Nostrum eos autem iusto et voluptates. Esse placeat blanditiis id aliquid qui accusamus provident. Est veniam vitae voluptate ipsa. Est omnis aut ullam consequatur officiis dolorem placeat.\n\nTempora velit ut facere reprehenderit. Culpa ut tempora minima error voluptatem doloremque. Praesentium rerum alias dolorem dignissimos in provident. Non quia numquam aut autem consequatur cumque omnis.\n\nRepellendus omnis voluptatem harum nostrum. Molestiae necessitatibus sunt atque nihil incidunt quis expedita molestiae. Sunt non consequatur et mollitia modi quo molestiae et.\n\nSed sunt illo sed temporibus cumque dolores illo. Ex cum aut autem quo nobis delectus. Incidunt pariatur molestiae rerum voluptatum. Iure voluptatum iusto aliquid ad culpa rerum. Eos quia enim eaque veritatis explicabo. Repellat ex aperiam non omnis. Repellendus rerum qui ipsa reiciendis delectus voluptas distinctio.\n\nRerum ut sed non eius. Nesciunt quod accusantium sequi enim dolores. Sed qui harum delectus sapiente amet sit sed.', 'public', '2025-10-14 10:54:34', '2025-10-14 10:54:36');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `user_id`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 27, 'Edukasi', 'lorem ipsum', 'published', '2025-10-14 22:07:21', '2025-10-14 22:07:21'),
(2, 27, 'Edukasi', 'Lorem Ipsum', 'published', '2025-10-14 22:10:52', '2025-10-14 22:10:52');

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'My Resume',
  `profile` json DEFAULT NULL,
  `education` json DEFAULT NULL,
  `experience` json DEFAULT NULL,
  `skills` json DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `user_id`, `title`, `profile`, `education`, `experience`, `skills`, `slug`, `created_at`, `updated_at`) VALUES
(1, 24, 'UI/UX', '{\"email\": \"edwitsanis@gmail.com\", \"phone\": \"08222222222\", \"address\": \"Jl. Mayjen Sungkono km 5 Blater, Kalimanah, Purbalingga\", \"summary\": \"aku wong asli pati\", \"full_name\": \"Edwi Tsanistya\"}', '[{\"field\": \"-\", \"degree\": \"Mipa\", \"school\": \"Sma Negri 2 Pati\", \"end_year\": \"2023\", \"start_year\": \"2020\", \"description\": \"gaada\"}]', '[]', '[]', 'uiux-XeAIiN', '2025-10-16 11:19:43', '2025-10-16 11:19:43');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'penyandang_disabilitas', 'web', '2025-10-14 10:54:33', '2025-10-14 10:54:33'),
(2, 'relawan', 'web', '2025-10-14 10:54:33', '2025-10-14 10:54:33'),
(3, 'perusahaan', 'web', '2025-10-14 10:54:33', '2025-10-14 10:54:33'),
(4, 'lembaga_sosial', 'web', '2025-10-14 10:54:33', '2025-10-14 10:54:33'),
(5, 'admin', 'web', '2025-10-14 10:54:33', '2025-10-14 10:54:33');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('35qhy1NQxHWqSF8xgjoOWdIHV0IacIXCLNOmtQtn', 25, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiY1N6eERmQ0FUcFNVbWxzYnRUdlhNbXNjMEpTWUJtNHlucjdOSWt5OCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb21wYW55L2Rhc2hib2FyZC9zdGF0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI1O30=', 1760640428),
('FZVuj7Q842m2kHWAdl2m2FKMhjHE7G6A6iD6gUSG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQTFhaWMwVlVvdFBpY1ZmNG55cjIxQUphcEhWTWFWVDZ0MEN5dHlKVyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1760636521),
('Wtq4p5giA9ciatWOlDr5YLHFvBV4kOn0fEdxJDo0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWVZhcWgwZjJWQ3EyUEd3b3Y5THByUVA1TnRDa1ZLTnA5UEx4NTlIbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1760639254);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_photo_path` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `skills` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `kategori_disabilitas` enum('tidak_bisa_berjalan','tidak_bisa_berbicara') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Kategori disabilitas: tidak_bisa_berjalan atau tidak_bisa_berbicara',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `profile_photo_path`, `bio`, `skills`, `phone`, `city`, `email_verified_at`, `kategori_disabilitas`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Admin', 'admin@setaraloka.test', NULL, NULL, NULL, NULL, NULL, '2025-10-14 22:28:13', NULL, '$2y$12$0eOJ3sekKbfUPygZYewPQOSOsRShugaVS6bruMt8JESF/dTw2zlPe', 'LioEGD92FJ0Fp1qWQbOwU5IBA556HiHborX1zhhxWnYjedo6ht8F4xEpLyme', '2025-10-14 10:54:34', '2025-10-14 22:32:42'),
(2, NULL, 'Prof. Helene Wyman Sr.', 'kohler.rick@example.net', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'KuM4wYz069', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(3, NULL, 'Mr. Brandon Schaefer V', 'rdach@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'IyJmcKSa35', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(4, NULL, 'Yesenia Deckow', 'lprosacco@example.net', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'VQEFKwxy55', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(5, NULL, 'Zachary Tromp', 'pblock@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'XlwS8EirZR', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(6, NULL, 'Prof. Clemmie Oberbrunner', 'rudy80@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'JswO5QWqyh', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(7, NULL, 'Anita Schaefer PhD', 'elvie.hegmann@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'VAJep3b61r', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(8, NULL, 'Sandra Heaney', 'okon.anya@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'V7EimDfzif', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(9, NULL, 'Alfreda Schimmel', 'lucy.gislason@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'Z6cPE0NDy8', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(10, NULL, 'Gisselle Jaskolski', 'stephany03@example.net', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'H2w4Mrttjv', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(11, NULL, 'Mr. Conor Moore', 'dubuque.kaitlin@example.net', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'hbEWcyQuz7', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(12, NULL, 'Hilda Hand', 'prutherford@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'uJyaLmqIVB', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(13, NULL, 'Emmalee Davis', 'gregg.gaylord@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'yZkS7HxUtF', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(14, NULL, 'Blanche Lind', 'jerad80@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'eQnVXT8yqV', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(15, NULL, 'Orlando Morissette', 'uwhite@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'KIEwhoePBW', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(16, NULL, 'Hollis Welch', 'bbradtke@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'FyxwxMcq07', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(17, NULL, 'Freddie Willms PhD', 'nrau@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'qzpztvfnVZ', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(18, NULL, 'Ellen Hane', 'xcollier@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'z1r7laiRMF', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(19, NULL, 'Mrs. Rahsaan Weber', 'huels.corine@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'cq5F0mtYVA', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(20, NULL, 'Seth Schmidt MD', 'jaskolski.kenyon@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'xaL6sFzWiK', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(21, NULL, 'Melvina Hyatt', 'aliyah75@example.org', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'aokzZvmPkC', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(22, NULL, 'Bridie Lindgren III', 'karine84@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'ED54K1Hliv', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(23, NULL, 'Anne Pagac', 'mikayla72@example.com', NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:54:34', NULL, '$2y$12$ab1SCdBWGOBIi4tbsqGUN.49XJ6Bt/VR07swlnpqyfNyi4B7REp4i', 'RHt0LaEMis', '2025-10-14 10:54:34', '2025-10-14 10:54:34'),
(24, NULL, 'Edwi Tsanistya', 'edwitsanis@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 'tidak_bisa_berjalan', '$2y$12$dn3QT8acvsQbu5YWreiKQelPsMNSgCK2bvsrTa4pg4ydSEGk5z6.u', NULL, '2025-10-14 10:57:47', '2025-10-16 05:19:11'),
(25, NULL, 'Dimas Kendika', 'dimasken45@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$12$qmhjpO2pxJL9aMFwMbAbReTK64/gjWgih9Y6RE4z66SQR67sc8aiK', NULL, '2025-10-14 12:08:16', '2025-10-14 12:08:16'),
(26, NULL, 'Kafah', 'nadzarekafah1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$12$gvE6/It1DHFiYZX51hCdt.fZVBBce4MoBCXC.hWRN.alY3OAeJVUe', NULL, '2025-10-14 19:45:57', '2025-10-14 19:45:57'),
(27, NULL, 'Moreno', 'morenohibran1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$12$sQZ1ighh.a8HQtthjw1/zuFrqPWY2ew7AA7dYW5dJ5xM4NAz27vBq', NULL, '2025-10-14 20:56:08', '2025-10-14 20:56:08'),
(28, NULL, 'Mukhammad Alfaen Fadillah', 'mukhammad.fadillah@mhs.unsoed.ac.id', 'profile-photos/NQ8XQKWPvutDVwwBtNfC04icNZThdR6fhAkIDIT1.jpg', NULL, NULL, NULL, NULL, NULL, 'tidak_bisa_berbicara', '$2y$12$T2rhjqWPPtJlAaRlhT93u.Ge.CGPEVBQemJOrd2nOmSPOPvlaf5VK', NULL, '2025-10-16 06:18:50', '2025-10-16 10:41:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_post_id_foreign` (`post_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `company_profiles`
--
ALTER TABLE `company_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_profiles_user_id_unique` (`user_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_user_id_foreign` (`user_id`),
  ADD KEY `events_program_id_foreign` (`program_id`);

--
-- Indexes for table `event_interests`
--
ALTER TABLE `event_interests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `event_interests_event_id_user_id_unique` (`event_id`,`user_id`),
  ADD KEY `event_interests_user_id_foreign` (`user_id`);

--
-- Indexes for table `event_user_pivot`
--
ALTER TABLE `event_user_pivot`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `event_user_pivot_event_id_user_id_unique` (`event_id`,`user_id`),
  ADD KEY `event_user_pivot_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_applications_job_id_user_id_unique` (`job_id`,`user_id`),
  ADD KEY `job_applications_user_id_foreign` (`user_id`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_postings_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `organization_profiles`
--
ALTER TABLE `organization_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organization_profiles_user_id_unique` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programs_user_id_foreign` (`user_id`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `resumes_slug_unique` (`slug`),
  ADD KEY `resumes_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT for table `company_profiles`
--
ALTER TABLE `company_profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `event_interests`
--
ALTER TABLE `event_interests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_user_pivot`
--
ALTER TABLE `event_user_pivot`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `organization_profiles`
--
ALTER TABLE `organization_profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `company_profiles`
--
ALTER TABLE `company_profiles`
  ADD CONSTRAINT `company_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `events_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_interests`
--
ALTER TABLE `event_interests`
  ADD CONSTRAINT `event_interests_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_interests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_user_pivot`
--
ALTER TABLE `event_user_pivot`
  ADD CONSTRAINT `event_user_pivot_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_user_pivot_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_job_id_foreign` FOREIGN KEY (`job_id`) REFERENCES `job_postings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `job_applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `job_postings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organization_profiles`
--
ALTER TABLE `organization_profiles`
  ADD CONSTRAINT `organization_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `resumes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
