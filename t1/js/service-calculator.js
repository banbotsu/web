/**
 * Модуль калькулятора стоимости услуги
 * Динамически изменяет форму в зависимости от выбранного типа услуги
 */
(function() {
  'use strict';

  const quantityInput = document.getElementById('serviceQuantity');
  const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
  const optionsBlock = document.getElementById('optionsBlock');
  const propertyBlock = document.getElementById('propertyBlock');
  const serviceOptions = document.getElementById('serviceOptions');
  const serviceProperty = document.getElementById('serviceProperty');
  const totalPriceSpan = document.getElementById('serviceTotalPrice');
  const priceBreakdownSpan = document.getElementById('priceBreakdown');

  /**
   * Получает текущий выбранный тип услуги
   * @returns {string} - значение выбранной радиокнопки
   */
  function getSelectedServiceType() {
    const selectedRadio = document.querySelector('input[name="serviceType"]:checked');
    return selectedRadio ? selectedRadio.value : 'type1';
  }

  /**
   * Получает базовую цену выбранного типа услуги
   * @returns {number} - базовая цена
   */
  function getBasePrice() {
    const selectedRadio = document.querySelector('input[name="serviceType"]:checked');
    return selectedRadio ? parseFloat(selectedRadio.dataset.price) : 0;
  }

  /**
   * Показывает или скрывает блоки опций и свойств в зависимости от типа услуги
   */
  function toggleOptionsAndProperties() {
    const serviceType = getSelectedServiceType();

    optionsBlock.classList.add('d-none');
    propertyBlock.classList.add('d-none');

    serviceOptions.value = '0';
    serviceProperty.checked = false;

    switch(serviceType) {
      case 'type1':
        break;
      case 'type2':
        optionsBlock.classList.remove('d-none');
        break;
      case 'type3':
        propertyBlock.classList.remove('d-none');
        break;
    }

    calculateServiceTotal();
  }

  /**
   * Рассчитывает и отображает итоговую стоимость услуги
   */
  function calculateServiceTotal() {
    const basePrice = getBasePrice();

    const quantity = parseInt(quantityInput.value) || 1;

    let optionPrice = 0;
    if (!optionsBlock.classList.contains('d-none')) {
      optionPrice = parseFloat(serviceOptions.value) || 0;
    }

    let propertyPrice = 0;
    if (!propertyBlock.classList.contains('d-none') && serviceProperty.checked) {
      propertyPrice = parseFloat(serviceProperty.value) || 0;
    }

    const pricePerUnit = basePrice + optionPrice + propertyPrice;
    const totalPrice = pricePerUnit * quantity;

    const formattedTotal = totalPrice.toLocaleString('ru-RU');
    totalPriceSpan.textContent = formattedTotal + ' ₽';

    let breakdown = `Базовая цена: ${basePrice.toLocaleString('ru-RU')} ₽`;

    if (optionPrice > 0) {
      breakdown += ` + ${optionPrice.toLocaleString('ru-RU')} ₽ (опция)`;
    }

    if (propertyPrice > 0) {
      breakdown += ` + ${propertyPrice.toLocaleString('ru-RU')} ₽ (экспресс)`;
    }

    breakdown += ` × ${quantity} = ${formattedTotal} ₽`;

    priceBreakdownSpan.textContent = breakdown;
  }

  /**
   * Инициализация обработчиков событий
   */
  function init() {
    if (!quantityInput || !serviceTypeRadios.length || !totalPriceSpan) {
      console.warn('Элементы калькулятора услуг не найдены');
      return;
    }

    serviceTypeRadios.forEach(radio => {
      radio.addEventListener('change', toggleOptionsAndProperties);
    });

    quantityInput.addEventListener('input', calculateServiceTotal);

    if (serviceOptions) {
      serviceOptions.addEventListener('change', calculateServiceTotal);
    }

    if (serviceProperty) {
      serviceProperty.addEventListener('change', calculateServiceTotal);
    }

    toggleOptionsAndProperties();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();