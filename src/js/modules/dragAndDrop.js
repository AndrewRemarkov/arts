const dragAndDrop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]')
  const buttonFileUploadElement = document.querySelector('.upload__button')

  const preventdefaults = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const highlight = elem => {
    elem.closest('.file_upload').style.cssText = `
			border: 2px solid #c51abb;
			border-radius: 30px;
			backgrond-color: rgba(0,0,0, .7)
			`
    buttonFileUploadElement.style.border = 'none'
  }

  const unhighlight = elem => {
    elem.closest('.file_upload').style.border = 'none'

    if (elem.closest('.calc_form')) {
      elem.closest('.file_upload').style.backgrandColor = '#FFFFFF'
    } else {
      elem.closest('.file_upload').style.backgrandColor = '#EDEDED'
    }

    buttonFileUploadElement.style.border = '2px dashed #c51abb'
  }

  ;['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventdefaults, false)
    })
  })
  ;['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highlight(input), false)
    })
  })
  ;['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhighlight(input), false)
    })
  })

  fileInputs.forEach(input => {
    input.addEventListener('drop', event => {
      input.files = event.dataTransfer.files
      let dots
      const arr = input.files[0].name.split('.')

      arr[0].length > 6 ? (dots = '...') : (dots = '.')
      const name = arr[0].substring(0, 6) + dots + arr[1]
      input.previousElementSibling.textContent = name
    })
  })
}

export default dragAndDrop
