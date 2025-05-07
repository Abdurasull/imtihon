const elForm = document.querySelector(".site-form");


async function getData(data) {
    const response = await fetch("http://localhost:4000/api/auth/register",
        {
            method: "POST",
       
            body: data
        }
    );
    const result = await response.json();
    return result;
}
elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const data = new FormData(form);    
    const result = await getData(data);
    if (result.status === 201) {
         document.querySelector(".Error").innerHTML = '';
        window.localStorage.setItem("token", result.token);
        window.localStorage.setItem("user", JSON.stringify(result.userInfo));
        window.location.href = `/login`;
    } else {
        document.querySelector(".Error").textContent = result;
    }
    console.log(result);
    
});