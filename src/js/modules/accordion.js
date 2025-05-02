const accordion = triggersSelector => {
  const buttons = document.querySelectorAll(triggersSelector)

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('active-slyle')
      this.nextElementSibling.classList.toggle('active-content')

      if (this.classList.contains('active-slyle')) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'
      } else {
        this.nextElementSibling.style.maxHeight = '0px'
      }
    })
  })

  // Открываем первый элемент по умолчанию
  if (buttons.length > 0) {
    const firstButton = buttons[0]
    const firstContent = firstButton.nextElementSibling

    firstButton.classList.add('active-slyle')
    firstContent.classList.add('active-content')
    firstContent.style.maxHeight = firstContent.scrollHeight + 80 + 'px'
  }
}

export default accordion
