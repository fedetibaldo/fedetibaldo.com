import React from 'react'

const Title = ({ children, ...props }) => (
    <h1 className="title text-4xl font-bold" {...props}>
        <span className="underline-teal-200 underline-thick bg-no-repeat">
            {children}
        </span>
    </h1>
)

export default Title
