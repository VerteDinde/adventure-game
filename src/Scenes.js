import landingScene from './scenes/01-landing';
import expositionScene from './scenes/02-exposition';
import pathScene from './scenes/03-path';
import staircaseScene from './scenes/04-staircase';
import caveScene from './scenes/05-cave';
import fieldScene from './scenes/06-field';
import treeScene from './scenes/07-tree';
import napScene from './scenes/naptime';

landingScene.nextScene = expositionScene;
expositionScene.nextScene = pathScene;
expositionScene.prevScene = landingScene;
pathScene.nextScene = staircaseScene;
pathScene.nextScene2 = fieldScene;
pathScene.prevScene = expositionScene;

staircaseScene.nextScene = caveScene;
staircaseScene.prevScene = pathScene;
caveScene.prevScene = staircaseScene;

fieldScene.nextScene = treeScene;
fieldScene.prevScene = pathScene;

napScene.nextScene = landingScene;

// wooo

export default landingScene;