<?php
header('Content-Type: application/json');

$products = [
  [ "id" => 1, "title" => "Bluetooth Headphones", "price" => 79.99, "image" => "images/degjuset.jpg", "description" => "Wireless noise-canceling headphones with 20h battery life.", "category" => "electronics", "featured" => true ],
  [ "id" => 2, "title" => "Smart Fitness Watch", "price" => 129.99, "image" => "images/smartwatch.jpg", "description" => "Fitness tracker with heart-rate, steps, and sleep monitor.", "category" => "electronics", "featured" => true ],
  [ "id" => 3, "title" => "Casual T-Shirt", "price" => 24.99, "image" => "images/maica.jpg", "description" => "Cotton t-shirt in multiple colors and sizes.", "category" => "clothing", "featured" => false ],
  [ "id" => 4, "title" => "Running Shoes", "price" => 89.99, "image" => "images/patika.jpg", "description" => "Comfortable shoes for everyday running.", "category" => "clothing", "featured" => true ],
  [ "id" => 5, "title" => "Bluetooth Speaker", "price" => 49.99, "image" => "images/speaker.jpg", "description" => "Portable waterproof Bluetooth speaker.", "category" => "electronics", "featured" => true ],
  [ "id" => 6, "title" => "Coffee Mug Set", "price" => 29.99, "image" => "images/gotat.jpg", "description" => "Set of 4 ceramic mugs, microwave safe.", "category" => "home", "featured" => false ],
  [ "id" => 7, "title" => "Denim Jacket", "price" => 59.99, "image" => "images/jakne.jpg", "description" => "Stylish denim jacket with a classic cut.", "category" => "clothing", "featured" => true ],
  [ "id" => 8, "title" => "Wireless Charging Pad", "price" => 29.99, "image" => "images/charging.jpg", "description" => "Fast wireless charger compatible with most devices.", "category" => "electronics", "featured" => false ],
  [ "id" => 9, "title" => "Yoga Mat", "price" => 39.99, "image" => "images/yoga.jpg", "description" => "Non-slip yoga mat with carrying strap.", "category" => "home", "featured" => false ],
  [ "id" => 10, "title" => "LED Desk Lamp", "price" => 45.00, "image" => "images/lamp.jpg", "description" => "Adjustable brightness with USB port.", "category" => "home", "featured" => true ],
  [ "id" => 11, "title" => "Gaming Mouse", "price" => 59.00, "image" => "images/maus.jpg", "description" => "Ergonomic gaming mouse with RGB lighting.", "category" => "electronics", "featured" => false ],
  [ "id" => 12, "title" => "Leather Wallet", "price" => 35.00, "image" => "images/kuleta.jpg", "description" => "Slim bi-fold wallet made of genuine leather.", "category" => "clothing", "featured" => true ],  
  [ "id" => 13, "title" => "Sunglasses", "price" => 49.99, "image" => "images/syza.jpg", "description" => "UV400 polarized sunglasses.", "category" => "clothing", "featured" => true ],
  
];

echo json_encode($products);
