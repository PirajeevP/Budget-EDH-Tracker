document.addEventListener('DOMContentLoaded', function() {
    // Load saved results and scores from localStorage on page load
    loadResults();
    updatePlayerScores();
  
    document.getElementById('match-form').addEventListener('submit', function(e) {
      e.preventDefault();
  
      const player1 = document.getElementById('player-1').value.trim();
      const player2 = document.getElementById('player-2').value.trim();
      const player3 = document.getElementById('player-3').value.trim();
  
      if (!player1 || !player2 || !player3) {
        alert('Please enter all players.');
        return;
      }
  
      // Define point values for each placement
      const pointsForPlacement = {
        1: 3,
        2: 1,
        3: 0
      };
  
      let results = getResultsFromLocalStorage();
  
      // Add the match result with points for each player
      results.push({
        player1: { name: player1, place: 1, points: pointsForPlacement[1] },
        player2: { name: player2, place: 2, points: pointsForPlacement[2] },
        player3: { name: player3, place: 3, points: pointsForPlacement[3] }
      });
  
      // Save the updated results to localStorage
      saveResultsToLocalStorage(results);
      loadResults();  // Reload the table with updated results
      updatePlayerScores();  // Update the player scores
  
      // Reset the form
      document.getElementById('match-form').reset();
    });
  });
  
  // Function to load results from localStorage and populate the table
  function loadResults() {
    const tableBody = document.getElementById('results-table-body');
    tableBody.innerHTML = '';  // Clear the table
  
    let results = getResultsFromLocalStorage();
  
    results.forEach((match, index) => {
      const newRow = tableBody.insertRow();
  
      const matchCell = newRow.insertCell(0);
      const player1Cell = newRow.insertCell(1);
      const player2Cell = newRow.insertCell(2);
      const player3Cell = newRow.insertCell(3);
      const actionCell = newRow.insertCell(4);
  
      matchCell.textContent = `Match ${index + 1}`;
      player1Cell.textContent = `${match.player1.name} (1st - ${match.player1.points} pts)`;
      player2Cell.textContent = `${match.player2.name} (2nd - ${match.player2.points} pts)`;
      player3Cell.textContent = `${match.player3.name} (3rd - ${match.player3.points} pts)`;
  
      // Create Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      actionCell.appendChild(deleteButton);
  
      // Delete button functionality
      deleteButton.addEventListener('click', function() {
        results.splice(index, 1);  // Remove the match from results
        saveResultsToLocalStorage(results);
        loadResults();  // Reload the table after deletion
        updatePlayerScores();  // Update player scores after deletion
      });
    });
  }
  
  // Function to update the player scores
  function updatePlayerScores() {
    const scoreTableBody = document.getElementById('scores-table-body');
    scoreTableBody.innerHTML = '';  // Clear the score table
  
    let results = getResultsFromLocalStorage();
    let playerScores = {};  // Object to store the cumulative scores of players
  
    // Calculate cumulative scores for each player
    results.forEach(match => {
      const { player1, player2, player3 } = match;
  
      if (!playerScores[player1.name]) playerScores[player1.name] = 0;
      if (!playerScores[player2.name]) playerScores[player2.name] = 0;
      if (!playerScores[player3.name]) playerScores[player3.name] = 0;
  
      playerScores[player1.name] += player1.points;
      playerScores[player2.name] += player2.points;
      playerScores[player3.name] += player3.points;
    });
  
    // Populate the scores table with player scores
    Object.keys(playerScores).forEach(playerName => {
      const newRow = scoreTableBody.insertRow();
      const playerNameCell = newRow.insertCell(0);
      const playerScoreCell = newRow.insertCell(1);
  
      playerNameCell.textContent = playerName;
      playerScoreCell.textContent = playerScores[playerName];
    });
  
    // Save the player scores to localStorage for persistence
    savePlayerScoresToLocalStorage(playerScores);
  }
  
  // Helper function to get results from localStorage
  function getResultsFromLocalStorage() {
    const results = localStorage.getItem('matchResults');
    return results ? JSON.parse(results) : [];
  }
  
  // Helper function to save results to localStorage
  function saveResultsToLocalStorage(results) {
    localStorage.setItem('matchResults', JSON.stringify(results));
  }
  
  // Helper function to save player scores to localStorage
  function savePlayerScoresToLocalStorage(scores) {
    localStorage.setItem('playerScores', JSON.stringify(scores));
  }
  
  // Helper function to load player scores from localStorage (optional for more customization)
  function getPlayerScoresFromLocalStorage() {
    const scores = localStorage.getItem('playerScores');
    return scores ? JSON.parse(scores) : {};
  }
  