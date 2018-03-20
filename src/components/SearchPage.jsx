import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from './SearchForm.jsx';
import GeocodeResult from './GeocodeResult.jsx';
import Map from './Map.jsx';
import HotelsTable from './HotelsTable';


//関数geocodeのみ欲しいので{}の記述
import { geocode } from '../domain/Geocoder.js'
import { searchHotelByLoacation } from '../domain/HorelRepository.js'

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component{	//ES6 JavaScriptでクラスを継承するにはextendsを使います
	constructor(props){		//Appクラスが生成された時にメンバ変数などを初期化する、コンストラクタメソッド
		super(props); 	//super()は親クラスのコンストラクタに引数を渡す時に使用（この場合、Appクラスの親であるComponentクラスに引数としてpropsを渡している。）
		this.state = {
			//lat, lngは常にセットで呼ばれるのlacationというstateを作成、その中にlat, lngをハッシュ(多次元配列)として入れる
			place: this.getPlaceParam() || '東京タワー',
			location: {
				lat: 35.6585805,
				lng: 139.7454329,
			},
			sortKey: 'price',

		};
	}
	componentDidMount(){
		const place = this.getPlaceParam();
		if(place){
			this.startSearch(place);
		}
	}

	getPlaceParam(){
		const params = queryString.parse(this.props.location.search);
		const place = params.place;
		if (place && place.length > 0){
			return place;
		}
		return null;
	}


	setErrorMessage (message){ //エラーが起きたときに、変更するstateをひとまとめにしたもの、メッセージのみは引数を持たせて、それぞれで表示
		this.setState({	//setStateは、stateを変える役割と、renderを呼び直す二つの役割がある
			address: message,
			location: {
				lat: 35.6585805,
				lng: 139.7454329,
			},
		});
	}
	//onChangeで受けったものをplaceというstateにセットするための関数
	handlePlaceChange(place){
		this.setState({ place }) //ショートハンドで記述 place: place (placeというstateに引数place(=入力された文字列)をセットしている)
	}

	//SearchFormのonSubmitイベント時に渡されたplaceを受け取り、GeocodeResult.jsxに定義したgeocode関数を利用して、取得した情報を元に分岐し、state設置して、描画し直す関数
	handlePlaceSubmit(e){
		e.preventDefault();
		this.props.history.push(`/?place=${this.state.place}`); //historyAPIから受け取っているpropsを使用
		//入力されたplaceを、Geocorder.jsに定義したgeocodeという関数に渡しその返り値をthen関数の引数に、{status, address, location}として渡している
		this.startSearch()
	}

	startSearch(){
		geocode(this.state.place)
			//geocodeから受け取った返り値を引数として{status, address, location}を使用している
			.then(({ status, address, location }) => {	//無名関数のアロー関数として一連の流れ（スイッチ文でstatusによってsetStateの値を分岐させている。）を定義
				switch(status){
					case 'OK': {
						this.setState({	address, location}); //address: result.formatted_address, location: result.geometry.locationのショートハンド
						return searchHotelByLoacation(location); //searchHotelByLoacation(location)関数から返される値を次のthen()に渡している(HotelRepository.js)
					}
					case 'ZERO_RESULTS':{
						this.setErrorMessage('結果が見つかりませんでした。');
						break;
					}
					default: {
						this.setErrorMessage('エラーが発生しました。');
					}
				}
				return [];
			})
			.then((hotels)=> {
				//hotelsステイトにgeocodeで取得して来た値をセットしている
				this.setState({hotels: sortedHotels(hotels, this.state.sortKey)}); //renderを呼び出して再描画している
			})
			.catch(() => {
				this.setErrorMessage('通信に失敗しました。');
		});
	}

	handleSortKeyChange(sortKey){
		this.setState({
			sortKey, //ショートハンド
			hotels: sortedHotels(this.state.hotels, sortKey),
		 });
	}


	//JSXで各コンポーネント記述、呼び出してDOM生成する
	//SearchForm, GeocodeReslut, Mapのコンポーネントを呼び出し
	render(){
		return(
			<div className="search-page">
				<h1 className="app_title">ホテル検索</h1>
				{/* propsを子コンポーネントSearchFormに渡している */}
				{/* SearchFormコンポーネントから、onSubmitイベントを通じて、入力された文字列を受け取っている */}
				<SearchForm
					place={this.state.place}
					onPlaceChange={ place => this.handlePlaceChange(place)} //SearchFormにhandlePlaceChangeを呼び出す関数を渡している
					onSubmit={ (e) => this.handlePlaceSubmit(e)} //SearchFormにhandlePlaceSubmitを呼び出す関数を渡している
				/>
				<div className="result-area">
					<Map
						//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, lat, lngにstateとしてセットされている
						location={this.state.location} //propsを子コンポーネントMapに渡している
					/>
					<div className="result-right">
						<GeocodeResult
							//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, location(lat, lng)にstateとしてセットされている
							address={this.state.address} //propsを子コンポーネントGeocodeResultに渡している
							location={this.state.location} //propsを子コンポーネントGeocodeResultに渡している
						/>
						<h2>ホテル検索結果</h2>
						{/* handlePlaceSubmitでセットされたhotelsステイトをpropsとして、HotelTableコンポーネントに渡している */}
						<HotelsTable
							hotels={this.state.hotels}
							sortKey={this.state.sortKey}
							onSort={sortKey => this.handleSortKeyChange(sortKey)}
						/>
					</div>
				</div>
			</div>
		);
	}
}
SearchPage.propTypes = {
	history: PropTypes.shape({push: PropTypes.func}).isRequired,
	location: PropTypes.shape({search: PropTypes.string}).isRequired,
};

export default SearchPage;

