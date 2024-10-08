import * as PIXI from 'pixi.js';
import { BetSelector } from './components/BetSelector';
(async () => {
    const betAmounts = [10, 20, 50, 100, 200, 500, 1000];
    const width = 100
    const height = 200
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });
    new BetSelector(app, betAmounts, width, height);

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
})();

