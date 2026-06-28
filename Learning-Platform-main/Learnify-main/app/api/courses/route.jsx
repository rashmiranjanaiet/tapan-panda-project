import { connectDB } from "@/config/db";
import { Course } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
    const {searchParams} = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user = await currentUser();
    
    if(courseId){
        const result = await Course.findOne({ cid: courseId }).lean();

    console.log(result);
    return NextResponse.json(result);

    }
    else {
    const result = await Course.find({ userEmail: user.primaryEmailAddress?.emailAddress })
    .sort({ createdAt: -1 })
    .lean();

    console.log(result);
    return NextResponse.json(result);

    }
}
