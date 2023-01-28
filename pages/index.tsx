import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { validate } from '../validate';

export default function Home({
	authenticated,
	mirrors,
	message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>NFC SUN Validation</title>
				<meta
					name='description'
					content='NFC SUN (SDM) Validation for NTAG 424 DNA'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<main className={styles.main}>
				<div className={styles.description}>
					<p>NFC SUN Validation</p>
				</div>
				<div className={styles.center}>
					<p
						className={styles.hero}
						style={{ color: authenticated ? '#4BB543' : 'red' }}
					>
						{authenticated ? 'AUTHENTICATED' : 'ACCESS DENIED'}
					</p>
				</div>

				<div className={styles.grid}>
					<div className={styles.card}>
						<h2>Tag ID</h2>
						<p>{mirrors.uid}</p>
					</div>

					<div className={styles.card}>
						<h2>Interaction Counter</h2>
						<p>{mirrors.c}</p>
					</div>

					<div className={styles.card}>
						<h2>CMAC</h2>
						<p>{mirrors.cmac}</p>
					</div>
				</div>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const mirrors = getMirrors(context);
	const { uid, c, cmac } = getMirrors(context);

	if (!uid || !c || !cmac) {
		return authResponse(
			false,
			mirrors,
			"Missing 'uid', 'c', or 'cmac' query parameters"
		);
	}

	const KEY = process.env.CMAC_KEY || '0'.repeat(32); // default key
	const authenticated = validate(KEY, uid, c, cmac);

	return authResponse(authenticated, mirrors);
};

const getMirrors = (context: GetServerSidePropsContext) => {
	const uid = (context.query.uid || context.query.id)?.toString() || null; // Tag ID
	const c = (context.query.ctr || context.query.c)?.toString() || null; // Interaction Counter
	const cmac = (context.query.cmac || context.query.m)?.toString() || null; // AES CMAC (Message Authentication Code)

	return { uid, c, cmac };
};

const authResponse = (
	authenticated: boolean,
	mirrors: ReturnType<typeof getMirrors>,
	message?: string
) => {
	return {
		props: {
			authenticated,
			mirrors,
			message: message || null,
		},
	};
};
