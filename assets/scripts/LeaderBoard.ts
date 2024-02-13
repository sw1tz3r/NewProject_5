import { _decorator, Component, Label, Button, director, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Leaderboard')
export class Leaderboard extends Component {
    @property(Label)
    leaderboardLabel: Label = null;

    @property(Button)
    restartButton: Button = null;

    @property(Button)
    mainMenuButton: Button = null;

    start() {
        this.loadLeaderboard();
        this.setupButtonHandlers();
    }

    loadLeaderboard() {
        const leaderboardDataString = sys.localStorage.getItem('leaderboardData');
        let leaderboardData = leaderboardDataString ? JSON.parse(leaderboardDataString) : [];

        this.displayLeaderboard(leaderboardData);
    }

    displayLeaderboard(leaderboardData) {
        leaderboardData.sort((a, b) => b.score - a.score);

        let leaderboardString = 'Leaderboard:\n';
        for (let i = 0; i < leaderboardData.length; i++) {
            leaderboardString += `${i + 1}. ${leaderboardData[i].name}: ${leaderboardData[i].score}\n`;
        }
        this.leaderboardLabel.string = leaderboardString;
    }

    setupButtonHandlers() {
        if (this.restartButton) {
            this.restartButton.node.on('click', this.onClickRestart, this);
        }

        if (this.mainMenuButton) {
            this.mainMenuButton.node.on('click', this.onClickMainMenu, this);
        }
    }

    onClickRestart() {
        director.loadScene("GameScene");
    }

    onClickMainMenu() {
        director.loadScene("MainMenu");
    }
}

