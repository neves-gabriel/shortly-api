import { nanoid } from "nanoid";
import { connection } from "../database.js";

export async function postUrl(req, res) {
  try {
    const { user } = res.locals;
    const { url } = req.body;

    const shortUrl = nanoid(8);

    await connection.query(
      `
			INSERT INTO urls
			("userId", url, shortUrl)
			VALUES
			($1, $2, $3)
		`,
      [user.id, url, shortUrl]
    );

    res.status(201).send({
      shortUrl: shortUrl,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const shortenedUrl = await connection.query(
      `SELECT id, "shortUrl", url FROM "urls" WHERE "shortUrl" = $1;`,
      [shortUrl]
    );

    if (!shortenedUrl.rowCount) {
      return res.sendStatus(404);
    }

    res.status(200).send(shortenedUrl.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}
