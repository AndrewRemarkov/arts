const filterPortfolio = () => {
  const elements = {
    menu: document.querySelector('.portfolio-menu'),
    wrapper: document.querySelector('.portfolio-wrapper'),
    no: document.querySelector('.portfolio-no'),
    categories: {
      all: document.querySelectorAll('.portfolio-wrapper .all'),
      lovers: document.querySelectorAll('.portfolio-wrapper .lovers'),
      chef: document.querySelectorAll('.portfolio-wrapper .chef'),
      girl: document.querySelectorAll('.portfolio-wrapper .girl'),
      guy: document.querySelectorAll('.portfolio-wrapper .guy')
    }
  }

  const filterImagesByCategory = (category, items) => {
    elements.categories.all.forEach(item => {
      item.style.display = 'none'
      item.classList.remove('animated', 'fadeIn')
    })

    elements.no.style.display = 'none'
    elements.no.classList.remove('animated', 'fadeIn')

    if (category && elements.categories[category]?.length) {
      elements.categories[category].forEach(item => {
        item.style.display = 'block'
        item.classList.add('animated', 'fadeIn')
      })
    } else {
      elements.no.style.display = 'block'
      elements.no.classList.add('animated', 'fadeIn')
    }

    items.forEach(item => item.classList.remove('active'))
    items.find(item => item.classList.contains(category))?.classList.add('active')
  }

  elements.menu?.addEventListener('click', event => {
    const target = event.target.closest('li')
    if (!target) return

    const category = target.className.split(' ').find(cls => cls !== 'active')
    const menuItems = [...elements.menu.querySelectorAll('li')]

    filterImagesByCategory(category, menuItems)
  })
}

export default filterPortfolio
