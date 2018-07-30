import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import Router from 'next/router'

import Layout from '../../components/Layout.js'
import { getUsersList} from '../../lib/api/users'
import { addNewMatch } from '../../lib/api/match'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

class AddMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        search: '',
        players: [],
        matchAdded: false,
        teamHome: {
            defender: {
                avatarUrl: '',
                name: ''
            },
            striker: {
                avatarUrl: '',
                name: ''
            },
            score: 0
        },
        teamAway: {
            defender: {
                avatarUrl: '',
                name: ''
            },
            striker: {
                avatarUrl: '',
                name: ''
            },
            score: 0
        },
        badges: []
    }
  }

  async componentDidMount() {
    try {
      const players = await getUsersList()
      this.setState({ players: players })
    } catch (err) {
      console.log(err)
    }
  }

  handleScoreChange = name => event => {
    const teamObj = Object.assign({}, this.state[name], {score: event.target.value} )
    this.setState({
      [name]: teamObj
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    
    const match = await addNewMatch({
      teamHome: this.state.teamHome,
      teamAway: this.state.teamAway,
      badges: []
    })
  
    this.setState({ matchAdded: true })
    Router.push('/matches')
  }

//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value,
//     })
//   }
    getSuggestions(inputValue) {
        let count = 0

        return this.state.players.filter(suggestion => {
            const keep =
            (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

            if (keep) {
            count += 1
            }

            return keep
        });
    }

    renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
        const isHighlighted = highlightedIndex === index
        const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

        return (
            <MenuItem
            {...itemProps}
            key={suggestion.name}
            selected={isHighlighted}
            data={suggestion}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
            >
            {suggestion.name}
            </MenuItem>
        )
    }

    renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps

    return (
        <TextField
        InputProps={{
            inputRef: ref,
            classes: {
            },
            ...InputProps,
        }}
        {...other}
        />
    )
    }

  render() {
    return (
      <Layout>
        <h1 style={styleH1}>Add new match</h1>
        <Divider />
        <form 
          autoComplete="off"
          style={styleForm}
          onSubmit={this.onSubmit}
        >
        
        <div id="teamHome">
            <h2>Team Home</h2>
            <div id="teamHomeDefender">
                <h3>Defender</h3>
                <img src={this.state.teamHome.defender.avatarUrl} alt={this.state.teamHome.defender.name} />
                <p>{this.state.teamHome.defender.name}</p>
                {/* <Autocomplete 
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamHome.defender.name)}
                    onSelect={(value, item) => {
                        const defender = Object.assign({}, this.state.teamHome, {defender: item} )
                        this.setState({ teamHome: defender})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                /> */}
                <Downshift
                onSelect={(item, stateAndHelpers) => {
                        const selection = this.state.players.filter((player) => player.name === item).shift()
                        const defender = Object.assign({}, this.state.teamHome, {defender: selection} )
                        this.setState({ teamHome: defender})
                    }}
                >
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div>
                        {this.renderInput({
                        fullWidth: true,
                        InputProps: getInputProps({
                            placeholder: 'Search a User',
                            id: 'integration-downshift-simple',
                        }),
                        })}
                        {isOpen ? (
                        <Paper square>
                            {this.getSuggestions(inputValue).map((suggestion, index) =>
                            this.renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion.name }),
                                highlightedIndex,
                                selectedItem,
                            }),
                            )}
                        </Paper>
                        ) : null}
                    </div>
                    )}
                </Downshift>
            </div>
            <div id="teamHomeStriker">
                <h3>Striker</h3>
                <img src={this.state.teamHome.striker.avatarUrl} alt={this.state.teamHome.striker.name} />
                <p>{this.state.teamHome.striker.name}</p>
                <Downshift
                onSelect={(item, stateAndHelpers) => {
                        const selection = this.state.players.filter((player) => player.name === item).shift()
                        const striker = Object.assign({}, this.state.teamHome, {striker: selection} )
                        this.setState({ teamHome: striker})
                    }}
                >
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div>
                        {this.renderInput({
                        fullWidth: true,
                        InputProps: getInputProps({
                            placeholder: 'Search a User',
                            id: 'integration-downshift-simple',
                        }),
                        })}
                        {isOpen ? (
                        <Paper square>
                            {this.getSuggestions(inputValue).map((suggestion, index) =>
                            this.renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion.name }),
                                highlightedIndex,
                                selectedItem,
                            }),
                            )}
                        </Paper>
                        ) : null}
                    </div>
                    )}
                </Downshift>
                {/* <Autocomplete 
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamHome.striker.name)}
                    onSelect={(value, item) => {
                        const striker = Object.assign({}, this.state.teamHome, {striker: item} )
                        this.setState({ teamHome: striker})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                /> */}
            </div>
            <TextField
                style={styleTextField}
                id="teamHomeScore"
                label="Score"
                value={this.state.teamHome.score}
                onChange={this.handleScoreChange('teamHome')}
                margin="normal"
                required
            />
        </div>
        <div id="teamAway">
            <h2>Team Away</h2>
            <div id="teamAwayDefender">
                <h3>Defender</h3>
                <img src={this.state.teamAway.defender.avatarUrl} alt={this.state.teamAway.defender.name} />
                <p>{this.state.teamAway.defender.name}</p>
                {/* <Autocomplete 
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamAway.defender.name)}
                    onSelect={(value, item) => {
                        const defender = Object.assign({}, this.state.teamAway, {defender: item} )
                        this.setState({ teamAway: defender})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                /> */}
                <Downshift
                onSelect={(item, stateAndHelpers) => {
                        const selection = this.state.players.filter((player) => player.name === item).shift()
                        const defender = Object.assign({}, this.state.teamAway, {defender: selection} )
                        this.setState({ teamAway: defender})
                    }}
                >
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div>
                        {this.renderInput({
                        fullWidth: true,
                        InputProps: getInputProps({
                            placeholder: 'Search a User',
                            id: 'integration-downshift-simple',
                        }),
                        })}
                        {isOpen ? (
                        <Paper square>
                            {this.getSuggestions(inputValue).map((suggestion, index) =>
                            this.renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion.name }),
                                highlightedIndex,
                                selectedItem,
                            }),
                            )}
                        </Paper>
                        ) : null}
                    </div>
                    )}
                </Downshift>
            </div>
            <div id="teamAwayStriker">
                <h3>Striker</h3>
                <img src={this.state.teamAway.striker.avatarUrl} alt={this.state.teamAway.striker.name} />
                <p>{this.state.teamAway.striker.name}</p>
                {/* <Autocomplete 
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamAway.striker.name)}
                    onSelect={(value, item) => {
                        const striker = Object.assign({}, this.state.teamAway, {striker: item} )
                        this.setState({ teamAway: striker})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                /> */}
                <Downshift
                onSelect={(item, stateAndHelpers) => {
                        const selection = this.state.players.filter((player) => player.name === item).shift()
                        const striker = Object.assign({}, this.state.teamAway, {striker: selection} )
                        this.setState({ teamAway: striker})
                    }}
                >
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div>
                        {this.renderInput({
                        fullWidth: true,
                        InputProps: getInputProps({
                            placeholder: 'Search a User',
                            id: 'integration-downshift-simple',
                        }),
                        })}
                        {isOpen ? (
                        <Paper square>
                            {this.getSuggestions(inputValue).map((suggestion, index) =>
                            this.renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion.name }),
                                highlightedIndex,
                                selectedItem,
                            }),
                            )}
                        </Paper>
                        ) : null}
                    </div>
                    )}
                </Downshift>
            </div>
            <TextField
                style={styleTextField}
                id="teamAwayScore"
                label="Score"
                value={this.state.teamAway.score}
                onChange={this.handleScoreChange('teamAway')}
                margin="normal"
                required
            />
        </div>

          <Button
            variant="contained"
            style={styleRaisedButton}
            type="submit"
          >
            Add Match
          </Button>
        </form>
      </Layout>
    )
  }
}

export default AddMatch