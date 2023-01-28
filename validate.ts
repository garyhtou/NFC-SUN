import sdm from 'node-sdm';

export function validate(key: string, uid: string, ctr: string, cmac: string) {
	const keyBuf = Buffer.from(key, 'hex');
	const c = parseInt(ctr, 16);

	const actualCmac = sdm
		.calculateCmacData(uid, c, keyBuf)
		.toString('hex')
		.toUpperCase();

	return actualCmac === cmac;
}
