function find_max() {
    const input = document.getElementById('num').value;
    const numArr = input.split(',').map(item => Number(item.trim()));
    if (numArr.some(isNaN) || input=== "") {
        alert("請輸入正確的數字格式(例如:1,2,3)");
        return;
    }
    // const max_val = Math.max(...numArr); 內建函式做法
    let max_val = numArr[0];
    for(let i=1;i<numArr.length;i++)
    {
        if(numArr[i]>max_val)
            max_val=numArr[i];
    }
    document.getElementById('result').innerText = max_val;
}
