import React from 'react'

const Title = ({ children, ...props }) => (
    <h1 className="
        title
        inline-block text-4xl font-bold
        bg-image-teal-200 bg-thick bg-no-repeat
    " {...props}>
        {children}
    </h1>
)

export default Title
