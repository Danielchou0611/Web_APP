const express = require('express');
const app = express();
const port = 3000;

// 設定 EJS 模板引擎
app.set('view engine', 'ejs');

// 讓 Express 解析 POST 請求中的表單資料
app.use(express.urlencoded({ extended: true }));

// 模擬資料庫
let items = ["Apple", "Milk"];

// [GET] 首頁：渲染整個購物清單
app.get('/', (req, res) => {
    // 將 items 陣列傳遞給 index.ejs
    res.render('index', { items: items });
});

// [POST] 新增項目
app.post('/add', (req, res) => {
    const newItem = req.body.newItem;
    if (newItem && newItem.trim() !== "") {
        items.push(newItem);
    }
    res.redirect('/'); // 完成後重新導向回首頁，觸發畫面刷新
});

// [POST] 刪除項目 (使用 index 來決定刪除哪一個)
app.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (index >= 0 && index < items.length) {
        items.splice(index, 1);
    }
    res.redirect('/'); // 完成後重新導向回首頁
});

app.listen(port, () => {
    console.log(`EJS 版購物清單啟動: http://localhost:${port}`);
});
