import React, { Component } from 'react';

// Components
import Header from '../components/Navigation/Header/Header';
import Footer from '../components/Navigation/Footer/Footer';
import ColorPicker from '../components/Puzzle/Colors/ColorPicker';
import Shuffle from '../components/Puzzle/Shuffle/Shuffle';
import Settings from '../components/Puzzle/Settings/Settings';
import PuzzleGrid from '../components/Puzzle/Grid/Puzzle';

// Utils
import getShuffledPuzzle from '../utils/getShuffledPuzzle';

// Puzzle solver
import PuzzleSolver from '../helpers/Puzzle';

// Others
import './App.css';
import { COLORS, HEURISTICS } from '../config/constants';

class App extends Component {

  state = {

    // Puzzle relative
    Puzzle: new PuzzleSolver(),
    puzzle: [],
    color: COLORS.GAME,
    heuristic: HEURISTICS.MANHATTAN,
    greedy: false,
    solved: false,

    // Display window parameters
    displaySettings: false,
    displayShuffle: false,
    displayColorPicker: false,

    // Form parameters
    shuffleSize: 3,
    shuffleIterations: 1000,
  }

  // Lifecyle Hook
  componentDidMount() {
    console.dir('componentDidMount');
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
  showHandler = (displaySettings, displayShuffle, displayColorPicker) => {
    this.setState({
      displaySettings,
      displayShuffle,
      displayColorPicker,
    });
  }

  showShuffleOptions = () => {
    if (this.state.displayShuffle) this.showHandler(false, false, false);
    else this.showHandler(false, true, false);
  }

  showSettings = () => {
    if (this.state.displaySettings) {
      this.showHandler(false, false, false);
      this.setState(prevState => ({
        heuristic: prevState.Puzzle.heuristic,
        greedy: prevState.Puzzle.greedySearch,
      }));
    } else this.showHandler(true, false, false);
  }

  showColorPicker = () => {
    if (this.state.displayColorPicker) this.showHandler(false, false, false);
    else this.showHandler(false, false, true);
  }

  // Action handlers for shuffle
  handleShuffle = (e) => {
    e.preventDefault();
    const { shuffleSize, shuffleIterations } = this.state;
    if (!/^\d+$/.test(shuffleSize) || !/^\d+$/.test(shuffleIterations)) return false;
    if (shuffleSize < 3 || shuffleSize > 5) return false;
    if (shuffleIterations < 0 || shuffleSize > 10000) return false;
    const fileContent = getShuffledPuzzle(shuffleSize, shuffleIterations);
    const NewPuzzle = new PuzzleSolver(this.state.Puzzle.heuristic, this.state.Puzzle.greedySearch);
    NewPuzzle.getPuzzle(fileContent);
    NewPuzzle.getSnailPuzzle();
    NewPuzzle.isPuzzleSolvable();
    this.setState(prevState => ({
      Puzzle: NewPuzzle,
      puzzle: NewPuzzle.puzzle,
      displayShuffle: !prevState.displayShuffle,
    }));
    return true;
  }

  handleShuffleSize = (e) => {
    const shuffleSize = e.target.value;
    if (/^\d+$/.test(shuffleSize)) this.setState({ shuffleSize: parseInt(shuffleSize, 10) });
    else if (shuffleSize === '') this.setState({ shuffleSize: '' });
  }

  handleShuffleIterations = (e) => {
    const shuffleIterations = e.target.value;
    if (/^\d+$/.test(shuffleIterations)) this.setState({ shuffleIterations: parseInt(shuffleIterations, 10) });
    else if (shuffleIterations === '') this.setState({ shuffleIterations: '' });
  }

  // Action handler for color picker
  handleColorPicker = (e) => {
    if (this.state.color !== COLORS[e.target.value]) {
      this.setState({ color: COLORS[e.target.value], displayColorPicker: false });
    }
  }

  // Action handlers for settings
  handleSettings = (e) => {
    e.preventDefault();
    const { greedy, heuristic, Puzzle } = this.state;
    if (greedy === Puzzle.greedySearch && heuristic === Puzzle.heuristic) return false;
    Puzzle.reset(heuristic, greedy);
    if (this.state.solved) this.setState(prevState => ({ solved: !prevState.solved }));
    return true;
  }

  handleGreedyChange = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ greedy: !prevState.greedy }));
  }

  handleHeuristicChange = (e) => {
    e.preventDefault();
    if (e.target.value !== this.state.heuristic) {
      this.setState({ heuristic: HEURISTICS[e.target.value] });
    }
  }

  // Rendering
  render() {
    return (
      <div className="App">
        <Header
          displaySettings={this.state.displaySettings}
          displayShuffle={this.state.displayShuffle}
          displayColorPicker={this.state.displayColorPicker}
          showShuffleOptions={this.showShuffleOptions}
          showSettings={this.showSettings}
          showColorPicker={this.showColorPicker}
        />
        <Shuffle
          show={this.state.displayShuffle}
          shuffleSize={this.state.shuffleSize}
          onSizeChange={this.handleShuffleSize}
          shuffleIterations={this.state.shuffleIterations}
          onIterationsChange={this.handleShuffleIterations}
          onValidate={this.handleShuffle}
        />
        <ColorPicker
          show={this.state.displayColorPicker}
          color={this.state.color}
          onChange={this.handleColorPicker}
        />
        <Settings
          show={this.state.displaySettings}
          heuristic={this.state.heuristic}
          greedy={this.state.greedy}
          onValidate={this.handleSettings}
          onGreedyChange={this.handleGreedyChange}
          onHeuristicChange={this.handleHeuristicChange}
        />
        <div className="App-container">
          <PuzzleGrid
            color={this.state.color}
            size={this.state.Puzzle.size}
            puzzle={this.state.puzzle}
            snail={this.state.Puzzle.snail}
            heuristic={this.state.Puzzle.heuristic}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
