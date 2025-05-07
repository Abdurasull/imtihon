

export const viewscontroller = {
    MAIN: async (req, res) => {  
        const {userId} = req.params;
        const videos = await req.readFile("videos.json");
        const users = await req.readFile("users.json");
        const user = users.find(user => user.id == userId);
        res.render("index.ejs", {title: "index sahifasi", ownVideos: videos, user: user, users: users.filter(user => user.id != userId) } );
    }, 
    USER_PAGE: async (req, res) =>{
        const {userId} = req.params;
        const users = await req.readFile("users.json");
        const user = users.find(user => user.id == userId);
        const videos = await req.readFile("videos.json");
        const ownVideos = videos.filter(video => video.userId == userId); 
        res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", ownVideos: ownVideos});
    },
    LOGIN: (req, res) => {
        console.log("salom")
        res.render("login.ejs", {title: "login sahifasi"});
    }, 
    REGISTER: async (req, res) => {
        res.render("register.ejs", {title: "Foydalanuvchi sahifasi"});
        
    }  
}