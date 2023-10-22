interface Position {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export async function getGeolocationCoords() {
	let coordinates: [number, number] | [] = [];

	if (navigator.geolocation) {
		try {
			const { coords } = await new Promise<Position>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			coordinates = [coords.latitude, coords.longitude];
		} catch (error) {
			console.error(error);
		}
	}

	return coordinates;
}

export function isDistanceLowerThan(a: [number, number], b: [number, number], distance: number) {
	const distanceSquared = Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
	return Math.sqrt(distanceSquared) < distance;
}
