import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Note from "@/models/Note";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    // Connect to the database
    await connect();
    // Access the Note collection and get everything
    const notes = await Note.find();
    // Respond with result of get request
    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Post new notes to the database
export const POST = async (request) => {
  const body = await request.json();
  const newNote = new Note(body);

  try {
    // Connect to database
    await connect();
    // Save note contents to database as new document
    await newNote.save();
    // Respond with result of post request
    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
