# PDF-urile de orar, din data/orar.json: docs/orar/orar_5a.pdf ... orar_8b.pdf, cate unul pe clasa.
# Rulare din folderul site-ului: python tools/orar_pdf.py   (dupa tools/orar_din_docx.py). Fonturile sunt cele din Windows.
import json
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

NAVY, GOLD, GOLD_DARK, GOLD_LIGHT, CREAM, BEIGE, TEXT = (HexColor(c) for c in
    ('#001F3F', '#D4AF37', '#B89047', '#F3E5AB', '#F5F0E4', '#FBF8F0', '#1a2433'))
F = 'C:/Windows/Fonts/'
for nume, fisier in (('Serif', 'georgiab.ttf'), ('Sans', 'segoeui.ttf'), ('SansB', 'segoeuib.ttf')):
    pdfmetrics.registerFont(TTFont(nume, F + fisier))
ARAB = {'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8}
W, H = landscape(A4)
LOGO = Image.open('images/logo.png'); LOGO.thumbnail((240, 260))  # cat se vede tiparit; originalul face PDF-ul de 1 MB
BANDA = HexColor('#%02x%02x%02x' % LOGO.getpixel((2, 2))[:3])  # culoarea fundalului din logo, ca patratul sa nu se vada
LOGO = ImageReader(LOGO)
SCOALA = 'Școala Gimnazială „Principele Carol”'


def pagina(c, o, clasa):
    # antet: banda albastra cu logo, scoala, clasa; in marginile paginii, ca imprimanta sa n-o taie
    c.setFillColor(BANDA); c.setStrokeColor(GOLD); c.setLineWidth(2)
    c.roundRect(28, H - 128, W - 56, 100, 10, stroke=1, fill=1)
    c.drawImage(LOGO, 42, H - 119, width=75, height=82)
    c.setFillColor(GOLD_LIGHT); c.setFont('Serif', 19)
    c.drawString(132, H - 72, SCOALA)
    c.setFillColor(CREAM); c.setFont('Sans', 11)
    c.drawString(132, H - 92, 'Gura Humorului, Suceava')
    c.setFillColor(GOLD); c.setFont('Serif', 26)
    c.drawRightString(W - 44, H - 74, 'Clasa a ' + clasa.replace(' ', '-a '))
    c.setFillColor(CREAM); c.setFont('Sans', 11.5)
    c.drawRightString(W - 44, H - 94, 'Orarul anului școlar ' + o['anScolar'])

    zile = o['zile']; ore = o['clase'][clasa]
    n = max(i + 1 for z in zile for i, m in enumerate(ore[z]) if m)  # fara randurile goale de la final
    date = [['Ora'] + zile] + [[o['ore'][i]] + [ore[z][i].replace(' - ', '\n') for z in zile] for i in range(n)]
    lat = (W - 56 - 70) / 5
    t = Table(date, colWidths=[70] + [lat] * 5, rowHeights=[30] + [min(52, 360 / n)] * n)
    t.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, 0), 'SansB', 12), ('BACKGROUND', (0, 0), (-1, 0), BANDA),
        ('TEXTCOLOR', (0, 0), (-1, 0), CREAM),
        ('FONT', (0, 1), (0, -1), 'SansB', 11), ('TEXTCOLOR', (0, 1), (0, -1), GOLD_DARK),
        ('FONT', (1, 1), (-1, -1), 'Sans', 12), ('TEXTCOLOR', (1, 1), (-1, -1), TEXT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), BEIGE]),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.6, HexColor('#E7DCC0')), ('BOX', (0, 0), (-1, -1), 1.5, GOLD),
    ]))
    tw, th = t.wrap(0, 0)
    t.drawOn(c, 28, H - 146 - th)
    c.showPage()


def main():
    o = json.load(open('data/orar.json', encoding='utf-8'))
    for clasa in o['clase']:
        ani, lit = clasa.split()
        c = canvas.Canvas('docs/orar/orar_%d%s.pdf' % (ARAB[ani], lit.lower()), pagesize=(W, H))
        c.setTitle('Orarul clasei a %s %s' % (clasa.replace(' ', '-a '), o['anScolar']))
        c.setAuthor(SCOALA); c.setCreator(SCOALA); c.setProducer(SCOALA)  # fara „ReportLab” in proprietatile PDF-ului
        pagina(c, o, clasa); c.save()


if __name__ == '__main__':
    main()
