<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片展示</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #444;
        }
        .image-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
        }
        .image-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 600px; /* 设置固定宽度 */
        }
        img {
            width: 100%; /* 使图片填满卡片 */
            height: auto;
            display: block; /* 确保图片是块级元素 */
        }
    </style>
</head>
<body>

<h1>图片展示</h1>

<div class="image-container">
    <?php
    // 定义图片目录
    $directory = 'img/';

    // 获取所有文件
    $images = glob($directory . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

    // 检查是否有图片
    if (count($images) > 0) {
        // 倒序数组
        $images = array_reverse($images);
        
        // 遍历每个图片文件并显示
        foreach ($images as $image) {
            echo '<div class="image-card">';
            echo '<img src="' . $image . '" alt="" />';
            echo '</div>';
        }
    } else {
        echo '<p style="text-align: center;">没有找到任何图片。</p>';
    }
    ?>
</div>

</body>
</html>