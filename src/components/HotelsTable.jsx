import React from 'react';
import PropTypes from 'prop-types';

import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';

const HotelsTable = ({ hotels, onSort, sortKey }) => (
		<table>
			<tbody>
				<tr>
					<th>画像</th>
					<th>ホテル名</th>
					<HotelsClickableTh
						label="値段"
						sortKey="price"
						isSelected={sortKey === 'price'}
						onSort={ key => onSort(key)}
					/>
					<HotelsClickableTh
						label="レビュー"
						sortKey="reviewAverage"
						isSelected={sortKey === 'reviewAverage'}
						onSort={ key => onSort(key)}
					/>
					<th>レビュー件数</th>
					<th>距離</th>
				</tr>
				{/* JSX内でJavaScriptを呼び出す際は、波括弧で囲む*/}
				{/* 引数hotelをHotelRowコンポーネントにpropsとして渡している。ショートハンド使用*/}
				{/* hotelsという配列に対して、map関数を使用。HotelRowコンポーネントを予備出す関数をhotels配列のすべての要素に対して呼び出し、その結果から新しい配列を生成している*/}
				{hotels.map(hotel => (<HotelRow key={hotel.id} hotel={hotel}/>))}
			</tbody>

		</table>
	);
//GeocodeResultが受け取るpropの種類を定義
HotelsTable.propTypes = {
	hotels: PropTypes.arrayOf(PropTypes.any),
	sortKey: PropTypes.string.isRequired,
	onSort: PropTypes.func.isRequired,
};


//GeocodeResultのpropの初期値を設定
HotelsTable.defaultProps = {
	hotels: [],
};

export default HotelsTable;