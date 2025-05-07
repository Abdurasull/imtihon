const elExit = document.querySelector(".js-exit");
const elUploadVideo = document.querySelector(".js-upload-video");
const elMenu = document.querySelector('.menu-icon');
const elAllUsers = document.querySelector(".navbar-list");
const elTemplate = document.querySelector(".js-otherVideos").content;
const elUlusers = document.querySelector(".iframes-list");
const AllVideos = document.querySelector(".iframes-list");
const elFormSearch = document.querySelector(".search-box");


// Faqat ma`lum foydalanuvchilarga tegishli videolarni tortish uchun function
async function getIdVideos(id){
    const res = await fetch(`http://localhost:4000/api/upload/video/${id}`,
        {
            headers: {
                
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        }
    );
    return await res.json();

}

// Vidiolarni nomi bo`yicha search qilish un function
async function searchVideos(data) {
    const res = await fetch("http://localhost:4000/api/upload/search",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        }
    );
    return await res.json();
}

elMenu.addEventListener("click", () => {
    window.location.href = `/index/${JSON.parse(window.localStorage.getItem("user")).userId}`;
})

elExit.addEventListener("click", ()=>{
    window.localStorage.removeItem("user");
    window.location.href = "/login";
});

elUploadVideo.addEventListener("click", () => {
    window.location.href = `/upload/${JSON.parse(window.localStorage.getItem("user")).userId}`;
});

elAllUsers.addEventListener("click", async (evt) => {
    const target = evt.target.dataset.userid;
    if(target){
        
        console.log(target);
        const result = await getIdVideos(target);
        
        if(result.status == 200){
            if(!result.videos.length == 0){
                const docFragment = document.createDocumentFragment();
                result.videos.forEach(video => {
                    const clone = elTemplate.cloneNode(true);
                    clone.querySelector(".iframe-video").src = "/" + video.filePath;
                    clone.querySelector(".ownerImage").src = "/" + video.ownerImage;
                    clone.querySelector(".channel-name").textContent = video.owner;
                    clone.querySelector(".iframe-title").textContent = video.title;
                    clone.querySelector(".uploaded-time").textContent = video.createdAt;
                    clone.querySelector(".download1").textContent = video.size + " MB";
                    clone.querySelector(".download").href = "/" + video.filePath;
                    docFragment.append(clone);
                });
                elUlusers.innerHTML = '';
                AllVideos.append(docFragment);
            } else {
                AllVideos.innerHTML = '';
                AllVideos.innerHTML = "<h1> Hali birorta ham video joylanmagan</h1>";
            }

            }

    }

});

elFormSearch.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = new FormData(elFormSearch);
    let result = Object.fromEntries(data); 
    result = await searchVideos(result);
    if(result.status == 200){
            if(!result.videos.length == 0){
                const docFragment = document.createDocumentFragment();
                result.videos.forEach(video => {
                    const clone = elTemplate.cloneNode(true);
                    clone.querySelector(".iframe-video").src = "/" + video.filePath;
                    clone.querySelector(".ownerImage").src = "/" + video.ownerImage;
                    clone.querySelector(".channel-name").textContent = video.owner;
                    clone.querySelector(".iframe-title").textContent = video.title;
                    clone.querySelector(".uploaded-time").textContent = video.createdAt;
                    clone.querySelector(".download1").textContent = video.size + " MB";
                    clone.querySelector(".download").href = "/" + video.filePath;
                    docFragment.append(clone);
                });
                elUlusers.innerHTML = '';
                AllVideos.append(docFragment);
            } else {
                AllVideos.innerHTML = '';
                AllVideos.innerHTML = "<h1> Hali birorta ham video joylanmagan</h1>";
            }

            }
    
});


