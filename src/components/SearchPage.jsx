import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../containers/SearchForm.jsx';
import GeocodeResult from './GeocodeResult.jsx';
import Map from './Map.jsx';
import HotelsTable from './HotelsTable';
import { startSearch } from '../actions/';


class SearchPage extends Component{	//ES6 JavaScriptでクラスを継承するにはextendsを使います
	componentDidMount(){
		this.props.dispatch(startSearch());
	}

	//JSXで各コンポーネント記述、呼び出してDOM生成する
	//SearchForm, GeocodeReslut, Mapのコンポーネントを呼び出し
	render(){
		return(
			<div className="search-page">
				<h1 className="app_title">ホテル検索</h1>
				{/* propsを子コンポーネントSearchFormに渡している */}
				{/* SearchFormコンポーネントから、onSubmitイベントを通じて、入力された文字列を受け取っている */}
				<SearchForm history={this.props.history}/>
				<div className="result-area">
					<Map
						//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, lat, lngにstateとしてセットされている
						location={this.props.geocodeResult.location} //propsを子コンポーネントMapに渡している
					/>
					<div className="result-right">
						<GeocodeResult
							//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, location(lat, lng)にstateとしてセットされている
							address={this.props.geocodeResult.address} //propsを子コンポーネントGeocodeResultに渡している
							location={this.props.geocodeResult.location} //propsを子コンポーネントGeocodeResultに渡している
						/>

						<h2>ホテル検索結果</h2>
						{/* handlePlaceSubmitでセットされたhotelsステイトをpropsとして、HotelTableコンポーネントに渡している*/}
						<HotelsTable />
					</div>
				</div>
			</div>
		);
	}
}
SearchPage.propTypes = {
	history: PropTypes.shape({push: PropTypes.func}).isRequired,
	location: PropTypes.shape({search: PropTypes.string}).isRequired,
	geocodeResult: PropTypes.shape({
		address: PropTypes.string.isRequired,
		location: PropTypes.shape({
			lat: PropTypes.number.isRequired,
			lng: PropTypes.number.isRequired,
		})
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	geocodeResult: state.geocodeResult,
});


export default connect(mapStateToProps)(SearchPage);
