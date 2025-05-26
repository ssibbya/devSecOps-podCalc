import { describe, it, expect } from 'vitest';
import { calculatePods, PodInput } from '../utils/podCalculator';

describe('Pod Calculator', () => {
  describe('calculatePods', () => {
    it('should return 0 when cpuPerPod is zero or negative', () => {
      const input: PodInput = { cpuPerPod: 0, ramPerPod: 1, totalCpu: 4, totalRam: 8 };
      expect(calculatePods(input)).toBe(0);
      
      const negativeInput: PodInput = { cpuPerPod: -0.5, ramPerPod: 1, totalCpu: 4, totalRam: 8 };
      expect(calculatePods(negativeInput)).toBe(0);
    });

    it('should return 0 when ramPerPod is zero or negative', () => {
      const input: PodInput = { cpuPerPod: 0.5, ramPerPod: 0, totalCpu: 4, totalRam: 8 };
      expect(calculatePods(input)).toBe(0);
      
      const negativeInput: PodInput = { cpuPerPod: 0.5, ramPerPod: -1, totalCpu: 4, totalRam: 8 };
      expect(calculatePods(negativeInput)).toBe(0);
    });

    it('should return 0 when totalCpu is zero or negative', () => {
      const zeroInput: PodInput = { cpuPerPod: 0.5, ramPerPod: 1, totalCpu: 0, totalRam: 8 };
      expect(calculatePods(zeroInput)).toBe(0);
      
      const negativeInput: PodInput = { cpuPerPod: 0.5, ramPerPod: 1, totalCpu: -4, totalRam: 8 };
      expect(calculatePods(negativeInput)).toBe(0);
    });

    it('should return 0 when totalRam is zero or negative', () => {
      const zeroInput: PodInput = { cpuPerPod: 0.5, ramPerPod: 1, totalCpu: 4, totalRam: 0 };
      expect(calculatePods(zeroInput)).toBe(0);
      
      const negativeInput: PodInput = { cpuPerPod: 0.5, ramPerPod: 1, totalCpu: 4, totalRam: -8 };
      expect(calculatePods(negativeInput)).toBe(0);
    });

    it('should calculate pods when CPU is the limiting factor', () => {
      const input: PodInput = { cpuPerPod: 1, ramPerPod: 0.5, totalCpu: 8, totalRam: 2 };
      const result = calculatePods(input);
      expect(result).toBe(8); // Math.ceil(8/1) = 8, Math.ceil(2/0.5) = 4, max = 8
    });

    it('should calculate pods when RAM is the limiting factor', () => {
      const input: PodInput = { cpuPerPod: 0.25, ramPerPod: 2, totalCpu: 1, totalRam: 16 };
      const result = calculatePods(input);
      expect(result).toBe(8); // Math.ceil(1/0.25) = 4, Math.ceil(16/2) = 8, max = 8
    });

    it('should handle exact division scenarios', () => {
      const input: PodInput = { cpuPerPod: 0.5, ramPerPod: 1, totalCpu: 4, totalRam: 8 };
      const result = calculatePods(input);
      expect(result).toBe(8); // Math.ceil(4/0.5) = 8, Math.ceil(8/1) = 8, max = 8
    });

    it('should round up fractional pod requirements', () => {
      const input: PodInput = { cpuPerPod: 0.3, ramPerPod: 0.7, totalCpu: 1, totalRam: 2 };
      const result = calculatePods(input);
      expect(result).toBe(4); // Math.ceil(1/0.3) = 4, Math.ceil(2/0.7) = 3, max = 4
    });

    it('should handle small decimal values correctly', () => {
      const input: PodInput = { cpuPerPod: 0.05, ramPerPod: 0.1, totalCpu: 1, totalRam: 2 };
      const result = calculatePods(input);
      expect(result).toBe(20); // Math.ceil(1/0.05) = 20, Math.ceil(2/0.1) = 20, max = 20
    });

    it('should handle large values correctly', () => {
      const input: PodInput = { cpuPerPod: 2, ramPerPod: 4, totalCpu: 100, totalRam: 200 };
      const result = calculatePods(input);
      expect(result).toBe(50); // Math.ceil(100/2) = 50, Math.ceil(200/4) = 50, max = 50
    });

    it('should handle cases where per-pod resources exceed total requirements', () => {
      const input: PodInput = { cpuPerPod: 2, ramPerPod: 1, totalCpu: 1, totalRam: 4 };
      const result = calculatePods(input);
      expect(result).toBe(4); // Math.ceil(1/2) = 1, Math.ceil(4/1) = 4, max = 4
    });

    it('should handle very small resource requirements', () => {
      const input: PodInput = { cpuPerPod: 0.001, ramPerPod: 0.001, totalCpu: 0.1, totalRam: 0.1 };
      const result = calculatePods(input);
      expect(result).toBe(100); // Math.ceil(0.1/0.001) = 100, Math.ceil(0.1/0.001) = 100, max = 100
    });

    it('should handle balanced resource requirements', () => {
      const input: PodInput = { cpuPerPod: 0.1, ramPerPod: 0.5, totalCpu: 2, totalRam: 10 };
      const result = calculatePods(input);
      expect(result).toBe(20); // Math.ceil(2/0.1) = 20, Math.ceil(10/0.5) = 20, max = 20
    });

    it('should handle uneven fractional divisions', () => {
      const input: PodInput = { cpuPerPod: 0.33, ramPerPod: 0.66, totalCpu: 1, totalRam: 2 };
      const result = calculatePods(input);
      expect(result).toBe(4); // Math.ceil(1/0.33) = 4, Math.ceil(2/0.66) = 4, max = 4
    });

    it('should prioritize the resource that requires more pods', () => {
      const input: PodInput = { cpuPerPod: 0.1, ramPerPod: 1, totalCpu: 0.5, totalRam: 10 };
      const result = calculatePods(input);
      expect(result).toBe(10); // Math.ceil(0.5/0.1) = 5, Math.ceil(10/1) = 10, max = 10
    });
  });

  describe('edge cases and type safety', () => {
    it('should handle minimal positive values', () => {
      const input: PodInput = { 
        cpuPerPod: 0.000001, 
        ramPerPod: 0.000001, 
        totalCpu: 0.001, 
        totalRam: 0.001 
      };
      const result = calculatePods(input);
      expect(result).toBe(1001); // Math.ceil(0.001/0.000001) = 1001 due to floating point precision
    });

    it('should maintain type safety with PodInput interface', () => {
      // This test ensures TypeScript compilation and proper typing
      const input: PodInput = { cpuPerPod: 1, ramPerPod: 2, totalCpu: 4, totalRam: 8 };
      const result: number = calculatePods(input);
      expect(typeof result).toBe('number');
      expect(result).toBe(4);
    });
  });
});