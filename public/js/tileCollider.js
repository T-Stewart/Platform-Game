import TileResolver from './tileResolver.js'



export default class  TileCollider {
    constructor(tilesMatrix){
        this.tiles = new TileResolver(tilesMatrix);
    };

    checkY(entity){
        let y;
        if(entity.vel.y > 0){
            y = entity.pos.y + entity.size.y;
        } else if(entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y, y, );

        matches.forEach(match => {
            if(!match){
            return
            }

            if(match.tile.name !== 'ground') {
                return;
            }

            if(entity.vel.y > 0){
                if(entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                } else if (entity.vel.y < 0){
                if(entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                    }   
                }
            }
        });
        
    };

    checkX(entity){
        let x;
        if(entity.vel.x > 0){
            x = entity.pos.x + entity.size.x;
        } else if(entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            x, x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if(!match){
            return
            }

            if(match.tile.name !== 'ground') {
                return;
            }

            if(entity.vel.x > 0){
                if(entitx.pos.x + entitx.size.x > match.x1) {
                    entitx.pos.x = match.x1 - entitx.size.x;
                    entitx.vel.x = 0;
                } else if (entitx.vel.x < 0){
                if(entitx.pos.x < match.x2) {
                    entitx.pos.x = match.x2;
                    entitx.vel.x = 0;
                    }   
                }
            }
        });
        
    }

    test(entity){
        this.checkY(entity)
     
 }};