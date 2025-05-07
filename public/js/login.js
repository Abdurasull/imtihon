const elForm = document.querySelector('.js-form');

const getData = async (data) => {
    const res = await fetch("http://localhost:4000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data, token: window.localStorage.getItem("token")})
        }
    );
    return await res.json();
   
}

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(elForm);
    const result = await getData(Object.fromEntries(data));
    if(result.status === 200) {
        document.querySelector(".Error").innerHTML = '';
        window.localStorage.setItem("token", result.token);
        window.localStorage.setItem("user", JSON.stringify(result.userInfo));
        window.location.href = `/index/${result.userInfo.userId}`;
    } else {
        console.log(result);
        document.querySelector(".Error").textContent = result;
    }
})