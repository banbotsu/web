/**
 * Модуль калькулятора стоимости заказа
 */
(function() {
  'use strict';

  const calculateBtn = document.getElementById('calculateBtn');
  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const resultDiv = document.getElementById('result');
  const totalPriceSpan = document.getElementById('totalPrice');

  /**
   * Функция расчета стоимости заказа
   */
  function calculateTotal() {
    const productPrice = parseFloat(productSelect.value);
    const quantity = parseInt(quantityInput.value);

    // Проверяем, выбран ли товар и введено ли количество
    if (!productPrice || !quantity || quantity < 1) {
      alert('Пожалуйста, выберите товар и укажите корректное количество.');
      resultDiv.classList.add('d-none');
      return;
    }

    // Рассчитываем общую стоимость
    const total = productPrice * quantity;

    // Форматируем число с разделителями тысяч
    const formattedTotal = total.toLocaleString('ru-RU');

    // Отображаем результат
    totalPriceSpan.textContent = formattedTotal + ' ₽';
    resultDiv.classList.remove('d-none');

    // Плавная прокрутка к результату
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Скрывает блок с результатом
   */
  function hideResult() {
    resultDiv.classList.add('d-none');
  }

  /**
   * Обработчик нажатия клавиши Enter в поле количества
   * @param {KeyboardEvent} event
   */
  function handleQuantityKeypress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      calculateTotal();
    }
  }

  /**
   * Инициализация обработчиков событий
   */
  function init() {
    if (!calculateBtn || !productSelect || !quantityInput || !resultDiv || !totalPriceSpan) {
      console.warn('Элементы калькулятора не найдены');
      return;
    }

    // Обработчик нажатия на кнопку расчета
    calculateBtn.addEventListener('click', calculateTotal);

    // Расчет при нажатии Enter в поле количества
    quantityInput.addEventListener('keypress', handleQuantityKeypress);

    // Скрываем результат при изменении товара или количества
    productSelect.addEventListener('change', hideResult);
    quantityInput.addEventListener('input', hideResult);
  }

  // Инициализация после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();