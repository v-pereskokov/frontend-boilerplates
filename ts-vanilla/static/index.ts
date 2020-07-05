import identity from '__utils/identity';
import Logo from '__assets/ya-praktikum.png';

import '__styles/main.scss';

const logo = document.createElement('img');
logo.src = Logo;

const greeting = document.createElement('h1');
greeting.textContent = identity('Header');

const app = document.querySelector('#root');
app.appendChild(greeting);
app.appendChild(logo);
