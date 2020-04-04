function request(url, callback){
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = JSON.parse(this.responseText);
            callback(response);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

let PokeService = {
    url: "//dev.treinaweb.com.br/pokeapi/",
    list: [],
    listAll: function(callback){
        if(this.list.length){
            callback(this.list);
        }else{
            const that = this;
            request(this.url + "pokedex/1", function(response){
                let pkmList = response.pokemon;
                pkmList = pkmList.map(function(pokemon){
                    let number = that.getNumberFromURL(pokemon.resource_uri);
                    pokemon.number = number;
                    return pokemon;
                })
                .filter(function(pokemon){
                    return (pokemon.number < 1000);
                })
                .sort(function(a,b){
                    return (a.number > b.number ? 1 : -1);
                })
                .map(function(pokemon){
                    pokemon.number = ("000" + pokemon.number).slice(-3);
                    return pokemon;
                });
                that.list = pkmList;
                callback(pkmList);
            });
        }
    },
    getNumberFromURL: function(url){
        return parseInt(url.replace(/.*\/(\d+)\/$/,"$1"));
    }
}