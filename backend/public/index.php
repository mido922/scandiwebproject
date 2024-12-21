<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Respond to preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../graphQL/Schema.php';

use GraphQL\GraphQL;

header('Content-Type: application/json');

try {
    // Get the raw POST input
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    // Process GraphQL query
    $query = $input['query'] ?? '';
    $variableValues = $input['variables'] ?? null;

    $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = [
        'errors' => [
            ['message' => $e->getMessage()]
        ]
    ];
}

echo json_encode($output);
?>
