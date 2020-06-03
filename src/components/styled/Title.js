import React from 'react'

const Title = ({ children, ...props }) => (
    <h1 className="
        title
        inline text-4xl font-bold
        underline-teal-200 underline-thick bg-no-repeat
    " {...props}>
        {children}
    </h1>
)

export default Title
