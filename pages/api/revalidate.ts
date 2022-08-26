import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('[Next.js] Revalidating...');
  const revailidated = false;

  try {
    await res.revalidate('/ISR');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
