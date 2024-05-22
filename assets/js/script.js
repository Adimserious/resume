function userInfoHtml(user) {
    return `
    <h2>§{user.name}
        <span class="small-name>
        (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar"> 
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>    
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos:${user.public_repos}</p>
    </div>`;
}

//This function is the oninput in portfolio.html file
function getGitHubRepo(event) {
    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(`<div id="loader"><img src="/assets/images/loader.gif" alt="loading..." /></div>`)

    $.when(
        $.getJSON(`https://api.github.com/users${username}`)
    ).then(
        function(response) {
            let userData = response;
            $("#gh-user-data").html(userInfoHtml(userData));
        }, function(errorResponse) {
            if(errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No user information found ${username}</h2>`);
            }else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        })
        
    
}