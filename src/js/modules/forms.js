import IMask from 'imask'

import { postData } from '../services/requests'

const forms = state => {
  const form = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')
  const upload = document.querySelectorAll('[name="upload"]')
  const nameInputs = document.querySelectorAll('input[name="name"]')
  const phoneInputs = document.querySelectorAll('input[name="phone"]')
  const emailInputs = document.querySelectorAll('input[name="email"]')

  nameInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-яА-Я\s]/g, '')
    })
  })

  phoneInputs.forEach(input => {
    const maskOptions = {
      mask: '+{7} (000) 000-00-00',
      placeholder: { show: 'always' },
      lazy: false
    }
    const phoneMask = IMask(input, maskOptions)

    function validatePhoneNumber() {
      const value = phoneMask.unmaskedValue
      const isValid = value.length === 11 && /^\d{11}$/.test(value)
      const isFocused = document.activeElement === input

      if (isFocused) {
        if (isValid) {
          input.style.cssText = `
				border: 1px solid green;
			  `
        } else {
          input.style.cssText = `
				border: 1px solid red;
			  `
        }
      } else {
        input.style.cssText = `
			  border: none;
			`
      }
    }

    input.addEventListener('input', validatePhoneNumber)

    input.addEventListener('focus', validatePhoneNumber)

    input.addEventListener('blur', validatePhoneNumber)
  })

  emailInputs.forEach(input => {
    input.addEventListener('input', () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,63})$/
      const isValid = emailRegex.test(input.value)

      if (isValid) {
        input.style.cssText = `
					border: 1px solid green;
				`
      } else {
        input.style.cssText = `
					border: 1px solid red;
				`
      }
    })
  })

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  }

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  }

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = ''
    })
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран'
    })
  }

  upload.forEach(item => {
    item.addEventListener('input', () => {
      let dots
      const arr = item.files[0].name.split('.')

      arr[0].length > 6 ? (dots = '...') : (dots = '.')
      const name = arr[0].substring(0, 6) + dots + arr[1]
      item.previousElementSibling.textContent = name
    })
  })

  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault()

      let statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      item.parentNode.appendChild(statusMessage)

      item.classList.add('animated', 'fadeOutUp')
      setTimeout(() => {
        item.style.display = 'none'
      }, 400)

      let statusImg = document.createElement('img')
      statusImg.setAttribute('src', message.spinner)
      statusImg.classList.add('animated', 'fadeInUp')
      statusMessage.appendChild(statusImg)

      let textMessage = document.createElement('div')
      textMessage.textContent = message.loading
      statusMessage.appendChild(textMessage)

      const formData = new FormData(item)

      console.log(formData)

      let API
      item.closest('.popup-design') || item.classList.contains('calc_form') ? (API = path.designer) : (API = path.question)
      console.log(API)

      postData(API, formData)
        .then(res => {
          console.log(res)
          statusImg.setAttribute('src', message.ok)
          textMessage.textContent = message.success
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail)
          textMessage.textContent = message.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessage.remove()
            item.style.display = 'block'
            item.classList.remove('fadeOutUp')
            item.classList.add('fadeInUp')
          }, 5000)
        })
    })
  })
}

export default forms
