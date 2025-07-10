import XpByLevel from '../database/xpByLevel.json'

export const getCurrentTotalXP = (currentLevel) => {
	const floor = Math.floor(currentLevel);
	const ceil = Math.ceil(currentLevel);
	const total = XpByLevel[floor].total;
	const required = XpByLevel[ceil].required;

	const ratio = currentLevel - floor;
	return (total + required * ratio);
}

export const getNextTotalXP = (currentLevel, projectXP, score) => {
	const currentTotalXp = getCurrentTotalXP(currentLevel);
	return (currentTotalXp + projectXP * score / 100);
}

export const getBhDelay = (currentLevel, projectXP, score) => {
	const currentTotalXp = getCurrentTotalXP(currentLevel);
	const nextTotalXp = getNextTotalXP(currentLevel, projectXP, score);
	const normalizedNext = Math.pow(Math.min(nextTotalXp, 78908) / 49980, 0.45);
	const normalizedCurrent = Math.pow(currentTotalXp / 49980, 0.45);

	const bonus = (normalizedNext - normalizedCurrent) * 483;
	return (Math.max(bonus, 0))
}

export const getNextLevel = (currentLevel, projectXP, score) => {
	const nextTotalXp = getNextTotalXP(currentLevel, projectXP, score);
	let level = 0;
	for (let i = 0; i < XpByLevel.length; i++) {
		if (nextTotalXp < XpByLevel[i].total) {
			level = i - 1;
			break;
		}
		if (i === XpByLevel.length - 1) {
			level = i;
		}
	}
	const start = XpByLevel[level].total;
	const required = XpByLevel[level + 1]?.required ?? 1;
	const progress = (nextTotalXp - start) / required;
	return level + progress;
}