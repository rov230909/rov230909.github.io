export function renderBioHtml(val) {
  if (!val || !val.trim()) {
    return '<div class="bempty">Type above to preview...</div>'
  }
  
  let html = ''
  let color = '#ffffff'
  let bold = false
  let italic = false
  let uline = false
  let cur = ''
  let i = 0

  const buildSpan = (text, col, b, iStyle, u) => {
    let style = `color:${col};`
    if (b) style += 'font-weight:bold;'
    if (iStyle) style += 'font-style:italic;'
    if (u) style += 'text-decoration:underline;'
    return `<span style="${style}">${text}</span>`
  }

  while (i < val.length) {
    if (val[i] === '[' && i + 7 <= val.length && val[i + 7] === ']') {
      const hex = val.substring(i + 1, i + 7)
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        if (cur) html += buildSpan(cur, color, bold, italic, uline)
        cur = ''
        color = '#' + hex.toLowerCase()
        i += 8
        continue
      }
    }

    const s3 = val.substring(i, i + 3).toLowerCase()
    const s4 = val.substring(i, i + 4).toLowerCase()

    if (s3 === '[b]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      bold = true
      i += 3
      continue
    }
    if (s4 === '[/b]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      bold = false
      i += 4
      continue
    }
    if (s3 === '[i]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      italic = true
      i += 3
      continue
    }
    if (s4 === '[/i]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      italic = false
      i += 4
      continue
    }
    if (s3 === '[u]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      uline = true
      i += 3
      continue
    }
    if (s4 === '[/u]') {
      if (cur) html += buildSpan(cur, color, bold, italic, uline)
      cur = ''
      uline = false
      i += 4
      continue
    }

    cur += val[i]
    i++
  }

  if (cur) html += buildSpan(cur, color, bold, italic, uline)
  return html
}
