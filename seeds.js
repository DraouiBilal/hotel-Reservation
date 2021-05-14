const Hotels = require("./models/Hotels");

const data = [
    {
        name: "Hilton",
        image: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        stars: 5,
        price: 1500.00,
        totalRooms: 2000,
        availableRooms: 500,
        latitude:35,
        longtitude:-6
    },
    {
        name: "Desert Mesa",
        image: "https://i.insider.com/589c842ddd0895a7518b4bb1?width=987&format=jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        stars: 4,
        price: 100.00,
        totalRooms: 200,
        availableRooms: 50,
        latitude:35,
        longtitude:-6
    },
    {
        name: "Canyon Floor",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/150514133918-9-taj-mahal-palace-mumbai-iconic-hotels-exlarge-169.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        stars: 4,
        price: 750.00,
        totalRooms: 100,
        availableRooms: 20,
        latitude:35,
        longtitude:-6
    },
    {
        name: "Ensa",
        image: "https://i.imgur.com/rVnMQJu.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        stars: 1,
        price: 15.00,
        totalRooms: 100,
        availableRooms: 20,
        latitude:35,
        longtitude:-6
    }
];

async function SeedDB() {
    await Hotels.deleteMany({})
    console.log("removed Hotels")
    data.forEach(async (seed) => {
        let hotel = new Hotels(seed)
        await hotel.save()
        console.log("Hotel saved to database")
    })
}

module.exports = SeedDB;