import React, { useEffect, useRef, useState } from 'react'
import css from './NumberText.module.css'

const NumberText = ({ number }) => {
	const [display, setDisplay] = useState(0);
	const ref = useRef(0);
	const frame = useRef(null);

	useEffect(() => {
		const animate = () => {
			if (Math.abs(ref.current - number) > 0.1) {
				ref.current += (number - ref.current) * 0.25;
				frame.current = requestAnimationFrame(animate);
			} else {
				ref.current = number;
				cancelAnimationFrame(frame.current);
			}
			setDisplay(ref.current.toLocaleString(undefined, { maximumFractionDigits: 2 }).split("."));
		};

		cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(frame.current);
	}, [number]);

	return (
		<div className={css.text}>
			<span>{display[0]}</span>
			{display[1] && <span>.{display[1]}</span>}
		</div>
	)
}

export default NumberText