async function getapi() {
	
    try{
        const url ="https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        var data = await response.json();
        var oldData = JSON.parse(window.localStorage.getItem('user'));
        if(oldData && oldData.length > 0){
            showData();
        }
        else{

            window.localStorage.setItem('user', JSON.stringify(data));
        }
        
        showData();
    
    }catch(err){
        console.log("fetch url error--->>>", err)
    }
	
}
getapi();

function showData(){
    var userData = JSON.parse(window.localStorage.getItem('user'));

    function nameSplitter(name){
        let arr = name.split(" ");
       return(arr[0].charAt(0)+""+arr[1].charAt(0));
        
    }
    
    const tableData = userData.map((usr, i) => (
        `
            <tr>
            <td id ="usr-id">${usr.id}</td>
            <td>
            <div class="d-flex justify-content-center align-items-center rounded-circle bg-dark badge" style="height:50px; width:50px; cursor:pointer;" onclick="postData(${i})">${nameSplitter(usr.name)}</div>
            </td>
            <td>${usr.username}</td>
            <td>${usr.name}</td>
            <td>${usr.email}</td>
            <td>${usr.phone}</td>
            <td>${usr.website}</td>
            <td>${usr.address.city}</td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="getData(${i})">
                    Edit
            </button></td>
            <td><button type="button" class="btn btn-primary" onclick="deleteData(${i})">
                    Delete
            </button></td>
            </tr>
        `
        )).join('');

        var tbody = document.getElementById('t-body');
        tbody.innerHTML = tableData;
}

function onAdd(){
    var inName = document.getElementById('name').value;
    var inUserName = document.getElementById('username').value;
    var inEmail = document.getElementById('email').value;
    var inPhone = document.getElementById('phoneNo').value;
    var inWebsite = document.getElementById('website').value;
    var inAddress = document.getElementById('address').value;


    const inputs = document.querySelectorAll('#id, #name, #username, #email, #phoneNo, #website');

    inputs.forEach(input => {
        input.value = '';
    });

    var oldData = JSON.parse(window.localStorage.getItem('user'));
    var newData = {
        id:oldData.length +1 ,
        username:inUserName,
        name:inName,
        email:inEmail,
        phone:inPhone,
        website:inWebsite,
        address:{
            city:inAddress
        }

    };
     
    oldData.push(newData);

    window.localStorage.setItem('user', JSON.stringify(oldData));

    document.getElementById('cancelbtn').click();
    showData();

} 

function getData(i){

    var oldData = JSON.parse(window.localStorage.getItem('user'));
    document.getElementById('edit-username').value = oldData[i].username;
    document.getElementById('edit-name').value = oldData[i].name;
    document.getElementById('edit-email').value = oldData[i].email;
    document.getElementById('edit-phoneNo').value = oldData[i].phone;
    document.getElementById('edit-website').value = oldData[i].website;
    document.getElementById('edit-address').value = oldData[i].address.city;
    document.getElementById('index-no').value = i;
}

function updateData(){
    var upName = document.getElementById('edit-name').value;
    var upUserName = document.getElementById('edit-username').value;
    var upEmail = document.getElementById('edit-email').value;
    var upPhone = document.getElementById('edit-phoneNo').value;
    var upWebsite = document.getElementById('edit-website').value;
    var upAddress = document.getElementById('edit-address').value;
    var index = document.getElementById('index-no').value;


    var oldData = JSON.parse(window.localStorage.getItem('user'));
    var newData = {
        id: Number(oldData[index].id),
        username:upUserName,
        name:upName,
        email:upEmail,
        phone:upPhone,
        website:upWebsite,
        address:{
            city:upAddress
        }
    };
    

    oldData.splice(index,1,newData);
    window.localStorage.setItem('user', JSON.stringify(oldData));
    showData();
}

function deleteData(i){
    var oldData = JSON.parse(window.localStorage.getItem('user'));
    oldData.splice(i,1); 
    window.localStorage.setItem('user', JSON.stringify(oldData));
    showData();
}

function postData(i){
    window.localStorage.setItem('userIndex',i);
    window.location.href="posts.html"; 
}