
const getCards=(userPosts, userId)=>{

    var posts = userPosts.filter((data) =>  data.id === userId);
    return posts;
}

const showData=(userId)=>{
    var postDetails= JSON.parse(window.localStorage.getItem('userPostData'));
    var userPost = getCards(postDetails, userId);

    // var cardsArr= postDetails.filter(val=> {return val.id===userId})

    var postBody = document.getElementById('post-cards');
    postBody.innerHTML ='' ;

    const postCard = userPost.map((post, i) => (
        `
        <div class="card mt-5 ms-2" style="width: 18rem;">
            <img src=${post.url} class="card-img-top">
            <div class="card-body">
            <p class="card-text">${post.title}</p>
            </div>
            <div class="d-flex flex-row mb-5 justify-content-evenly">
            <button type="button" class="btn btn-primary"  onclick="viewPost(${post.albumId},${post.id})">
                   View
            </button>
            <button type="button" class="btn btn-primary"  onclick="deletePost(${post.albumId},${post.id})">
                    Delete
            </button>
            </div>
      </div>
        `
        )).join('');
        postBody.innerHTML += postCard;
}

const getApi=async (userId)=>{
	
    try{
        var userPost = JSON.parse(window.localStorage.getItem('userPostData'));


        var existingPost =  userPost && userPost.filter(val=> {return val.id === userId});
        // console.log(existingPost);

        //function
        const addPost= async ()=>{
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${userId}`);
            var data = await response.json();
            let arr= new Array;
            arr.push(data);

            const postUserData= JSON.parse(window.localStorage.getItem('userPostData'))

            if(postUserData && postUserData.length > 0){
                console.log('if block')
                postUserData.push(data)
                window.localStorage.setItem('userPostData', JSON.stringify(postUserData));
            }else{
                window.localStorage.setItem('userPostData', JSON.stringify(arr));
            }

            // console.log(data);
            showData(userId);  
        }

        if(!userPost){
            addPost()
        }else if(existingPost.length > 0){
            showData(userId)
        }else{
            addPost()
        }

    }catch(err){
        console.log("fetch url error--->>>", err);
    }
    
}

const getIndex=()=>{
    var userIndex = window.localStorage.getItem('userIndex');

    var userData = JSON.parse(window.localStorage.getItem('user'));
    document.getElementById('post-username').value = userData[userIndex].username;
    document.getElementById('post-name').value = userData[userIndex].name;
    document.getElementById('post-email').value = userData[userIndex].email;
    document.getElementById('post-phoneNo').value = userData[userIndex].phone;
    document.getElementById('post-website').value = userData[userIndex].website;
    document.getElementById('post-address').value = userData[userIndex].address.city;

    var userId = userData[userIndex].id;

    
    let arr = userData[userIndex].name.split(" ");
    var icon= arr[0].charAt(0)+""+arr[1].charAt(0);
    var p = document.getElementById('icon');
    p.append(icon);

    getApi(userId);
    

}
getIndex();
 
const addPost=()=>{
    var userIndex = window.localStorage.getItem('userIndex');
    var userData = JSON.parse(window.localStorage.getItem('user'));

    var inURL = document.getElementById('img-url').value;
    var inTitle = document.getElementById('post-title').value;

    const inputs = document.querySelectorAll('#img-url, #post-title');

    inputs.forEach(input => {
        input.value = '';
    });

    oldPost = JSON.parse(window.localStorage.getItem('userPostData'));
    var index = oldPost.length -1;

    var newPost = {
        albumId:oldPost[index].albumId+1,
        id:userData[userIndex].id,
        url:inURL,
        title:inTitle,
    };
    oldPost.push(newPost);
    window.localStorage.setItem('userPostData', JSON.stringify(oldPost));

    showData(userData[userIndex].id);
}

const deletePost=(i,id)=>{
    var postDetails = JSON.parse(window.localStorage.getItem('userPostData'));
    var delPost = postDetails.filter(val=> {return val.id === id});
    var delContent = delPost.filter(val => {return val.albumId == i});
    postDetails = postDetails.filter( ( el ) => !delContent.includes( el ) );

    window.localStorage.setItem('userPostData', JSON.stringify(postDetails));
    showData(id);
}

const viewPost=(albumId, postId)=>{
    console.log('post data->>>>', albumId, postId)
    const postInfo= {
        albumId: albumId,
        postId:postId
    }
    window.localStorage.setItem('postInfo', JSON.stringify(postInfo));
    window.location.href="comments.html"; 
}