import React, { useRef, useState } from 'react'
import CustomPropTypes from '../../utils/customPropTypes'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const Image = ({ image, alt, fixed, style = {}, className = ``, ...props }) => {
	const fluid = !fixed
	const imgRef = useRef()
	const [dimensions, setDimensions] = useState({ width: 1, height: 1 })

	const updateDimensions = () => {
		setDimensions({
			width: getWidth(imgRef.current),
			height: getHeight(imgRef.current),
		})
	}

	const getWidth = (imgEl) => {
		if (style.width) {
			return parseFloat(style.width)
		}
		const naturalWidth = imgEl.naturalWidth
		if (style.height) {
			const naturalHeight = imgEl.naturalHeight
			const width = (naturalWidth * parseFloat(style.height)) / naturalHeight
			return width
		}
		return naturalWidth
	}
	const getHeight = (imgEl) => {
		if (style.height) {
			return parseFloat(style.height)
		}
		const naturalHeight = imgEl.naturalHeight
		if (style.width) {
			const naturalWidth = imgEl.naturalWidth
			const height = (naturalHeight * parseFloat(style.width)) / naturalWidth
			return height
		}
		return naturalHeight
	}

	return (
		<>
			{typeof image === `string` ? (
				<div
					className={`
            relative overflow-hidden
            ${fixed ? `inline-block` : ``}
            ${className}
          `}
					style={{
						width: fixed ? dimensions.width : null,
						height: fixed ? dimensions.height : null,
						...style,
					}}
				>
					{fluid ? (
						<div
							className="w-full"
							style={{
								paddingBottom: `${(dimensions.height / dimensions.width) * 100}%`,
							}}
							aria-hidden="true"
						/>
					) : null}
					<img
						ref={imgRef}
						className="
              absolute top-0 left-0 w-full h-full
              object-cover object-center
            "
						onLoad={updateDimensions}
						src={image}
						alt={alt}
						{...props}
					/>
				</div>
			) : (
				<Img
					className={`max-w-full ${className}`}
					style={style}
					fixed={fixed && image.childImageSharp.fixed}
					fluid={fluid && image.childImageSharp.fluid}
					alt={alt}
					{...props}
				/>
			)}
		</>
	)
}

Image.propTypes = {
	image: CustomPropTypes.imageSharp.orString,
	alt: PropTypes.string,
	fixed: PropTypes.bool,
	style: PropTypes.object,
	className: PropTypes.string,
}

export default Image
