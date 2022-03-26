

const showData=(postInfo)=>{
    var oldComments= JSON.parse(window.localStorage.getItem('comments'));
    var postBody = document.getElementById('postComment');
    postBody.innerHTML ='' ;

    const comments= oldComments.filter(val=> postInfo.albumId === val.albumId && postInfo.postId === val.postId);

    const postComment = comments.map((val,i) => (
        `
        <h6>${val.email}</h6>
        <div>
            <button type="button" class="btn btn-info btn-sm mt-2 mb-2" style="width:50px;" data-bs-toggle="modal" data-bs-target="#editCommentModal" onclick="viewComment(${val.albumId},${val.postId},${i})">
            <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" class="btn btn-info btn-sm mt-2 mb-2" style="width:50px;" onclick="deleteComment(${val.albumId},${val.postId},${i})">
            <i class="bi bi-trash3"></i>
            </button>
        </div>
            <p class=" ms-5">${val.body}</p>
            <hr>
        `
        )).join('');
        postBody.innerHTML += postComment;
}


const getApi= async (postInfo)=>{
    
    var oldComments = JSON.parse(window.localStorage.getItem('comments'));

    var existingComment = oldComments && oldComments.filter(val=> {return postInfo.albumId === val.albumId && postInfo.postId === val.postId});


    const fetchComment=async(option)=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${postInfo.postId}`);
        var data = await response.json();
        
        const commentData= {
            ...data,
            postId: postInfo.postId,
            albumId: postInfo.albumId
        }

        switch(option){
            case 'new':{
                let arr= new Array;
                arr.push(commentData); 
                window.localStorage.setItem('comments', JSON.stringify(arr));
                break;
            };
            case 'old':{
                let arr= JSON.parse(window.localStorage.getItem('comments'));
                arr.push(commentData);
                window.localStorage.setItem('comments', JSON.stringify(arr));
                break;
            }
            default :{
                break;
            }
        }
    
        showData(postInfo);
    }

    if(!oldComments){
        fetchComment('new');
    }
    else if(existingComment.length > 0){
        showData(postInfo)
    }
    else{
        fetchComment('old');
    }

}
const getIndex=()=>{
    var postInfo = JSON.parse(window.localStorage.getItem('postInfo'));
    getApi(postInfo);

}
getIndex();

const addComment=()=>{

    var inEmail = document.getElementById('c-email').value;
    var inComment = document.getElementById('c-comment').value;

    const inputs = document.querySelectorAll('#c-email, #c-comment');

    inputs.forEach(input => {
        input.value = '';
    });

    var postInfo = JSON.parse(window.localStorage.getItem('postInfo'));

    var newComment = {
        postId:postInfo.postId,
        albumId:postInfo.albumId,
        email:inEmail,
        body:inComment,
    };

    var oldComments = JSON.parse(window.localStorage.getItem('comments'));
    oldComments.push(newComment);
    window.localStorage.setItem('comments', JSON.stringify(oldComments));

    showData(JSON.parse(window.localStorage.getItem('postInfo')));
}
const viewComment =(alId,usId,index)=>{
    var oldComments = JSON.parse(window.localStorage.getItem('comments'));
    var data = oldComments.filter(val=> {return alId === val.albumId && usId === val.postId});
    document.getElementById('e-email').value = data[index].email;
    document.getElementById('e-comment').value = data[index].body;
    document.getElementById('indexNo').value=index;
}

const updateComment=()=>{
    var upEmail = document.getElementById('e-email').value;
    var upComment = document.getElementById('e-comment').value;
    var index = document.getElementById('indexNo').value;

    const inputs = document.querySelectorAll('#c-email, #c-comment');

    inputs.forEach(input => {
        input.value = '';
    });

    var oldComment = JSON.parse(window.localStorage.getItem('comments'));
    var newComment = {
        postId:oldComment[index].postId,
        albumId:oldComment[index].albumId,
        email:upEmail,
        body:upComment,
    };
    oldComment.splice(index,1,newComment);
    window.localStorage.setItem('comments', JSON.stringify(oldComment));
    showData(JSON.parse(window.localStorage.getItem('postInfo')));
}
const deleteComment=(alId,usId,index)=>{
    var oldComment = JSON.parse(window.localStorage.getItem('comments'));
    var data = oldComment.filter(val=> {return alId === val.albumId && usId === val.postId});
    var newComment = data.splice(index,1);
    oldComment = oldComment.filter( ( el ) => !newComment.includes( el ) );
    window.localStorage.setItem('comments', JSON.stringify(oldComment));
    showData(JSON.parse(window.localStorage.getItem('postInfo')));
}