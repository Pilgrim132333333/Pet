const express = require('express');
const app = express();

// 测试1：使用 :category_id
app.get('/api/test1/:category_id', (req, res) => {
    console.log('=== 测试1：使用 :category_id ===');
    console.log('req.params:', req.params);
    
    const { category_id } = req.params;
    console.log('category_id:', category_id);
    
    const { category } = req.params;
    console.log('category:', category);  // 这会是 undefined
    
    res.json({
        message: '测试1：使用 :category_id',
        params: req.params,
        category_id: category_id,
        category: category
    });
});

// 测试2：使用 :category
app.get('/api/test2/:category', (req, res) => {
    console.log('=== 测试2：使用 :category ===');
    console.log('req.params:', req.params);
    
    const { category } = req.params;
    console.log('category:', category);
    
    const { category_id } = req.params;
    console.log('category_id:', category_id);  // 这会是 undefined
    
    res.json({
        message: '测试2：使用 :category',
        params: req.params,
        category: category,
        category_id: category_id
    });
});

// 测试3：展示多个参数
app.get('/api/test3/:category_id/:breed_id', (req, res) => {
    console.log('=== 测试3：多个参数 ===');
    console.log('req.params:', req.params);
    
    const { category_id, breed_id } = req.params;
    console.log('category_id:', category_id);
    console.log('breed_id:', breed_id);
    
    res.json({
        message: '测试3：多个参数',
        params: req.params,
        category_id: category_id,
        breed_id: breed_id
    });
});

app.listen(3001, () => {
    console.log('参数测试服务器运行在 http://localhost:3001');
    console.log('测试URL：');
    console.log('1. http://localhost:3001/api/test1/猫');
    console.log('2. http://localhost:3001/api/test2/猫');
    console.log('3. http://localhost:3001/api/test3/猫/英短');
}); 