const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {

    constructor() {
        //holds the current state of a givem key
        this.keyStates = new Map();

        // holds the call back functions for a key code
        this.keyMap = new Map();
    }

    addMapping( keyCode, callBack) {
        this.keyMap.set(keyCode, callBack)
    }

    handleEvent(event){
        const {keyCode} = event;

        if(!this.keyMap.has(keyCode)){
            //did not have key mapped
            return;
        }
        event.preventDefault()

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if(this.keyStates.get(keyCode) === keyState) {
            return;
        }

        this.keyStates.set(keyCode, keyState);
        console.log(this.keyStates)
        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event)
            
            });
        });
    }
}