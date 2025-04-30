import modal from './modules/modal'
import sliders from './modules/slider'

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	modal()
	sliders(
		'.feedback-slider-item',
		'horizontal',
		'.main-prev-btn',
		'.main-next-btn',
		5000
	)
	sliders('.main-slider-item', 'vertical', '', '', 10000)
})
