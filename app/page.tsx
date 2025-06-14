"use client"

import { useEffect, useRef } from 'react'
import MenuBtns from "../components/menuBtns"
import Context from "../components/context"
import PictureBox from "../components/pictureBox"
import FooterComp from "../components/footerComp"
import Social from "../components/socials"
import Spinner from "../components/spinner"
import SmallText from "../components/smallText"
import { useLoadingStore } from '../lib/songStore'
import styles from './Home.module.css'
import {
  randomIntFromRange,
  randomColor,
  distance,
} from './utils/canvasUtils' // adjust path as needed
import {resolveCollision,} from './utils/physics'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const cyanColors: string[] = ['#00FFFF', '#66FFFF', '#009999', '#008B8B', '#CCEFFF']

type xDirection = number
type yDirection = number
type radius = number
type color = string

type Velocity = {
  x: number
  y: number
}


const colors = ['#205f8f', '#2471ac', '#1168ac', '#0b5085']

export default function Home() {
  const isPageLoading = useLoadingStore((state) => state.isPageLoading)
  const setPageLoading = useLoadingStore((state) => state.setPageLoading)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    // Resize canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    })

    addEventListener('mousemove', (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    })


    class Circle {
      x: number
      y: number
      radius: number
      color: string
      velocity: Velocity
      mass: number  // ✅ Add this
      opacity: number

      constructor(x: xDirection, y: yDirection, radius: radius, color: color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5
        }
        this.mass = 1 // ✅ Default mass to 1 (or any other value you want)
        this.opacity = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
      }

      update(objects: Circle[]) {
        this.draw()

        for (let i = 0; i < objects.length; i++) {
          if (this === objects[i]) continue

          if (
            distance(this.x, this.y, objects[i].x, objects[i].y) -
            this.radius * 2 < 0
          ) {
            resolveCollision(this, objects[i]) // ✅ No TS error now
          }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
          this.velocity.x = -this.velocity.x
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
          this.velocity.y = -this.velocity.y
        }

        if (distance(mouse.x, mouse.y, this.x, this.y) < 80 && this.opacity < 0.2) {
          this.opacity += 0.02
        } else if (this.opacity > 0) {
          this.opacity -= 0.02

          this.opacity = Math.max(0, this.opacity)
        }


        this.x += this.velocity.x
        this.y += this.velocity.y
      }
    }


    // ✅ Now declare it here, outside the class
    let objects: Circle[] = []

    function init() {
      objects = []
    
      const radius = 15
      const area = canvas.width * canvas.height
    
      // Calculate based on area but clamp between a minimum and maximum
      const densityFactor = 15000 // higher = fewer circles
      const calculatedCount = Math.floor(area / densityFactor)
    
      const numberOfCircles = Math.max(20, Math.min(calculatedCount, 120)) // clamp to [20, 120]
    
      for (let i = 0; i < numberOfCircles; i++) {
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)
        const color = randomColor(colors)
    
        // Prevent overlapping
        let overlapping = false
        for (let j = 0; j < objects.length; j++) {
          if (distance(x, y, objects[j].x, objects[j].y) - radius * 2 < 0) {
            overlapping = true
            break
          }
        }
    
        if (overlapping) {
          i-- // retry
          continue
        }
    
        objects.push(new Circle(x, y, radius, color))
      }
    }
    

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      objects.forEach(obj => obj.update(objects))
    }

    init()
    animate()
  }, [])

  useEffect(() => {
    setPageLoading(false)
    return () => {
      setPageLoading(null)
    }
  }, [setPageLoading])

  if (isPageLoading === true) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-cyan-700">
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvasStyle} />
      <div className={styles.overlay}>
        <MenuBtns />
        <Context />
        <Social />
        <SmallText />
        <PictureBox />
        <FooterComp />
      </div>
    </div>
  )
}
