import { geocode } from '../domain/Geocoder.js';
import { searchHotelByLocation } from '../domain/HorelRepository';


export const setPlace = place => dispatch => dispatch({type: 'CHANGE_PALACE', place});

export const setErrorMessage = message => dispatch => dispatch({type: 'CHANGE_ERROR_MESSAGE', message});

export const setHotels = hotels => dispatch => dispatch({type: 'CHANGE_HOTELS', hotels});

export const setSortKey = sortKey => dispatch => dispatch({type: 'CHANGE_SORT_KEY', sortKey});

export const startSearch = () => (dispatch, getState) =>  {
	geocode(getState().place)
	//geocodeから受け取った返り値を引数として{status, address, location}を使用している
	.then(({ status, address, location }) => {	//無名関数のアロー関数として一連の流れ（スイッチ文でstatusによってsetStateの値を分岐させている。）を定義
		switch(status){
			case 'OK': {
				dispatch({ type: 'GEOCODE_FETCHED',	address, location}); //address: result.formatted_address, location: result.geometry.locationのショートハンド
				return searchHotelByLocation(location); //searchHotelByLocation(location)関数から返される値を次のthen()に渡している(HotelRepository.js)
			}
			case 'ZERO_RESULTS':{
				dispatch(setErrorMessage('結果が見つかりませんでした。'));
				break;
			}
			default: {
				dispatch(setErrorMessage('エラーが発生しました。'));
			}
		}
		return [];
	})
	.then((hotels)=> {
		dispatch(setHotels(hotels));
	})
	.catch(() => {
		dispatch(setErrorMessage('通信に失敗しました。'));
	});
}