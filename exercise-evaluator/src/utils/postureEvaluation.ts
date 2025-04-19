// Utility function to calculate joint angles
export function calculateAngle(a: any, b: any, c: any): number {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const cb = { x: b.x - c.x, y: b.y - c.y };
  
    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);
  
    const cosine = dot / (magAB * magCB);
    const angle = Math.acos(cosine);
  
    return (angle * 180) / Math.PI; // degrees
  }
  
  // Evaluate basic squat form based on knee angle
  export function evaluateSquat(landmarks: any[]) {
    const hip = landmarks[24];   // Right hip
    const knee = landmarks[26];  // Right knee
    const ankle = landmarks[28]; // Right ankle
  
    const kneeAngle = calculateAngle(hip, knee, ankle);
  
    const correct = kneeAngle < 120;
  
    return {
      correct,
      kneeAngle,
      errors: {
        notDeepEnough: kneeAngle >= 120
      }
    };
  }
  