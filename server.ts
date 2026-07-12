import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for handling contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, reason, message } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // Append to Google Sheets
      if (
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_PRIVATE_KEY
      ) {
        try {
          // Format private key (replace literal \n with actual newlines if needed)
          const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
          
          const auth = new google.auth.GoogleAuth({
            credentials: {
              client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
              private_key: privateKey,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
          });

          const sheets = google.sheets({ version: "v4", auth });
          const targetSheetId = process.env.GOOGLE_SHEET_ID || "1w5JUr8nb5Eofhayz5-jcqRe63XEu0PvTXg1LhhL8JL8";

          // Fetch the first sheet's title dynamically to avoid range errors
          const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: targetSheetId });
          const firstSheetTitle = spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1";

          await sheets.spreadsheets.values.append({
            spreadsheetId: targetSheetId,
            range: `'${firstSheetTitle}'!A:A`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [[
                new Date().toISOString(),
                name,
                email,
                company,
                reason,
                message
              ]],
            },
          });
          console.log("Data appended to Google Sheet successfully.");
        } catch (sheetsError) {
          console.error("Failed to append to Google Sheets:", sheetsError);
          // Don't fail the whole request if only sheets fails
        }
      }

      res.status(200).json({ success: true, message: "Contact form submitted successfully." });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form submission." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
