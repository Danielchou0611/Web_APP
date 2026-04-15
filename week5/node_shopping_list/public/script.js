const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

// 1. 頁面載入時，先從伺服器取得資料
window.onload = fetchItems;

async function fetchItems() {
    try {
        const response = await fetch('/api/items');
        const items = await response.json();
        renderItems(items);
    } catch (error) {
        console.error("無法取得清單:", error);
    }
}

// 2. 渲染清單到網頁
function renderItems(items) {
    itemList.innerHTML = ""; // 先清空目前的列表
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteItem(index);

        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}

// 3. 新增項目 (POST)
addBtn.onclick = async () => {
    const text = itemInput.value.trim();
    if (text === "") return;

    try {
        await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: text })
        });
        itemInput.value = ""; // 清空輸入框
        fetchItems(); // 重新整理清單
    } catch (error) {
        console.error("新增失敗:", error);
    }
};

// 4. 刪除項目 (DELETE)
async function deleteItem(index) {
    try {
        await fetch(`/api/items/${index}`, {
            method: 'DELETE'
        });
        fetchItems(); // 重新整理清單
    } catch (error) {
        console.error("刪除失敗:", error);
    }
}
