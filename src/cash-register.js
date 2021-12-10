function checkCashRegister(price, cash, cid) {
    const currencyUnit = [
        ["ONE HUNDRED",100.0],
        ["TWENTY",20.0],
        ["TEN",10.0],
        ["FIVE",5.0],
        ["ONE",1],
        ["QUARTER",0.25],
        ["DIME",0.1],
        ["NICKEL",0.05],
        ["PENNY",0.01]
    ];
    let change = [];

    let open = cash - price;
    for(let i=0;i<currencyUnit.length;i++) {
        // the change due is higher then currency value.
        const [unitName,unitAmount] = currencyUnit[i];
        const idx = cid.findIndex(x => x[0]==unitName);

        const available = Math.floor(cid[idx][1] / unitAmount);
        const needed = Math.floor(open / unitAmount);

        if(needed>=available) {
            const used = available*unitAmount;
            open = (open - used).toFixed(2); // this is because of floating point problems
            change.push([unitName, used]);
        }
        else if(needed > 0) {
            const used = needed*unitAmount;
            open = (open-used).toFixed(2); // this is because of floating point problems
            change.push([unitName, used]);
        }
    }

    if(open > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    else if(JSON.stringify(cid.filter(x => x[1] > 0)) === JSON.stringify(change.filter(x => x[1] > 0))) {
        return {status: "CLOSED", change: cid};
    } 
    else {
        return {status: "OPEN", change: change};
    }
}
 
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); 