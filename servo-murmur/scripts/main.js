const express = require('express');
const router = express.Router();

// Function to get game status
function getGameStatus() {
    const isGameInSession = game?.sessions?.active;
    const gameName = game?.world?.title || "Unknown Game";

    return {
        gameInSession: !!isGameInSession,
        gameName: gameName
    };
}

// Define the status endpoint
router.get('/status', (req, res) => {
    const status = getGameStatus();
    res.json(status);
});

// Register the endpoint
Hooks.once('init', () => {
    const server = game?.server;
    if (server) {
        server.use('/servo-murmur', router);
        console.log('Servo Murmur module initialized');
    } else {
        console.error('Server instance not available');
    }
});