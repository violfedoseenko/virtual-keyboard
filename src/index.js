import keyButtons from './keyButtons.js';

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

class Keyboard {
  constructor(keyboardLeyout, textarea) {
    this.keyboardLeyout = keyboardLeyout;
    this.textarea = textarea;
    this.isCaps = false;
    this.isDown = false;
    this.language = localStorage.getItem('language') === 'en' ? 'en' : 'ru';
    this.keys = [];
  }

  generateButtons() {
    keyButtons.forEach((key) => {
      const button = document.createElement('button');
      button.setAttribute('id', key.code);
      button.classList.add('key', key.code);

      button.setAttribute('content_en', key.content.en);
      button.setAttribute('content_ru', key.content.ru);

      if (this.language === 'en') {
        button.textContent = key.content.en;
      } else {
        button.textContent = key.content.ru;
      }

      this.keyboardLeyout.appendChild(button);
      this.keys.push(button);
    });
  }
}

const keyboardObj = new Keyboard(keyboardLeyout, textarea);
keyboardObj.generateButtons();


