import { _decorator, Component, Node, director, Button, EditBox, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property(Button)
    startButton: Button = null;

    @property(EditBox)
    playerNameInput: EditBox = null;



    start() {
        
        this.startButton.node.on(cc.Node.EventType.TOUCH_END, this.startGame, this);
    }

    private startGame() {
        const playerName = this.playerNameInput.string;
    sys.localStorage.setItem('playerName', playerName);

    
    this.score = 0;
    this.updateScoreLabel;

    
    director.loadScene("GameScene");
    }

    update(deltaTime: number) {
        
    }
}