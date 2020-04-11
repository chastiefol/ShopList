let shopList = {};

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
            li += `<li>${item} ${shopList[category][item]} บาท </li>`;
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
            <div class="col-2">
                <img src="img/icon/delete.png" class="icon" onclick=delCategory('${category}')>
            </div>
            ${li}
            </div>
        </div>
        <hr>`;
    }
}

function categoryList(category){
    let addMenu = document.querySelector("#addMenu");
    let itemList = document.querySelector("#itemList");
    if (!category){
        let type = document.querySelector("#type").value;
        addMenu.children[1].innerText = type;
        addMenu.children[2].value = 0;
        shopList[type] = {}
    }
    else{
        addMenu.children[1].innerText = category;
        addMenu.children[2].value = summary(category);
    }
    itemList.innerHTML = '';
    for (item in shopList[category]){
        itemList.innerHTML += 
        `<button class="btn btn-danger m-2 p-2 text-center" onclick='toggleMode(this)'> ${item} ${shopList[category][item]}</button>`;
    }
    document.querySelector("#addMenu").style.display = "flex";
}

function addItem(){
    let addMenu = document.querySelector("#addMenu");
    let item = document.querySelector("#item").value;
    let price = document.querySelector("#price").value;
    if(item){
        let type = addMenu.children[1].innerText;
        if (!(item in shopList[type]))
            shopList[type][item] = parseInt(price)?parseInt(price):0;
        else
            alert("คุณมีรายการนี้อยู่แล้ว");
        clearCache("addMenu");
        categoryList(type);
    }

}

function summary(category){
    let price = 0;
    console.log(category)
    if (category == "Cost"){
        for (type in shopList){
            for(item in shopList[type]){
                price += shopList[type][item]
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
            price += shopList[category][item]
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
            mainMenu();
        }  
    }
}

function delCategory(category){
    delete shopList[category];
    mainMenu();
}

function toggleMode(ele){
    if (ele.classList[1] == "btn-danger"){
        ele.classList = "btn btn-success m-2 p-2 text-center";
    }
    else{
        ele.classList = "btn btn-danger m-2 p-2 text-center";
    }
}