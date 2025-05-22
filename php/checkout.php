<?php
header("Content-Type: application/json");

// Simulate processing delay
sleep(1);

// Get raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit;
}

// Simulate saving to database or emailing, etc.
$orderId = rand(100000, 999999);

echo json_encode([
    "success" => true,
    "message" => "Order received.",
    "orderNumber" => $orderId,
    "email" => $data['email'] ?? 'unknown'
]);
