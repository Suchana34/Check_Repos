
var form = document.querySelector('#login-form');

//create a function wrapper. wrap the entire github api call in a function so that we can dynamically pass the ussername
//whose details we want to see

const show = () => {
    form.addEventListener('submit', (e) => {

        e.preventDefault();
        var userName = document.querySelector('#Username').value;
        
        requestUserRepos(userName);
    });
};


const requestUserRepos =(username) => {
    const request = new XMLHttpRequest();

    const url = `https://api.github.com/users/${username}/repos`;

    //let us open a new conn using GET request via the URL endpoint
    request.open('GET', url, true);


    //what we make the api do
    request.onload = function(){

        //parse the api data to json
        const data = JSON.parse(this.response);


        for(let i in data){

           var ul_list = document.querySelector('#list');
            var li_list = document.createElement('li');


            li_list.innerHTML = (`
                <p>Repo: ${data[i].name}</p>
                <p>Description: ${data[i].description}</p>
                <p>URL: ${data[i].html_url}</p>
                <p>-------------------------------------------------------------</p>
            `);

            ul_list.appendChild(li_list);
        }
    };

    //send the request to the server
    request.send();
};

show();