import connectMongoDB from "@/libs/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const products = await Products.find();
    return NextResponse.json({data:products} );
  }

export async function POST(request:any) {
  console.log(request,'request');
  
    const { productName, color, price, category } :any|undefined= await request.json();
    await connectMongoDB();
    await Products.create({ productName, color, price, category});
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  }  

  export async function DELETE(request:any) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Products.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  }