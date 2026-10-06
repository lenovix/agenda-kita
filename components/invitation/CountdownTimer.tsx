'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.isExpired) {
    return (
      <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 text-center">
        <p className="text-sm font-semibold text-slate-700">Acara Pernikahan Sedang / Telah Berlangsung 🎉</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
      {[
        { label: 'Hari', val: timeLeft.days },
        { label: 'Jam', val: timeLeft.hours },
        { label: 'Menit', val: timeLeft.minutes },
        { label: 'Detik', val: timeLeft.seconds },
      ].map((t) => (
        <div key={t.label} className="bg-white/80 backdrop-blur rounded-2xl p-3 text-center border shadow-xs">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {String(t.val).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  )
}
