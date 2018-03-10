import axios from 'axios';

//APIの呼び出しのエンドポイントを変数に代入
const GEOCODE_ENDPOINT ='https://maps.googleapis.com/maps/api/geocode/json';

export const geocode = place =>
	axios
	//第一引数でAPIを指定し、第二引数でparams: {address: place}に引数からplaceの情報を渡して、その場所の地図情報などをAPIからresultsとして受けっている。
	.get(GEOCODE_ENDPOINT, { params: { address: place } })
	//APIから受け取った情報がresultsの中に格納されている
	.then((results) => {	//無名関数のアロー関数として一連の流れ（変数にリザルトを簡潔にまとめた後、スイッチ文でstatusによってsetStateの値を分岐させている。）を定義
		const data = results.data;
		const status = data.status;
		const result = data.results[0];

		if(typeof result === 'undefined'){
			return {status};
		}
		const address = result.formatted_address; //変数addressの中に代入することで、App.jsxで使用する際にシンプルかつ、ショートハンドでの記述が可能に
		const location = result.geometry.location; //変数loactionの中に代入することで、App.jsxで使用する際にシンプルかつ、ショートハンドでの記述が可能に
		return {status, address, location};
	})
;

export const reverseGeocode = () => null;