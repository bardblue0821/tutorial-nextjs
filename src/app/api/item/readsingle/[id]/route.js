import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export async function GET(reques, context) {
    console.log(context);
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        return NextResponse.json({message: "readsingle success", singleItem: singleItem});
    } catch {
        return NextResponse.json({message: "readsingle failed"});
    }
}