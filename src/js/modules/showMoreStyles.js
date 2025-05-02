import { getResource } from '../services/requests'

const showMoreStyles = (trigger, wrapper, request) => {
  const btn = document.querySelector(trigger)

  const createCards = response => {
    response.forEach(({ src, title, link }) => {
      let card = document.createElement('div')
      card.classList.add('animated', 'fadeInUp')
      card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
      card.innerHTML = `
				<div class="styles-block">
					<img src=${src} alt="style">
					<h4>${title}</h4>
					<a href="${link}" class="btn btn-default">Подробнее</a>
				</div>
			`
      document.querySelector(wrapper).appendChild(card)
    })
  }

  btn.addEventListener('click', () =>
    getResource(request)
      .then(res => createCards(res.styles))
      .then(() => {
        btn.remove()
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  )
}

export default showMoreStyles
