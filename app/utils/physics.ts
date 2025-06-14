// utils/physics.ts

export type VelocityExp = {
    x: number
    y: number
  }
  
  export type Particle = {
    x: number
    y: number
    velocity: VelocityExp
    mass: number
  }
  
  /**
   * Rotates coordinate system for velocities
   */
  export function rotate(velocity: VelocityExp, angle: number): VelocityExp {
    return {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    }
  }
  
  /**
   * Resolves elastic collision between two particles
   */
  export function resolveCollision(particle: Particle, otherParticle: Particle): void {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y
  
    const xDist = otherParticle.x - particle.x
    const yDist = otherParticle.y - particle.y
  
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(yDist, xDist)
  
      const m1 = particle.mass
      const m2 = otherParticle.mass
  
      const u1 = rotate(particle.velocity, angle)
      const u2 = rotate(otherParticle.velocity, angle)
  
      const v1: VelocityExp = {
        x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
        y: u1.y,
      }
  
      const v2: VelocityExp = {
        x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
        y: u2.y,
      }
  
      const vFinal1 = rotate(v1, -angle)
      const vFinal2 = rotate(v2, -angle)
  
      particle.velocity.x = vFinal1.x
      particle.velocity.y = vFinal1.y
  
      otherParticle.velocity.x = vFinal2.x
      otherParticle.velocity.y = vFinal2.y
    }
  }
  