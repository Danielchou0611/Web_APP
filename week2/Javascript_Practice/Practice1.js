function calculate() {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(n1) || isNaN(n2)) {
        alert("請輸入數字");
        return;
    }
    
    document.getElementById('result').innerText = n1 + n2;
}