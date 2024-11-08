console.clear();
import React from 'react';
import './index.css';

const Item = (props) => (
  <li
    data-testid="todo-item"
    className={props.item.completed && 'item-completed'}
  >
    {props.item.value}
    <button
      data-testid="toggle-button"
      onClick={() => props.handleToggle(props.item)}
    >
      Toggle
    </button>
    <button
      data-testid="delete-button"
      onClick={() => props.handleRemove(props.item)}
    >
      Remove
    </button>
  </li>
);

const List = (props) => (
  <ul data-testid="todo-list">
    {props.list.map((item) => (
      <Item
        key={item.id}
        item={item}
        handleToggle={props.handleToggle}
        handleRemove={props.handleRemove}
      />
    ))}
  </ul>
);

class Form extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;

    this.setState({ inputValue: '' });
    this.props.handleSubmit(value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          data-testid="add-todo"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
      </form>
    );
  }
}

const Filter = (props) => (
  <input onChange={(event) => props.handleFilter(event.target.value)} />
);

class App extends React.Component {
  state = {
    list: [],
    filterValue: '',
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      id: `${Math.random()}-${Math.random()}`,
    };
    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => element.id !== item.id);
    this.setState({ list: newList });
  };

  handleFilter = (value) => {
    this.setState({ filterValue: value });
  };

  render() {
    const filtered = this.state.list.filter((item) =>
      item.value
        .toLowerCase()
        .includes(this.state.filterValue.trim().toLowerCase())
    );
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />
        <Filter list={this.state.list} handleFilter={this.handleFilter} />
        <List
          list={filtered}
          handleToggle={this.handleToggle}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
