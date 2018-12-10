import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateNameThunk} from '../store/user';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import LeaderBoard from './LeaderBoard';

class NameEntry extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const name = firstname + ' ' + lastname;
    await this.props.updateNameThunk(name);
    this.props.history.push('/game');
  }

  render() {
    return (
      <div>
        <div className="NameEntry">
          <h1 className="title">Ready To Play?</h1>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <label htmlFor="name" />
            <div className="inputs">
              <input
                type="text"
                name="firstname"
                placeholder="first name"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <input
                type="text"
                name="lastname"
                placeholder="last name"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.lastname}
              />
              <button type="submit">Continune</button>
            </div>
          </form>
        </div>
        <LeaderBoard />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
  };
};

const mapDispathToProps = dispatch => {
  return {
    updateNameThunk: name => dispatch(updateNameThunk(name)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps,
  )(NameEntry),
);
