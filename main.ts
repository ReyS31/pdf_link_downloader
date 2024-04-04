import { Elysia } from "elysia";
import puppeteer from "puppeteer";

const app = new Elysia()
  .get("/", async ({ query, error, set }) => {
    const { link } = query;

    if (!link) {
      return error(400, "No link provided");
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(link);

    const buffer = await page.pdf({
      format: "Legal",
      landscape: true,
      printBackground: true,
      margin: {
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px",
      },
    });
    await browser.close();
    set.headers["Content-Type"] = "application/pdf";
    set.headers["Content-Disposition"] =
      `attachment; filename="${"sertifikat"}.pdf"`;
    return buffer;
  })
  .listen(3000);

console.log(`Listening on ${app.server!.url}`);
