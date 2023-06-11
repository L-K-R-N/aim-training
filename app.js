const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('.board');
let timeEl = document.querySelector('#time');
let time = 0;
let timer;
let score = 0;
let colors = ['#F8D438', '#D9350D', '#901AF0', '#0DACD9', '#42FC0F', '#E0D001', '#E18300', '#3EF47B', '#3F6BFE', '#EB6EC9', '#E0A401', '#fff', '#FEF0AC', '#A8F4BD', '#8F54EA'];

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('time-btn')) return;
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up')
    startGame()
})

board.addEventListener('click', (e) => {
    if (!e.target.classList.contains('circle')) return;
    score++;
    e.target.remove()
    createRandomCircle()
})

function startGame() {
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
    score = 0;
    createRandomCircle()
    timer = setInterval(decreaseTime, 1000);
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    let color = getRandomColor();
    let circle = document.createElement('div');

    circle.classList.add('circle');
    circle.style.background = color;
    circle.style.boxShadow = `0 0 4px ${color}, 0 0 17px ${color}`
    // рандомный размер
    let size = getRandomNumber(10, 60);
    // рандомная позиция
    let {width, height} = board.getBoundingClientRect()
    let x = getRandomNumber(0, width - size);
    let y = getRandomNumber(0, height - size);

    function getRandomColor() {
        // return colors[Math.floor(Math.random * (colors.length - 1))]
        let index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = circle.style.height = `${size}px`
    
    board.append(circle)

    
}


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `
    <div>
    <h1>Счет: <span class="primary">${score}</span></h1>
    <a href="#" class="restart" id="restart">Играть снова</a>
    </div>
    `
    document.querySelector('.restart').addEventListener('click', (e) => {
        e.preventDefault()
        screens[1].classList.remove('up')
        console.log(time);
        clearInterval(timer)
        // setTimeout(restartGame, 0)
    })
}

function restartGame() {
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
}