import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export async function DELETE(request, context) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        if (singleItem.email === reqBody.email) {
            const { id } = await context.params;
            await ItemModel.deleteOne({ _id: id }, reqBody);
            return NextResponse.json({message: "delete success"});
        } else {
            return NextResponse.json({message: "delete failed"});
        }
    } catch {
        return NextResponse.json({message: "delete failed"});
    }
}