import { connectDB } from "@/config/db";
import { Course, EnrollCourse } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const toEnrollmentResponse = (course, enrollCourse) => ({
  courses: course,
  enrollCourse,
});

export async function POST(req) {
  await connectDB();

  const { courseId } = await req.json();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const enrollCourse = await EnrollCourse.findOne({
    cid: courseId,
    userEmail,
  }).lean();

  if (!enrollCourse) {
    const result = await EnrollCourse.create({
      cid: courseId,
      userEmail,
    });

    return NextResponse.json([result.toObject()]);
  }

  return NextResponse.json({ resp: "Already Enrolled Course" });
}

export async function GET(req) {
  await connectDB();

  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const enrollCourse = await EnrollCourse.findOne({
      userEmail,
      cid: courseId,
    }).lean();

    if (!enrollCourse) {
      return NextResponse.json(null);
    }

    const course = await Course.findOne({ cid: enrollCourse.cid }).lean();
    return NextResponse.json(toEnrollmentResponse(course, enrollCourse));
  }

  const enrollCourses = await EnrollCourse.find({ userEmail })
    .sort({ createdAt: -1 })
    .lean();

  const courseIds = enrollCourses.map((item) => item.cid);
  const courses = await Course.find({ cid: { $in: courseIds } }).lean();
  const courseById = new Map(courses.map((course) => [course.cid, course]));

  const result = enrollCourses.map((enrollCourse) =>
    toEnrollmentResponse(courseById.get(enrollCourse.cid), enrollCourse)
  );

  return NextResponse.json(result);
}

export async function PUT(req) {
  try {
    await connectDB();

    const { cid, completedChapter } = await req.json();
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!cid) {
      return NextResponse.json({ error: "cid is required" }, { status: 400 });
    }

    const result = await EnrollCourse.findOneAndUpdate(
      { cid, userEmail },
      { $set: { completedChapters: completedChapter } },
      { new: true }
    ).lean();

    if (!result) {
      return NextResponse.json(
        { error: "No enrolled course found for given cid" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error updating enroll course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
