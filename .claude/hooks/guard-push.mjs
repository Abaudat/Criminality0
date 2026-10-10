import { execSync } from 'node:child_process';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const command = JSON.parse(input || '{}').tool_input?.command ?? '';
if (!/\bgit\s+push\b/.test(command)) process.exit(0);
try {
  execSync('node --test "tests/*.test.js"', { cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(), stdio: 'pipe' });
} catch (error) {
  process.stderr.write(`Push blocked: tests fail.\n${error.stdout?.toString().split('\n').filter((line) => line.startsWith('✖') || line.includes('Error')).slice(0, 30).join('\n')}\n`);
  process.exit(2);
}
