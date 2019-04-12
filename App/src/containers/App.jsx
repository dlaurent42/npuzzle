import React, { Component } from 'react';

// Components
import Header from '../components/Navigation/Header/Header';
import Footer from '../components/Navigation/Footer/Footer';
import Controls from '../components/Puzzle/Controls/Controls';
import ColorPicker from '../components/Puzzle/Colors/ColorPicker';
import Shuffle from '../components/Puzzle/Shuffle/Shuffle';
import Settings from '../components/Puzzle/Settings/Settings';
import PuzzleGrid from '../components/Puzzle/Grid/Puzzle';
import Spinner from '../components/UI/Spinner/Spinner';

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
    currentStep: 0,
    solving: false,

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
      solved: false,
      currentStep: 0,
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
    if (this.state.solved) {
      this.setState(prevState => ({
        solved: !prevState.solved,
        currentStep: 0,
        displaySettings: false
      }));
    } else this.setState({ displaySettings: false });
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

  // Action handlers for controls
  handleSolvePuzzle = () => {
    console.dir(`Before all ${this.state.solving}`);
    console.dir(`Puzzle solvable: ${this.state.Puzzle.solvable}`);
    this.setState({ solving: true }, () => {
      console.dir(`After setstate ${this.state.solving}`);
      this.state.Puzzle.solve()
        .then(() => {
          console.dir(`After solve ${this.state.solving}`);
          this.setState({ solved: true, solving: false }, () => {
            console.dir(`After last setstate ${this.state.solving}`);
          });
        });
    });
  }

  handlePreviousStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1,
      puzzle: prevState.Puzzle.finalSet[prevState.currentStep - 1].puzzle,
    }));
  }

  handleNextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
      puzzle: prevState.Puzzle.finalSet[prevState.currentStep + 1].puzzle,
    }));
  }

  // Rendering
  render() {
    console.dir(`Call render() with this.state.solving = ${this.state.solving}`);
    const spinner = (this.state.solving) ? <div className="App-mask"><Spinner>Solving...</Spinner></div> : null;
    if (spinner === null) console.dir('Spinner is null');
    else console.dir('Spinner is not null');
    return (
      <div className="App">
        {spinner}
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
          <Controls
            currentStep={this.state.currentStep}
            puzzleSolved={this.state.solved}
            finalSet={this.state.Puzzle.finalSet}
            handleSolve={this.handleSolvePuzzle}
            handlePrevious={this.handlePreviousStep}
            handleNext={this.handleNextStep}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
