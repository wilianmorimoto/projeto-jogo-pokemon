const body = document.querySelector('body')
const game = document.querySelector('.game')

const audio = document.querySelector('audio')
audio.volume = 0.1

const musicControl = document.querySelector('.music-control')
musicControl.addEventListener('click', (event) => {
  event.stopPropagation()

  event.target.src = `${event.target.src}`.includes('on.png')
    ? './assets/icons/off.png'
    : './assets/icons/on.png'
  ;`${event.target.src}`.includes('on.png') ? audio.play() : audio.pause()
})

const count = document.querySelector('h1')
const reset = document.querySelector('.reset')

function clearAndFinish() {
  ash.style.display = 'none'
  pikachu.style.display = 'none'
  charmander.style.display = 'none'
  zubat.style.display = 'none'

  reset.style.display = 'block'
  count.textContent = ''
}

reset.addEventListener('click', () => {
  window.location.reload()
  reset.style.display = 'none'
})

function finishGame() {
  if (findCharmander && findPikachu && findZubat) {
    clearAndFinish()

    game.style.backgroundImage = 'url(./assets/winner.jpg'

    clearInterval(interval)
    clearTimeout(timeout)

    audio.pause()

    return
  }
}

let currentCount = 30
const interval = setInterval(() => {
  if (currentCount <= 0) {
    game.style.backgroundImage = 'url(./assets/game-over.jpg)'
    clearAndFinish()
    clearInterval(interval)
    return
  }

  currentCount--
  count.textContent = currentCount
}, 1000)

const ash = document.querySelector('#ash')

const charmander = document.querySelector('#charmander')
const pikachu = document.querySelector('#pikachu')
const zubat = document.querySelector('#zubat')

let findCharmander = false
let findPikachu = false
let findZubat = false

function getRightPosition() {
  return parseInt(ash.style.right.split('px')) || 2
}

function getTopPosition() {
  return parseInt(ash.style.top.split('px')) || 2
}

function verifyLookPokemon(to) {
  finishGame()

  const pokemonRightPosition =
    to === 'ArrowLeft'
      ? `${getRightPosition() - 64}px`
      : `${getRightPosition() + 64}px`

  if (findCharmander) {
    const newTopPosition =
      to === 'ArrowUp'
        ? `${getTopPosition() + 8}px`
        : `${getTopPosition() - 8}px`

    charmander.style.right = pokemonRightPosition
    charmander.style.top = newTopPosition
  }

  if (findPikachu) {
    const newTopPosition =
      to === 'ArrowUp'
        ? `${getTopPosition() + 64}px`
        : `${getTopPosition() - 82}px`

    pikachu.style.right = pokemonRightPosition
    pikachu.style.top = newTopPosition
  }

  if (findZubat) {
    const newTopPosition =
      to === 'ArrowUp'
        ? `${getTopPosition() + 132}px`
        : `${getTopPosition() - 124}px`

    zubat.style.right = pokemonRightPosition
    zubat.style.top = newTopPosition
  }

  if (
    getTopPosition() >= 2 &&
    getTopPosition() <= 98 &&
    getRightPosition() >= 130 &&
    getRightPosition() <= 216
  ) {
    charmander.style.display = 'block'
    findCharmander = true
    return
  }

  if (
    getTopPosition() >= 474 &&
    getTopPosition() <= 594 &&
    getRightPosition() <= 138 &&
    getRightPosition() >= 42
  ) {
    zubat.style.display = 'block'
    findZubat = true
    return
  }

  if (
    getTopPosition() >= 266 &&
    getTopPosition() <= 394 &&
    getRightPosition() >= 546 &&
    getRightPosition() <= 650
  ) {
    pikachu.style.display = 'block'
    findPikachu = true
    return
  }

  finishGame()
}

body.addEventListener('keydown', (event) => {
  event.stopPropagation()

  switch (event.code) {
    case 'ArrowLeft':
      if (getRightPosition() < 770) {
        ash.src = 'assets/left.png'
        ash.style.right = `${getRightPosition() + 8}px`
      }
      break

    case 'ArrowRight':
      if (getRightPosition() > 2) {
        ash.src = 'assets/right.png'
        ash.style.right = `${getRightPosition() - 8}px`
      }
      break

    case 'ArrowUp':
      if (getTopPosition() > 2) {
        ash.src = 'assets/back.png'
        ash.style.top = `${getTopPosition() - 8}px`
      }
      break

    case 'ArrowDown':
      if (getTopPosition() < 625) {
        ash.src = 'assets/front.png'
        ash.style.top = `${getTopPosition() + 8}px`
      }
      break

    default:
      break
  }

  verifyLookPokemon(event.code)
})
