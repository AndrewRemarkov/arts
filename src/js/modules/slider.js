const sliders = (slides, direction, prev, next, timer) => {
  let slideIndex = 1
  let pause = false
  const items = document.querySelectorAll(slides)

  const showSlides = n => {
    slideIndex = n > items.length ? 1 : n < 1 ? items.length : n
    items.forEach(item => {
      item.classList.add('animated')
      item.style.display = 'none'
    })
    items[slideIndex - 1].style.display = 'block'
  }

  const plusSlides = (n, animationClass) => {
    showSlides((slideIndex += n))
    const currentSlide = items[slideIndex - 1]
    currentSlide.classList.remove('slideInLeft', 'slideInRight', 'slideInDown')
    currentSlide.classList.add(animationClass)
  }

  showSlides(slideIndex)

  if (prev || next) {
    const prevButton = prev ? document.querySelector(prev) : null
    const nextButton = next ? document.querySelector(next) : null

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        plusSlides(-1, 'slideInLeft')
      })
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        plusSlides(1, 'slideInRight')
      })
    }
  }

  const activateAnimation = () => {
    clearInterval(pause)
    const animationClass = direction === 'vertical' ? 'slideInDown' : 'slideInRight'

    pause = setInterval(() => {
      plusSlides(1, animationClass)
    }, timer)
  }

  const sliderContainer = items[0]?.parentNode
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(pause))
    sliderContainer.addEventListener('mouseleave', activateAnimation)
  }

  if (timer) {
    activateAnimation()
  }
}

export default sliders
