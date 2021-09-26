CREATE TABLE `users` (
  `id` varchar(255) PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `is_online` boolean,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `group_id` varchar(255) NOT NULL,
  `is_event` boolean,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `groupChat` (
  `id` varchar(255) PRIMARY KEY,
  `group_name` varchar(255) NOT NULL,
  `last_message` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `userGroup` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `group_id` varchar(255) NOT NULL,
  `is_active` boolean NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `contact` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `contact_id` varchar(255) NOT NULL,
  `type` varchar(255),
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `notification` (
  `id_notify` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `notify_type` varchar(255) NOT NULL,
  `notify_desc` varchar(255) NOT NULL,
  `status` boolean,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `notification` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userGroup` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userGroup` ADD FOREIGN KEY (`group_id`) REFERENCES `groupChat` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`group_id`) REFERENCES `groupChat` (`id`);

ALTER TABLE `contact` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `contact` ADD UNIQUE INDEX (`user_id`, `contact_id`);
