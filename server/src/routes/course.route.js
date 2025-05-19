const express = require('express');
const { createCourse, findCourse ,findCourseById, addChapter,deleteChapter, fetchAllCourseByUser, deleteCourseById} = require('../controllers/course.controller');
const { requireAuth } = require("@clerk/express");
const upload = require("../middleware/cloudinary.upload");
const { addLecture,deleteLecture } = require('../controllers/lecture.controller');
const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  requireAuth(),
  upload.single('thumbnail'), // Field name should match your frontend
  createCourse
);

courseRouter.get('/fetch-eductor-course', requireAuth(),findCourse)
courseRouter.get('/course-details/:id',findCourseById)
courseRouter.post('/add-new-chapter/:id',requireAuth(),addChapter)
courseRouter.delete('/course/:id/chapter/:chapterId',requireAuth(), deleteChapter);
courseRouter.post('/courses/:id/chapters/:chapterId/lectures',requireAuth(), addLecture);
courseRouter.delete('/course/:id/chapter/:chapterId/lecture/:lectureId',requireAuth(), deleteLecture);

// users fetch course

courseRouter.get('/fetch-all-courses',fetchAllCourseByUser)


courseRouter.delete('/course-delete/:id', requireAuth(), deleteCourseById)

module.exports = { courseRouter };