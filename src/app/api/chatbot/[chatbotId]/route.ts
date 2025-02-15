import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ chatbotId: string }> }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    const chatbot = await prismaClient.chatbot.findUnique({
      where: { id: chatbotId },
    });

    if (!chatbot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, chatbot }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chatbot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ chatbotId: string }> }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    await prismaClient.chatbot.delete({
      where: { id: chatbotId },
    });

    return NextResponse.json(
      { success: true, message: "Chatbot deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    return NextResponse.json(
      { error: "Chatbot not found or cannot be deleted" },
      { status: 404 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ chatbotId: string }> }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    const oldBot = await prismaClient.chatbot.findUnique({
      where: { id: chatbotId },
    });
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const knowledge = formData.get("knowledge") as string;
    const starterMessage = formData.get("starterMessage") as string;
    const openAiApiKey = formData.get("openAiApiKey") as string;
    const file = formData.get("botLogo") as File;
    const themeConfig = formData.get("themeConfig");
    let result = null;
    if (file) {
      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      try {
        const base64File = `data:${file.type};base64,${buffer.toString(
          "base64"
        )}`;
        // Upload to Cloudinary
        result = await cloudinary.uploader.upload(base64File, {
          folder: "smartsage",
        });
      } catch (error) {
        throw error;
      }
    }

    let parsedThemeConfig = {};
    if (typeof themeConfig === "string") {
      try {
        parsedThemeConfig = JSON.parse(themeConfig);
      } catch (error) {
        console.error("Error updating chatbot:", error);
        return NextResponse.json(
          { error: "Invalid themeConfig JSON" },
          { status: 400 }
        );
      }
    }

    const chatbot = await prismaClient.chatbot.update({
      where: { id: chatbotId },
      data: {
        name: name || undefined,
        knowledge: knowledge || undefined,
        starterMessage: starterMessage || undefined,
        openAiApiKey: openAiApiKey || undefined,
        botLogo: result?.secure_url || undefined,
        themeConfig: Object.keys(parsedThemeConfig).length
          ? parsedThemeConfig
          : undefined,
      },
    });

    try {
      if (oldBot?.botLogo) {
        const publicId = getPublicIdFromUrl(oldBot.botLogo);
        if (publicId) {
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });

          if (result.result !== "ok") {
            throw new Error("Failed to delete image from Cloudinary");
          }
        }
      }
    } catch (err) {
      console.error("Error deleting the file", err);
    }

    return NextResponse.json({ success: true, chatbot }, { status: 200 });
  } catch (error) {
    console.error("Error updating chatbot:", error);
    return NextResponse.json(
      { error: "Chatbot not found or cannot be updated" },
      { status: 404 }
    );
  }
}
