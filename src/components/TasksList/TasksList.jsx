import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {Box, Button, Container, IconButton, Modal, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "axios";


function TasksList() {
	const [tasks, setTasks] = useState([])
	const [visibleModal, setVisibleModal] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const getTasks = () => {
		axios.get('http://localhost:3004/tasks')
			.then(function (response) {
				setTasks(response.data);
			})
			.catch(function (error) {
				console.error(error);
			})
	}

	const onTaskChange = () => {
		getTasks();
	}

	const saveTask = (event) => {
		event.preventDefault();

		const newTask = {
			title,
			description,
			done: false,
		}

		axios.post('http://localhost:3004/tasks', newTask)
			.then(function (response) {
				getTasks();
				setVisibleModal(false);
				setTitle("");
				setDescription("");
			})
			.catch(function (error) {
				console.error(error);
			})
	}

	useEffect(() => {
		getTasks();
	}, [])

	return (
		<>
			<div className={styles.TasksWrapper}>
				<Container maxWidth="md">
					{tasks && tasks.map((task) => {
						return (
							<TaskListItem key={task.id} task={task} onChange={onTaskChange}/>
						)
					})}
				</Container>
			</div>

			<IconButton
				sizeMedium
				onClick={() => setVisibleModal(true)}
				className={styles.AddButton}
			>
				<AddIcon />
			</IconButton>

			<Modal
				open={visibleModal}
				onClose={() => {
					setVisibleModal(false);
					setTitle("");
					setDescription("");
				}}
				className={styles.Modal}
			>
				<Box className={styles.ModalBox}>
					<div>
						<h2 style={{width: "100%"}}>Add Task</h2>
						<form onSubmit={saveTask}>
							<TextField
								value={title}
								onChange={(val) => {setTitle(val.target.value)}}
								className={styles.ModalField}
								required
								label="Title"
							/>
							<TextField
								value={description}
								onChange={(val) => {setDescription(val.target.value)}}
								className={styles.ModalField}
								label="Description"
								multiline
								rows={4}
							/>
							<Button type="submit" className={styles.ModalButton} variant="contained">
								Save
							</Button>
						</form>
					</div>
				</Box>
			</Modal>
		</>
	);
}

export default TasksList;