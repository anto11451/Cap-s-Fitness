import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/submit-intake", async (req, res) => {
    try {
      const formData = req.body;
      
      const apiUrl = process.env.GOOGLE_SHEETS_API_URL;
      const apiSecret = process.env.GOOGLE_SHEETS_API_SECRET;

      if (!apiUrl || !apiSecret) {
        console.error("Missing Google Sheets API configuration");
        return res.status(500).json({ 
          success: false, 
          error: "API configuration missing" 
        });
      }

      const payload = {
        _secret: apiSecret,
        formId: "cap_form_v1",
        ...formData,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      res.json({ 
        success: true, 
        message: "Intake submitted successfully",
        data: result 
      });
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
