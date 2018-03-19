import React, { Component } from 'react';
import PropTypes from 'prop-types';

//SearchFormコンポーネントをクラスとして定義
class SearchForm extends Component{
	constructor(props){
		super(props);
		this.state={
			place: '東京タワー',
		}
	}
	//クラス内でメソッド（関数）を定義する場合は、function宣言をしない（するとSyntaxErrorになる）
	//onChangeで受けったものをplaceというstateにセットするための関数
	handlePlaceChange(place){
		this.setState({place}) //ショートハンドで記述 place: place (placeというstateに引数place(=入力された文字列)をセットしている)
	}

	//クラス内でメソッド（関数）を定義する場合は、function宣言をしない（するとSyntaxErrorになる）
	//submitボタンが押された後、
	handleSubmit(e){
		e.preventDefault(); //preventDefaultは、イベントがキャンセルである場合、そのイベントをキャンセル。ここでは、submitしてリロードされるのを防いでいる
		this.props.onSubmit(this.state.place); //onsubmit()でこのstate.placeを送信処理している
	}


	//jsxでフォームを生成
	//クラス内でメソッド（関数）を定義する場合は、function宣言をしない（するとSyntaxErrorになる）
	render(){
		return(
			//アロー関数と無名関数で定義されたhandleSubmitを呼び出す関数が、onSubmitイベントによって呼び出されてい
			//onSubmitイベントは、submitが押された時に発生するイベント
			<form className="search-form" onSubmit={e => this.handleSubmit(e)}>
				<input
					className="place-input"
					type="text"
					size="30"
					//valueの値として、このクラスコンポーネントのstateのplaceを設定
					value={this.state.place}
					//アロー関数と無名関数で定義されたhandlePlaceChangeを呼び出す関数が、onChangeイベントによって呼び出されている
					//onChangeがブラウザ上で呼ばれる時にイベントが渡される
					//引数が1つの場合は、周りの(e)は必要ない
					//eというイベントの中身からvalueを取り出すために、target.valueを使用して、入力された文字列のみを受け取る
					onChange={e => this.handlePlaceChange(e.target.value)} //onChangeとは、フォーム内のエレメント（要素）の内容が変更された時に起こるイベント
				/>
				<input className="submit-button" type="submit" value="検索"/>
			</form>
		);
	}
}
SearchForm.propTypes = {
	onSubmit: PropTypes.func.isRequired, //onSubmitというpropの型をfunctionで必須にする。
};

export default SearchForm;