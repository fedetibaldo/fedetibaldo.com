import React from 'react'

const Title = ({ children, ...props }) => (
    <h1 className="text-teal-500" {...props}>
        {children}
    </h1>
)

export default Title
