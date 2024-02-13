import { _decorator, Component, Node, director, Button, EditBox, sys, Prefab, instantiate, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    balloon: Prefab;

    @property(Label)
    scoreLabel: Label;

    private score: number = 0;

    @property(cc.Integer)
    maxLifeCount: number = 3;
    private lifeCount: number = 3;

    @property(Label)
    lifeLabel: Label = null;

    start() {
        this.schedule(this.createBalloon, 1);
        this.registerEventListeners();
    }

    onLoad() {
    
    this.updateScoreLabel = this.updateScoreLabel.bind(this);

    cc.director.on('balloonPopped', this.updateScoreLabel);
}

    registerEventListeners() {
        
        this.balloonPoppedHandler = this.balloonPoppedHandler.bind(this);
        cc.director.on('balloonPopped', this.balloonPoppedHandler);
    }

    balloonPoppedHandler(points: number) {
        this.score += points;
        this.updateScoreLabel();
    }

    updateScoreLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${this.score}`;
        }
    }

    updateLifeLabel() {
        if (this.lifeLabel) {
            this.lifeLabel.string = `Lives: ${this.lifeCount}`;
        }
    }

    stopGame() {
        this.unscheduleAllCallbacks();
        cc.log('Game Over');
        this.saveScoreToLeaderboard();
        director.loadScene("LeaderboardScene");
    }

    saveScoreToLeaderboard() {
        const leaderboardDataString = sys.localStorage.getItem('leaderboardData');
        let leaderboardData = leaderboardDataString ? JSON.parse(leaderboardDataString) : [];

        const playerName = sys.localStorage.getItem('playerName');
        const playerScore = this.score;

        leaderboardData.push({ name: playerName, score: playerScore });

        sys.localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
    }

    createBalloon() {
        let Xrandom = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 600);
        let canvas = director.getScene().getChildByName("Canvas");
        let balloon = instantiate(this.balloon);
        balloon.setParent(canvas);
        balloon.setPosition(Xrandom, -450);

        this.scheduleOnce(() => {
            if (balloon && balloon.parent) {
                this.lifeCount--;
                this.updateLifeLabel();

                if (this.lifeCount <= 0) {
                    this.stopGame();
                }

                balloon.destroy();
            }
        }, 2.5);
    }
}
