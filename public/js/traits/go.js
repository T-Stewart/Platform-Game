import {Trait} from '../entity.js'

export default class Jump extends Trait {
    constructor(){
        super('go')

        this.dir = 0;
        this.speed = 10000;
        
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime
       if(this.engageTime > 0){
           entity.vel.y = -this.velocity;
           this.engageTime -= deltaTime
       }
    }
}