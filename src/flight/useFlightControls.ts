import { useEffect, useRef } from "react";
import type { KeysPressed } from "./flightPhysics";

export function useFlightControls() {
  const keysRef = useRef<KeysPressed>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    ascend: false,
    descend: false,
  });

  useEffect(() => {
    function update(e: KeyboardEvent, pressed: boolean) {
      const key = e.code;
      switch (key) {
        case "KeyW":
        case "ArrowUp":
          keysRef.current.forward = pressed;
          break;
        case "KeyS":
        case "ArrowDown":
          keysRef.current.backward = pressed;
          break;
        case "KeyA":
        case "ArrowLeft":
          keysRef.current.left = pressed;
          break;
        case "KeyD":
        case "ArrowRight":
          keysRef.current.right = pressed;
          break;
        case "Space":
          keysRef.current.ascend = pressed;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keysRef.current.descend = pressed;
          break;
      }
    }

    const onDown = (e: KeyboardEvent) => update(e, true);
    const onUp = (e: KeyboardEvent) => update(e, false);

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return keysRef;
}
