export default dimensions => {
	if (!dimensions.height || !dimensions.width) {
		throw new Error(
			'landscape method requires an object with properties height and width'
		)
	}
	if (dimensions.height < dimensions.width) {
		return 'landscape'
	}
	return 'portrait'
}
