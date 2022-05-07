const title = document.createElement('h1');
const keyboardWrapper = document.createElement('div');
const textarea = document.createElement('textarea');
const keyboardLeyout = document.createElement('div');
const subtitle = document.createElement('h2');

document.body.appendChild(title);
document.body.appendChild(keyboardWrapper);
document.body.appendChild(subtitle);

keyboardWrapper.appendChild(textarea);
keyboardWrapper.appendChild(keyboardLeyout);

keyboardWrapper.classList.add('keyboard_wrapper');
keyboardLeyout.classList.add('keyboard_leyout');

title.textContent = 'RSS Виртуальная клавиатура';
subtitle.textContent = 'Клавиатура создана в операционной системе Windows\nДля переключения языка комбинация: Ctrl + Alt';

