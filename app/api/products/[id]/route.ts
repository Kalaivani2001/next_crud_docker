import connectMongoDB from "@/libs/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function PUT(request:any, { params }:any) {
    const { id } = params;
    const {productName: productName, 
        color: color, 
        price: price, 
        category: category } = await request.json();
    await connectMongoDB();
    await Products.findByIdAndUpdate(id, { productName, color, price, category });
    return NextResponse.json({ message: "Products updated" }, { status: 200 });
  }