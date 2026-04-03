'use client'

import { useState, useCallback, useRef } from 'react'

interface ResizeHandleProps {
  onResize: (delta: number) => void
  orientation: 'vertical' | 'horizontal'
}

export default function ResizeHandle({ onResize, orientation }: ResizeHandleProps) {
  const isDragging = useRef(false)
  const lastPos = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    lastPos.current = orientation === 'vertical' ? e.clientX : e.clientY
    document.body.style.cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      const currentPos = orientation === 'vertical' ? ev.clientX : ev.clientY
      const delta = currentPos - lastPos.current
      lastPos.current = currentPos
      onResize(delta)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [onResize, orientation])

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`flex-shrink-0 cursor-${orientation === 'vertical' ? 'col' : 'row'}-resize bg-[#30363d] hover:bg-[#58a6ff] transition-colors group relative ${
        orientation === 'vertical' ? 'w-1 hover:w-1.5' : 'h-1 hover:h-1.5'
      }`}
    >
      <div className={`absolute ${
        orientation === 'vertical'
          ? 'inset-y-0 -left-1 -right-1'
          : 'inset-x-0 -top-1 -bottom-1'
      }`} />
    </div>
  )
}
