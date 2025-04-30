const modals = () => {
	const bindModal = (
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) => {
		const trigger = document.querySelectorAll(triggerSelector)
		const modal = document.querySelector(modalSelector)
		const close = modal.querySelector(closeSelector)
		const windows = document.querySelectorAll('[data-modal]')
		const scroll = calcScroll()
		trigger.forEach((element) => {
			element.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault()
				}

				if (!localStorage.getItem('modalShown')) {
					localStorage.setItem('modalShown', 'true')
				}

				windows.forEach((item) => {
					item.classList.add('hide')
					item.classList.remove('show')
				})

				modal.classList.add('show')
				document.body.classList.add('modal-open')
				document.body.style.marginRight = `${scroll}px`
			})
		})

		close.addEventListener('click', () => {
			windows.forEach((item) => {
				item.classList.add('hide')
				item.classList.remove('show')
			})

			modal.classList.remove('show')
			modal.classList.add('hide')
			document.body.classList.remove('modal-open')
			document.body.style.marginRight = `0px`
		})

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windows.forEach((item) => {
					item.classList.add('hide')
					item.classList.remove('show')
				})

				modal.classList.remove('show')
				modal.classList.add('hide')
				document.body.classList.remove('modal-open')
				document.body.style.marginRight = `0px`
			}
		})
	}

	const showModalByTime = (selector, time) => {
		if (localStorage.getItem('modalShown')) return

		setTimeout(() => {
			const modal = document.querySelector(selector)
			let display

			if (modal) {
				document.querySelectorAll('[data-modal]').forEach((item) => {
					if (getComputedStyle(item).display !== 'none') {
						display = 'block'
					}
				})

				if (!display) {
					modal.classList.add('show')
					document.body.classList.add('modal-open')
					document.body.style.marginRight = `${scroll}px`

					localStorage.setItem('modalShown', 'true')
				}
			}
		}, time)
	}

	const calcScroll = () => {
		const div = document.createElement('div')

		div.style.cssText = `
            width: 50px;
            height: 50px;
            overflow: scroll;
            visibility: hidden;
        `

		document.body.appendChild(div)

		const scrollBarWidth = div.offsetWidth - div.clientWidth
		div.remove()

		return scrollBarWidth
	}

	bindModal('.button-design', '.popup-design', '.popup-close')
	bindModal('.button-consultation', '.popup-consultation', '.popup-close')
	bindModal('.fixed-gift', '.popup-gift', '.popup-close', false)
	bindModal('.popup-gift', '.popup-gift', '.popup-close', false)

	showModalByTime('.popup-consultation', 50000)
}

export default modals
