const elForm = document.querySelector('.js-form');
const elMenu = document.querySelector('.menu-icon');
const elVideos = document.querySelector(".admin-wrapper");

async function getdata(data) {
    const res = await fetch(`http://localhost:4000/api/upload/video/${JSON.parse(window.localStorage.getItem("user")).userId}`,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            body: data
        }
    );
    return await res.json();
}

async function deleteVideo(id) {
    const res = await fetch(`http://localhost:4000/api/upload/video/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            body: JSON.stringify({ id: id}) 
        }
    );
    return await res.json();
}

elMenu.addEventListener("click", () => {
    window.location.href = `/index/${JSON.parse(window.localStorage.getItem("user")).userId}`;
});

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const data = new FormData(elForm);
    const result = await getdata(data);
    if(result.status == 201) {
        document.querySelector(".Error").innerHTML = '';
        window.location.href = "/upload/" + JSON.parse(window.localStorage.getItem("user")).userId;
    } else {
        document.querySelector(".Error").textContent = result;
    }
});


// Videoni o`chirish uchun
elVideos.addEventListener("click",  (evt) => {
    const target = evt.target.dataset.delid;

    if (target) {
        const result = deleteVideo(target);
        if(!result.status == 200) {
            alert("Video o`chirilmadi");
        } else window.location.reload();
    }
    
     
})