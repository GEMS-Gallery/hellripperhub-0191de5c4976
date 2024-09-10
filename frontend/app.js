import { backend } from 'declarations/backend';

const gameInfoElement = document.getElementById('game-info');
const characterListElement = document.getElementById('character-list');
const weaponListElement = document.getElementById('weapon-list');
const levelListElement = document.getElementById('level-list');
const voteResultsElement = document.getElementById('vote-results');

async function fetchGameInfo() {
    showLoading(gameInfoElement);
    try {
        const info = await backend.getGameInfo();
        gameInfoElement.innerHTML = `<p>${info}</p>`;
    } catch (error) {
        console.error('Error fetching game info:', error);
        gameInfoElement.innerHTML = '<p>Error loading game info. Please try again later.</p>';
    }
    hideLoading(gameInfoElement);
}

async function fetchCharacters() {
    showLoading(characterListElement);
    try {
        const characters = await backend.getCharacters();
        characterListElement.innerHTML = characters.map(char => `<p>${char}</p>`).join('');
    } catch (error) {
        console.error('Error fetching characters:', error);
        characterListElement.innerHTML = '<p>Error loading characters. Please try again later.</p>';
    }
    hideLoading(characterListElement);
}

async function fetchWeapons() {
    showLoading(weaponListElement);
    try {
        const weapons = await backend.getWeapons();
        weaponListElement.innerHTML = weapons.map(weapon => `<p>${weapon}</p>`).join('');
    } catch (error) {
        console.error('Error fetching weapons:', error);
        weaponListElement.innerHTML = '<p>Error loading weapons. Please try again later.</p>';
    }
    hideLoading(weaponListElement);
}

async function fetchLevels() {
    showLoading(levelListElement);
    try {
        const levels = await backend.getLevels();
        levelListElement.innerHTML = levels.map((level, index) => 
            `<button onclick="voteForLevel(${index})">${level}</button>`
        ).join('');
    } catch (error) {
        console.error('Error fetching levels:', error);
        levelListElement.innerHTML = '<p>Error loading levels. Please try again later.</p>';
    }
    hideLoading(levelListElement);
}

async function fetchVoteResults() {
    showLoading(voteResultsElement);
    try {
        const votes = await backend.getLevelVotes();
        voteResultsElement.innerHTML = votes.map(([level, count]) => 
            `<p>${level}: ${count} vote${count !== 1 ? 's' : ''}</p>`
        ).join('');
    } catch (error) {
        console.error('Error fetching vote results:', error);
        voteResultsElement.innerHTML = '<p>Error loading vote results. Please try again later.</p>';
    }
    hideLoading(voteResultsElement);
}

async function voteForLevel(levelId) {
    showLoading(voteResultsElement);
    try {
        await backend.voteForLevel(BigInt(levelId));
        await fetchVoteResults();
    } catch (error) {
        console.error('Error voting for level:', error);
        voteResultsElement.innerHTML = '<p>Error submitting vote. Please try again later.</p>';
    }
    hideLoading(voteResultsElement);
}

function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element) {
    const loader = element.querySelector('.loading');
    if (loader) {
        loader.remove();
    }
}

// Initialize the page
fetchGameInfo();
fetchCharacters();
fetchWeapons();
fetchLevels();
fetchVoteResults();

// Make voteForLevel function globally available
window.voteForLevel = voteForLevel;
