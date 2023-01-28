declare module 'node-sdm' {
	import sdm from 'node-sdm';
	export function calculateCmacData(
		uid: string,
		ctr: number,
		key: Buffer
	): Buffer;

	export function calculateCmacBuffer(piccData: Buffer, key: Buffer): Buffer;
}
