import {createSlice} from '@reduxjs/toolkit';
//import {TEMPERATURE_UNITS} from '../constants/temperatureUnits';

const initialState = {
    unit: localStorage.getItem('unit') || 'metric',
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        toggleUnit: (state) => {
            state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
            localStorage.setItem('unit', state.unit);
        },
        toggleFavorite: (state, action) => {
            const city = action.payload;
            if (state.favorites.includes(city)) {
                state.favorites = state.favorites.filter((item) => item !== city);
            } else {
                state.favorites.push(city);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});

export const { toggleUnit, toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;