/**
 * Модуль валидации формы регистрации
 */
(function() {
  'use strict';

  const form = document.getElementById('registrationForm');
  const fullnameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');

  /**
   * Валидация ФИО (минимум два слова)
   * @param {HTMLInputElement} input - Поле ввода ФИО
   * @returns {boolean} - Результат валидации
   */
  function validateFullname(input) {
    const value = input.value.trim();
    const words = value.split(/\s+/).filter(word => word.length > 0);

    if (words.length >= 2) {
      input.setCustomValidity('');
      return true;
    } else {
      input.setCustomValidity('Введите имя и фамилию (минимум два слова)');
      return false;
    }
  }

  /**
   * Валидация российского номера телефона
   * @param {HTMLInputElement} input - Поле ввода телефона
   * @returns {boolean} - Результат валидации
   */
  function validatePhone(input) {
    const value = input.value.trim();
    // Регулярное выражение для российских номеров:
    // +7, 8, или 7 в начале, затем 10 цифр
    // Допускаются пробелы, дефисы, скобки
    const phoneRegex = /^(\+7|8|7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    if (phoneRegex.test(value)) {
      input.setCustomValidity('');
      return true;
    } else {
      input.setCustomValidity('Введите корректный российский номер телефона');
      return false;
    }
  }

  /**
   * Инициализация обработчиков событий
   */
  function init() {
    if (!form || !fullnameInput || !phoneInput) {
      console.warn('Элементы формы не найдены');
      return;
    }

    // Добавляем обработчики событий для валидации в реальном времени
    fullnameInput.addEventListener('input', function() {
      validateFullname(this);
    });

    phoneInput.addEventListener('input', function() {
      validatePhone(this);
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      // Проверяем кастомные валидации
      const isFullnameValid = validateFullname(fullnameInput);
      const isPhoneValid = validatePhone(phoneInput);

      // Проверяем все поля формы
      if (form.checkValidity() && isFullnameValid && isPhoneValid) {
        // Форма валидна, можно отправлять
        alert('Форма успешно заполнена!');
        // form.submit(); // Раскомментируйте для реальной отправки
      } else {
        // Показываем ошибки
        form.classList.add('was-validated');
      }
    }, false);
  }

  // Инициализация после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();