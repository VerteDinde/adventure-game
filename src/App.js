import React, { Component } from 'react';
import landingScene from './scenes';
import napScene from './scenes/naptime';
import User from './User-stats';
import ActionButton from './ActionButton';
import EnterUserName from './EnterUserName';

// TODO: make villain appear and interact when climb up tree
// TODO: make another button appear on tree scene
// TODO: be able to attack the villain/make a fight
// DONE: reset state after nap time
// DONE: fixed bug
// TODO Stretch: maybe break scene into component

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: '',
        items: [],
        teaBuzz: 100
      },
      currentScene: landingScene,

    };

    this.setName = this.setName.bind(this);
    this.goToScene = this.goToScene.bind(this);
    this.addItem = this.addItem.bind(this);
    this.fightVillain = this.fightVillain.bind(this);
  }

  setName(userName) {
    const user = this.state.user;
    this.setState({
      user: Object.assign(user, { name: userName })
    });
  }

  goToScene(scene) {
    const user = this.state.user;
    this.setState({ currentScene: scene });
    if (this.state.currentScene === landingScene) {
      return this.setState({
        user: Object.assign(user, {
          items: [],
          teaBuzz: 100
        })
      });
    }
    if (user.teaBuzz <= 0) return;
    this.changeTeaBuzz(-10);
  }

  changeTeaBuzz(teaBuzz) {
    const user = this.state.user;
    teaBuzz = user.teaBuzz + teaBuzz;
    this.setState({
      user: Object.assign(user, { teaBuzz })
    });
    if (teaBuzz <= 0) this.goToScene(napScene);
  }

  addItem(item) {
    const user = this.state.user;
    const items = user.items.slice();
    items.push(item);
    const teaBuzz = user.teaBuzz + item.teaBuzz;
    this.setState({
      user: Object.assign(user, { items, teaBuzz })
    });
    alert(`You found a ${item.name}!`);
  }

  fightVillain() {
    const user = this.state.user;
    //reduce villain teaBuzz - alert
    //reduce user teaBuzz - alert
    const teaBuzz = user.teaBuzz - 20;
    this.setState({
      user: Object.assign(user, { teaBuzz })
    });
    alert('The Villain attacked you! Your energy drops!');
  }

  render() {
    const { currentScene, user } = this.state;
    const { headerText, backgroundUrl, bodyText, buttonText, buttonText2 } = currentScene;
    const form =
      <EnterUserName
        currentScene={currentScene}
        setName={this.setName}
        goToScene={this.goToScene}
      />;
    const button =
      <ActionButton
        currentScene={currentScene}
        buttonText={buttonText}
        buttonText2={buttonText2}
        goToScene={this.goToScene}
        addItem={this.addItem}
        fightVillain={this.fightVillain}
        callback={currentScene.callback}
      />;
    const sceneAction = currentScene === landingScene ? form : button;

    return (
      <div className="main" style={{
        backgroundImage: `url(${backgroundUrl})`
      }}>
        <User user={user} />
        <div className="wrapper">
          <div className="Scene-header">
            <h2>{headerText}</h2>
          </div>
          <p> {bodyText} </p>
          {sceneAction}
        </div>
      </div>
    );
  }
}

export default App;
