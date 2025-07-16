const express = require('express');
const app = express();

// 演示：参数名和变量名的关系
app.get('/api/demo/:category_id', (req, res) => {
    console.log('=== 参数提取演示 ===');
    console.log('req.params:', req.params);
    
    // 方式1：解构赋值，变量名必须匹配参数名
    const { category_id } = req.params;
    console.log('方式1 - category_id:', category_id);
    
    // 方式2：解构赋值并重命名变量
    const { category_id: categoryId } = req.params;
    console.log('方式2 - categoryId:', categoryId);
    
    const { category_id: myCategory } = req.params;
    console.log('方式2 - myCategory:', myCategory);
    
    const { category_id: cat } = req.params;
    console.log('方式2 - cat:', cat);
    
    // 方式3：直接访问属性，变量名任意
    const directAccess = req.params.category_id;
    console.log('方式3 - directAccess:', directAccess);
    
    const whatever = req.params.category_id;
    console.log('方式3 - whatever:', whatever);
    
    // ❌ 错误的方式：试图访问不存在的属性
    const { category } = req.params;
    console.log('错误方式 - category:', category);  // undefined
    
    const { cat_id } = req.params;
    console.log('错误方式 - cat_id:', cat_id);      // undefined
    
    res.json({
        message: '参数提取演示',
        原始参数: req.params,
        方式1_解构: category_id,
        方式2_重命名: categoryId,
        方式3_直接访问: directAccess,
        错误方式: { category, cat_id }
    });
});

// 演示：多个参数的情况
app.get('/api/demo/:category_id/:breed_id/:pet_id', (req, res) => {
    console.log('=== 多参数演示 ===');
    console.log('req.params:', req.params);
    
    // 同时提取多个参数并重命名
    const { 
        category_id: catType, 
        breed_id: breedName, 
        pet_id: petId 
    } = req.params;
    
    console.log('catType:', catType);
    console.log('breedName:', breedName);
    console.log('petId:', petId);
    
    res.json({
        message: '多参数演示',
        原始参数: req.params,
        重命名后: {
            catType,
            breedName,
            petId
        }
    });
});

app.listen(3002, () => {
    console.log('参数演示服务器运行在 http://localhost:3002');
    console.log('');
    console.log('测试URL：');
    console.log('1. http://localhost:3002/api/demo/猫');
    console.log('2. http://localhost:3002/api/demo/猫/英短/123');
    console.log('');
    console.log('观察控制台输出，看看不同提取方式的结果');
}); 