import React from 'react';
import { defaultLength, minutesToMS, msToMMSS } from './Utility';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.beep = React.createRef();
  }
  state = {
    break: minutesToMS(defaultLength.break),
    session: minutesToMS(defaultLength.session),
    breakMinutes: defaultLength.break,
    sessionMinutes: defaultLength.session,
    timerLabel: 'Session',
    isCounting: false,
    currentCount: minutesToMS(defaultLength.session)
  }
  handleClick = (e) => {
    const id = e.target.id;
    switch (id) {
      case 'reset':
        this.setState({
          isCounting: false,
          break: minutesToMS(defaultLength.break),
          session: minutesToMS(defaultLength.session),
          breakMinutes: defaultLength.break,
          sessionMinutes: defaultLength.session,
          timerLabel: 'Session',
          currentCount: minutesToMS(defaultLength.session)
        });
        this.beep.current.pause();
        this.beep.current.currentTime = 0;
        break;
      case 'session-increment':
        if (this.state.sessionMinutes < 60 && !this.state.isCounting) {
          let newSession = this.state.session + 60000;
          this.setState({
            session: newSession,
            sessionMinutes: this.state.sessionMinutes + 1
          });
          if (this.state.timerLabel === 'Session') {
            this.setState({
              currentCount: newSession
            });
          }
        }
        break;
      case 'session-decrement':
        if (this.state.sessionMinutes > 1 && !this.state.isCounting) {
          let newSession = this.state.session - 60000;
          this.setState({
            session: newSession,
            sessionMinutes: this.state.sessionMinutes - 1
          });
          if (this.state.timerLabel === 'Session') {
            this.setState({
              currentCount: newSession
            });
          }
        }
        break;
      case 'break-increment':
        if (this.state.breakMinutes < 60 && !this.state.isCounting) {
          let newBreak = this.state.break + 60000;
          this.setState({
            break: newBreak,
            breakMinutes: this.state.breakMinutes + 1
          });
          if (this.state.timerLabel === 'Break') {
            this.setState({
              currentCount: newBreak
            });
          }
        }
        break;
      case 'break-decrement':
        if (this.state.breakMinutes > 1 && !this.state.isCounting) {
          let newBreak = this.state.break - 60000;
          this.setState({
            break: newBreak,
            breakMinutes: this.state.breakMinutes - 1
          });
          if (this.state.timerLabel === 'Break') {
            this.setState({
              currentCount: newBreak
            });
          }
        }
        break;
      case 'start_stop':
        if (!this.state.isCounting) {
          this.setState({
            isCounting: true,
          });
          this.startCountdown(this.state.currentCount);
        } else {
          this.setState({
            isCounting: false,
          });
        }
        break;
      default:
    }
  }

  startCountdown = (ms) => {
    let countdown = setInterval(() => {
      // pausing
      if (!this.state.isCounting) {
        clearInterval(countdown);
        return;
      }
      // ended
      if (this.state.currentCount === 0) {
        this.beep.current.play();
        if (this.state.timerLabel === 'Session') {
          this.setState({
            timerLabel: 'Break',
            currentCount: this.state.break
          });
          ms = this.state.break;
        } else {
          this.setState({
            timerLabel: 'Session',
            currentCount: this.state.session
          });
          ms = this.state.session;
        }
        clearInterval(countdown);
        this.startCountdown(ms);
        return;
      }
      ms -= 1000;
      this.setState({
        currentCount: ms
      });
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="row">
          <div className="col">
            <div id="break-label">Break Length</div>
            <div className="row length">
              <i id="break-decrement" className="fa fa-minus-square-o fa-2x" aria-hidden="true" onClick={this.handleClick}></i>
              <div id="break-length">{this.state.breakMinutes}</div>
              <i id="break-increment" className="fa fa-plus-square-o fa-2x" aria-hidden="true" onClick={this.handleClick}></i>
            </div>
          </div>
          <div className="col">
            <div id="session-label">Session Length</div>
            <div className="row length">
              <i id="session-decrement" className="fa fa-minus-square-o fa-2x" aria-hidden="true" onClick={this.handleClick}></i>
              <div id="session-length">{this.state.sessionMinutes}</div>
              <i id="session-increment" className="fa fa-plus-square-o fa-2x" aria-hidden="true" onClick={this.handleClick}></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div id="timer-label">{this.state.timerLabel}</div>
            <div id="time-left">{msToMMSS(this.state.currentCount)}</div>
          </div>
        </div>
        <div className="row">
          <button id="start_stop" onClick={this.handleClick}>start/stop</button>
          <button id="reset" onClick={this.handleClick}>reset</button>
        </div>
        <audio
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          id='beep'
          ref={this.beep}
        />
      </div>
    );
  };
}

export default App;
