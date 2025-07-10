import React from 'react'

const Link = ({ href, children }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

export default Link