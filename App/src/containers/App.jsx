import React, { Component } from 'react';

// Components
import Header from '../components/Navigation/Header/Header';
import Footer from '../components/Navigation/Footer/Footer';
import ColorPicker from '../components/Puzzle/Colors/ColorPicker';
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
    puzzle: [],
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
      const puzzle = [...this.state.Puzzle.puzzle];
      this.setState(() => ({ puzzle }));
    }
  }

  // Display handlers
  showHandler = (displayImport, displaySettings, displayShuffle, displayColorPicker) => {
    this.setState({
      displayImport,
      displaySettings,
      displayShuffle,
      displayColorPicker,
    });
  }

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

  // Actions handlers
  handleShuffle = (size, numberOfIterations) => {
    if (size >= 3 && size <= 5 && numberOfIterations >= 0 && numberOfIterations <= 10000) {
      this.state.Puzzle.reset(this.state.Puzzle.heuristic);
      const fileContent = getShuffledPuzzle(size, numberOfIterations);
      this.state.Puzzle.getPuzzle(fileContent);
      this.state.Puzzle.getSnailPuzzle();
      this.state.Puzzle.isPuzzleSolvable();
      const puzzle = [...this.state.Puzzle.puzzle];
      this.setState(prevState => ({ puzzle, displayShuffle: !prevState.displayShuffle }));
    }
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
        <Shuffle show={this.state.displayShuffle} onValidate={this.handleShuffle} />
        <ColorPicker show={this.state.displayColorPicker} />
        <ImportFile show={this.state.displayImport} />
        <Settings show={this.state.displaySettings} />
        <div className="App-container">
          <Puzzle
            color={this.state.color}
            size={this.state.Puzzle.size}
            puzzle={this.state.puzzle}
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
