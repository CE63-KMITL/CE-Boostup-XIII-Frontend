async function fetchLeaderboardData() {
   try {
      const response = await fetch('https://');
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await response.json();
      displayLeaderboard(data);
   } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
   }
}

function displayLeaderboard(data) {
   const leaderboardSection = document.querySelector('.Leaderboard');
   const leaderboardList = document.createElement('ul');

   data.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.rank}. ${entry.playerName} - ${entry.score}`;
      leaderboardList.appendChild(listItem);
   });

   leaderboardSection.appendChild(leaderboardList);
}

window.addEventListener('DOMContentLoaded', () => {
   fetchLeaderboardData();
});
