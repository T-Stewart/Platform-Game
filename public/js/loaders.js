import Level from './level.js'
import {createBackgroundLayer, createSpriteLayer} from "./layers.js";
import {loadBackgroundSprites} from "./sprites.js";

export function createTiles(levels, backgrounds) {
    backgrounds.forEach( background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for(let y = y1; y <y2; y++){
                levels.tiles.set(x, y, {
                    name: background.tile,
                    })
                }
            }
        })
    })


    
}

export function loadImage(url){
    return new Promise(res => {
        const image = new Image();
        image.addEventListener('load', () => {
            res(image);
        });
        image.src = url;
    });
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then( r => r.json()),

        loadBackgroundSprites(),

    ]) 
    
   
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level
    })
}