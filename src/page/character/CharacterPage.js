import { Component, createRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import SearchBar from "../../component/search/SearchBar.jsx";
import SimpleDialog from "../../component/character-detail/CharacterDetail";
import CharacterTable, { DEFAULT_CHARACTER_SORT_DIRECTION, DEFAULT_CHARACTER_SORT_FIELD } from "../../component/character-table/CharacterTable.jsx";
import CharacterService from "../../service/CharacterService.js";

import './CharacterPage.css'

export default class CharacterPage extends Component {

  characterTableRef = createRef();

  state = {
    searchQuery: "",
    characters: [],
    characterDetailOpen: false,
    entries: 0,
    selectedCharacter: undefined,
    timeoutRunning: false
  }

  onSearchChange = (term) => {
    this.setState({ searchQuery: term });
    this.searchCharacters(0, DEFAULT_CHARACTER_SORT_DIRECTION, DEFAULT_CHARACTER_SORT_FIELD);
    this.characterTableRef.current.resetTable();
  };

  searchCharacters = (page, sortDirection, sortField) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({ timeoutRunning: true });
    this.timeout = setTimeout(() => {
      CharacterService.getCharacters(this.state.searchQuery, page, sortDirection, sortField)
        .then(res => {
          this.setState({ characters: res.data.data.results, entries: res.data.data.total });
        }).finally(() => {
          this.setState({ timeoutRunning: false });
        });
    }, 1000);
  }

  /* Open Detail Dialog*/
  handleOpenDetail = (row) => {
    this.setState({ characterDetailOpen: true, selectedCharacter: row });
  };

  /* On Detail Dialog close */
  handleCloseDetail = (value) => {
    this.setState({ characterDetailOpen: false });
  };

  render() {
    return (
      <div>
        {/* Character Search Bar */}
        <SearchBar
          onSearch={this.onSearchChange}
          value={this.state.search} />

        {/*  */}
        {this.state.timeoutRunning === true &&
          <CircularProgress />
        }

        {/* Empty state */}
        {(this.state.characters.length === 0 && this.state.searchQuery === "") &&
          <div>Please input a search</div>
        }

        {/* No results state */}
        {(this.state.characters.length === 0 && this.state.searchQuery !== "" && this.state.timeoutRunning === false) &&
          <div>No character {this.state.searchQuery} found</div>
        }

        {/* Character Table */}
        <CharacterTable
          ref={this.characterTableRef}
          characters={this.state.characters}
          characterEntries={this.state.entries}
          onSearchChange={this.searchCharacters}
          onCharacterSelect={this.handleOpenDetail}
          shouldDisplay={(this.state.characters.length !== 0 && this.state.timeoutRunning === false)}
        />

        {/* Character Detail Dialog */}
        {this.state.selectedCharacter &&
          <SimpleDialog
            selectedValue={this.state.selectedCharacter}
            open={this.state.characterDetailOpen}
            onClose={this.handleCloseDetail} />
        }
      </div >
    );
  }
}