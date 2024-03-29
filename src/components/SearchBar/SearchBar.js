import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    getSortByClass(sortByOption) {
        return sortByOption === this.state.sortBy ? 'active' : '';
    }
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }
    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }
    handleLocationChange(e) {
        this.setState({ location: e.target.value });
    }
    handleSearch(e) {
        this.props.searchYelp(
            this.state.term,
            this.state.location,
            this.state.sortBy,
        );
        e.preventDefault();
    }
    renderBySortOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li
                    className={this.getSortByClass(sortByOptionValue)}
                    onClick={this.handleSortByChange.bind(
                        this,
                        sortByOptionValue,
                    )}
                >
                    {sortByOption}
                </li>
            );
        });
    }

    render() {
        return (
            <div className='SearchBar'>
                <div className='SearchBar-sort-options'>
                    <ul>{this.renderBySortOptions()}</ul>
                </div>
                <div className='SearchBar-fields'>
                    <input
                        placeholder='Search Businesses'
                        onChange={this.handleTermChange}
                    />
                    <input
                        placeholder='Where?'
                        onChange={this.handleLocationChange}
                    />
                </div>
                <div className='SearchBar-submit'>
                    <button onClick={this.handleSearch}>Let's Go</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
