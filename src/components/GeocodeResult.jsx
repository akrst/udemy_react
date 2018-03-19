import React from 'react';
import PropTypes from 'prop-types';


//親であるAppコンポーネントから、props（初期状態）として、address, location(lat, lng)を受け取っている
const GeocodeResult = ({address, location}) => (
		//JSXのクラスの付け方は、className=" "
		<ul className="geocode-result">
			<li>住所：<br/>{address}</li>
			<li>経度：{location.lat}</li>
			<li>緯度：{location.lng}</li>
		</ul>

	);
//GeocodeResultが受け取るpropの種類を定義
GeocodeResult.propTypes = {
	address: PropTypes.string,
	location: PropTypes.objectOf(PropTypes.number).isRequired,
};

//GeocodeResultのpropの初期値を設定
GeocodeResult.defaultProps = {
	address: '',
};

export default GeocodeResult;