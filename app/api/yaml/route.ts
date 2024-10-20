import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

// app/api/yaml/route.ts
export const GET = async (): Promise<NextResponse> => {
    // Construct the absolute path to the YAML file in the root directory
    const yamlFilePath = path.join(process.cwd(), 'notion-openapi.yaml');
    
    try {
        // Asynchronously read the YAML file content as a UTF-8 string
        const yamlContent = await fs.readFile(yamlFilePath, 'utf8');
        
        // Return the YAML content with appropriate headers
        return new NextResponse(yamlContent, {
            status: 200,
            headers: {
                "Content-Type": "application/x-yaml",
            },
        });
    } catch (error) {
        console.error("Error reading YAML file:", error);
        
        // Return a 500 Internal Server Error response if reading fails
        return new NextResponse('Internal Server Error: Unable to read YAML file.', {
            status: 500,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
};
