const editformhandler = async(event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const id = document.querySelector("#title").getAttribute("name");

    if (title&&content&&id){
        const response = await fetch(`/api/blog/${id}`, {
            method:"PUT",
        body:JSON.stringify ({title,content}),
        headers:{"Content-Type":"application/json"}})
        if (response.ok){
            document.location.replace("/dashboard")
            }
            else {
                alert("please enter valid data")
            }
    }
    else {
        alert ("please enter valid data")
    }
}
document.querySelector(".btn").addEventListener("click", editformhandler)
