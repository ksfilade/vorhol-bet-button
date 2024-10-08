import * as PIXI from 'pixi.js';

export class BetSelector {
    private app: PIXI.Application;
    private betAmounts: number[];
    private selectedBetIndex: number;
    private betText: PIXI.Text | undefined;
    private betContainer: PIXI.Container;
    private betListContainer: PIXI.Container | undefined;
    private betListOpen: boolean = false;
    private plusButton: PIXI.Text | undefined;
    private minusButton: PIXI.Text | undefined;
    private betButton: PIXI.Graphics | undefined;
    private textStyle: PIXI.TextStyle | undefined;
    width: number;
    height: number;
    constructor(app: PIXI.Application, betAmounts: number[], width: number, height: number, initialBetIndex: number = 0) {
        this.app = app;
        this.betAmounts = betAmounts;
        this.selectedBetIndex = initialBetIndex;
        this.width = width
        this.height = height
        const style = new PIXI.TextStyle();
        style.fontSize = 24;
        style.fontFamily = 'Arial';
        style.fill = '#ffffff';
        this.textStyle = style;
        this.betContainer = new PIXI.Container();
        this.app.stage.addChild(this.betContainer);

        this.createBetButton();
        this.createPlusMinusButtons();
        this.createBetList();
    }

    private createBetButton() {
      
        this.betText = new PIXI.Text({
            text: this.betAmounts[this.selectedBetIndex].toString(),
            style: this.textStyle
        })
        const betButton = new PIXI.Graphics().rect(0, 0, 120, 50).fill('#333333')
            
        betButton.interactive = true;

        betButton.on('pointerdown', () => this.toggleBetList());

        this.betContainer.addChild(betButton);
        this.betContainer.addChild(this.betText);

        this.betText.position.set(195, 60);
        betButton.position.set(150, 50);
        this.betButton = betButton
    }

    private createPlusMinusButtons() {
        // Plus button
        this.plusButton = new PIXI.Text({
            text: '+',
            style: this.textStyle
        })
        const plusButtonGraphics = new PIXI.Graphics().rect(-8, 0, 30, 30).fill('#00ff00')
            

        plusButtonGraphics.interactive = true;
        // plusButtonGraphics.buttonMode = true;
        plusButtonGraphics.on('pointerdown', () => this.changeBet(1));

        this.plusButton.position.set(300, 50);
        plusButtonGraphics.position.set(300, 50);
        this.betContainer.addChild(plusButtonGraphics);
        this.betContainer.addChild(this.plusButton);

        // Minus button
        this.minusButton = new PIXI.Text({
            text: '-',
            style: this.textStyle
        })
        const minusButtonGraphics = new PIXI.Graphics().rect(-8, 0, 30, 30).fill('#ff0000')

        minusButtonGraphics.interactive = true;
        minusButtonGraphics.on('pointerdown', () => this.changeBet(-1));

        this.minusButton.position.set(100, 50);
        minusButtonGraphics.position.set(100, 50);
        this.betContainer.addChild(minusButtonGraphics);
        this.betContainer.addChild(this.minusButton);
    }

    private createBetList() {
        this.betListContainer = new PIXI.Container();
        this.betListContainer.visible = false;

        const betListBackground = new PIXI.Graphics().rect(0, 0, this.width, this.height).fill('#333333')
            
        this.betListContainer.addChild(betListBackground);

        this.betAmounts.forEach((amount, index) => {
            const betItem = new PIXI.Text(amount.toString(), {
                fontFamily: 'Arial',
                fontSize: 18,
                fill: this.selectedBetIndex === index ? '#ffff00' : '#ffffff',
            });
            
            betItem.interactive = true;
            betItem.on('pointerdown', () => {
                this.selectBet(index )
                this.toggleBetList();
            });
            betItem.position.set(10, index * 30);
            this.betListContainer?.addChild(betItem);
        });

        this.betContainer.addChild(this.betListContainer);
        this.betListContainer.position.set(150, 110);
    }

    private toggleBetList() {
        this.betListOpen = !this.betListOpen;
        if (this.betListContainer)
            this.betListContainer.visible = this.betListOpen;
        this.updateBetList()
    }

    private selectBet(index: number) {
        this.selectedBetIndex = index;

        if (this.betText?.text)
            this.betText.text = this.betAmounts[this.selectedBetIndex ]
        if (this.betListOpen)
            this.updateBetList();
        if (this.betText && this.betButton)
            this.betText.x = this.betButton.x + this.betButton?.width / 2 - this.betText.width / 2
        
    }

    private changeBet(direction: number) {
        console.log(direction, this.selectedBetIndex)
        const newIndex = this.selectedBetIndex + direction;
        if (newIndex >= 0 && newIndex < this.betAmounts.length) {
            this.selectBet(newIndex);
        }
    }

    private updateBetList() {
        this?.betListContainer?.children.forEach((item, index) => {
            if (item instanceof PIXI.Text) {
                console.log(item.text, this.betText?.text)
                item.style.fill = item.text == this.betText?.text ? '#ffff00' : '#ffffff';
            }
        });
    }
}
