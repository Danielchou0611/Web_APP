function isPrime() {
    const n = parseFloat(document.getElementById('num').value);
    if (isNaN(n)) {
        alert("請先輸入一個數字！");
        return;
    }
    let Prime=true;
    if(n==1)
        Prime=false;
    else
    {
        for(let i=2;i<=Math.sqrt(n);i++)
        {
            if(n%i==0)
            {
                Prime=false;
                break;
            }
        }
    }
    const message = Prime ? "是質數" : "不是質數";
    // 4. 顯示在網頁上
    document.getElementById('result').innerText = n.toString()+message;
}
