let searchBar = document.getElementById("searchBar")
let searchForm = document.getElementById("searchForm")
let searchDisplay = document.getElementById("searchDisplay")

searchBar.addEventListener("input", async (ee) => {
    ee.preventDefault()
    const data = { query: searchBar.value };
    let res = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    let hotels = await res.json()
    let searchDisplay = document.getElementById("searchDisplay")
    searchDisplay.innerHTML = ''
    let searchDiv = document.createElement("div");
    for(const hotel of hotels){
        searchDiv.innerHTML+='<div class="profileRes mb-3"> <div class="profileResImg1"> <img class="profileResImg2" src="'+hotel.image+'" alt="Card image cap"></div><div class="profileResDesc float-right"><div class="card-body"><h5 class="card-title"></h5><h6 class="card-subtitle mb-2 text-muted">Rating:</h6><ul class="list-group list-group-flush"><li class="list-group-item">start date: <span class="startDate"></span></li><li class="list-group-item">end date: <span class="endDate"></span></li></ul><div class="card-body"><a href="/hotel/" class="card-link">Go to hotel page</a></div></div></div></div>'
    }

})