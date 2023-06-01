const editformhandler = async(event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    

    if (title&&content){
        const response = await fetch(`/api/blog/`, {
            method:"POST",
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
document.querySelector("#create-btn").addEventListener("click", editformhandler)
