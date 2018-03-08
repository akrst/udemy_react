import React, {PropTypes} from 'react';

const GeocodeResult = ({address, lat, lng}) => (
		<ul className="geocode-result">
			<li>住所：<br/>{address}</li>
			<li>経度：{lat}</li>
			<li>緯度：{lng}</li>
		</ul>

	);
GeocodeResult.propTypes = {
	address: PropTypes.string,
	lat: PropTypes.number,
	lng: PropTypes.number,
};

GeocodeResult.defaultProps = {
	address: '',
	lat: 0,
	lng: 0,
};

export default GeocodeResult;