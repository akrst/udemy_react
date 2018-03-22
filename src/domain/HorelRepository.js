import geolib from 'geolib';

import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = '1040862501043616211';

//locationの値をApp（元はgeocoderから受けとたったもの）を受け取りAPIを叩いて、id, name, urlを受け取って呼び出し元に(hotelステイトに入れるために)返している
export const searchHotelByLocation = (location) => {
	const params = {
		applicationId: RAKUTEN_APP_ID,
		datumType: 1,
		latitude: location.lat,
		longitude: location.lng,
	};
	return Rakuten.Travel.simpleHotelSearch(params)
		.then(result =>
			result.data.hotels.map((hotel)=>{
				const basicInfo = hotel.hotel[0].hotelBasicInfo;
				const distance = geolib.getDistance(
					{latitude: location.lat, longitude: location.lng },
					{latitude: basicInfo.latitude, longitude: basicInfo.longitude },
				);
				return {
					id: basicInfo.hotelNo,
					name: basicInfo.hotelName,
					url: basicInfo.hotelInformationUrl,
					thumbUrl: basicInfo.hotelThumbnailUrl,
					price: basicInfo.hotelMinCharge,
					reviewAverage: basicInfo.reviewAverage,
					reviewCount: basicInfo.reviewCount,
					distance, //ショートハンド
				};

			}),
		);
};