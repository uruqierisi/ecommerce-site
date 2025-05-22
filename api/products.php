<?php
header("Content-Type: application/json");

$products = [
  ["id" => 1, "name" => "Wireless Headphones", "price" => 59.99, "image" => "https://images.unsplash.com/photo-1585386959984-a4155224a1d1"],
  ["id" => 2, "name" => "Smart Watch", "price" => 89.99, "image" => "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"],
  ["id" => 3, "name" => "Running Shoes", "price" => 74.99, "image" => "https://images.unsplash.com/photo-1589187155471-c41755195464"],
  ["id" => 4, "name" => "Bluetooth Speaker", "price" => 39.99, "image" => "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf"],
  ["id" => 5, "name" => "Digital Camera", "price" => 149.99, "image" => "https://images.unsplash.com/photo-1549921296-3a5421e4ed7b"],
  ["id" => 6, "name" => "Laptop", "price" => 599.99, "image" => "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
  ["id" => 7, "name" => "Tablet", "price" => 299.99, "image" => "https://images.unsplash.com/photo-1611078489935-b9633ab5de1d"],
  ["id" => 8, "name" => "Backpack", "price" => 45.00, "image" => "https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
  ["id" => 9, "name" => "Sunglasses", "price" => 24.99, "image" => "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"],
  ["id" => 10, "name" => "Gaming Mouse", "price" => 34.99, "image" => "https://images.unsplash.com/photo-1570819172234-679f90c6ee8c"],
  ["id" => 11, "name" => "Office Chair", "price" => 109.99, "image" => "https://images.unsplash.com/photo-1586864381510-7e3a346195ba"],
  ["id" => 12, "name" => "Smartphone", "price" => 499.99, "image" => "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
  ["id" => 13, "name" => "Coffee Maker", "price" => 79.99, "image" => "https://images.unsplash.com/photo-1527515637462-d2bbd1af5319"],
  ["id" => 14, "name" => "Wireless Charger", "price" => 19.99, "image" => "https://images.unsplash.com/photo-1549924231-f129b911e442"],
  ["id" => 15, "name" => "Fitness Tracker", "price" => 54.99, "image" => "https://images.unsplash.com/photo-1556196144-013f5d20a2bc"],
  ["id" => 16, "name" => "LED Monitor", "price" => 129.99, "image" => "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"],
  ["id" => 17, "name" => "Wireless Keyboard", "price" => 27.50, "image" => "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"],
  ["id" => 18, "name" => "Bluetooth Earbuds", "price" => 44.99, "image" => "https://images.unsplash.com/photo-1611078223695-8e2c57b87ef3"],
  ["id" => 19, "name" => "Electric Kettle", "price" => 24.50, "image" => "https://images.unsplash.com/photo-1609941190942-84cfe9d7d36d"],
  ["id" => 20, "name" => "Desk Lamp", "price" => 18.75, "image" => "https://images.unsplash.com/photo-1582719478191-991d3568d5db"]
];

echo json_encode($products);
