let shopList = {};

function readyState(){
    if (localStorage.shopList){
        shopList = JSON.parse(localStorage.shopList);
        mainMenu();
    }
}
function mainMenu(){
    let mainMenu = document.querySelector("#shopList");
    let quantity = document.querySelector("#quantity");
    let cost = document.querySelector("#cost");
    let type = document.querySelector("#type");
    document.querySelector("#addMenu").style.display = "none";
    mainMenu.innerHTML = "";
    quantity.innerText = summary("Quantity");
    cost.innerText = summary("Cost");
    type.value = "";
    for (category in shopList){
        let li = `<div class="col-12"><ul>`;
        for (item in shopList[category]){
            li += `<li>${item} ${shopList[category][item][0]} บาท </li>`;
        }
        li += "</ul>";
        mainMenu.innerHTML +=
        `<div class="row px-3" onclick="categoryList('${category}')">
            <div class="col-8">
                ${category}
            </div>
            <div class="col-2 text-center">
                ${summary(category)}
            </div>
            ${li}
            </div>
        </div>
        <hr>`;
        // <div class="col-2">
        //         <img src="img/icon/delete.png" style="z-index: 3" class="icon" onclick=delCategory('${category}')>
        // </div>
    }
    document.querySelector(".hide").style.display = "block";
}

function categoryList(category){
    let addMenu = document.querySelector("#addMenu");
    let itemList = document.querySelector("#itemList");
    if (!category){
        let type = document.querySelector("#type").value;
        if (type in shopList){
            alert("คุณมีหมวดหมู่นี้อยู่แล้ว");
        }
        addMenu.children[1].innerText = type;
        addMenu.children[2].value = 0;
        shopList[type] = {}
        localStorage.setItem("shopList", JSON.stringify(shopList));
    }
    else{
        addMenu.children[1].innerText = category;
        addMenu.children[2].value = summary(category);
    }
    itemList.innerHTML = '';
    for (item in shopList[category]){
        if (shopList[category][item][1]){
            itemList.innerHTML += 
            `<button class="btn btn-success my-2 mr-2 p-2 text-center" onclick='toggleMode(this)'> ${item} ${shopList[category][item][0]} บาท</button>`;
        }
        else{
           itemList.innerHTML += 
            `<button class="btn btn-outline-secondary my-2 mr-2 p-2 text-center" onclick='toggleMode(this)'> ${item} ${shopList[category][item][0]} บาท</button>`; 
        }
        
    }
    document.querySelector("#addMenu").style.display = "flex";
    document.querySelector(".hide").style.display = "none";
}

function addItem(){
    let addMenu = document.querySelector("#addMenu");
    let item = document.querySelector("#item").value;
    let price = document.querySelector("#price").value;
    if(item){
        let type = addMenu.children[1].innerText;
        if (!(item in shopList[type]))
            shopList[type][item] = [parseInt(price)?parseInt(price):0, false];
        else
            alert("คุณมีรายการนี้อยู่แล้ว");
        clearCache("addMenu");
        localStorage.setItem("shopList", JSON.stringify(shopList));
        categoryList(type);
    }

}

function summary(category){
    let price = 0;
    // console.log(category)
    if (category == "Cost"){
        for (type in shopList){
            for(item in shopList[type]){
                price += shopList[type][item][0]
            }
        }
    }
    else if (category == "Quantity"){
        for (type in shopList){
            for(item in shopList[type]){
                price++;
            }
        }
    }
    else{
        for(item in shopList[category]){
            price += shopList[category][item][0]
        }
    }
    return price;
}

function clearCache(type){
    if (type == "addMenu"){
        document.querySelector("#item").value = '';
        document.querySelector("#price").value = '';
    }
    else {
        if (confirm('คุณยืนยันการล้างหรือไม่')){
            shopList = {}
            localStorage.removeItem("shopList");
            mainMenu();
        }  
    }
}

function delCategory(category){
    delete shopList[category];
    localStorage.setItem("shopList", JSON.stringify(shopList));
    mainMenu();
}

function toggleMode(ele){
    type = document.querySelector("#addMenu").children[1].innerText;
    item = ele.innerText.split(" ")[0];
    // console.log(item);
    if (ele.classList[1] == "btn-outline-secondary"){
        ele.classList = "btn btn-success my-2 mr-2 p-2 text-center";
        shopList[type][item][1] = true;
    }
    else{
        ele.classList = "btn btn-outline-secondary my-2 mr-2 p-2 text-center";
        shopList[type][item][1] = false;
    }
    localStorage.setItem("shopList", JSON.stringify(shopList));
}