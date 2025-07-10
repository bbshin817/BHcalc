import React, { useRef, useState } from 'react'
import css from './Root.module.css'
import Container from './Components/Container'
import classNames from 'classnames'
import Projects from './database/projects.json'
import { getBhDelay, getCurrentTotalXP, getNextLevel, getNextTotalXP } from './Utils/Calc'
import NumberText from './Components/NumberText'
import Link from './Components/Link'

const Root = () => {
	const [result, setResultDirect] = useState({
		currentTotalXp : null,
		nextTotalXp : null,
		bhDelay : null,
		nextLevel : null
	});
	const ref = useRef({
		projectXp : null,
		currentLevel : null,
		score : null
	});

	const setResult = (key, value) => setResultDirect((prev) => ({
		...prev,
		[key] : value
	}));

	const resetResult = () => {
		[
			"currentTotalXp",
			"nextTotalXp",
			"bhDelay",
			"nextLevel"
		].map((key) => {
			setResult(key, null);
		});
	}

	const updateValue = (e, valueName) => {
		const value = e.target.value;
		if (valueName === 'projectXp' && !value)
		{
			ref.current.projectXp = null;
			resetResult();
			return ;
		}
		else if (
			(valueName === 'projectXp' && !value)
			|| (
				(valueName === 'currentLevel' || valueName === 'score')
				&& !/^([0-9]+)|([0-9]+\.[0-9]+)$/.test(value)
			)
		)
			return;
		ref.current[valueName] = value;
		if (ref.current.currentLevel)
			setResult('currentTotalXp', getCurrentTotalXP(ref.current.currentLevel));
		if (ref.current.currentLevel && ref.current.projectXp && ref.current.score)
		{
			setResult('nextTotalXp', getNextTotalXP(
				ref.current.currentLevel, ref.current.projectXp, ref.current.score
			));
			setResult('bhDelay', getBhDelay(
				ref.current.currentLevel, ref.current.projectXp, ref.current.score
			));
			setResult('nextLevel', getNextLevel(
				ref.current.currentLevel, ref.current.projectXp, ref.current.score
			));
		}
	}

	return (
		<Container className={classNames(css.container, css.outside)}>
			<Container className={classNames(css.container, css.inside)}>
				<h4>BH calc</h4>
				<form className={css.form}>
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								Project Name
							</div>
						</div>
						<div>
							<select onChange={(e) => updateValue(e, 'projectXp')} required>
								<option value=''>未選択</option>
								{Projects.map((project, index) => (
									<option key={`option-${index}`} value={project.xp}>{project.projectName}</option>
								))}
							</select>
						</div>
					</Container>
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								Current Level
							</div>
						</div>
						<div>
							<input type='number' onKeyUp={(e) => updateValue(e, 'currentLevel')} placeholder='3.17' required />
						</div>
					</Container>
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>Succeeded Ratio</div>
						</div>
						<div>
							<input type='number' onKeyUp={(e) => updateValue(e, 'score')} placeholder='125' required />
						</div>
					</Container>
				</form>
				<div className={css.line}></div>
				<Container className={css.result}>
					{/* <Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								Current Total XP
							</div>
						</div>
						<div>
							{result.currentTotalXp ?
							<NumberText number={result.currentTotalXp} />
							:
							<div className={classNames(css.body, css.b075)}>--</div>}
						</div>
					</Container>
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								Next Total XP
							</div>
						</div>
						<div>
							{result.nextTotalXp ?
							<NumberText number={result.nextTotalXp} />
							:
							<div className={classNames(css.body, css.b075)}>--</div>}
						</div>
					</Container> */}
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								BH Delay
							</div>
						</div>
						<div>
							{result.bhDelay ?
							<NumberText number={result.bhDelay} />
							:
							<div className={classNames(css.body, css.b075)}>--</div>}
						</div>
					</Container>
					<Container className={css.table}>
						<div>
							<div className={classNames(css.columnName, css.b09)}>
								Next Level
							</div>
						</div>
						<div>
							{result.nextLevel ?
							<NumberText number={result.nextLevel} />
							:
							<div className={classNames(css.body, css.b075)}>--</div>}
						</div>
					</Container>
				</Container>
				<div className={css.thanks}>
					<Link href='https://medium.com/@benjaminmerchin/42-black-hole-deep-dive-cbc4b343c6b2'>Benjamin Merchin</Link>
					<Link href='https://docs.google.com/spreadsheets/d/1ph1QWcWzDnCyP-N02LwHhq27Ic9T84TUGJZtjhXFG68/edit?gid=0#gid=0'>ykosaka</Link>
					<Link>sbaba</Link>
				</div>
			</Container>
		</Container>
	)
}

export default Root