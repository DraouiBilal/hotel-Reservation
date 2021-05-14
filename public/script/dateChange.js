let dateChange = (date)=>{
    let day = date.slice(0,3)
    let datee = date.slice(4,15)
    let res = datee.split(" ")
    return `${day} ${res.join("-")}`
}

let startDate = document.querySelectorAll(".startDate")
let endDate = document.querySelectorAll(".endDate")

startDate.forEach(d=>{
    d.innerHTML = dateChange(d.innerHTML)
})

endDate.forEach(d=>{
    d.innerHTML = dateChange(d.innerHTML)
})
