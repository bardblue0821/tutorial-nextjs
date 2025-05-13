import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export async function GET(request) {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return NextResponse.json({message: "readall success", allItems: allItems});
    } catch {
        return NextResponse.json({message: "readall failed"});
    }
}

