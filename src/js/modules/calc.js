const calc = (size, material, options, promocode, result) => {
  const sizeElement = document.querySelector(size);
  const materialElement = document.querySelector(material);
  const optionsElement = document.querySelector(options);
  const promocodeElement = document.querySelector(promocode);
  const resultElement = document.querySelector(result);

  if (!sizeElement || !materialElement || !optionsElement || !promocodeElement || !resultElement) {
    console.error('Один или несколько элементов формы не найдены');
    return;
  }

  const calcFunc = () => {
    const selectedSizeOption = sizeElement.selectedIndex !== -1 ? sizeElement.options[sizeElement.selectedIndex] : null;
    const selectedMaterialOption = materialElement.selectedIndex !== -1 ? materialElement.options[materialElement.selectedIndex] : null;
    const selectedServicesOption = optionsElement.selectedIndex !== -1 ? optionsElement.options[optionsElement.selectedIndex] : null;

    const sizePriceRaw = selectedSizeOption?.dataset.sizePrice || '';
    const materialPriceRaw = selectedMaterialOption?.dataset.materialPrice || '';
    const servicesPriceRaw = selectedServicesOption?.dataset.servicesPrice || '0';

    const sizePrice = Number(sizePriceRaw);
    const materialPrice = Number(materialPriceRaw);
    const servicesPrice = Number(servicesPriceRaw);

    const isSizeValid = sizePriceRaw !== '' && !isNaN(sizePrice) && sizePrice > 0;
    const isMaterialValid = materialPriceRaw !== '' && !isNaN(materialPrice) && materialPrice > 0;

    if (!isSizeValid || !isMaterialValid) {
      resultElement.textContent = 'Пожалуйста, выберите размер и материал';
      return;
    }

    const sum = Math.round(sizePrice * materialPrice + servicesPrice);

    if (promocodeElement.value === 'IWANTPOPART') {
      resultElement.textContent = Math.round(sum * 0.7);
    } else {
      resultElement.textContent = sum;
    }
  };

  sizeElement.addEventListener('change', calcFunc);
  materialElement.addEventListener('change', calcFunc);
  optionsElement.addEventListener('change', calcFunc);
  promocodeElement.addEventListener('input', calcFunc);

  calcFunc();
};

export default calc;
