import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./styles.module.scss"
import {default as axios} from "axios";


function TaskListItem({task, onChange}) {

	const onDelete = () => {
		axios.delete(`http://localhost:3004/tasks/${task.id}`)
			.then(function (response) {
				onChange();
			})
			.catch(function (error) {
				console.error(error);
			})
	}

	const onCheck = () => {
		const newVal = {...task, done: !task.done}

		axios.put(`http://localhost:3004/tasks/${task.id}`, newVal)
			.then(function (response) {
				onChange();
			})
			.catch(function (error) {
				console.error(error);
			})
	}

	return (
		<div className={styles.Task}>
			<Checkbox
				onClick={onCheck}
				className={styles.Checkbox}
				checked={task.done}
			/>

			<div className={styles.TextBlock}>
				<h3>{task.title}</h3>
				<p>{task.description}</p>
			</div>

			<IconButton
				className={styles.DeleteButton}
				onClick={onDelete}
				aria-label="delete"
				size="small"
			>
				<DeleteIcon fontSize="small" />
			</IconButton>
		</div>
	);
}

export default TaskListItem;