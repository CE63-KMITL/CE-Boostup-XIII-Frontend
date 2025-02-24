<script lang="ts">
</script>

<div class="MenuBar">
   <div class="left-section">
      <img src="pictures/fu7.jpg" alt="Icon" class="circular-icon">
      <span class="ce-boostup">CE-BOOSTUP</span>
   </div>
   <nav class="menu">
      <ul>
         <li><a href="#home">Home</a></li>
         <li><a href="#about">About</a></li>
         <li><a href="#services">Services</a></li>
         <li><a href="#contact">Contact</a></li>
      </ul>
   </nav>
   <button class="login-button">Login</button>
</div>

<div class="Leaderboard">
   <h1>Leaderboard</h1>
   <p>Track your progress and complete for the top!</p>
</div>

<div class="OptionsMenu">
   <nav class="menu">
      <ul>
         <li><a href="#overall">Overall</a></li>
         <li><a href="#house_score">House</a></li>
         <li><a href="#my_house_score">My House</a></li>
      </ul>
   </nav>
</div>

<style lang="scss">
   .Leaderboard {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 20vh;
      background-color: #ffffff;
      font-family: Arial, sans-serif;
   }
   .MenuBar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      padding: 10px;
   }

   .OptionsMenu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-family: Arial, sans-serif;
      padding: 1px;
      border: 1px solid #333;
      border-radius: 100px;
      background-size:cover;
      background-color: #f9f9f9;
   }

   .left-section {
      display: flex;
      align-items: center;
   }

   .circular-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
   }

   .menu {
      flex-grow: 1;
      margin-left: 20px;
   }

   .menu ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      gap: 15px;
   }

   .menu ul li {
      display: inline;
   }

   .menu ul li a {
      text-decoration: none;
      color: #333;
      padding: 5px 10px;
      border-radius: 5px;
      transition: background-color 0.3s;
   }

   .menu ul li a:hover {
      background-color: #ddd;
   }

   .login-button {
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      background-color: #dddddd;
      color: #555;
      cursor: pointer;
      transition: background-color 0.3s;
   }

   .login-button:hover {
      background-color: #777;
   }

   p {
      color: #666;
      font-size: 0.5em;
   }
</style>