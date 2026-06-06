let transactions =
JSON.parse(localStorage.getItem("transactions"))
|| [];

function updateUI(){

    const list =
    document.getElementById("list");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `
        ${transaction.text}
        ₹${transaction.amount}

        <button class="delete"
        onclick="deleteTransaction(${index})">
        X
        </button>
        `;

        list.appendChild(li);

        if(transaction.amount > 0){
            income += transaction.amount;
        }
        else{
            expense += Math.abs(transaction.amount);
        }

    });

    document.getElementById("income")
    .innerText = `₹${income}`;

    document.getElementById("expense")
    .innerText = `₹${expense}`;

    document.getElementById("balance")
    .innerText = `₹${income-expense}`;

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransaction(){

    const text =
    document.getElementById("text").value;

    const amount =
    +document.getElementById("amount").value;

    if(text === "" || amount === 0){
        alert("Please enter valid data");
        return;
    }

    transactions.push({
        text,
        amount
    });

    document.getElementById("text").value="";
    document.getElementById("amount").value="";

    updateUI();
}

function deleteTransaction(index){

    transactions.splice(index,1);

    updateUI();
}

updateUI();
