import { useEffect, useState } from 'react';
import TaskItem from '../Components/TaskItem';
import { tasksApi } from '../Api/tasks.Api';
import { Task } from '../Components/Type';

export default function Farming() {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const tasksList: Task[] = await tasksApi.getTasksList();
        setTasks(tasksList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasksList();
  }, []);

  if (!tasks) {
    return <div></div>;
  }
  return (
    <div className="farming-countainer">
      <div className="farming-main-div">
        <div className="farming-title">
          <h1 className="farming-h1">Фарминг</h1>
        </div>

        <div className="farming-list-div">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskItem key={task.id} data={task} />)
          ) : (
            <div
              style={{
                height: '90vh',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <p
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
                }}
              >
                Ожидайте появление новых задач
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
