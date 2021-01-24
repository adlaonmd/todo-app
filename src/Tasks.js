const Tasks = (props) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return ( 
        <ul className="tasks">
            { props.tasks.map((task) => {
                const date = new Date();
                return (
                    <li key={task.id}>
                        <div className="task-details">
                        <p className="task-title">{task.title}</p>
                        <small>{ months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() }</small>
                        </div>
                        <button id={task.id} type="button" className="delete-button" onClick={() => props.deleteItem(task.id)}>&#10006;</button>
                        
                    </li>
                );
            }) }
        </ul>
     );
}
 
export default Tasks;
