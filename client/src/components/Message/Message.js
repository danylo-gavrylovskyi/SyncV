import React from "react";

import styles from "./Message.module.css";

export const Message = (props) => {
	return props.user !== null ? (
		<div className={styles.container}>
			<p className={styles.user}>{props.user}</p>
			<p className={styles.text}>{props.children}</p>
		</div>
	) : (
		<div className={styles.container}>
			<p className={styles.text}>{props.children}</p>
		</div>
	);
};
