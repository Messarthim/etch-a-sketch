const defaultSize = 16;
const defaultMode = 'pen';
const defaultColor = '#333333'

let currentSize = defaultSize;
let currentMode = defaultMode;
let currentColor = defaultColor;

const gridContainer = document.getElementById('grid-container');
const sizeSlider = document.getElementById('grid-range');
const sliderValue = document.getElementById('grid-size-value');
const colorPicker = document.getElementById('color-picker');
const btnPen = document.getElementById('btn-color');
const btnEraser = document.getElementById('btn-eraser');
const btnClear = document.getElementById('btn-clear');

colorPicker.onchange = (e) => changeColorValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateValue(e.target.value);
btnPen.onclick = () => setCurrentMode('pen');
btnEraser.onclick = () => setCurrentMode('eraser');
btnClear.onclick = () => reloadGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function updateValue(value) {
    sliderValue.innerHTML = `${value}x${value}`;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function changeSize(value) {
    setCurrentSize(value);
    reloadGrid();
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function changeColorValue(value) {
    setCurrentColor(value);
    console.log(value);
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    makeGrid(currentSize);
}

function makeGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(c = 0; c < (size * size); c++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        gridContainer.appendChild(cell);
    };
};

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return;

    if(currentMode === 'pen') {
        e.target.style.backgroundColor = currentColor;
    } else {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function activateButton(newMode) {
    if(currentMode === 'pen'){
        btnPen.classList.remove('active');
    } else {
        btnEraser.classList.remove('active');
    }
    
    if(newMode === 'pen') {
        btnPen.classList.add('active');
    } else {
        btnEraser.classList.add('active');
    }
}

window.onload = () => {
    makeGrid(defaultSize);
}