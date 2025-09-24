import React, { useState, useEffect } from "react";
import { createTasksRangeApi, markTasksCompletedApi } from "../../../services/api/taskApi";
import { useTaskStore } from "../../../store/taskStore";
import { useStatsStore } from "../../../store/statsStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledEngineProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import TaskCreateTab from "./TaskCreateTab";
import TaskAttendanceTab from "./TaskAttendanceTab";
import TaskEditorTab from "./TaskEditorTab";

export default function TaskModal({ open, onClose, selectedDate }) {
  const { tasks, fetchTasksByDate, addTaskDate, updateTasksCompleted, fetchYearlyStats, updateTask, deleteTask, removeTaskDateIfEmpty } = useTaskStore();
  const { fetchStats, fetchTopTasks } = useStatsStore();
  const [activeTab, setActiveTab] = useState("create");
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateEnd: selectedDate,
  });
  const [loading, setLoading] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [editTitles, setEditTitles] = useState({});


  useEffect(() => {
    if (open) {
      setForm({
        title: "",
        description: "",
        dateEnd: selectedDate,
      });
    }
  }, [open, selectedDate]);

  useEffect(() => {
    if (open && activeTab === "attendance" && selectedDate) {
      const formattedDate =
        typeof selectedDate === "string"
          ? selectedDate
          : new Date(selectedDate).toISOString().split("T")[0]; // YYYY-MM-DD
      fetchTasksByDate(formattedDate);
    }
  }, [open, activeTab, selectedDate, fetchTasksByDate]);

  if (!open) {
    return null;
  }

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      await createTasksRangeApi({
        ...form,
        createdAt: selectedDate,
      });
      addTaskDate(selectedDate);
      await fetchStats();
      const currentYear = new Date().getFullYear();
      await fetchYearlyStats(currentYear);
      await fetchTopTasks(currentYear);
      await fetchTasksByDate(
        typeof selectedDate === "string"
          ? selectedDate
          : new Date(selectedDate).toISOString().split("T")[0]
      );
      toast.success("Tạo task thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Tạo task thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleMarkCompleted = async () => {
    try {
      setLoading(true);
      const taskIds = Object.keys(checkedTasks).filter((id) => checkedTasks[id]);
      if (taskIds.length === 0) {
        toast.error("Hãy chọn ít nhất 1 task để hoàn thành!");
        return;
      }
      await markTasksCompletedApi(taskIds);
      updateTasksCompleted(taskIds);
      await fetchStats();
      const currentYear = new Date().getFullYear();
      await fetchYearlyStats(currentYear);
      await fetchTopTasks(currentYear);
      toast.success("Điểm danh thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Điểm danh thất bại!");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateTask = async (taskId) => {
    try {
      setLoading(true);
      const newTitle = editTitles[taskId];
      if (!newTitle) {
        toast.error("Tiêu đề không được để trống");
        return;
      }
      await updateTask(taskId, { title: newTitle });
      toast.success("Cập nhật task thành công");
      const currentYear = new Date().getFullYear();
      await fetchYearlyStats(currentYear);
      await fetchTopTasks(currentYear);
      await fetchTasksByDate(
        typeof selectedDate === "string" ? selectedDate : new Date(selectedDate).toISOString().split("T")[0]
      );
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await deleteTask(taskId);
      toast.success("Xóa task thành công");
      await fetchStats();
      const currentYear = new Date().getFullYear();
      await fetchYearlyStats(currentYear);
      await fetchTopTasks(currentYear);
      await fetchTasksByDate(
        typeof selectedDate === "string"
          ? selectedDate
          : new Date(selectedDate).toISOString().split("T")[0]
      );
      removeTaskDateIfEmpty(selectedDate);
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neutral-900 text-white rounded-xl shadow-lg w-[420px] p-5 z-10">
        {/* Tabs */}
        <div className="flex border-b border-neutral-700 mb-4">
          <button
            className={`flex-1 py-2 text-sm ${activeTab === "create" ? "border-b-2 border-emerald-500 text-emerald-400 font-semibold" : "text-gray-400 hover:text-gray-200"}`}
            onClick={() => setActiveTab("create")}
          >
            Tạo Task
          </button>
          <button
            className={`flex-1 py-2 text-sm ${activeTab === "attendance" ? "border-b-2 border-emerald-500 text-emerald-400 font-semibold" : "text-gray-400 hover:text-gray-200"}`}
            onClick={() => setActiveTab("attendance")}
          >
            Điểm danh
          </button>
          <button
            className={`flex-1 py-2 text-sm ${activeTab === "editor" ? "border-b-2 border-emerald-500 text-emerald-400 font-semibold" : "text-gray-400 hover:text-gray-200"}`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
        </div>

        {/* Nội dung tab */}
        {activeTab === "create" && (
          <TaskCreateTab
            form={form}
            setForm={setForm}
            handleCreateTask={handleCreateTask}
            loading={loading}
          />
        )}
        {activeTab === "attendance" && (
          <TaskAttendanceTab
            tasks={tasks}
            checkedTasks={checkedTasks}
            handleCheckboxChange={handleCheckboxChange}
            handleMarkCompleted={handleMarkCompleted}
            loading={loading}
          />
        )}
        {activeTab === "editor" && (
          <TaskEditorTab
            tasks={tasks}
            editTitles={editTitles}
            setEditTitles={setEditTitles}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            loading={loading}
          />
        )}

        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
    </div>
  );
}