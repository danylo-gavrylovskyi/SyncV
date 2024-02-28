import React from "react";

import styles from "./Header.module.css";

export const Header = () => {
	return (
		<header>
			<nav className={styles.navbar}>
				<a className={styles.homeLink} href="/">
					SyncV
				</a>
			</nav>
		</header>
	);
};
