import {Container} from "@mui/material";

import styles from "./styles.module.scss"

function Header() {
	return (
		<div className={styles.Header}>
			<Container maxWidth="md">
				<div className={styles.Logo}>
					Task Manager
				</div>
			</Container>
		</div>
	);
}

export default Header;