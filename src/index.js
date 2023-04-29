import keyButtons from './keyButtons.js';

const title = document.createElement('h1');
const keyboardWrapper = document.createElement('div');
const myTextarea = document.createElement('textarea');
const myKeyboardLeyout = document.createElement('div');
const subtitle = document.createElement('h2');

document.body.appendChild(title);
document.body.appendChild(keyboardWrapper);
document.body.appendChild(subtitle);

keyboardWrapper.appendChild(myTextarea);
keyboardWrapper.appendChild(myKeyboardLeyout);

keyboardWrapper.classList.add('keyboard_wrapper');
myKeyboardLeyout.classList.add('keyboard_leyout');
myTextarea.classList.add('textarea');

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
    this.keyboardLeyout.classList.add('keyboard');
    keyButtons.forEach((key) => {
      const button = document.createElement('button');
      button.setAttribute('id', key.code);
      button.classList.add('my_button', key.code);
      button.setAttribute('content_en', key.content.en);
      button.setAttribute('content_ru', key.content.ru);
      button.setAttribute('shift_en', key.shift.en);
      button.setAttribute('shift_ru', key.shift.ru);
      button.setAttribute('character_en', key.character.en);
      button.setAttribute('character_ru', key.character.ru);

      if (this.language === 'en') {
        button.textContent = key.content.en;
      } else {
        button.textContent = key.content.ru;
      }

      this.keyboardLeyout.appendChild(button);
      this.keys.push(button);
    });
  }

  shiftText(noCaps) {
    this.keys.forEach((myKey) => {
      const key = myKey;
      if (noCaps || key.getAttribute('character_en') === 'letter') {
        const buffer = key.getAttribute('content_en');
        key.setAttribute('content_en', key.getAttribute('shift_en'));
        key.setAttribute('shift_en', buffer);
      }
      if (noCaps || key.getAttribute('character_ru') === 'letter') {
        const buffer = key.getAttribute('content_ru');
        key.setAttribute('content_ru', key.getAttribute('shift_ru'));
        key.setAttribute('shift_ru', buffer);
      }
      key.innerText = this.language === 'en'
        ? key.getAttribute('content_en')
        : key.getAttribute('content_ru');
    });
  }

  addKeyboardListeners() {
    const cursorStart = this.textarea.selectionStart;
    const cursorEnd = this.textarea.selectionEnd;
    document.addEventListener('keydown', (keyEvent) => {
      const key = document.getElementById(keyEvent.code);
      if (key) {
        key.classList.add('active');
        keyEvent.preventDefault();
        if (key.getAttribute('character_en') !== 'func' || key.getAttribute('character_ru') !== 'func') {
          this.textarea.value += key.innerText;
        }
        if (key.getAttribute('content_en') === 'Backspace') {
          let str = this.textarea.value;
          if (cursorStart === cursorEnd) {
            str = str.substr(0, (str.length - 1));
            this.textarea.value = str;
          }
        }
      }
      if (key.getAttribute('content_en') === 'Enter') {
        let str = this.textarea.value;
        str += '\n';
        this.textarea.value = str;
      }
      if (key.getAttribute('content_en') === 'Tab') {
        let str = this.textarea.value;
        str += '    ';
        this.textarea.value = str;
      }
      if (key.getAttribute('content_en') === ' ') {
        let str = this.textarea.value;
        str += ' ';
        this.textarea.value = str;
      }
      if (keyEvent.ctrlKey && keyEvent.altKey) {
        this.language = this.language === 'ru' ? 'en' : 'ru';
        localStorage.setItem('language', this.language);
        this.keys.forEach((myKey) => {
          if (this.language === 'en') {
            const changeLang = myKey;
            changeLang.innerText = myKey.getAttribute('content_en');
          } else if (this.language === 'ru') {
            const changeLang = myKey;
            changeLang.innerText = myKey.getAttribute('content_ru');
          }
        });
      }
      if (
        (keyEvent.code === 'ShiftLeft' || keyEvent.code === 'ShiftRight')
        && !keyEvent.repeat
      ) this.shiftText(true);
      else if (keyEvent.code === 'CapsLock' && !keyEvent.repeat) {
        this.shiftText(false);
      }
    });
    document.addEventListener('keyup', (keyButton) => {
      const key = document.getElementById(keyButton.code);
      if (key) {
        if (keyButton.code !== 'CapsLock') key.classList.remove('active');
        if (keyButton.code === 'ShiftLeft' || keyButton.code === 'ShiftRight') this.shiftText(true);
      }
    });

    this.keyboardLeyout.addEventListener('mousedown', (event) => {
      const eventKeyDown = new KeyboardEvent('keydown', {
        code: event.target.id,
      });
      document.dispatchEvent(eventKeyDown);
      this.isDown = true;
    });

    this.keyboardLeyout.addEventListener('mouseup', (event) => {
      const eventKeyUp = new KeyboardEvent('keyup', { code: event.target.id });
      document.dispatchEvent(eventKeyUp);
      this.isDown = false;
    });
  }
}
const keyboardObj = new Keyboard(myKeyboardLeyout, myTextarea);
keyboardObj.generateButtons();

keyboardObj.addKeyboardListeners();

myTextarea.onblur = () => myTextarea.focus();
myTextarea.focus();
