import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subscriptionId: { type: String, default: "" },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    cid: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    noOfChapters: { type: Number, required: true },
    includeVideo: { type: Boolean, default: false },
    level: { type: String, required: true },
    category: { type: String, default: "" },
    courseJson: { type: mongoose.Schema.Types.Mixed, default: {} },
    bannerImageUrl: { type: String, default: "" },
    courseContent: { type: mongoose.Schema.Types.Mixed, default: [] },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const enrollCourseSchema = new mongoose.Schema(
  {
    cid: { type: String, required: true },
    userEmail: { type: String, required: true },
    completedChapters: { type: [Number], default: [] },
  },
  { timestamps: true }
);

enrollCourseSchema.index({ cid: 1, userEmail: 1 }, { unique: true });

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export const EnrollCourse =
  mongoose.models.EnrollCourse ||
  mongoose.model("EnrollCourse", enrollCourseSchema);
