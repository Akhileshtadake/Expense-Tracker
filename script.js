const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let Transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions: [];
//Add Transactions

function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === "" || amount.value.trim() === ""
    ){
        alert("Please enter text and value")
    }else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value,
        };

        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updatevalues();
        text.value = "";
        amount.value = "";
    }
}

//generate id

function generateID(){
    return Math.floor(Math.random()*100000000)
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// remove Transaction

function removeTransaction(id){
    Transactions = Transactions.filter((transaction) => transaction.id !== id);
    updateLocalStorage();
    Init();
}

//updatevalues

function updatevalues(){
    const amounts = Transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item)=>(acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)* -1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}

//upadate local storage

function updateLocalStorage(){
    localStorage.setItem(
        "transactions", JSON.stringify(Transactions)
    );
}


//Init App
function Init(){
    list.innerHTML = "";
    Transactions.forEach(addTransactionDOM);
    updatevalues();
}

Init();

form.addEventListener("submit", addTransaction);