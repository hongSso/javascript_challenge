const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");

getUser("hongSso");
async function getUser(username) {
  const resp = await fetch(APIURL + username);
  console.log(resp);
  const respData = await resp.json();
  console.log(respData);

  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  //   console.log(resp);
  const respData = await resp.json();

  console.log(respData);

  joinRepos(respData);
}

async function createUserCard(user) {
  const name = user.name;
  //   console.log(user.avatar_url);
  const CardHTML = `
    <div class="card">
        <div>
        <img
            src="${user.avatar_url}"
            alt=${user.name} />
        </div>
        <div class="content">
            <div class="my">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>
                    ${user.followers} <strong> Followers</strong></li>
                    <li>
                    ${user.following} <strong> Following</strong></li>
                    <li>
                    ${user.public_repos} <strong> Repository</strong></li>
                </ul>
                <h4>repos:</h4>
                <ul id="repos"></ul>
            </div>
            </div>
    </div>`;

  main.innerHTML = CardHTML;
}

function joinRepos(repos) {
  const reposEl = document.getElementById("repos");
  console.log(repos.sort((a, b) => b.stargazers_count - a.stargazers_count));
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  console.log(user);

  if (user) {
    getUser(user);

    search.value = "";
  }
});
