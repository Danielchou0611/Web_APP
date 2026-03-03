function calculate() {
    const n = parseFloat(document.getElementById('num').value);
    if (isNaN(n)) {
        alert("請先輸入一個數字！");
        return;
    }
    const sum = (n * (n + 1)) / 2;
    
    // 4. 顯示在網頁上
    document.getElementById('result').innerText = sum;
}

/* 
for寫法
let sum=0;
for (let i=0;i<=n;i++)
    sum+=i;
*/