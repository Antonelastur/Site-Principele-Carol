# Orarul gimnaziului din .docx -> data/orar.json. Rulare: python tools/orar_din_docx.py "Orar.docx" data/orar.json
# Tabelele din docx sunt in ordinea Marti, Miercuri, Joi, Vineri, Luni (ca in documentul scolii); afiseaza si numarul de ore pe saptamana, ca verificare.
# ATENTIE: suprascrie clasele V-VIII, deci si numele optionalelor puse de mana in data/orar.json (Optional - Limba spaniola etc.).
import docx, sys, json, re, collections
sys.stdout.reconfigure(encoding='utf-8')
NUME = {'ROMANA':'Română','MATEMATICA':'Matematică','ENGLEZA':'Engleză','FRANCEZA':'Franceză',
 'LATINA':'Latină','DESEN':'Desen','MUZICA':'Muzică','FIZICA':'Fizică','CHIMIA':'Chimie',
 'BIOLOGIA':'Biologie','ISTORIA':'Istorie','GEOGRAFIA':'Geografie','GEOGRAFIE':'Geografie',
 'RELIGIA':'Religie','ED. FIZICA':'Ed. fizică','ED. SOCIALA':'Ed. socială','CONSILIERE':'Consiliere',
 'TEHNOLOGIA':'Tehnologie','TIC':'TIC','OPTIONAL':'Opțional'}
zile = ['Marți','Miercuri','Joi','Vineri','Luni']
d = docx.Document(sys.argv[1])
clase = None; orar = {}
for zi, t in zip(zile, d.tables):
    hdr = [c.text.strip() for c in t.rows[0].cells][1:]
    clase = clase or hdr; assert hdr == clase, hdr
    for i, r in enumerate(t.rows[1:]):
        for c, cell in zip(clase, r.cells[1:]):
            s = re.sub(r'\s+', ' ', cell.text.replace('/', ' ')).strip()
            v = NUME[s] if s else ''
            orar.setdefault(c, {}).setdefault(zi, [''] * 7)[i] = v
ordine = ['Luni','Marți','Miercuri','Joi','Vineri']
import os  # pastreaza clasele primare si notele deja din fisier; inlocuieste doar clasele din acest docx
out = json.load(open(sys.argv[2], encoding='utf-8')) if os.path.exists(sys.argv[2]) else {'clase': {}}
out.update({'anScolar': '2026-2027', 'ore': ['8-9','9-10','10-11','11-12','12-13','13-14','14-15'], 'zile': ordine})
out['clase'].update({c: {z: orar[c][z] for z in ordine} for c in clase})
with open(sys.argv[2], 'w', encoding='utf-8') as f: json.dump(out, f, ensure_ascii=False, indent=1)
for c in clase:
    cnt = collections.Counter(x for z in ordine for x in orar[c][z] if x)
    print(c, sum(cnt.values()), dict(sorted(cnt.items())))
    for z in ordine:  # gaps in the middle of a day
        l = orar[c][z]; last = max((i for i,x in enumerate(l) if x), default=-1)
        if '' in l[:last+1]: print('  GOL', z, l)
