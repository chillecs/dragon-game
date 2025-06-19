const dragons = [
    {
        name: "Chaos Dragon",
        image: "chaos.webp",
        element: "chaos",
        attack: 32,
        health: 140,
        veteran: false
    },
    {
        name: "Dark Dragon",
        image: "dark.webp",
        element: "dark",
        attack: 30,
        health: 145,
        veteran: false
    },
    {
        name: "Electric Dragon",
        image: "electric.webp",
        element: "electric",
        attack: 35,
        health: 130,
        veteran: false
    },
    {
        name: "Forest Dragon",
        image: "forest.webp",
        element: "forest",
        attack: 28,
        health: 135,
        veteran: false
    },
    {
        name: "Ice Dragon",
        image: "ice.webp",
        element: "ice",
        attack: 27,
        health: 125,
        veteran: false
    },
    {
        name: "Happy Dragon",
        image: "happy.webp",
        element: "happy",
        attack: 25,
        health: 150,
        veteran: false
    },
    {
        name: "Magic Dragon",
        image: "magic.webp",
        element: "magic",
        attack: 34,
        health: 135,
        veteran: false
    },
    {
        name: "Wind Dragon",
        image: "wind.webp",
        element: "wind",
        attack: 31,
        health: 130,
        veteran: false
    },
    {
        name: "Sea Dragon",
        image: "sea.webp",
        element: "water",
        attack: 29,
        health: 140,
        veteran: false
    },
    {
        name: "Soul Dragon",
        image: "soul.webp",
        element: "soul",
        attack: 35,
        health: 120,
        veteran: false
    }
]
console.log(dragons);

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const images = document.querySelectorAll('#images img');
const selectButton = document.getElementById('select-button');
const selectedDragon = document.getElementById('selectedDragonText');
const dragonName = document.getElementById('dragon-name');
const dragonAttack = document.getElementById('attack');
const dragonHealth = document.getElementById('health');
const resetButton = document.getElementById('reset-selection');
const beginBtn = document.getElementById('begin-battle');
const instructionText = document.getElementsByClassName('instruction-text')[0];
const container = document.getElementsByClassName('container-parent')[0];
const battleContainer = document.getElementsByClassName('battle-container')[0];
const dragonBattleImage1 = document.getElementById('dragon-image1');
const dragonBattleImage2 = document.getElementById('dragon-image2');
const attackBonusText = document.getElementById('attack-bonus');
const dragonNameText1 = document.getElementById('dragon-name1');
const dragonNameText2 = document.getElementById('dragon-name2');
const healthDragon1 = document.getElementById('health1');
const healthDragon2 = document.getElementById('health2');
const attackDragon1 = document.getElementById('attack1');
const attackDragon2 = document.getElementById('attack2');
const attackBtn1 = document.getElementById('attackbtn1');
const attackBtn2 = document.getElementById('attackbtn2');
const dragonTurn = document.getElementById('dragon-turn');
const winnerMsg = document.getElementById('winner-message');
const winnerImg = document.getElementById('winner-image');
const battleResult = document.getElementById('battle-log');
const backBtn = document.getElementById('back-to-selection');
const battleLog = document.getElementById('battle-log');
// ---
const bonusDamageChaos = document.getElementById('bonus-damage-chaos');
const bonusDamageDark = document.getElementById('bonus-damage-dark');
const bonusDamageElectric = document.getElementById('bonus-damage-electric');
const bonusDamageForest = document.getElementById('bonus-damage-forest');
const bonusDamageHappy = document.getElementById('bonus-damage-happy');
const bonusDamageIce = document.getElementById('bonus-damage-ice');
const bonusDamageMagic = document.getElementById('bonus-damage-magic');
const bonusDamageWind = document.getElementById('bonus-damage-wind');
const bonusDamageWater = document.getElementById('bonus-damage-water');
const bonusDamageSoul = document.getElementById('bonus-damage-soul');
// ---

let currentDragonIndex = -1;
let currentDragonsSelected = [];
let currentTurn = 1; // 1 for dragon1, 2 for dragon2

const dragonImages = dragons.map(img => img.image);

function openModal(index) {
    currentDragonIndex = index;
    const dragon = dragons[index];
    dragonName.textContent = `ELEMENT: ${dragon.element.toUpperCase()}`;
    dragonAttack.textContent = dragon.attack;
    dragonHealth.textContent = dragon.health;
    modal.style.display = "block";
}

// Close modal when clicking (x)
function closeModal(btn) {
    btn.style.display = "none";
}
span.onclick = function() {
    closeModal(modal);
}

images.forEach((img, index) => {
    img.onclick = () => {
        openModal(index);
    };
});

// if veteran = true, add 5% more damage to attack
function VeteranBonus() {
    return dragons.map(dragon => {
        if (dragon.veteran) {
            dragon.attack = Math.floor(dragon.attack * 1.05);
        }
        return dragon;
    });
}

// Select button click event
selectButton.addEventListener('click', () => {
    if (currentDragonIndex !== -1) {
        const dragon = dragons[currentDragonIndex];
    
        // Add to selected dragons array
        currentDragonsSelected.push(dragon);
        selectedDragon.textContent = `Selected Dragons: ${currentDragonsSelected.map(d => d.name).join(" & ")}`;
        selectedDragon.style.display = 'block';
        modal.style.display = 'none';
        
        // Store selected dragons in localStorage
        localStorage.setItem('selectedDragons', JSON.stringify(currentDragonsSelected));
        
        // Make selected dragon greyed out
        const selectedImage = images[currentDragonIndex];
        selectedImage.style.opacity = '0.5';
        selectedImage.style.filter = 'grayscale(50%)';
        selectedImage.onclick = null;
        resetButton.style.display = 'block';
        resetButton.style.marginLeft = '10px';
        resetButton.textContent = 'Reset Selection';

        if (currentDragonsSelected.length >= 2) {
            instructionText.textContent = 'Click "Begin Battle" to start!';
            beginBtn.textContent = 'Begin Battle';
            beginBtn.style.display = 'block';
            images.forEach(img => {
                img.style.pointerEvents = 'none'; // Disable clicks on images
            });
        }
        resetButton.addEventListener('click', () => {
        images.forEach((img, index) => {
            img.style.opacity = '1';
            img.style.filter = 'grayscale(0%)';
            img.style.pointerEvents = 'auto'; // Enable clicks on images
            img.onclick = () => openModal(index);
        });
        instructionText.textContent = 'Please choose 2 dragons to start the Battle';
        beginBtn.style.display = 'none';
        resetButton.style.display = 'none';
        selectedDragon.style.display = 'none';
        currentDragonsSelected = [];
        currentDragonIndex = -1;
        
        // Clear selected dragons from localStorage when reset
        localStorage.removeItem('selectedDragons');
    })
}});

// Power Modal Functions
function openPowerModal() {
    document.getElementById('powerModal').style.display = 'block';
}

function closePowerModal() {
    document.getElementById('powerModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    const powerModal = document.getElementById('powerModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === powerModal) {
        powerModal.style.display = 'none';
    }
}

function loadDragons() {
    // Load dragons from localStorage or API
    const storedDragons = localStorage.getItem('selectedDragons');
    if (storedDragons) {
        const selectedDragons = JSON.parse(storedDragons);
        console.log('Loaded dragons from localStorage:', selectedDragons);
    }
}

beginBtn.addEventListener('click', () => {
    // Get selected dragons from localStorage
    const storedDragons = localStorage.getItem('selectedDragons');
    const selectedDragons = JSON.parse(storedDragons);
    if (storedDragons) {
        console.log('Battle starting with dragons:', selectedDragons);
    }
    //Hide everything else and show battle container
    container.style.display = 'none';
    document.body.style.backgroundImage = "url('battle-arena.webp')";
    battleContainer.style.display = 'flex';
    dragonBattleImage1.src = selectedDragons[0].image;
    dragonBattleImage2.src = selectedDragons[1].image;
    dragonNameText1.textContent = selectedDragons[0].name;
    dragonNameText2.textContent = selectedDragons[1].name;
    healthDragon1.textContent = selectedDragons[0].health;
    healthDragon2.textContent = selectedDragons[1].health;

    // Show only the total damage in the attack box
    attackDragon1.textContent = calculateDragonDamage(selectedDragons[0]);
    attackDragon2.textContent = calculateDragonDamage(selectedDragons[1]);

    dragonTurn.textContent = `${selectedDragons[0].name} attacks first!`;

    // Set turn to dragon 1 and update buttons
    currentTurn = 1;
    attackBtn1.disabled = false;
    attackBtn2.disabled = true;
    attackBtn1.classList.remove('disabled');
    attackBtn2.classList.add('disabled');
});

// End the game and disable both buttons
function endBattle() {
    attackBtn1.disabled = true;
    attackBtn2.disabled = true;
    attackBtn1.classList.add('disabled');
    attackBtn2.classList.add('disabled');
    dragonTurn.style.display = 'none'
}

function showBattleLog(winnerDragon) {
    winnerImg.src = winnerDragon.image;
    winnerImg.alt = winnerDragon.name + ' wins!';
    winnerMsg.textContent = `${winnerDragon.name} wins the battle!`;
    battleLog.classList.add('active');
    backBtn.onclick = () => {
        battleLog.classList.remove('active');
        localStorage.removeItem('selectedDragons');
        window.location.reload();
    };
}

function getRandomPercentage() {
    // Returns a value between 25 and 50 (percent)
    return parseFloat((Math.random() * (50 - 25) + 25).toFixed(1));
}

// show bonus damage
const bonus = getRandomPercentage();

// To use as a multiplier in damage calculation:
const multiplier = 1 + (bonus / 100);

const elementBonus = {
    chaos: getRandomPercentage(),
    dark: getRandomPercentage(),
    electric: getRandomPercentage(),
    forest: getRandomPercentage(),
    happy: getRandomPercentage(),
    ice: getRandomPercentage(),
    magic: getRandomPercentage(),
    wind: getRandomPercentage(),
    water: getRandomPercentage(),
    soul: getRandomPercentage()
};

// ---
bonusDamageChaos.textContent = `Bonus Damage: ${elementBonus.chaos}%`;
bonusDamageDark.textContent = `Bonus Damage: ${elementBonus.dark}%`;
bonusDamageElectric.textContent = `Bonus Damage: ${elementBonus.electric}%`;
bonusDamageForest.textContent = `Bonus Damage: ${elementBonus.forest}%`;
bonusDamageHappy.textContent = `Bonus Damage: ${elementBonus.happy}%`;
bonusDamageIce.textContent = `Bonus Damage: ${elementBonus.ice}%`;
bonusDamageMagic.textContent = `Bonus Damage: ${elementBonus.magic}%`;
bonusDamageWind.textContent = `Bonus Damage: ${elementBonus.wind}%`;
bonusDamageWater.textContent = `Bonus Damage: ${elementBonus.water}%`;
bonusDamageSoul.textContent = `Bonus Damage: ${elementBonus.soul}%`;
// ---

const elementWeakness = {
    chaos: ['dark', 'magic'],
    dark: ['electric', 'happy'],
    electric: ['forest', 'wind'],
    forest: ['ice', 'water'],
    happy: ['soul', 'chaos'],
    ice: ['magic', 'dark'],
    magic: ['wind', 'happy'],
    wind: ['water', 'electric'],
    water: ['soul', 'forest'],
    soul: ['chaos', 'ice']
};

function calculateDragonDamage(dragon) {
    let damage = dragon.attack;
    if (dragon.veteran) {
        damage *= 1.05;
    }
    const bonus = elementBonus[dragon.element];
    damage *= (1 + (bonus / 100));
    return Math.floor(damage);
}

// Attack button click event
attackBtn2.addEventListener('click', () => {
    if (attackBtn2.disabled) return;
    const selectedDragons = JSON.parse(localStorage.getItem('selectedDragons'));
    const dragon1 = selectedDragons[0];
    const dragon2 = selectedDragons[1];
    const damage = calculateDragonDamage(dragon2);
    healthDragon1.textContent = Math.max(0, healthDragon1.textContent - damage);
    dragonTurn.textContent = `${dragon2.name} attacks ${dragon1.name} for ${damage} damage! It's time for ${dragon1.name} to attack back!`;
    const currentHealth1 = parseInt(healthDragon1.textContent);
    if (currentHealth1 === 0) {
        dragonTurn.textContent = `${dragon1.name} has been defeated!`;
        // Store veteran status in localStorage
        const selectedDragons = JSON.parse(localStorage.getItem('selectedDragons'));
        selectedDragons[0].veteran = true;
        selectedDragons[1].veteran = false; // Reset veteran status for the defeated dragon
        localStorage.setItem('selectedDragons', JSON.stringify(selectedDragons));
        showBattleLog(dragon2);
        endBattle();
        return;
    }
    // Switch turn to dragon 1
    currentTurn = 1;
    attackBtn1.disabled = false;
    attackBtn2.disabled = true;
    attackBtn1.classList.remove('disabled');
    attackBtn2.classList.add('disabled');
});

attackBtn1.addEventListener('click', () => {
    if (attackBtn1.disabled) return;
    const selectedDragons = JSON.parse(localStorage.getItem('selectedDragons'));
    const dragon1 = selectedDragons[0];
    const dragon2 = selectedDragons[1];
    const damage = calculateDragonDamage(dragon1);
    healthDragon2.textContent = Math.max(0, healthDragon2.textContent - damage);
    dragonTurn.textContent = `${dragon1.name} attacks ${dragon2.name} for ${damage} damage! It's time for ${dragon2.name} to attack back!`;
    const currentHealth2 = parseInt(healthDragon2.textContent);
    if (currentHealth2 === 0) {
        dragonTurn.textContent = `${dragon2.name} has been defeated!`;
        dragon1.veteran = true;
        // store veteran status in localStorage
        const selectedDragons = JSON.parse(localStorage.getItem('selectedDragons'));
        selectedDragons[0].veteran = true;
        selectedDragons[1].veteran = false; // Reset veteran status for the defeated dragon
        localStorage.setItem('selectedDragons', JSON.stringify(selectedDragons));
        showBattleLog(dragon1);
        winnerMsg.textContent = `${dragon1.name} wins!`;
        winnerImg.src = dragon1.image; // Set the winner image
        endBattle();
        return;
    }
    // Switch turn to dragon 2
    currentTurn = 2;
    attackBtn1.disabled = true;
    attackBtn2.disabled = false;
    attackBtn1.classList.add('disabled');
    attackBtn2.classList.remove('disabled');
});