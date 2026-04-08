import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { handleKeyPress } from "@/lib/utils";

const AddTask = ({handleNewTaskAdded}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`Task "${newTaskTitle}" da duoc them vao`);
                handleNewTaskAdded();
            } catch (error) {
                console.error("Loi xay ra khi them task ", error);
                toast.error("Loi xay ra khi them task moi");
            }
            setNewTaskTitle("");
        } else {
            toast.error("Vui long nhap noi dung cua task");
        }
    }

    return (
        <Card className={"p-6 border-0 bg-gradient-card shadow-customer-lg"}>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input 
                    type="text" 
                    placeholder="Can phai lam gi?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/200"
                    value={newTaskTitle}
                    onChange={ (even) => setNewTaskTitle(even.target.value) }
                    onKeyPress={(event) => handleKeyPress(event, addTask)}/>

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus size={5}/>Them
                </Button>
            </div>
        </Card>
    );
}

export default AddTask;