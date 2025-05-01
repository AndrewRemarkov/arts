import modal from './modules/modal'
import sliders from './modules/slider'
import forms from './modules/forms'
import showMoreStyles from './modules/showMoreStyles'
import calc from './modules/calc'
import filter from './modules/filter'
import pictureHover from './modules/pictureHover'

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
	forms()
	showMoreStyles('.button-styles', '.styles .row', 'assets/db.json')
	calc('#size', '#material', '#options', '.promocode', '.calc-price')
	filter()
	pictureHover('.sizes-block')
})
