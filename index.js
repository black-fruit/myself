const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 设置公共目录
app.use(express.static('public'));

// 图片展示路由
app.get('/', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'img');
    
    // 读取图片目录
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('服务器内部错误');
        }

        // 过滤出图片文件
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        const imageCards = images.reverse().map(image => `
            <div class="image-card">
                <img src="/img/${image}" alt="" />
            </div>
        `).join('');

        const html = `
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
                        width: 600px;
                    }
                    img {
                        width: 100%;
                        height: auto;
                        display: block;
                    }
                </style>
            </head>
            <body>
                <h1>图片展示</h1>
                <div class="image-container">
                    ${imageCards || '<p style="text-align: center;">没有找到任何图片。</p>'}
                </div>
            </body>
            </html>
        `;

        res.send(html);
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});