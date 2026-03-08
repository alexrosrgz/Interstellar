import { useRef, useEffect, useCallback } from "react";
import { MOUSE_SENSITIVITY, MOUSE_SMOOTHING } from "./constants";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(current: number, target: number, rate: number, dt: number) {
  return current + (target - current) * Math.min(1, rate * dt);
}

export interface MouseInput {
  turnInput: number;
  pitchInput: number;
}

export function useMouseSteering() {
  const rawDXRef = useRef(0);
  const rawDYRef = useRef(0);
  const smoothTurnRef = useRef(0);
  const smoothPitchRef = useRef(0);
  const isLockedRef = useRef(false);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isLockedRef.current) return;
      rawDXRef.current += e.movementX;
      rawDYRef.current += e.movementY;
    }

    function onLockChange() {
      isLockedRef.current = document.pointerLockElement !== null;
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onLockChange);
    };
  }, []);

  const consume = useCallback((dt: number): MouseInput => {
    const dx = rawDXRef.current;
    const dy = rawDYRef.current;
    rawDXRef.current = 0;
    rawDYRef.current = 0;

    const targetTurn = clamp(dx * MOUSE_SENSITIVITY, -1, 1);
    const targetPitch = clamp(-dy * MOUSE_SENSITIVITY, -1, 1);

    smoothTurnRef.current = lerp(smoothTurnRef.current, targetTurn, MOUSE_SMOOTHING, dt);
    smoothPitchRef.current = lerp(smoothPitchRef.current, targetPitch, MOUSE_SMOOTHING, dt);

    return {
      turnInput: smoothTurnRef.current,
      pitchInput: smoothPitchRef.current,
    };
  }, []);

  const requestLock = useCallback((canvas: HTMLCanvasElement) => {
    canvas.requestPointerLock();
  }, []);

  const exitLock = useCallback(() => {
    document.exitPointerLock();
  }, []);

  return { consume, requestLock, exitLock, isLockedRef };
}
