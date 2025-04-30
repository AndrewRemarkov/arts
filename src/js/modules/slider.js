const sliders = (slides, direction, prev, next, timer) => {
	let slideIndex = 1
	let pause = false

	const items = document.querySelectorAll(slides)

	const showSlides = (n) => {
		if (n > items.length) {
			slideIndex = 1
		}
		if (n < 1) {
			slideIndex = items.length
		}
		items.forEach((item) => {
			item.classList.add('animated')
			item.style.display = 'none'
		})
		items[slideIndex - 1].style.display = 'block'
	}

	showSlides(slideIndex)

	const plusSlides = (n) => {
		showSlides((slideIndex += n))
	}

	try {
		const previousButton = document.querySelector(prev)
		const nextButton = document.querySelector(next)

		previousButton.addEventListener('click', () => {
			plusSlides(-1)
			items[slideIndex - 1].classList.remove('slideInRight')
			items[slideIndex - 1].classList.add('slideInLeft')
		})

		nextButton.addEventListener('click', () => {
			plusSlides(1)
			items[slideIndex - 1].classList.remove('slideInLeft')
			items[slideIndex - 1].classList.add('slideInRight')
		})
	} catch (error) {
		console.error('Error in slider module:', error)
	}

	const activateAnimation = () => {
		if (direction === 'vertical') {
			pause = setInterval(() => {
				plusSlides(1)
				items[slideIndex - 1].classList.add('slideInDown')
			}, timer)
		} else {
			pause = setInterval(() => {
				plusSlides(1)
				items[slideIndex - 1].classList.remove('slideInLeft')
				items[slideIndex - 1].classList.add('slideInRight')
			}, timer)
		}
	}

	items[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(pause)
	})
	items[0].parentNode.addEventListener('mouseleave', () => {
		activateAnimation()
	})
}

export default sliders
