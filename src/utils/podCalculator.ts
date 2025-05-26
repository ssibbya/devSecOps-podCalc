export type PodInput = {
  cpuPerPod: number;
  ramPerPod: number;
  totalCpu: number;
  totalRam: number;
};

export function calculatePods({ cpuPerPod, ramPerPod, totalCpu, totalRam }: PodInput): number {
  if (cpuPerPod <= 0 || ramPerPod <= 0 || totalCpu <= 0 || totalRam <= 0) return 0;
  const cpuPods = Math.ceil(totalCpu / cpuPerPod);
  const ramPods = Math.ceil(totalRam / ramPerPod);
  return Math.max(cpuPods, ramPods);
}