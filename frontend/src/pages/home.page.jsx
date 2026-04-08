import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilter from "@/components/StartAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState("today");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            const data = await res.data;
            setTaskBuffer(data.tasks);
            setActiveTaskCount(data.activeCount);
            setCompleteTaskCount(data.completeCount);            
        } catch (error) {
            console.error("Loi xay ra khi truy xuat tasks, ", error);
            toast.error("Loi xay ra khi truy xuat tasks")
        }
    }

    const filteredTasls = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "complete":
                return task.status === "complete";
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasls.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    const totalPages = Math.ceil(filteredTasls.length / visibleTaskLimit);

    const handleTaskChange = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev -1 );
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }
    

    if (visibleTasks.length === 0) {
        handlePrev();
    }

    return (

        <div className="min-h-screen w-full bg-white relative">
            {/* Purple Gradient Grid Right Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
                radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)
            `,
                    backgroundSize: "96px 64px, 96px 64px, 100% 100%",
                }}
            />
            {/* Your Content/Components */}

            <div className="container pt-8 mx-auto relative zindex-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    <Header />

                    <AddTask handleNewTaskAdded={handleTaskChange} />

                    <StartAndFilter activeTaskCount={activeTaskCount} completedTaskCount={completeTaskCount} filter={filter} setFilter={setFilter} />

                    <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChange={handleTaskChange}/>

                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination 
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />

                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>

                    <Footer activeTaskCount={activeTaskCount} compltedTaskCount={completeTaskCount} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;