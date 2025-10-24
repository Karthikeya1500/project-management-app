import React, { useEffect, useState } from "react";
import { 
  Home, FolderKanban, FileText, CheckSquare, CalendarDays, 
  BarChart3, FileStack, Settings, Search, Bell, HelpCircle
} from "lucide-react";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Landing Page", type: "UI/UX Design", deadline: "2025-10-30T15:30:00", completed: 2, total: 5 },
    { id: 2, title: "Database Optimization", type: "Backend Task", deadline: "2025-10-28T12:00:00", completed: 4, total: 4 },
    { id: 3, title: "Marketing Strategy Draft", type: "Planning", deadline: "2025-11-01T10:00:00", completed: 1, total: 3 },
  ]);

  const [countdowns, setCountdowns] = useState({});
  const [weeklyProgress] = useState(72);
  const [notifications] = useState([
    { id: 1, text: "New project 'Ecom Site' added", time: "2h ago" },
    { id: 2, text: "Task 'Wireframes' marked complete", time: "5h ago" },
    { id: 3, text: "Team meeting scheduled for Friday", time: "1d ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newCountdowns = {};
      tasks.forEach((task) => {
        const distance = new Date(task.deadline).getTime() - now;
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          newCountdowns[task.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newCountdowns[task.id] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const totalProjects = tasks.length;
  const activeTasks = tasks.filter((t) => t.completed < t.total).length;
  const completedTasks = tasks.filter((t) => t.completed === t.total).length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2 className="site-name">Project Manager</h2>
        <aside className="left-panel">
                <nav className="sidebar-nav">
                    <div className="navbar">
                        <a href="#" className="active"><Home size={20}/> Dashboard</a>
                        <a href="#"><FolderKanban size={20}/> Projects</a>
                        <a href="#"><FileText size={20}/> Project Detail</a>
                        <a href="#"><CheckSquare size={20}/> Task Detail</a>
                    </div>
                    <a href="#"><CalendarDays size={20}/> Calendar</a>
                    <a href="#"><BarChart3 size={20}/> Reports</a>
                    <a href="#"><FileStack size={20}/> Files</a>
                </nav>
            <div className="sidebar-footer">
                <a href="#"><HelpCircle size={20}/> Help & Settings</a>
            </div>
        </aside>

        <div className="divider"></div>

        {/* Main Content */}
        <div className="main-content">
            <div className="dashboard-top">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>

                <div className="top-right">
                    <div className="icon"><Settings size={18} /></div>
                    <div className="icon"><Bell size={18} /></div>
                    <div className="profile">
                    <span>David Muller</span>
                    <img src="https://i.pravatar.cc/40" alt="Profile" />
                    </div>
                </div>
            </div>

            <div className="divider1"></div>

            <header className="dashboard-header">
                <p>Here’s what’s happening with your projects today.</p>
            </header>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-card total">
              <h3>Total Projects</h3>
              <p>{totalProjects}</p>
            </div>
            <div className="stat-card active">
              <h3>Active Tasks</h3>
              <p>{activeTasks}</p>
            </div>
            <div className="stat-card completed">
              <h3>Completed Tasks</h3>
              <p>{completedTasks}</p>
            </div>
            <div className="stat-card progress">
              <h3>Weekly Progress</h3>
              <div className="circular-progress">
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle
                    cx="35"
                    cy="35"
                    r="35"
                    style={{ strokeDashoffset: 220 - (220 * weeklyProgress) / 100 }}
                  ></circle>
                </svg>
                <div className="number">{weeklyProgress}%</div>
              </div>
            </div>
          </div>

          {/* Tasks & Widgets */}
          <div className="main-grid">
            <section className="upcoming-section">
              <h2>Upcoming Deadlines</h2>
              <div className="tasks-grid">
                {tasks.map(task => (
                  <div className="task-card" key={task.id}>
                    <h3>{task.title}</h3>
                    <p className="type">{task.type}</p>
                    <p className="deadline">
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </p>
                    <div className="countdown">
                      ⏰ {countdowns[task.id] || "Loading..."}
                    </div>
                    <div className="progress-container">
                      <div className="progress-info">
                        <span>Progress</span>
                        <span>{task.completed}/{task.total}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${(task.completed/task.total)*100}%`}}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="sidebar-widgets">
              <div className="widget-card">
                <h3>Recent Updates</h3>
                <ul>
                  {notifications.map(n => (
                    <li key={n.id}>
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget-card">
                <h3>Weekly Activity</h3>
                <div className="activity-bars">
                  {[40, 60, 80, 30, 50, 70, 20].map((val, idx) => (
                    <div key={idx} className="bar">
                      <div className="bar-fill" style={{height: `${val}%`}}></div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
