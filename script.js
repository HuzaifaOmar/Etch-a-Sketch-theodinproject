let isRandomMode = true;
let currentColor = "#000000";
let currentMode = "pen";
let hasBorder = true;
const initialOpacity = 0.2;

const container = document.querySelector("#grid-container");
const colorPickerButton = document.getElementById("color-picker-button");
const colorPicker = document.getElementById("color-picker");
const randomButton = document.getElementById("random-mode-button");
const clearButton = document.getElementById("clear-button");
const resizeButton = document.getElementById("resize-button");
const borderButton = document.getElementById("border-button");
const modeButton = document.getElementById("mode-button");
const modeText = document.querySelector("h2");

// Initial setup
modeText.textContent = `Pen Mode`;
modeButton.textContent = `Erase Mode`;

const createCell = (size) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.flex = `1 0 ${100 / size}%`; // Flex property for responsiveness
  cell.style.height = "100%"; // Full height for the cell
  cell.style.backgroundColor = "white"; // Initial background color
  cell.style.opacity = initialOpacity; // Initial opacity

  // Add event listeners for color change on mouse events
  cell.addEventListener("mousedown", () => changeColor(cell));
  cell.addEventListener("mouseover", (event) => {
    if (event.buttons === 1) changeColor(cell); // Change color if mouse is pressed
  });

  return cell;
};

const createGrid = (size) => {
  container.innerHTML = ""; // Clear existing grid

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.display = "flex"; // Use Flexbox for row layout

    for (let j = 0; j < size; j++) {
      const cell = createCell(size); // Create each cell
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
};

const changeColor = (cell) => {
  if (currentMode === "erase") {
    cell.style.opacity = `${Math.max(
      0.0,
      parseFloat(cell.style.opacity) - 0.2
    )}`; // Decrease opacity for erasing
    if (parseFloat(cell.style.opacity) == 0.0) {
      cell.style.backgroundColor = "white";
      cell.style.opacity = initialOpacity;
    }
  } else {
    cell.style.opacity = `${Math.min(
      1.0,
      parseFloat(cell.style.opacity) + 0.2
    )}`; // Increase opacity

    // Set the background color based on the mode
    if (isRandomMode) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      cell.style.backgroundColor = `#${randomColor}`; // Random color
    } else {
      cell.style.backgroundColor = currentColor; // Current selected color
    }
  }
};

const setupEventListeners = () => {
  colorPickerButton.addEventListener("click", () => {
    colorPicker.click(); // Trigger hidden color picker
    isRandomMode = false; // Switch to color mode
  });

  colorPicker.addEventListener("input", (event) => {
    currentColor = event.target.value; // Update current color
  });

  randomButton.addEventListener("click", () => {
    isRandomMode = true; // Switch to random color mode
  });

  clearButton.addEventListener("click", clearGrid); // Clear grid action

  resizeButton.addEventListener("click", resizeGrid); // Resize grid action

  borderButton.addEventListener("click", toggleBorder); // Toggle border action

  modeButton.addEventListener("click", toggleMode); // Toggle mode action
};

const clearGrid = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white"; // Reset background color
    cell.style.opacity = initialOpacity; // Reset opacity
  });
};

const resizeGrid = () => {
  const newSize = parseInt(prompt("Enter new grid size (max 100):"));
  if (newSize > 100) {
    alert("Grid size cannot be greater than 100");
    return;
  }
  if (!isNaN(newSize) && newSize > 0) {
    createGrid(newSize); // Create new grid with the specified size
  }
};

const toggleBorder = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.border = (hasBorder ? "1" : "0") + "px solid black"; // Toggle border style
  });
  hasBorder = !hasBorder; // Switch border state
};

// Toggle between pen and erase modes
const toggleMode = () => {
  currentMode = currentMode === "pen" ? "erase" : "pen"; // Switch mode
  modeText.textContent = `${
    currentMode.charAt(0).toUpperCase() + currentMode.slice(1)
  } Mode`; // Update mode text
  modeButton.textContent = currentMode === "pen" ? "Erase Mode" : "Pen Mode"; // Update button text
};

createGrid(16);
setupEventListeners();
