import { useLocation } from "react-router-dom";
import '../../css/SpecialFunction/SmartAssist.css';
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherData from "./WeatherData";

const WeatherDetails = () => {
    const location = useLocation();
    const detail = location.state;
    const [weathers, setWeather] = useState([]);
    const [tasks, setTasks] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    if (!detail) {
        return <p>Details not found</p>;
    }

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather/${detail.location}`);
                setWeather(response.data.list);
            } catch (err) {
                console.error("Error fetching weather data:", err);
            }
        }
        fetchWeather();
    }, [detail]); 
    
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/`, {
                    params: {
                        crop_name: detail.crop_name,
                        location: 'Sri Lanka'
                    }
                });
                setTasks(response.data); 
                console.log(response.data);
                // Set the default selected period (first month)
                if (response.data.tasks.length > 0) {
                    setSelectedPeriod(response.data.tasks[0].period);
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        }
        fetchTasks();
    }, []); 

    return (
        <div className="assist">
            <div className="assist-container">
                <h1 className="weather-location">Weather Information</h1>
                <p className="weather-sub">Your Location: {detail.location}</p>

                {weathers.length > 0 ? (
                    <div className="weather-list">
                        {weathers.map((weather, index) => {
                            const dayIndex = index + 1; 
                            const day = [1, 2, 3, 4, 5, 6, 7].includes(dayIndex) ? dayIndex : null;
                            return day ? (
                                <WeatherData
                                    key={index}
                                    day={day}
                                    temp={weather.temp.day}
                                    desc={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                />
                            ) : null;
                        })}
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}

                <hr />

               
                <nav className="period-nav">
                    {tasks?.tasks?.map((task) => (
                        <button
                            key={task._id}
                            className={`period-btn ${selectedPeriod === task.period ? "active" : ""}`}
                            onClick={() => setSelectedPeriod(task.period)}
                        >
                            {task.period}
                        </button>
                    ))}
                </nav>

                {/* Task List for Selected Period */}
                <div className="task-container">
                    <h3>Tasks</h3>
                    {tasks?.tasks?.map((task) =>
                        task.period === selectedPeriod ? (
                            <div key={task._id} className="task-card">
                                <ul>
                                    {task.task_list.map((item, i) => (
                                        <li className="task-item" key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}    

export default WeatherDetails;
