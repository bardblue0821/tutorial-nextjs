import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        const { id } = await context.params;
        if (singleItem.email === reqBody.email) {
            await ItemModel.updateOne({ _id: id }, reqBody);    
            return NextResponse.json({message: "update success"});
        } else {
            return NextResponse.json({message: "update failed"});
        }
    } catch {
        return NextResponse.json({message: "update failed"});
    }
}