import { exec } from 'child_process';
import path from 'path';

const run = (cmd: string) =>
  new Promise<{ stdout: string; stderr: string; code: number }>((resolve) => {
    exec(cmd, { cwd: path.resolve('.') }, (err, stdout, stderr) => {
      resolve({ stdout: stdout.toString(), stderr: stderr.toString(), code: err ? (err as any).code ?? 1 : 0 });
    });
  });

describe('render-ci CRC checks', () => {
  jest.setTimeout(30_000);

  test('SOSARIA.ULT VGA matches expected CRC', async () => {
    const r = await run('yarn render:ci SOSARIA.ULT VGA');
    expect(r.code).toBe(0);
    expect(r.stdout).toMatch(/MATCH: generated CRC matches expected CRC constant\.|CRC32=0x[0-9a-f]{8}/i);
  });

  test('DEMO.ULT VGA matches expected CRC', async () => {
    const r = await run('yarn render:ci DEMO.ULT VGA');
    expect(r.code).toBe(0);
    expect(r.stdout).toMatch(/MATCH: generated CRC matches expected CRC constant\.|CRC32=0x[0-9a-f]{8}/i);
  });
});
