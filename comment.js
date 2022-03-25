

const showData=(postIndex)=>{
    var postDetails= JSON.parse(window.localStorage.getItem('postDetails'));
    var postBody = document.getElementById('postComment');
    postBody.innerHTML ='' ;
    // console.log(postDetails);
    var count = postIndex-1;

    const postComment = postDetails.map((usr,count) => (
        `
        <h6>${usr.email}</h6>
        <button type="button" class="btn btn-info btn-sm mt-2" style="width:50px;" data-bs-toggle="modal" data-bs-target="#editCommentModal" onclick="viewComment(${count})">
            Edit
        </button>
            <p class=" ms-5">${usr.body}</p>
            <hr>
        `
        )).join('');
        postBody.innerHTML += postComment;
}


const getApi= async (postIndex)=>{

    var oldData = JSON.parse(window.localStorage.getItem('postDetails'));

    var index = JSON.parse(window.localStorage.getItem('postData'));

    var existingComment = oldData && oldData.filter(val=> {return val.id === index});

    console.log(existingComment);

    const fetchComment=async()=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${postIndex}`);
        var data = await response.json();
        let arr= new Array;
        arr.push(data);

        window.localStorage.setItem('postDetails', JSON.stringify(arr));
        // console.log(data);
        showData(postIndex);
    }

    if(!oldData){
        fetchComment();
    }else if(existingComment.length > 0){
        showData(postIndex)
    }else{
        fetchComment();
    }

}
const getIndex=()=>{
    var postIndex = window.localStorage.getItem('postData');
    console.log(postIndex);
    // console.log(postData[postIndex]);
    getApi(postIndex);

}
getIndex();

const addComment=()=>{
    // console.log("Add comment block");
    var inEmail = document.getElementById('c-email').value;
    var inComment = document.getElementById('c-comment').value;

    const inputs = document.querySelectorAll('#c-email, #c-comment');

    inputs.forEach(input => {
        input.value = '';
    });

    var oldComment = JSON.parse(window.localStorage.getItem('postDetails'));
    var index = oldComment.length - 1;
    // console.log(oldComment[index]);
    var newComment = {
        postId:oldComment[index].postId+1,
        id:oldComment[index].id,
        email:inEmail,
        body:inComment,
    };
    oldComment.push(newComment);
    // console.log(oldComment);
    window.localStorage.setItem('postDetails', JSON.stringify(oldComment));
    showData();
}
const viewComment =(count)=>{
    // console.log(i);
    var data = JSON.parse(window.localStorage.getItem('postDetails'));
    var commentData = data[count];
    // console.log(commentData);
     document.getElementById('e-email').value = commentData.email;
     document.getElementById('e-comment').value = commentData.body;
}

const updateComment=()=>{
    var upEmail = document.getElementById('e-email').value;
    var upComment = document.getElementById('e-comment').value;

    const inputs = document.querySelectorAll('#c-email, #c-comment');

    inputs.forEach(input => {
        input.value = '';
    });

    var oldComment = JSON.parse(window.localStorage.getItem('postDetails'));
    var index = oldComment.length - 1;
    var newComment = {
        postId:oldComment[index].postId+1,
        id:oldComment[index].id,
        email:upEmail,
        body:upComment,
    };
    oldComment.splice(index,1,newComment);
    window.localStorage.setItem('postDetails', JSON.stringify(oldComment));
    showData(index);
}