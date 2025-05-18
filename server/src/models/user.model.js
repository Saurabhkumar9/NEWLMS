const mongoose=require('mongoose')
const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true}, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  { timestamps: true }
);
