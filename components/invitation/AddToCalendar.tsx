'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Download } from 'lucide-react'

export default function AddToCalendar({
  title,
  description,
  location,
  startDate,
}: {
  title: string
  description: string
  location: string
  startDate: string
}) {
  const buildIcs = () => {
    const d = new Date(startDate)
    const startStr = d.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z'
    const endDate = new Date(d.getTime() + 4 * 60 * 60 * 1000) // +4 jam
    const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z'

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
  }

  const getGoogleCalendarUrl = () => {
    const d = new Date(startDate)
    const startStr = d.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z'
    const endDate = new Date(d.getTime() + 4 * 60 * 60 * 1000)
    const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z'

    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.set('action', 'TEMPLATE')
    url.searchParams.set('text', title)
    url.searchParams.set('dates', `${startStr}/${endStr}`)
    url.searchParams.set('details', description)
    url.searchParams.set('location', location)
    return url.toString()
  }

  const downloadIcs = () => {
    const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
      <a href={getGoogleCalendarUrl()} target="_blank" rel="noreferrer" className="flex-1">
        <Button variant="outline" size="sm" className="w-full bg-white text-xs gap-1.5 rounded-full">
          <Calendar className="w-3.5 h-3.5 text-blue-600" /> Simpan ke Google Calendar
        </Button>
      </a>
      <Button
        variant="outline"
        size="sm"
        onClick={downloadIcs}
        className="bg-white text-xs gap-1.5 rounded-full"
      >
        <Download className="w-3.5 h-3.5 text-slate-600" /> Simpan ke iCal (.ics)
      </Button>
    </div>
  )
}
