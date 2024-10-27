const cat1 = document.getElementById("cat1");
const cat2 = document.getElementById("cat2");
const winnerDisplay = document.getElementById("winner");

let cat1Health = 100;
let cat2Health = 100;

// Movimiento y ataques de los gatos
document.addEventListener("keydown", (event) => {
    // Movimientos y ataques de Cat 1
    if (event.key === "a") moveCat(cat1, -10); // Izquierda
    if (event.key === "d") moveCat(cat1, 10); // Derecha
    if (event.key === "w") attack(cat1, cat2);

    // Movimientos y ataques de Cat 2
    if (event.key === "ArrowLeft") moveCat(cat2, -10); // Izquierda
    if (event.key === "ArrowRight") moveCat(cat2, 10); // Derecha
    if (event.key === "ArrowUp") attack(cat2, cat1);

    checkWinner();
});

// Mover el gato
function moveCat(cat, distance) {
    const currentPosition = parseInt(window.getComputedStyle(cat).left);
    cat.style.left = `${currentPosition + distance}px`;
}

// Función de ataque
function attack(attacker, defender) {
    const attackerPosition = attacker.getBoundingClientRect();
    const defenderPosition = defender.getBoundingClientRect();

    if (
        Math.abs(attackerPosition.left - defenderPosition.left) < 60 &&
        Math.abs(attackerPosition.top - defenderPosition.top) < 60
    ) {
        if (defender === cat1) cat1Health -= 10;
        if (defender === cat2) cat2Health -= 10;
    }
}

// Comprobar el ganador
function checkWinner() {
    if (cat1Health <= 0) declareWinner("¡Gato Azul Gana!");
    if (cat2Health <= 0) declareWinner("¡Gato Rojo Gana!");
}

function declareWinner(message) {
    winnerDisplay.innerText = message;
    winnerDisplay.classList.remove("hidden");
    document.removeEventListener("keydown", handleKeydown);
}
