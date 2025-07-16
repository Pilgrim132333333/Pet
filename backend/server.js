// backend/server.js - 后端 API 服务
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 引入数据库连接
const connection = require('./database.js');

// BACKEND API

// 获取所有宠物分类 
app.get('/api/categories', (req, res) => {
    console.log('收到获取分类请求');
    

    const query = 'SELECT DISTINCT category_id, name, description FROM Category ORDER BY category_id';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('SQL查询失败:', err);
            res.status(500).json({ 
                error: err.message,
                message: '获取分类失败' 
            });
            return;
        }
        
        console.log('SQL查询成功:', results);
        res.json({ 
            data: results,
            message: '获取分类成功',
            count: results.length
        });
    });
});

// 获取特定分类的品种
app.get('/api/breeds/:category_id', (req, res) => {
    const { category_id } = req.params;
    console.log('获取品种，分类:', category_id);
    
    const query = 'SELECT DISTINCT breed_id, name, alias FROM Breed WHERE Breed.category_id = ? ORDER BY breed_id';
    
    connection.query(query, [category_id], (err, results) => {
        if (err) {
            console.error('SQL查询失败:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('category_id:', category_id);
        console.log('品种查询成功:', results);
        res.json({ data: results });
    });
});



// 启动服务器
app.listen(port, () => {
    console.log(`后端服务器运行在 http://localhost:${port}`);
});

module.exports = app; 

