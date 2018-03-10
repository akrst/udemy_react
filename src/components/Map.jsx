import React from 'react';
import PropTypes from 'prop-types';


import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
	//InnerMapコンポーネント
	const InnerMap = withGoogleMap(({location, marker}) => (
			<GoogleMap
				defaultZoom={12}
				defaultCenter={location}
				center ={location}
			>
			<Marker {...marker} />
			</GoogleMap>

		));
	//Mapコンポーネント
	//引数が二つlocation（lat, lng）あるから、()で囲っている
	const Map = ({location}) =>(
		//Inner Mapコンポーネントを呼び出し
			<InnerMap
				containerElement={(<div />)}
				mapElement={(<div className='map'/>)}
				location={location}
				marker={{position: location}}
			/>
		);

// propTypesはnumberに設定、必須設定。デフォルトの値は親であるAppコンポーネントから受け取る。
Map.propTypes = {
	location: PropTypes.objectOf(PropTypes.number).isRequired,
};



//Mapを外から呼び出し可能に
export default Map;