const imageSharp = (props, propName, componentName) => {
	const prop = props[propName]
	if (prop && typeof prop?.childImageSharp !== `object`) {
		return new Error(
			`Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
		)
	}
}
imageSharp.orString = (props, propName, componentName) => {
	if (typeof props[propName] !== `string`) {
		return imageSharp(props, propName, componentName)
	}
}

export default { imageSharp }
