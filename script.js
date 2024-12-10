const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const eraserIcon = document.getElementById('eraser-icon');
const resetButton = document.getElementById('reset-button');

// Dragon image source
const dragonImage = new Image();
dragonImage.src = 'dragon.png'; // Path to the uploaded dragon image

// Function to resize canvas to fit the device screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateDoodles(); // Generate new doodles
    drawDoodles(); // Redraw the doodles to scale with the new resolution
}

// Generate random money phrases in Russian
function generateMoneyPhrase() {
    const ones = [
        "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"
    ];
    const teens = [
        "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать",
        "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"
    ];
    const tens = [
        "", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"
    ];
    const hundreds = [
        "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"
    ];
    const thousands = ["", "тысяча", "тысячи", "тысяч"];
    const millions = ["", "миллион", "миллиона", "миллионов"];
    const rubles = ["рубль", "рубля", "рублей"];

    // Randomize numbers
    const millionPart = Math.floor(Math.random() * 900) + 100; // 100 to 999
    const thousandPart = Math.floor(Math.random() * 900) + 100; // 100 to 999
    const rublePart = Math.floor(Math.random() * 900) + 100; // 100 to 999

    // Helper function to convert three-digit number to words
    function convertToWords(number) {
        const hundred = hundreds[Math.floor(number / 100)];
        const ten = Math.floor((number % 100) / 10);
        const one = number % 10;

        if (ten === 1) {
            return `${hundred} ${teens[one]}`.trim();
        } else {
            return `${hundred} ${tens[ten]} ${ones[one]}`.trim();
        }
    }

    // Generate the money phrase
    const millionWords = `${convertToWords(millionPart)} ${millions[
        millionPart % 10 === 1 && millionPart % 100 !== 11
            ? 1
            : millionPart % 10 >= 2 && millionPart % 10 <= 4 && (millionPart % 100 < 10 || millionPart % 100 >= 20)
            ? 2
            : 3
    ]}`.trim();

    const thousandWords = `${convertToWords(thousandPart)} ${thousands[
        thousandPart % 10 === 1 && thousandPart % 100 !== 11
            ? 1
            : thousandPart % 10 >= 2 && thousandPart % 10 <= 4 && (thousandPart % 100 < 10 || thousandPart % 100 >= 20)
            ? 2
            : 3
    ]}`.trim();

    const rubleWords = `${convertToWords(rublePart)} ${rubles[
        rublePart % 10 === 1 && rublePart % 100 !== 11
            ? 0
            : rublePart % 10 >= 2 && rublePart % 10 <= 4 && (rublePart % 100 < 10 || rublePart % 100 >= 20)
            ? 1
            : 2
    ]}`.trim();

    return `${millionWords} ${thousandWords} ${rubleWords}`.trim();
}

// Generate random doodles with dragons and money phrases
let doodles = [];
function generateDoodles() {
    doodles = [];
    const numDoodles = Math.floor((canvas.width * canvas.height) / 2000); // High density of doodles
    for (let i = 0; i < numDoodles; i++) {
        // Randomize type, reducing money probability
        const randomType = Math.random();
        let type;
        if (randomType < 0.15) { // 15% chance for money phrases
            type = 'money';
        } else {
            type = ['circle', 'line', 'rectangle', 'text', 'dragon'][Math.floor(Math.random() * 5)];
        }

        doodles.push({
            type,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (canvas.width / 100) + 5, // For circles
            length: Math.random() * (canvas.width / 20) + 10, // For lines
            angle: Math.random() * 360, // For lines
            width: Math.random() * (canvas.width / 30) + 5, // For rectangles
            height: Math.random() * (canvas.height / 30) + 5, // For rectangles
            text: type === 'money' ? generateMoneyPhrase() : randomText(), // Add money phrase
            fontSize: type === 'money' ? Math.random() * 15 + 15 : Math.random() * 10 + 10, // Larger font for money phrases
            dragonSize: Math.random() * 50 + 30 // Size for small dragon figurines
        });
    }
    resetButton.style.display = 'none'; // Hide the reset button when generating doodles
}

// Generate random text (e.g., math problems, doodle descriptions)
function randomText() {
    const texts = [
        "Solve: 3x + 5 = 20",
        "Dragon!",
        "2 + 2 = ?",
        "Hello!",
        "Math Time!",
        "Erase Me!",
        "π ≈ 3.14",
        "E = mc²",
        "A+B=C",
        "x² + y² = z²",
        "Fun!",
        "Art",
        "Doodle!",
        "∞"
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Draw the doodles and dragons
function drawDoodles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0077cc';
    ctx.fillStyle = '#0077cc';
    ctx.lineWidth = Math.max(canvas.width / 1000, 0.5); // Scale line width for smaller details

    doodles.forEach((doodle) => {
        if (doodle.type === 'circle') {
            ctx.beginPath();
            ctx.arc(doodle.x, doodle.y, doodle.radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (doodle.type === 'line') {
            const endX = doodle.x + Math.cos((doodle.angle * Math.PI) / 180) * doodle.length;
            const endY = doodle.y + Math.sin((doodle.angle * Math.PI) / 180) * doodle.length;
            ctx.beginPath();
            ctx.moveTo(doodle.x, doodle.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        } else if (doodle.type === 'rectangle') {
            ctx.strokeRect(doodle.x, doodle.y, doodle.width, doodle.height);
        } else if (doodle.type === 'text' || doodle.type === 'money') {
            ctx.font = `${doodle.fontSize}px Arial`;
            ctx.fillText(doodle.text, doodle.x, doodle.y);
        } else if (doodle.type === 'dragon') {
            drawDragon(doodle.x, doodle.y, doodle.dragonSize); // Draw small dragons
        }
    });
    checkForCompletion(); // Check if the user has erased most of the canvas
}

// Draw a small dragon figurine
function drawDragon(x, y, size) {
    ctx.drawImage(dragonImage, x, y, size, size); // Draw the dragon at a small size
}

// Erase functionality
let isErasing = false;

// Common function to erase
function erase(x, y) {
    const eraserSize = Math.max(canvas.width / 50, 30); // Adjust eraser size dynamically
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, eraserSize, 0, Math.PI * 2); // Dynamic eraser size
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    checkForCompletion(); // Check if the user has erased most of the canvas
}

// Check if the canvas has been almost fully erased
function checkForCompletion() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let remainingPixels = 0;
    const totalPixels = pixels.length / 4; // Each pixel has 4 values (R, G, B, A)

    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) { // Check if alpha channel is not fully transparent
            remainingPixels++;
        }
    }

    const remainingPercentage = (remainingPixels / totalPixels) * 100;

    if (remainingPercentage <= 1.5) { // If only 1-1.5% of the content remains
        resetButton.style.display = 'block'; // Show the reset button
    }
}

// Mouse Events
canvas.addEventListener('mousedown', (event) => {
    isErasing = true;
    updateEraserPosition(event.clientX, event.clientY); // Ensure the eraser starts immediately
});
canvas.addEventListener('mouseup', () => (isErasing = false));
canvas.addEventListener('mousemove', (event) => {
    updateEraserPosition(event.clientX, event.clientY);
    if (isErasing) erase(event.clientX, event.clientY);
});

// Touch Events for Mobile
canvas.addEventListener('touchstart', (event) => {
    isErasing = true;
    const touch = event.touches[0];
    updateEraserPosition(touch.clientX, touch.clientY); // Ensure the eraser starts immediately
    erase(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    updateEraserPosition(touch.clientX, touch.clientY);
    if (isErasing) erase(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchend', () => (isErasing = false));

// Update the position of the eraser icon and synchronize with the erasing area
function updateEraserPosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Move eraser icon
    eraserIcon.style.left = `${clientX - eraserIcon.offsetWidth / 2}px`;
    eraserIcon.style.top = `${clientY - eraserIcon.offsetHeight / 2}px`;
    eraserIcon.style.display = 'block';

    // Erase at the center of the eraser icon
    if (isErasing) erase(x, y);
}

// Hide eraser icon when the cursor or touch leaves the canvas
canvas.addEventListener('mouseleave', () => {
    eraserIcon.style.display = 'none';
});
canvas.addEventListener('touchcancel', () => {
    eraserIcon.style.display = 'none';
    isErasing = false});

// Reset the canvas when the reset button is clicked
resetButton.addEventListener('click', () => {
    resizeCanvas();
    generateDoodles();
    drawDoodles();
});

// Initialize canvas and doodles
resizeCanvas();
generateDoodles();
drawDoodles();

// Redraw doodles and resize canvas on window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    generateDoodles(); // Regenerate doodles based on new canvas size
    drawDoodles();
});
