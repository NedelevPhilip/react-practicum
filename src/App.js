import Header from "./components/Header/Header";
import Tasks from "./components/TasksList/TasksList";

import styles from './App.module.scss';


function App() {
  return (
    <div className={styles.App}>
      <Header/>
      <Tasks/>
    </div>
  );
}

export default App;
