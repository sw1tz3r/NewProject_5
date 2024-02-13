import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    @property(cc.Integer)
    points: number = 10;
    

    
    onLoad() {
        // Add touch event listener
        this.node.on(cc.Node.EventType.TOUCH_END, this.popBalloon, this);
        
        }
    
    
    
    popBalloon() {
        
        this.node.destroy();
        cc.director.emit('balloonPopped', this.points);
        cc.director.emit('balloonOutOfScreen');
    }
    
}