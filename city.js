
function popcomas(string){ //function to add commas to population
    var iter = 1
    var pop = []
    for (let ind=string.length - 1; ind>=0; ind-=1){
        if (iter>3 && iter%3==1){
            pop.splice(0, 0, ",")
        }        
        pop.splice(0, 0, string[ind])
        iter++
    }
    return pop.join("")
}

function loadData(){        //get ajax call from json data on every change or keyup
    $.ajax({
        url: "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
        method: "GET",
        success: function(data){
            data = JSON.parse(data)

            //sort data according to selection
            let sortType = $("#sort").val()
            
            if (sortType == "increasing"){
                data = data.sort( (a,b) => {
                    return (a.population - b.population)})
            }else if (sortType == "atoz"){
                data = data.sort(  (a,b)  => {
                    if (a.city > b.city){
                        return 1;
                    }if (a.city < b.city){
                        return -1
                    }else{
                        return 0
                    }
                })
            }else if (sortType == "ztoa"){
                data = data.sort(  (a,b)  => {
                    if (a.city > b.city){
                        return -1
                    }else if (a.city <b.city){
                        return 1
                    }else{
                        return 0
                    }
                })
            }

            //iterate over sorted data and return html data for each entry using map for the array
            let search = new RegExp($("#text").val(), 'gi')
            
            const html = data.map(entry => {
                if (entry.city.match(search) || entry.state.match(search) ){
                    var city = entry.city.replace(search, `<span id="bg">${$("#text").val()}</span>`) //highlight
                    var state = entry.state.replace(search, `<span id="bg">${$("#text").val()}</span>`) //hihglight
                    let population = popcomas(entry.population.toString()) //commas

                    //return dynamic html to the data array if the entry matches search
                    return (`<tr>       
                    <td> <span class="city">${city}</span>  ${state}</td>                    
                    <td class="population"> ${population} </td> </tr>`)
                }else return;                        
            });
            console.dir((html))
            $("#result").html(html)

        }
    })
}

$("#text").on({
    'keyup': loadData,
    'change': loadData
})



//filter 

$("#sort").on('change', loadData)
