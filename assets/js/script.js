function userInfoHtml(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
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

function repoInfoHtml(repos) {
    if (repos.length == 0) {
        return `<div class="clearfif repo-list">No repos found!</div>`;
    }
    let listItemsHtml = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    return `<div class="clearfix repo-list">
                <p>
                   <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHtml.join("\n")}
                </ul>
            </div>`;
}

//This function is the oninput in portfolio.html file
function getGitHubRepo(event) {
    //This will empty the repos of user when the input field is cleared
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(`<div id="loader"><img src="/assets/images/loader.gif" alt="loading..." /></div>`)

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $("#gh-user-data").html(userInfoHtml(userData));
            $("#gh-repo-data").html(repoInfoHtml(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No user information found ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        })


}
// This will display the octocat profile when the page is loaded
$(document).ready(getGitHubRepo);