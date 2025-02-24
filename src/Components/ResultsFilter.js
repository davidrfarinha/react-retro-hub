import React, { useState, useEffect } from "react";
import { useDataContext } from "../Components/DataContextProvider";
import Slider from "../Components/Slider"

export default function ResultsFilter({ gameGenres, handleActiveFilters }) {
    /* DEFAULT FILTER VALUES------------------------------------------------------*/
    const shownGameGenres = Object.keys(gameGenres).map(item => gameGenres[item]);
    const { retroGamesDateRange } = useDataContext();
    const ratingRange = [0, 5];

    /* STATE VALUES---------------------------------------------------------------*/
    const [genreFilter, setGenreFilter] = useState('Select an option');
    const [dateFilter, setDateFilter] = useState({
        sliderRange: retroGamesDateRange,
        selectedRange: retroGamesDateRange
    });
    const [ratingFilter, setRatingFilter] = useState({
        sliderRange: ratingRange,
        selectedRange: ratingRange
    });

    /* CHECKING FOR ACTIVE FILTERS------------------------------------------------*/


    useEffect(() => {
        const genreFilterActive = genreFilter !== 'Select an option' ? genreFilter : false;
        const dateFilterActive = dateFilter.sliderRange[0] !== dateFilter.selectedRange[0] || dateFilter.sliderRange[1] !== dateFilter.selectedRange[1] ? dateFilter.selectedRange : false;
        const ratingFilterActive = ratingFilter.sliderRange[0] !== ratingFilter.selectedRange[0] || ratingFilter.sliderRange[1] !== ratingFilter.selectedRange[1] ? ratingFilter.selectedRange : false;
        const isAnyFilterActive = !!genreFilterActive || !!dateFilterActive || !!ratingFilterActive;
        if (isAnyFilterActive) {
            handleActiveFilters({
                filtersEnabled: true,
                filters: {
                    selectedGenre: genreFilterActive,
                    selectedDate: dateFilterActive,
                    selectedRating: ratingFilterActive
                }
            })
        } else {
            handleActiveFilters({
                filtersEnabled: false,
                filters: null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreFilter, dateFilter, ratingFilter]);

    /* HANDLER FUNCTIONS ---------------------------------------------------------*/
    const handleGenreSelect = event => setGenreFilter(event.target.value);
    const handleSliderChange = (value, slider) => {
        let setFunction;
        // eslint-disable-next-line default-case
        switch (slider) {
            case "rating":
                setFunction = setRatingFilter;
                break;
            case "date":
                setFunction = setDateFilter;
                break;
        }
        setFunction(prev => ({
            ...prev,
            selectedRange: value
        }));
    };

    const handleClearFilters = () => {
        setGenreFilter('Select an option');
        setRatingFilter(prev => ({
            ...prev,
            selectedRange: ratingRange
        }));
        setDateFilter(prev => ({
            ...prev,
            selectedRange: retroGamesDateRange
        }));
    }

    /* JSX ELEMENTS TO RENDER ON PAGE---------------------------------------------*/
    const genreFilterDropdownMenu = (
        shownGameGenres?.length !== 0 && (
            <form className="filter genre">
                <h5>Genre</h5>
                <select
                    className="filter-input"
                    name="genre-filter"
                    onChange={handleGenreSelect}
                    value={genreFilter}
                >
                    <option value="Select an option">Select an option</option>
                    {shownGameGenres?.map(item =>
                        <option
                            key={item.id}
                            value={item.slug}
                        >
                            {item.name}
                        </option>)}
                </select>
            </form>
        ));

    const ratingFilterSliderMenu = (
        <div className="filter rating">
            <h5>Rating</h5>
            <Slider
                sliderValue={ratingFilter.selectedRange}
                minMaxShownValues={ratingFilter.sliderRange}
                handleSliderChange={(value) => handleSliderChange(value, "rating")}
                step={0.1}
            />
        </div>
    );

    const dateFilterSliderMenu = (
        <div className="filter date">
            <h5>Date range</h5>
            <Slider
                sliderValue={dateFilter.selectedRange}
                minMaxShownValues={dateFilter.sliderRange}
                handleSliderChange={(value) => handleSliderChange(value, "date")}
            />
        </div>
    );

    return (
        <div className="filters-container">
            <h4 className="filters-heading">Filter results by:</h4>
            {genreFilterDropdownMenu}
            {ratingFilterSliderMenu}
            {dateFilterSliderMenu}
            <button className="clear-filters-button" onClick={handleClearFilters}>Clear filters</button>
        </div>
    );
}