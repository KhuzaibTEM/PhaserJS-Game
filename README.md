# PhaserJS-Game
This game is a 2D platformer developed using the Phaser framework. The main objective is to navigate a player character, collect coins, and eliminate enemies before they reach the end of the screen. Here's a summary of the game's features and mechanics:

1. **Game Setup**:
    - The game initializes with a background, platforms, a player, coins, and enemies.
    - Images and audio assets are loaded during the preload phase.

2. **Game Elements**:
    - **Platforms**: Static platforms are created, including a ground and additional elevated ledges.
    - **Player**: The player character is controlled by keyboard input and can move left, right, and jump.
    - **Enemies**: Three enemies are present, moving leftward. One enemy has additional gravity effects causing it to bounce.
    - **Coins**: Collectible coins are scattered throughout the game, falling and bouncing slightly.

3. **Physics and Controls**:
    - Physics are enabled for collisions and gravity effects.
    - Keyboard input allows the player to move and jump.
    - Player animations change based on movement direction.

4. **Interactions**:
    - The player collects coins by overlapping with them, which increments the score and plays a sound effect.
    - The player can eliminate enemies by overlapping with them, gaining points and playing a different sound effect.
    - Collisions are managed to ensure the player, enemies, and coins interact properly with platforms.

5. **Scoring and Winning**:
    - Collecting a coin grants 10 points, while eliminating an enemy grants 20 points.
    - The game is won when the player reaches 120 points, displaying a "You Win" message.
    - The game is lost if any enemy reaches the left edge of the screen, displaying a "You Lose" message and resetting the positions of the enemies.

6. **Audio**:
    - Sound effects are included for collecting coins and eliminating enemies.
