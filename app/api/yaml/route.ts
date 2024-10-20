import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

// app/api/yaml/route.ts
export const GET = async (): Promise<NextResponse> => {
    const yamlFilePath = path.join(process.cwd(), 'notion-openapi.yaml');
    
    try {
        // Read the YAML file as a buffer
        const yamlBuffer = await fs.readFile(yamlFilePath);

        // Log the buffer content as a string for verification
        console.log("YAML Buffer Content:", yamlBuffer.toString('utf8'));
        
        // Return the buffer content with appropriate headers
        return new NextResponse(yamlBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/x-yaml",
            },
        });
    } catch (error) {
        console.error("Error reading YAML file:", error);
        
        return new NextResponse('Internal Server Error: Unable to read YAML file.', {
            status: 500,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
};
