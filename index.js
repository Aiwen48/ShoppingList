import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL:"https://shoapp-351f2-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const ShoppingListInDB=ref(database,"shoppingList")

const inputFieldE1=document.getElementById("input-field")
const addButtonE1=document.getElementById("add-button")
const shoppingListE1=document .getElementById("shopping-list")

addButtonE1.addEventListener("click",function(){
    let inputValue=inputFieldE1.value
    console.log(inputValue);
    push(ShoppingListInDB,inputValue);
    //appendItemToShoppingList(inputValue)
    clearInputFieldE1();
})

function clearInputFieldE1(){
    inputFieldE1.value=``;
}

function appendItemToShoppingList(item){
    let itemID=item[0];
    let itemValue=item[1];

    let newE1=document.createElement("li");
    newE1.textContent=itemValue;

    // 找出firebase 某一条数据的位置
    
    newE1.addEventListener("click",function(){
        let exactLocationOfItemInDB=ref(database,`shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB);
    })

    shoppingListE1.append(newE1);
    //shoppingListE1.innerHTML+=`<li>${inputValue}</li>`;


}
//Object.entries()
//Object.keys()
//Object.values()

function clearShoppingListE1(){
    shoppingListE1.innerHTML='';
}

onValue(ShoppingListInDB,function(snapshot){
    
    //若database 有任何更行需要把input clear
    //snap.exists 返回true 偶然false
    
    //console.log(snapshot.exists);

    if(snapshot.exists()){
        let itemArray=Object.entries(snapshot.val());

        clearShoppingListE1();

        for(let i=0;i<itemArray.length;i++){
            let currentItem=itemArray[i];
            let currentItemID=itemArray[i][0]
            let currentItemValue=itemArray[i][1]
    
            appendItemToShoppingList(currentItem);
        }
    
    }else{
        shoppingListE1.innerHTML="No item in List";
    }
    
    
    



})

/*
let user={
    "00":"aw",
    "01":"ll",
    "02":"22"

}

console.log(Object.values(user))
*/