export const generateSuffix = () =>
	Math.floor(Math.random() * Math.pow(16, 4)).toString(16);

export type DistributivePick<T, K extends keyof T> = T extends any
	? Pick<T, K>
	: never;
