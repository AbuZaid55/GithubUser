"use strict";
const input = document.querySelector('input');
const main = document.querySelector('#main');
const fetchData = async (url) => {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error('Something went wrong!');
    }
    const data = await resp.json();
    return data;
};
const showResult = (userData) => {
    const { avatar_url, login, url, location } = userData;
    main.insertAdjacentHTML('beforeend', `<div class="card">
    <img src=${avatar_url} alt=${login}>
    <p>${login}</p>
    <hr/>
    <div>
        <img src=${avatar_url} alt=${login}>
        <a href=${url}>${location}</a>
    </div>
</div>`);
};
fetchData('https://api.github.com/users').then((data) => {
    for (const singleUser of data) {
        showResult(singleUser);
    }
});
async function search(e) {
    main.innerHTML = '';
    const allData = await fetchData('https://api.github.com/users');
    const filterData = allData.filter((currData) => currData.login.toLowerCase().includes((e.target.value).toLowerCase()));
    for (const singleUser of filterData) {
        showResult(singleUser);
    }
}
input.addEventListener('input', search);
