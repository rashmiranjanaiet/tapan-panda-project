import { connectDB } from "@/config/db";
import { User } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const {email, name} = await req.json();

    const user = await User.findOne({ email }).lean();

    if(!user){
        const result = await User.create({
            name: name,
            email: email
        })
        console.log(result)
        return NextResponse.json(result.toObject());
    }

    return NextResponse.json(user)
}
