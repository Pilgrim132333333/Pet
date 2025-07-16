// 数据库连接配置文件
// 加载环境变量
require('dotenv').config();

const mysql = require('mysql2')

// Railway 数据库连接配置
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST || 'interchange.proxy.rlwy.net',
    port: process.env.MYSQLPORT || 18706,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'QgiNZdgntRuVfPCjXXUgBsOWayxXIGGr',
    database: process.env.MYSQLDATABASE || 'railway',
    ssl: {
        rejectUnauthorized: false // Railway 需要 SSL 连接
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Railway 数据库连接失败:', err);
        return;
    }
    console.log('成功连接到 Railway 数据库!');
});

// 导出连接以供其他文件使用
module.exports = connection; 