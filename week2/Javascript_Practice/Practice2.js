function judge() {
    const n = parseFloat(document.getElementById('num').value);
    if (isNaN(n)) {
        alert("請先輸入一個數字！");
        return;
    }
    let message = "";
    if (n % 2 === 0) {
        message = n + " 是偶數";
    } else {
        message = n + " 是奇數";
    }
    
    // 4. 顯示在網頁上
    document.getElementById('result').innerText = message;
}