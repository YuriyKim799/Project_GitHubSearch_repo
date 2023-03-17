//    https://api.github.com/search/code?q=Q
//  `https://api.nomoreparties.co/github-search?q=${event.target.elements['title'].value}`
// const url = 'https://api.github.com/users/USERNAME';
// `https://api.github.com/search/${inputValue}?q=Q`


// const formEl = document.querySelector('.main-form');
// const searchResEl = document.querySelector('.search-result')
// let arr = []
// formEl.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const inputValue = Object.fromEntries(new FormData(event.target));
//   const response = await fetch(`https://api.nomoreparties.co/github-search?q=${inputValue}`);
//   if (response.ok) {
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//     showResult(data);

//   } else {
//     alert('user not found!')
//   }


// })


// function showResult(profileData) {
//   searchResEl.innerHTML += `
//     <p>${profileData.name}</p>
//   `
// }



const formEl = document.querySelector('.main-form');
const searchListEl = document.querySelector('.search-list');
const errorContEl = document.querySelector('.error-container');
const countContEl = document.querySelector('.count-container');

formEl.addEventListener('submit', async (event) => {
  const inputValue = document.getElementById('search-input').value;
  event.preventDefault();

  countContEl.innerHTML = `Загрузка...`;
  searchListEl.innerHTML = '';
  errorContEl.innerHTML = '';

  await fetch(`https://api.nomoreparties.co/github-search?q=${inputValue}+in%3Aname%2Cdescription&type=Repositories`)
    .catch(() => renderError())
    .then((response) => response.json())
    .then(data => {
      let count = data.total_count;
      if (count > 0) {
        renderCount(data.total_count);
      } else {
        renderEmptyResults();
      };
      console.log(data);

      // for (let item of data.items) {
      //   searchListEl.append(renderItem(item));
      // }
      for (let i = 0; i <= 10; i++) {
        searchListEl.append(renderItem(data.items[i]));
      }
    })
})

function renderItem(item) {
  const newElement = document.createElement("li");
  newElement.classList.add("searched-item");
  newElement.innerHTML = `<i class="fa-brands fa-square-github"></i>
      <a target="_blank" href="${item.html_url}" class="searched-link">${item.full_name}</a><br/>
      <i class="fa-solid fa-user"></i><span class="searched-description"><span class="repo-small-text">Username:</span> ${item.name}</span><br/>
      <i class="fa-regular fa-clipboard"></i><span class="searched-description"> <span class="repo-small-text">Description:</span> ${item.description}</span>
	`;
  return newElement;
}

function renderError() {
  errorContEl.innerHTML = `
        <p class="searched-error-message">
            Произошла ошибка... По вашему запросу ничего не найдено
        </p>
  `;
  countContEl.innerHTML = ``;
};

const renderCount = (count) => {
  countContEl.innerHTML = `
    Найдено <span class="searched-amount">${count.toLocaleString(
    'ru-RU'
  )}</span> совпадений
`;
};

function renderEmptyResults() {
  errorContEl.innerHTML = `
      <p class="searched-error-message">
          По вашему запросу ничего не найдено, попробуйте уточнить запрос
      </p>
`;
  countContEl.innerHTML = ``;
};



