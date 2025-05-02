const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector)
  const burgerElem = document.querySelector(burgerSelector)

  const isMobile = () => window.innerWidth < 993

  const hideMenu = () => (menuElem.style.display = 'none')
  const showMenu = () => (menuElem.style.display = 'block')

  hideMenu()

  burgerElem.addEventListener('click', () => {
    if (isMobile()) {
      const isHidden = getComputedStyle(menuElem).display === 'none'
      isHidden ? showMenu() : hideMenu()
    }
  })

  window.addEventListener('resize', () => {
    if (!isMobile()) hideMenu()
  })
}

export default burger
