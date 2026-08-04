import fs from 'node:fs'

const envPath = new URL('../.env.local', import.meta.url)
const env = {}
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const TOKEN = env.VERCEL_TOKEN
const PROJECT_ID = 'prj_EqbPJyuKywLit9qfrfiLAyHh7m8D'
const TEAM_ID = 'team_OuzAeRkNcIhkwzZ89VuLblOM'

if (!TOKEN) {
  console.error('VERCEL_TOKEN not found in .env.local')
  process.exit(1)
}

const url = `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=3`

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${TOKEN}` },
})

if (!res.ok) {
  const body = await res.text()
  console.error(`Vercel API error: ${res.status} ${res.statusText}`)
  console.error(body)
  process.exit(1)
}

const data = await res.json()
const deployments = (data.deployments || []).map(d => ({
  uid: d.uid,
  url: d.url,
  state: d.state,
  readyState: d.readyState,
  created: new Date(d.createdAt).toISOString(),
  target: d.target,
}))

console.log(JSON.stringify(deployments, null, 2))
