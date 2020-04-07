let listFilter = "",
    listElement = document.getElementById("pokeList"),
    inputElement = document.getElementById("pokeFilter"),
    pokeballElement = document.getElementById("pokeballBack");

inputElement.addEventListener("keyup",function(){
    listFilter = this.value;
    setList();
});

window.addEventListener("scroll", function(){
    let rotation = "translateY(-50%) rotateZ(" + (window.scrollY / 15) + "deg)";
    pokeballElement.style.transform = rotation;
});

function setList(){
    PokeService.listAll(function(pkmList){
        let list = filterList(pkmList);
        let template = ListService.createList(list);
        listElement.innerHTML = template;
    });
}

function filterList(pkmList){
    return pkmList.filter(function(pkm){
        return pkm.name.indexOf(listFilter.toLowerCase()) !== -1;
    });
}

setList();