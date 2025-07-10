import React from 'react'
import css from './Container.module.css'
import classNames from 'classnames'

const Container = ({ children, className }) => (
	<div className={classNames(css.container, className)}>
		{children}
	</div>
)

export default Container