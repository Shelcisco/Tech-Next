const commentFormHandler = async(event) => {
    event.preventDefault();
    const content = document.querySelector("#comment-content").value.trim();

    const blog_id = document.querySelector("#title")
    .getAttribute("name")
    console.log(content);

    if (content){
        const response = await fetch(`/api/comment`, {
            method:"POST",
        body:JSON.stringify ({content:content, blog_id}),
        headers:{"Content-Type":"application/json"}})
        if (response.ok){
            document.location.reload()
            }
            else {
                alert("please")
            }
    }
    else {
        alert ("please enter valid data")
    }

}

function displayForm(){ 
    event.preventDefault();
    document.querySelector("#comment-form").style.visibility="visible"
    document.querySelector("#create-btn").addEventListener("click", commentFormHandler)

}
document.querySelector("#add-comment").addEventListener("click", displayForm)
