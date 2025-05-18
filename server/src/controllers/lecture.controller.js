const Course = require("../models/course.model");
const handleError = require("../services/handleErrors");


const addLecture = async (req, res, next) => {
  try {
    const { id, chapterId } = req.params;
    const { lectures } = req.body;
    const educator = req.auth.userId;

   
    const existCourse = await Course.findOne({ _id: id, educator: educator });
    if (!existCourse) {
      throw handleError(404, "Course not found or unauthorized access.");
    }

    const findChapter = existCourse.chapters.id(chapterId);
    if (!findChapter) {
      throw handleError(404, "Chapter not found.");
    }

    if (!Array.isArray(lectures) || lectures.length === 0) {
      throw handleError(400, "Lectures array is required.");
    }

    console.log(lectures)
    // Add all lectures
    lectures.forEach((lecture) => {
      const { lectureOrder, lectureTitle, lectureUrl } = lecture;

      if (!lectureOrder || !lectureTitle || !lectureUrl) {
        throw handleError(400, "Each lecture must have order, title, and URL.");
      }

      findChapter.lectures.push({
        lectureOrder,
        lectureTitle,
        lectureUrl,
      });
    });

    await existCourse.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Lectures added successfully.",
      data: findChapter.lectures,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const { id, chapterId, lectureId } = req.params;
    const educator = req.auth.userId;

    const course = await Course.findOne({ _id: id, educator });
    if (!course) {
      throw handleError(404, "Course not found or unauthorized access.");
    }

    const chapter = course.chapters.id(chapterId);
    if (!chapter) {
      throw handleError(404, "Chapter not found.");
    }

    // Find and remove lecture
    chapter.lectures.pull({ _id: lectureId }); // Changed from lecture.remove()

    await course.save({ validateBeforeSave: false }); // Added validation skip

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully.",
      data: chapter.lectures,
    });
  } catch (error) {
    console.error('Detailed error:', error);
    next(error);
  }
};


module.exports = { addLecture, deleteLecture };
