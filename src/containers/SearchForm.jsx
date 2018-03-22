import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//関数geocodeのみ欲しいので{}の記述
import { geocode } from '../domain/Geocoder.js'
import { setPlace, startSearch } from '../actions/';

//SearchFormコンポーネントをクラスとして定義
const SearchForm = props => (
	//アロー関数と無名関数で定義されたhandleSubmitを呼び出す関数が、onSubmitイベントによって呼び出されてい
	//onSubmitイベントは、submitが押された時に発生するイベント
	<form
		className="search-form"
		onSubmit={(e) => {
			e.preventDefault();
			props.history.push(`/?place=${props.place}`); //historyAPIから受け取っているpropsを使用
			props.startSearch();
		}}
	>
		<input
			className="place-input"
			type="text"
			size="30"
			//valueの値として、このクラスコンポーネントのstateのplaceを設定
			value={props.place}
			//アロー関数と無名関数で定義されたhandlePlaceChangeを呼び出す関数が、onChangeイベントによって呼び出されている
			//onChangeがブラウザ上で呼ばれる時にイベントが渡される
			//引数が1つの場合は、周りの(e)は必要ない
			//eというイベントの中身からvalueを取り出すために、target.valueを使用して、入力された文字列のみを受け取る
			onChange={(e) => {
				e.preventDefault();
				props.setPlace(e.target.value);
				}} //onChangeとは、フォーム内のエレメント（要素）の内容が変更された時に起こるイベント
		/>
		<input className="submit-button" type="submit" value="検索"/>
	</form>
);
SearchForm.propTypes = {
	place: PropTypes.string.isRequired,
	setPlace: PropTypes.func.isRequired, //onPlaceChangeというpropの型をfunctionで必須にする。
	startSearch: PropTypes.func.isRequired, //onSubmitというpropの型をfunctionで必須にする。
	history: PropTypes.shape({push: PropTypes.func}).isRequired,
};

export default connect(
	state => ({
		place: state.place,
	}),
 	{setPlace, startSearch},
 )(SearchForm);