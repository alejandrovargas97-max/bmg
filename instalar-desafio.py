#!/usr/bin/env python3
import argparse
from datetime import datetime
from pathlib import Path
import shutil

parser=argparse.ArgumentParser(description='Añadir Desafío a una copia del sitio completo de BGM Global.')
parser.add_argument('root',type=Path,help='Raíz del sitio que se publica en Vercel')
args=parser.parse_args()
bridge=args.root.resolve()/'bridge'
menu_path=bridge/'bgm-bridge.html'
challenge_path=bridge/'bgm-desafio.html'
challenge_source=Path(__file__).resolve().with_name('bgm-desafio.html')
for required in (args.root/'index.html',menu_path,bridge/'claim-rules.js',challenge_source):
    if not required.is_file():
        parser.error(f'Falta {required}. Usa la copia completa del sitio y conserva juntos el instalador y bgm-desafio.html.')
menu=menu_path.read_bytes().decode('utf-8')
if 'bgm-desafio.html?demo=4h&lang=' not in menu:
    anchor='[`♣`,`teams`,`teamsDesc`],[`♦`,`classes`,`classesDesc`]'
    if menu.count(anchor)!=1: parser.error("El menú de esta copia difiere del menú publicado verificado. No se modificó ningún archivo.")
    menu=menu.replace(anchor,'[`♣`,`teams`,`teamsDesc`],[`♠`,`challenge`,`challengeDesc`],[`♦`,`classes`,`classesDesc`]')
    anchor='t===`tournaments`?v(`tournaments`):(h(t),p(`pending`))'
    if menu.count(anchor)!=1: parser.error("El menú de esta copia difiere del menú publicado verificado. No se modificó ningún archivo.")
    menu=menu.replace(anchor,'t===`tournaments`?v(`tournaments`):t===`challenge`?location.assign(`bgm-desafio.html?demo=4h&lang=`+e):(h(t),p(`pending`))')
    for old,label,desc in [('Tú + 7 bots · Probar','Desafío','8 manos · Juega la última'),('You + 7 bots · Try','Challenge','8 boards · Play the last one'),('Tu + 7 bot · Prova','Sfida','8 mani · Gioca l’ultima'),('你 + 7个机器人 · 测试','挑战','8 副牌 · 打最后一副')]:
     anchor='teamsDesc:`'+old+'`'
     if menu.count(anchor)!=1: parser.error("El menú de esta copia difiere del menú publicado verificado. No se modificó ningún archivo.")
     menu=menu.replace(anchor,anchor+',challenge:`'+label+'`,challengeDesc:`'+desc+'`')

backup=bridge.parent.parent/('respaldo-bridge-desafio-'+datetime.now().strftime('%Y%m%d-%H%M%S-%f'))
backup.mkdir()
shutil.copy2(menu_path,backup/menu_path.name)
if challenge_path.exists():
    shutil.copy2(challenge_path,backup/challenge_path.name)
shutil.copy2(challenge_source,challenge_path)
temporary=menu_path.with_suffix('.html.tmp')
temporary.write_bytes(menu.encode('utf-8'))
temporary.replace(menu_path)
print(f'Desafío listo para previsualizar en {bridge}. Respaldo: {backup}')
