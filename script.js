document.getElementById('team-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const teamName = document.getElementById('team-name').value.trim();
    const teamPoints = parseInt(document.getElementById('team-points').value.trim());
  
    if (!teamName || isNaN(teamPoints)) {
      alert('Please enter valid team name and points.');
      return;
    }
  
    const tableBody = document.getElementById('table-body');
    let rowExists = false;
  
    // Check if team already exists, then update its points
    for (let row of tableBody.rows) {
      if (row.cells[0].textContent === teamName) {
        row.cells[1].textContent = teamPoints;
        rowExists = true;
        break;
      }
    }
  
    // If the team does not exist, create a new row
    if (!rowExists) {
      const newRow = tableBody.insertRow();
      const teamCell = newRow.insertCell(0);
      const pointsCell = newRow.insertCell(1);
      const deleteCell = newRow.insertCell(2);  // New cell for the delete button
  
      teamCell.textContent = teamName;
      pointsCell.textContent = teamPoints;
  
      // Create the Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteCell.appendChild(deleteButton);
  
      // Add event listener to delete the row when clicked
      deleteButton.addEventListener('click', function() {
        tableBody.removeChild(newRow);
      });
    }
  
    // Reset form inputs
    document.getElementById('team-form').reset();
  });
  