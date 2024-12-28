<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../database/databaseService.php';

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;

$attributeType = new ObjectType([
    'name' => 'Attribute',
    'fields' => function () {
        return [
            'id' => Type::int(),
            'type' => Type::string(),
            'value' => Type::string(),
        ];
    }
]);

$attributeInputType = new InputObjectType([
    'name' => 'AttributeInput',
    'fields' => [
        'type' => Type::nonNull(Type::string()), 
        'value' => Type::nonNull(Type::string()),
    ],
]);

$orderedItemInputType = new InputObjectType([
    'name' => 'OrderedItemInput',
    'fields' => [
        'product_id' => Type::nonNull(Type::string()),
        'attributes' => Type::nonNull(Type::listOf($attributeInputType)), 
        'quantity' => Type::nonNull(Type::int()), 
    ],
]);

$saveOrderResponseType = new ObjectType([
    'name' => 'SaveOrderResponse',
    'fields' => [
        'success' => Type::boolean(),
        'message' => Type::string(),
    ],
]);

$mutationType = new ObjectType([
    'name' => 'Mutation',
    'fields' => [
        'saveOrder' => [
            'type' => $saveOrderResponseType,
            'args' => [
                'orderedItems' => Type::nonNull(Type::listOf($orderedItemInputType)),
            ],
            'resolve' => function ($root, $args) use ($pdo) {
                try {
                    $orderedItems = $args['orderedItems'];

                    $pdo->beginTransaction();

                    $stmt = $pdo->prepare("INSERT INTO orders (id) VALUES (NULL)");
                    $stmt->execute();
                    $orderId = $pdo->lastInsertId(); 
                    
                    foreach ($orderedItems as $item) {
                        $stmt = $pdo->prepare("
                            INSERT INTO ordered_items (product_id, order_id, quantity)
                            VALUES (:product_id, :order_id, :quantity)
                        ");
                        $stmt->execute([
                            'product_id' => $item['product_id'],
                            'order_id' => $orderId,
                            'quantity' => $item['quantity'],
                        ]);
                        $orderedItemId = $pdo->lastInsertId(); 

                       foreach ($item['attributes'] as $attribute) {
                            $stmt = $pdo->prepare("
                                INSERT INTO ordered_item_attributes (ordered_item_id, type, value)
                                VALUES (:ordered_item_id, :type, :value)
                            ");
                            $stmt->execute([
                                'ordered_item_id' => $orderedItemId,
                                'type' => $attribute['type'],
                                'value' => $attribute['value'],
                            ]);
                        }
                    }

                    $pdo->commit();

                    return [
                        'success' => true,
                        'message' => 'Order saved successfully!',
                    ];
                } catch (\Exception $e) {
                    $pdo->rollBack();

                    return [
                        'success' => false,
                        'message' => 'Failed to save order: ' . $e->getMessage(),
                    ];
                }
            },
        ],
    ],
]);

$categoryType = new ObjectType([
    'name' => 'Category',
    'fields' => function () {
        return [
            'id' => Type::int(),
            'type' => Type::string(),
        ];
    }
]);

$priceType = new ObjectType([
    'name' => 'Price',
    'fields' => function () {
        return [
            'id' => Type::int(),
            'product-id' => Type::string(),
            'amount' => Type::float(),
        ];
    }
]);

$galleryType = new ObjectType([
    'name' => 'Gallery',
    'fields' => function () {
        return [
            'id' => Type::int(),
            'url' => Type::string(),
            'product_id' => Type::string(),
        ];
    }
]);

$productType = new ObjectType([
    'name' => 'Product',
    'fields' => [
        'id' => Type::string(),
        'name' => Type::string(),
        'inStock' => Type::boolean(),
        'description' => Type::string(),
        'category' => Type::string(),
        'brand' => Type::string(),
        'galleries' => [
            'type' => Type::listOf($galleryType),
            'resolve' => function ($product) use ($pdo) {
                $stmt = $pdo->prepare("SELECT * FROM galleries WHERE product_id = ?");
                $stmt->execute([$product['id']]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        ],
        'prices' => [
            'type' => Type::listOf($priceType),
            'resolve' => function ($product) use ($pdo) {
                $stmt = $pdo->prepare("SELECT * FROM prices WHERE product_id = ?");
                $stmt->execute([$product['id']]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        ],
        'attributes' => [
            'type' => Type::listOf($attributeType),
            'resolve' => function ($product) use ($pdo) {
                $stmt = $pdo->prepare("SELECT * FROM attributes WHERE product_id = ?");
                $stmt->execute([$product['id']]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        ],
    ]
]);

// Root Query Type
$queryType = new ObjectType([
    'name' => 'Query',
    'fields' => [
        'products' => [
            'type' => Type::listOf($productType),
            'args' => [
                'category' => [
                    'type' => Type::string()
                ],
            ],
            'resolve' => function ($root, $args) use ($pdo) {
                if (isset($args['category']) && !empty($args['category'])) {
                    // Query with category filter
                    $stmt = $pdo->prepare('SELECT * FROM products WHERE category = :category');
                    $stmt->bindValue(':category', $args['category'], PDO::PARAM_STR);
                    $stmt->execute();
                } else {
                    $stmt = $pdo->query('SELECT * FROM products');
                }
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        ]
    ]
]);

// Create Schema
$schema = new Schema([
    'query' => $queryType,
    'mutation' => $mutationType,
    'types' => [$orderedItemInputType],
]);
?>