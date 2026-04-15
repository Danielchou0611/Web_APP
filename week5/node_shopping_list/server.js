const express = require('express');
const app = express();
const port = 3000;

// 設定靜態檔案路徑 (HTML, JS, CSS)
app.use(express.static('public'));

// 解析 JSON 資料的中間件
app.use(express.json());

// 模擬資料庫
let items = ["Apple", "Milk", "Bread"];

// [GET] 取得所有購物項目
app.get('/api/items', (req, res) => {
  res.json(items);
});

// [POST] 新增一個購物項目
app.post('/api/items', (req, res) => {
  const newItem = req.body.item;
  if (newItem && newItem.trim() !== "") {
    items.push(newItem);
    res.status(201).json({ message: "新增成功", item: newItem });
  } else {
    res.status(400).json({ error: "項目名稱不能為空" });
  }
});

// [DELETE] 根據索引刪除購物項目
app.delete('/api/items/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < items.length) {
    const deletedItem = items.splice(index, 1);
    res.json({ message: "刪除成功", item: deletedItem[0] });
  } else {
    res.status(404).json({ error: "項目未找到" });
  }
});

app.listen(port, () => {
  console.log(`購物清單伺服器已啟動: http://localhost:${port}`);
});
