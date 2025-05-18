import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollment from "./pages/student/MyEnrollment";
import Player from "./pages/student/Player";
import Dashboard from "./pages/educator/Dashboard";
import AddCourseDetails from "./pages/educator/AddCourseDetails";
import StudentEnroll from "./pages/educator/StudentEnroll";
import Navbar from "./components/student/Navbar";
import Footer from "./components/student/Footer";
import { useUser } from "@clerk/clerk-react";
import MyCourses from "./pages/educator/MyCourses";
import CourseEduDetails from "./pages/educator/CourseEduDetails";
import AddLecturePage from "./pages/educator/AddLecturePage";

const App = () => {
  const { user } = useUser();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/my-course" element={<MyEnrollment />} />
        <Route path="/player" element={<Player />} />
        {user && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-course" element={<AddCourseDetails />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="student-enroll" element={<StudentEnroll />} />
            <Route path="courses/details/:id" element={<CourseEduDetails />} />
            <Route path="add-lecture/:id/:chapterId" element={<AddLecturePage />} />
          </Route>
        )}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
