import React, { Component } from 'react';

import SearchForm from './SearchForm.jsx';
import GeocodeResult from './GeocodeResult.jsx';
import Map from './Map.jsx';

//関数geocodeのみ欲しいので{}の記述
import { geocode } from '../domain/Geocoder.js'



class App extends Component{	//ES6 JavaScriptでクラスを継承するにはextendsを使います
	constructor(props){		//Appクラスが生成された時にメンバ変数などを初期化する、コンストラクタメソッド
		super(props); 	//super()は親クラスのコンストラクタに引数を渡す時に使用（この場合、Appクラスの親であるComponentクラスに引数としてpropsを渡している。）
		this.state = {
			//lat, lngは常にセットで呼ばれるのlacationというstateを作成、その中にlat, lngをハッシュとして入れる
			location: {
				lat: 35.6585805,
				lng: 139.7454329,
			},
		};
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

	handlePlaceSubmit(place){
		//入力されたplaceを、Geocorder.jsに定義したgeocodeという関数に渡しその返り値をthen関数の引数に、{status, address, location}として渡している
		geocode(place)
			//geocodeから受け取った返り値を引数として{status, address, location}を使用している
			.then(({ status, address, location }) => {	//無名関数のアロー関数として一連の流れ（スイッチ文でstatusによってsetStateの値を分岐させている。）を定義
				switch(status){
					case 'OK': {
						this.setState({	address, location}); //address: result.formatted_address, location: result.geometry.locationのショートハンド
						break;
					}
					case 'ZERO_RESULTS':{
						this.setErrorMessage('結果が見つかりませんでした。');
						break;
					}
					default: {
						this.setErrorMessage('エラーが発生しました。');
					}
				}
			})
			.catch(() => {
				this.setErrorMessage('通信に失敗しました。');
			});
	}


	//JSXで各コンポーネント記述、呼び出してDOM生成する
	//SearchForm, GeocodeReslut, Mapのコンポーネントを呼び出し
	render(){
		return(
			<div>
				<h1>緯度経度検索</h1>
			{/* SearchFormコンポーネントから、onSubmiイベントを通じて、入力された文字列を受け取っている */}
				<SearchForm onSubmit={ place => this.handlePlaceSubmit(place)} />
				<GeocodeResult
					//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, lat, lngにstateとしてセットされている
					address={this.state.address}
					location={this.state.location}
				/>
				<Map
					//handlePlaceSubmitによって、APIから受け取ったJSONの内容が、address, lat, lngにstateとしてセットされている
					location={this.state.location}
				/>
			</div>
			);
	}
}

export default App;

