const connection = require('./backend/database.js');

// 测试数据库连接和查询
async function testDatabase() {
    try {
        // 测试查询所有宠物
        connection.query('SELECT * FROM TestTable', (err, results) => {
            if (err) {
                console.error('查询失败:', err);
                return;
            }
            console.log('查询成功! 宠物列表:');
            console.log(results);
            
            // 关闭连接
            connection.end();
        });
    } catch (error) {
        console.error('数据库操作失败:', error);
    }
}

// 运行测试
testDatabase(); 