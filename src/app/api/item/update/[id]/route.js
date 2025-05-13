import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const { id } = await context.params;
        await ItemModel.updateOne({ _id: id }, reqBody);
        return NextResponse.json({message: "update success"});
    } catch {
        return NextResponse.json({message: "update failed"});
    }
}