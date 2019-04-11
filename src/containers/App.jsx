import React, { Component } from 'react';

// Components
import Header from '../components/Navigation/Header/Header';
import Footer from '../components/Navigation/Footer/Footer';
import Shuffle from '../components/Puzzle/Shuffle/Shuffle';
import ImportFile from '../components/Puzzle/ImportFile/ImportFile';
import Settings from '../components/Puzzle/Settings/Settings';
import Puzzle from '../components/Puzzle/Grid/Puzzle';

// Utils
import getShuffledPuzzle from '../utils/getShuffledPuzzle';

// Puzzle solver
import PuzzleSolver from '../helpers/Puzzle';

// Others
import './App.css';
import { COLORS } from '../config/constants';

class App extends Component {

  state = {

    // Puzzle relative
    Puzzle: new PuzzleSolver(),
    color: COLORS.GAME,


    // Display window parameters
    displayImport: false,
    displaySettings: false,
    displayShuffle: false,
    displayColorPicker: false,
  }

  // Lifecyle Hook
  componentDidMount() {
    if (this.state.Puzzle.puzzle.length === 0) {
      const fileContent = getShuffledPuzzle(3, 100);
      this.state.Puzzle.getPuzzle(fileContent);
      this.state.Puzzle.getSnailPuzzle();
      this.state.Puzzle.isPuzzleSolvable();
      this.forceUpdate();
    }
  }

  showHandler = (displayImport, displaySettings, displayShuffle, displayColorPicker) => {
    this.setState({
      displayImport,
      displaySettings,
      displayShuffle,
      displayColorPicker,
    });
  }

  // Display handlers
  showShuffleOptions = () => {
    if (this.state.displayShuffle) this.showHandler(false, false, false, false);
    else this.showHandler(false, false, true, false);
  }

  showImportOptions = () => {
    if (this.state.displayImport) this.showHandler(false, false, false, false);
    else this.showHandler(true, false, false, false);
  }

  showSettings = () => {
    if (this.state.displaySettings) this.showHandler(false, false, false, false);
    else this.showHandler(false, true, false, false);
  }

  showColorPicker = () => {
    if (this.state.displayColorPicker) this.showHandler(false, false, false, false);
    else this.showHandler(false, false, false, true);
  }

  // Rendering
  render() {
    return (
      <div className="App">
        <Header
          displayImport={this.state.displayImport}
          displaySettings={this.state.displaySettings}
          displayShuffle={this.state.displayShuffle}
          displayColorPicker={this.state.displayColorPicker}
          showShuffleOptions={this.showShuffleOptions}
          showImportOptions={this.showImportOptions}
          showSettings={this.showSettings}
          showColorPicker={this.showColorPicker}
        />
        <div className="App-container">
          <Shuffle show={this.state.displayShuffle} />
          <ImportFile show={this.state.displayImport} />
          <Settings show={this.state.displaySettings} />
          <Puzzle
            color={this.state.color}
            size={this.state.Puzzle.size}
            puzzle={this.state.Puzzle.puzzle}
            snail={this.state.Puzzle.snail}
            heuristic={this.state.Puzzle.heuristic}
            uniformCost={this.state.Puzzle.uniformCost}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
