const Course = require("../models/course.model");
const handleError = require("../services/handleErrors");
const { cloudinary } = require("../utils/cloudinary.config");

const createCourse = async (req, res, next) => {
  try {
    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch (parseError) {
      throw handleError(400, "Invalid course data format");
    }

    const educator = req.auth.userId;

    const requiredFields = [
      "course_id",
      "courseTitle",
      "courseDescription",
      "coursePrice",
      "chapters",
    ];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        throw handleError(400, `${field} is required`);
      }
    }

    courseData.coursePrice = Number(courseData.coursePrice);
    courseData.courseDiscount = Number(courseData.courseDiscount) || 0;

    const existCourse = await Course.findOne({
      course_id: courseData.course_id,
    });

    if (existCourse) {
      throw handleError(400, "Course already exists");
    }

    let thumbnailData = {};
    if (req.file) {
      thumbnailData = {
        courseThumbnail: req.file.path,
        thumbnail_pub_id: req.file.filename,
      };
    }

    const newCourse = await Course.create({
      ...courseData,
      ...thumbnailData,
      educator,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader
        .destroy(req.file.filename)
        .catch((cleanupError) => {
          console.error("Failed to cleanup thumbnail:", cleanupError);
        });
    }
    next(error);
  }
};

const findCourse = async (req, res, next) => {
  try {
    const educator = req.auth.userId;

    const courses = await Course.find({ educator });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses || [],
    });
  } catch (error) {
    next(handleError(500, "Failed to fetch courses"));
  }
};

const findCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw handleError(400, "Course ID is required");
    }

    const course = await Course.findOne({ _id: id });

    if (!course) {
      throw handleError(404, "Course not found");
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const educator = req.auth.userId;
    if (!id) {
      throw handleError(400, "Course ID is required");
    }

    const deletedCourse = await Course.findOneAndDelete({
      _id: id,
      educator: educator,
    });

    if (!deletedCourse) {
      throw handleError(404, "Course not found");
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    next(error);
  }
};

const addChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { chapterOrder, chapterTitle } = req.body;
    const educator = req.auth.userId;

    if (!chapterOrder || !chapterTitle) {
      throw handleError(400, "Chapter order and title are required.");
    }

    const existCourse = await Course.findOne({ _id: id, educator: educator });
    if (!existCourse) {
      throw handleError(404, "Course not found or unauthorized access.");
    }

    existCourse.chapters.push({ chapterOrder, chapterTitle });

    await existCourse.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Chapter added successfully.",
      data: existCourse.chapters,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    const { id, chapterId } = req.params;
    const educator = req.auth.userId;

    // Convert string ID to ObjectId if needed
    const course = await Course.findOne({
      _id: id,
      educator,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized access.",
      });
    }

    // Find the chapter index
    const chapterIndex = course.chapters.findIndex(
      (chap) => chap._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Remove the chapter
    course.chapters.splice(chapterIndex, 1);

    // Reorder remaining chapters
    course.chapters.forEach((chap, index) => {
      chap.chapterOrder = index + 1;
    });

    await course.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Chapter deleted successfully.",
      data: course.chapters,
    });
  } catch (error) {
    console.error("Delete chapter error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete chapter",
    });
  }
};

// user  pages
const fetchAllCourseByUser = async (req, res, next) => {
  try {
    const findCourses = await Course.find();

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: findCourses || [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  findCourse,
  findCourseById,
  addChapter,
  deleteChapter,
  fetchAllCourseByUser,
};
