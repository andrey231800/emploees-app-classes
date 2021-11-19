import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      data :  [
        {name: "John", salary: 5000, increase: false, rise: false, id: "1"},
        {name: "Alex", salary: 2000, increase: true, rise: true, id: "2"},
        {name: "Nick", salary: 3000, increase: false, rise: false, id: "3"}, 
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
        return {
          data: data.filter(item => item.id !== id)
        }
      })
  }

  submitForm = (name, salary) => {
    const newItem = {
      name, 
      salary,
      rise: false,
      increase : false,
      id: this.maxId++
    }

      this.setState(({data}) => {
        const newArr = [...data, newItem]
        return {
          data: newArr
        }
      })
  }

    onToggleProp = (id, prop) => {
      this.setState(({data}) => ({
          data: data.map(item => {
              if (item.id === id) {
                  return {...item, [prop]: !item[prop]}
              }
              return item;
          })
      }))
  }


  searchEmp = (items, term) => {
      if (term.length === 0) {
          return items;
      }

      return items.filter(item => {
          return item.name.indexOf(term) > -1
      })
  }

  onUpdateSearch = (term) => {
      this.setState({term});
  }

  filterPost = (items, filter) => {
    switch(filter){
      case 'rise': 
        return items.filter(item => item.rise)
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000)
      case 'premium':
        return items.filter(item => item.increase === true)
      default:  
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(index => index.increase).length;
    const rise = this.state.data.filter(index => index.rise).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
          <AppInfo 
          employees = {employees}
          increased = {increased}
          rise = {rise}/>
  
          <div className="search-panel">
              <SearchPanel
              onUpdateSearch = {this.onUpdateSearch}/>
              <AppFilter
              filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList
           data={visibleData}
           onDelete={this.deleteItem}
           onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm
          onAdd={this.submitForm}/>
      </div>
    );
  }
}

export default App;