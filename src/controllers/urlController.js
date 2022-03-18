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
    const result = await connection.query(
      `SELECT id, shorturl, url FROM "urls" WHERE shorturl = $1;`[shortUrl]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}
