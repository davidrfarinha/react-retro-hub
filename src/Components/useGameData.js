import { useState } from 'react';

export default function useGameData() {
    const [gameData, setGameData] = useState(null);
    return { gameData, setGameData };
}