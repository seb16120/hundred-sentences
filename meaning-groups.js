// In each row, a letter identifies a meaning shared by the listed fragments.
// Write fragments in reading order as Atext/Btext. Text between fragments stays
// plain. A lone letter marks an entire fixed expression; "-" marks no match.
// Columns: fr | en | de | es | it | ru | zh | ja | vi | fil | flp.
(() => {
  'use strict';
  const languages = ['fr','en','de','es','it','ru','zh','ja','vi','fil','flp'];
  const palette = '123456789a';
  const rows = `
1 A|A|A|A|A|A|A|A|A|A|A
2 ABon/Bsoir|AGood/Bevening|AGuten/BAbend|ABuenas/Btardes|ABuona/Bsera|AДобрый/Bвечер|B晚上/A好|Bこんばん/Dは|CChào/Bbuổi tối|AMagandang/Bgabi|ABiu/BPrévInNokta
3 A|A|A|A|A|A|A|A|A|A
4 AÀ/Bbientôt|ASee you/Bsoon|ABis/Bbald|AHasta/Bpronto|AA/Bpresto|AДо/Bскорого|A回头见|B近いうちに|AHẹn/Bsớm/Agặp lại|AHanggang/Bsa muli
5 AMerci/Bbeaucoup|AThank/Cyou/Bvery much|BVielen/ADank|BMuchas/Agracias|AGrazie/Bmille|BБольшое/Aспасибо|B非常/A感谢|Bどうも/Aありがとう/Dございます|ACảm ơn/Brất nhiều|BMaraming/Asalamat
6 A|A|A|A|A|A|A|A|A|A
7 A|A|A|A|A|A|A|A|A|APakiusap/Bpo
8 AExcusez/Bmoi|AExcuse/Bme|AEntschuldigen/C Sie|ADisculpe|BMi/Ascusi|AИзвините|A不好意思|Aすみません|AXin lỗi|APaumanhin/Cpo
9 AJe/Bsuis/Cdésolé|AI/B'm/Csorry|CEs tut/Amir/Cleid|CLo siento|AMi/Cdispiace|AМне/Dочень/Cжаль|C对不起|C申し訳ありません|ATôi/Cxin lỗi|CPasensya na/Dpo|AMui/Bési
10 ABonne/Bjournée|CHave/Anice/Bday|ASchönen/BTag/Dnoch|Ctenga/Abuen/Bdía|ABuona/Bgiornata|AХорошего/Bдня|C祝你/B今天/A愉快|A良い/B一日|CChúc bạn/Bmột ngày/Atốt lành|AMagandang/Baraw/Dpo|ABono/BInLûmi
11 AComment/Bvous/Cappelez/B-vous|AWhat/D's/B your/Cname|AWie/Cheißen/B Sie|ACómo/Cse llama|ACome/Csi chiama|AКак/BВас/Cзовут|B你/C叫/A什么/C名字|C名前/A何/Dですか|BBạn/Ctên/Dlà/A gì|AAno po/Cpangalan/Bninyo|AKést
12 AJe/Bm'appelle|AMy/Bname is|AI/Bheiße|AMe/Bllamo|AMi/Bchiamo|AМеня/Bзовут|A我/B叫|A私の/B名前は|ATôi/Btên là|Bpangalan/Ako|AMui
13 AEnchanté/Bfaire votre connaissance|ANice/Bmeet you|AFreut mich/BSie kennenzulernen|AEncantado/Bconocerle|APiacere/Bconoscerla|AПриятно/Bпознакомиться|A很高兴/B认识你|Aはじめまして|ARất vui/Bđược gặp bạn|AIkinagagalak/Bkayong makilala
14 AD'où/Bvenez/Cvous|AWhere/Bare/Cyou/Afrom|AWoher/Bkommen/C Sie|ADe dónde/Bes/Custed|ADi dov/Bè|AОткуда/CВы|C你/B来自/A哪里|Aどちら/Bご出身|CBạn/Bđến/A từ đâu|ATaga-saan/Ckayo|BinZalir
15 AJe/Bviens/Cde/DFrance|AI/B'm/Cfrom/DFrance|AIch/Bkomme/Caus/DFrankreich|BSoy/Cde/DFrancia|BVengo/Cdalla/DFrancia|AЯ/Cиз/DФранции|A我/B来/C自/D法国|Dフランス/Cから/B来ました|ATôi/Bđến/Ctừ/DPháp|CTaga-/DPransiya/Aako|AMui/BinZalir
16 AJ'/Bhabite/Cprès/Dd'/Eici|AI/Blive/Cnear/Ehere|AIch/Bwohne/Cin der Nähe|BVivo/Ccerca/Dde/Eaquí|BAbito/Equi/Cvicino|AЯ/Bживу/Cнедалеко/Dот/Eсюда|A我/B住/E这/C附近|Eこの/C近く/B住んでいます|ATôi/Bsống/Cgần/Eđây|BNakatira/Aako/Cmalapit/Edito|AMui/Cinext/Eici
17 AJe/Bsuis/Cici/Dpour/Equelques/Fjours|AI/B'm/Chere/Dfor/Ea few/Fdays|AIch/Bbin/Dfür/Eein paar/FTage/Chier|BEstoy/Caquí/Eunos/Fdías|BSono/Cqui/Dper/Equalche/Fgiorno|AЯ/Cздесь/Dна/Eнесколько/Fдней|A我/C这里/B待/E几/F天|E数/F日/D間/Cここ/Bいます|ATôi/Bở/Cđây/Evài/Fngày|CNarito/Aako/Dnang/Eilang/Faraw|AMui/Bicir
18 AC'est/Bma/Cpremière/Dvisite|AIt's/Bmy/Cfirst/Dtime/Ehere|AIch bin/Cersten/DMal/Ehier|AEs/Bmi/Cprimera/Dvez/Eaquí|AÈ/Cla prima/Dvolta/Fvengo/Equi|AЯ/Eздесь/Cвпервые|A我是/C第一次/F来/E这里|Eここ/F来る/C初めて|EĐây/Alà/Clần đầu tiên/Btôi/Fđến/Eđây|CUnang/Dbeses/Bko/Erito|B-sèlf
19 AJe/Bvoyage/Cseul|AI/Btraveling/Calone|AIch/Breise/Callein|BViajo/Cpor mi cuenta|BViaggio/Cda solo|AЯ/Bпутешествую/Cодин|A我/C一个人/B旅行|C一人/B旅行しています|ATôi/Bđi du lịch/Cmột mình|CMag-isa/Aako/Bnaglalakbay|AMui
20 ARavi/Bvous/Crevoir|Agood/Csee/B you/Cagain|ASchön/B Sie/Cwiederzusehen|AMe alegro/Cvolver a verle|Abello/Crivederla|AРад/Cснова/BВас/Cвидеть|A很高兴/C再次见到/B你|Cまたお会いできて/Aうれしい|ARất vui/Cgặp lại/Bbạn|AIkinagagalak/Cmakita/Bkayo/Cmuli
21 AParlez/Bvous/Cfrançais|DDo/B you/A speak/C French|ASprechen/B Sie/C Französisch|AHabla/Cfrancés|AParla/Cfrancese|BВы/Aговорите/Cпо-французски|B你/D会/A说/C法语/D吗|Cフランス語/A話せ/Dますか|BBạn/Dcó/Anói/Ctiếng Pháp/Dkhông|ANagsasalita/Dba/Bkayo/CPranses|AutSpikir
22 AJe/Bparle/Cun peu/Dvotre/Elangue|AI/B speak/Ca little/Dyour/E language|AIch/Bspreche/Cein wenig/DIhre/E Sprache|BHablo/Cun poco/Dsu/Eidioma|BParlo/Cun po'/Dla sua/Elingua|AЯ/Cнемного/Bговорю/DВашем/Eязыке|A我/B会说/C一点/D你的/E语言|Dあなたの/E言葉/C少し/B話せます|ATôi/Bnói được/Cmột chút/Etiếng/Dcủa bạn|CKaunti lang/Balam/Ako/Ewika/Dninyo|AMui/ButSpikir/Epo/D-yors
23 AJe/Bne/Ccomprends/Bpas|AI/Bdon't/Cunderstand|AIch/Cverstehe/Bnicht|BNo/Centiendo|BNon/Ccapisco|AЯ/Bне/Cпонимаю|A我/D听/B不/C懂|C分かり/Bません|ATôi/Bkhông/Chiểu|BHindi/Ako/Cmaintindihan|AMui/Bno-
24 APouvez/Bvous/Crépéter|ACould/B you/C repeat/D that|AKönnen/B Sie/D das/C wiederholen|APuede/Crepetir/Dlo|APuò/Cripetere|AМожете/Cповторить|B你/A能/C再说一遍|Cもう一度言って/Aいただけます|BBạn/A có thể/Cnhắc lại/Ađược không|AMaaari/Bninyong/Culitin
25 APouvez/Bvous/Cparler/Dplus/Elentement|ACould/B you/C speak/D more/E slowly|AKönnen/B Sie/Elangsamer/Csprechen|APuede/Chablar/Dmás/Edespacio|APuò/Cparlare/Dpiù/Elentamente|AМожете/Cговорить/Eпомедленнее|B你/A能/C说/E慢/D一点|Dもう少し/Eゆっくり/C話して/Aいただけます|BBạn/A có thể/Cnói/Echậm/Dhơn/Ađược không|AMaaari/Bkayong/Cmagsalita/Dmas/Emabagal|CutSpikir
26 AComment/Bdit/Gon/Ccela/Ddans/Evotre/Flangue|AHow/Bsay/Cthat/Din/Eyour/Flanguage|AWie/Bsagt/Gman/Cdas/Din/EIhrer/FSprache|ACómo/Bse dice/Ceso/Den/Esu/Fidioma|ACome/Bsi dice/Dnella/Esua/Flingua|AКак/Cэто/Bсказать/Dна/EВашем/Fязыке|C这个/D用/E你的/F语言/A怎么/B说|Cそれは/Eあなたの/F言葉/Dで/A何と/B言います|DTrong/Ftiếng/Ecủa bạn/Bnói/Ccái đó/Athế nào|APaano/Ciyan/Bsabihin/Dsa/Fwika/Eninyo|AKést/ButSpikir/Fpo/E-yors
27 AQu'est-ce que/Bcela/Cveut dire|AWhat/Bthat/Cmean|AWas/Cbedeutet/Bdas|AQué/Csignifica/Beso|AChe cosa/Csignifica|AЧто/Bэто/Cзначит|B这/A什么/C意思|Bそれは/Aどういう/C意味|BĐiều đó/Ccó nghĩa/A gì|AAno/Cibig sabihin/Bniyan|AKe
28 APouvez/Bvous/Cl'/Décrire|ACould/B you/D write/C it/E down|AKönnen/B Sie/C das/D aufschreiben|APuede/Describir/Clo|APuò/Dscriver/Clo|AМожете/Cэто/Dнаписать|B你/A能/C它/D写/E下来|Cそれを/D書いて/Aいただけます|BBạn/A có thể/Dviết/Era/Ađược không|AMaaari/Bninyong/Disulat/Ciyan|Dsimbir
29 AEst-ce que/Bj'/Cai/Dbien/Ecompris|CDid/BI/Eunderstand/Dcorrectly|CHabe/Bich/F das/D richtig/E verstanden|FLo/Che/Eentendido/Dbien|CHo/Ecapito/Dbene|BЯ/Dправильно/Eпонял|B我/E理解/D得对/A吗|D正しく/E理解|BTôi/Ehiểu/Dđúng/Achứ|DTama/Aba/Epagkakaintindi/Bko|BMui/Cbif
30 APouvez/Bvous/Cme/Dmontrer|ACould/B you/D show/C me|AKönnen/B Sie/E es/C mir/D zeigen|APuede/Denseñár/Cme/Elo|APuò/Dmostrar/Cme/Elo|AМожете/Cмне/Dпоказать|B你/A能/C给我/D看一下|D見せて/Aいただけます|BBạn/A có thể/Ccho tôi/Dxem/Ađược không|AMaaari/Bninyong/Dipakita/Csa akin
31 AComment/Ballez-vous|AHow/Bare you|AWie/Bgeht es Ihnen|ACómo/Bestá|ACome/Bsta|AКак/Bу Вас дела|B你/A好|Bお元気/Aですか|BBạn/A khỏe không|AKumusta/Bkayo|AKést
32 AJe/Bvais/Cbien/Dmerci|AI/B'm doing/Cwell/Dthanks|AMir/Bgeht es/Cgut/Ddanke|BEstoy/Cbien/Dgracias|BSto/Cbene/Dgrazie|AУ меня/Eвсё/Cхорошо/Dспасибо|A我/C很好/D谢谢|C元気/Bです/Dありがとう/Fございます|ATôi/Ckhỏe/Dcảm ơn|CMabuti/Aako/Dsalamat|AMui/Bési/Cbono
33 AEt/Bvous|AAnd/Byou|AUnd/BIhnen|AY/Busted|AE/Blei|AА/Bу Вас|B你/A呢|Bあなた/Aは|ACòn/Bbạn|AAt/Bkayo
34 AQu'/Ben/Cpensez/Dvous|AWhat/Dyou/Cthink|AWas/C halten/D Sie/B davon|AQué/Dle/Cparece|AChe/Bne/Cpensa|AЧто/DВы/Bоб этом/Cдумаете|D你/A怎么/C看|Aどう/C思います|DBạn/Cnghĩ/Athế nào|AAno/Cpalagay/Dninyo|AKe
35 AJe/Bsuis/Cd'accord|AI/Cagree|AIch/Cstimme zu|BEstoy/Cde acuerdo|BSono/Cd'accordo|AЯ/Cсогласен|A我/C同意|C賛成/Bです|ATôi/Cđồng ý|CSumasang-ayon/Aako|AMui
36 AJe/Bne/Csuis/Bpas/Dsûr|AI/C'm/Bnot/Dsure|AIch/Cbin/Bnicht/Dsicher|BNo/Cestoy/Dseguro|BNon/Csono/Dsicuro|AЯ/Bне/Dуверен|A我/B不/D确定|D分かり/Bません|ATôi/Bkhông/Dchắc|BHindi/Aako/Dsigurado|AMui/Bno-/Cési
37 AC'/Best/Cintéressant|AThat/B's/Cinteresting|ADas/Bist/Cinteressant|DQué/Cinteresante|DChe/Cinteressante|AЭто/Cинтересно|D真/C有意思|C面白い|CThú vị/Dthật|CKawili-wili/Aiyan
38 A|A|A|A|A|A|A|Aどうして/Bですか|A|ABakit/Bpo
39 APouvez/Bvous/Cm'/Den/Edire/Fplus|ACould/B you/E tell/C me/F more|AKönnen/B Sie/C mir/F mehr/D darüber/E erzählen|APuede/Econtar/Cme/Fmás|APuò/Edir/Cmi/Fdi più|AМожете/Eрассказать/Fподробнее|B你/A能/F多/E说/F一点|Fもう少し詳しく/E教えて/Aいただけます|BBạn/A có thể/Ekể/Fthêm/Ccho tôi|AMaaari/Bninyong/Esabihin/Fpa/Dang tungkol dito|EutSpikir
40 AJ'/Baimerais/Cen/Dsavoir/Eplus|AI/B'd like/Dknow/E more|AIch/Bwürde gern/Emehr/Cdarüber/D erfahren|BMe gustaría/Dsaber/E más|BVorrei/Dsaper/Cne/Edi più|AЯ/Bхотел бы/Dузнать/Eбольше|A我/B想/E多/D了解/E一些|Eもっと/D知り/Bたい|ATôi/Bmuốn/Dtìm hiểu/Ethêm|BGusto/Ako/Epang/Dmalaman/Cang tungkol dito|AMui/Bve
41 AOù/Bse trouve/Cla/Dgare|AWhere/B is/C the/D train station|AWo/Bist/Cder/D Bahnhof|ADónde/Bestá/Cla/Destación de tren|ADov/Bè/Cla/D stazione ferroviaria|AГде/Bнаходится/Dвокзал|D火车站/B在/A哪里|D駅/Aどこ/Bです|DGa tàu/Bở/Ađâu|ANasaan/Cang/D istasyon ng tren
42 AComment/Baller/Cau/Dcentre-ville|AHow/Bget/Ddowntown|AWie/Bkomme/Cins/D Stadtzentrum|ACómo/Epuedo/Bllegar/Cal/Dcentro|ACome/Barrivo/Cin/Dcentro|AКак/Bдобраться/Cдо/Dцентра города|B去/D市中心/A怎么/B走|D街の中心部/Cへ/Aどう/B行け|ALàm thế nào/Bđến/Dtrung tâm thành phố|APaano/Bpumunta/Csa/Dsentro ng lungsod|AKést/Bzalir
43 AEst-ce/Bloin/Cd'/Dici|AIs it/Bfar/Cfrom/Dhere|AIst es/Bweit/Cvon/Dhier|AEstá/Blejos/Cde/Daquí|AÈ/Blontano/Cda/Dqui|AЭто/Bдалеко/Cот/Dсюда|C离/D这里/B远/A吗|Dここ/Cから/B遠い/Aですか|ACó/Bxa/Dđây/Akhông|BMalayo/Aba ito/Cmula/Drito|Bfar
44 AEst-ce/Baccessible/Cà pied|BCan I/Cwalk/Dthere|BKann man/Czu Fuß/Ddorthin/Bgehen|BSe puede ir/Candando|BCi si può andare/Ca piedi|DТуда/Bможно дойти/Cпешком|B可以/C步行/B去/D那里/A吗|C歩いて/B行け/Aますか|BCó thể/Cđi bộ/Bđến/Dđó/Akhông|BMaaari/Cmaglakad/Bpapunta/Droon|Bzalir
45 AQuel/Bbus/Cdois/Dje/Eprendre|AWhich/Bbus/Cshould/D I/E take|AWelchen/BBus/Cmuss/D ich/E nehmen|AQué/Bautobús/Ctengo que/Ecoger|AQuale/Bautobus/Cdevo/Eprendere|Aкакой/Bавтобус/Dмне/Eсесть|D我/C该/E坐/A哪路/B公交车|Aどの/Bバス/E乗れ/Cばいい|DTôi/Cnên/Eđi/Bxe buýt/A số mấy|AAling/Bbus/Cdapat/Dkong/Esakyan|AKe
46 AOù/Bacheter/Cun/Dbillet|AWhere/Ecan I/Bbuy/Ca/Dticket|AWo/Ekann ich/Ceine/DFahrkarte/Bkaufen|ADónde/Epuedo/Bcomprar/Cun/Dbillete|ADove/Eposso/Bcomprare/Cun/Dbiglietto|AГде/Eможно/Bкупить/Dбилет|A哪里/E可以/B买/D票|D切符/Aどこ/B買え|ETôi có thể/Bmua/Dvé/Aở đâu|ASaan/Eako/Bmakakabili/Dtiket
47 AÀ quelle heure/Bpart/Cle/Dtrain|AWhat time/Dtrain/Bleave|AWann/Bfährt/Cder/DZug/Bab|AA qué hora/Bsale/Cel/Dtren|AA che ora/Bparte/Cil/Dtreno|AВо сколько/Bотправляется/Dпоезд|D火车/A几点/B出发|D電車/A何時/B出ます|DTàu/Bkhởi hành/Alúc mấy giờ|AAnong oras/Baalis/Cang/Dtren|Atimig/ButZalir
48 AEst-ce/Ble/Cbon/Dquai|AIs this/Bthe/Cright/Dplatform|AIst das/Bder/Crichtige/DBahnsteig|AEs este/Bel/Dandén/Ccorrecto|AÈ questo/Bil/Dbinario/Cgiusto|AЭто/Cнужная/Dплатформа|A这是/C对的/D站台/A吗|Aこの/Dホーム/C合っています|AĐây có phải/Dsân ga/Cđúng/Akhông|AIto po ba/Bang/Ctamang/Dplataporma|Cbono
49 AJe/Bsuis/Cperdu|AI/B'm/Clost|AIch/Cverlaufen|Cperdido|Cperso|AЯ/Cзаблудился|A我/C迷路|C道に迷いました|ATôi/Clạc đường|CNaliligaw/Aako|AMui/Bési
50 APouvez/Bvous/Cm'/Dindiquer/Ele/Fchemin|ACould/B you/D show/C me/E the/F way|AKönnen/B Sie/C mir/E den/F Weg/D zeigen|APuede/Dindicar/Cme/Eel/Fcamino|APuò/Dindicar/Cmi/Ela/Fstrada|AМожете/Dпоказать/Cмне/Fдорогу|B你/A能/C给我/D指/F路|F道/D教えて/Aいただけます|BBạn/A có thể/Dchỉ/Fđường/Ccho tôi/Akhông|AMaaari/Bninyong/Dituro/Eang/Fdaan|FminiStrase
51 AAvez/Bvous/Cune/Dtable/Epour/Fune/Gpersonne|HDo/B you/A have/Ca/Dtable/Efor/Fone|AHaben/B Sie/Ceinen/DTisch/Efür/Feine/GPerson|ATiene/Dmesa/Epara/Funa/Gpersona|AAvete/Cun/Dtavolo/Eper/Funa/Gpersona|BУ Вас/Aесть/Dстолик/Eна/Fодного|A有/F单人/D桌|F一人/E用/D席/Aあります|ACó/Dbàn/Echo/Fmột/Gngười|AMay/Dmesa/Bkayo/Epara/Fisa|Dtéb
52 APuis/Bje/Cvoir/Dle/Emenu|AMay/B I/C see/D the/E menu|AKann/B ich/D die/E Speisekarte/C sehen|APuedo/Cver/Dla/Ecarta|APosso/Cvedere/Dil/Emenù|AМожно/Cпосмотреть/Eменю|B我/A可以/C看一下/E菜单|Eメニュー/C見せて/Aいただけます|ACho/Btôi/Cxem/Ethực đơn/Ađược không|AMaaari/Cmakita/Dang/Emenu|CinBioyor
53 AQu'est-ce que/Bvous/Crecommandez|AWhat/B you/Crecommend|AWas/Cempfehlen/B Sie|AQué/Dme/Crecomienda|AChe cosa/Dmi/Cconsiglia|AЧто/BВы/Cпосоветуете|B你/C推荐/A什么|Cおすすめ/A何|BBạn/Cgợi ý/Dmón/A gì|AAno po/Cmairerekomenda/Bninyo|AKe
54 AJe/Bvoudrais/Ccommander/Dceci|AI/B'd like/Corder/Dthis|AIch/Bmöchte/Ddas hier/Cbestellen|BQuisiera/Cpedir/Desto|BVorrei/Cordinare/Dquesto|AЯ/Bхотел бы/Cзаказать/Dэто|A我/B想/C点/D这个|Dこれ/C注文/Bしたい|ATôi/Bmuốn/Cgọi/Dmón này|BGusto/Ako/Cumorder/Dnito|AMui/Bve
55 AEst-ce que/Bce/Cplat/Dcontient/Edes/Ffruits de mer|ADoes/Bthis/Cdish/Dcontain/Fseafood|DEnthält/Bdieses/CGericht/FMeeresfrüchte|BEste/Cplato/Dlleva/Fmarisco|BQuesto/Cpiatto/Dcontiene/Ffrutti di mare|Bэтом/Cблюде/Dесть/Fморепродукты|B这道/C菜/D里有/F海鲜/A吗|Bこの/C料理/F魚介類/D入っています/Aか|CMón/Bnày/Dcó/Fhải sản/Akhông|DMay/Flamang-dagat/Aba/Cpagkaing/Bito|Cfodo
56 AJ'/Bai/Cune/Dallergie/Ealimentaire|AI/Bhave/Ca/Efood/Dallergy|AIch/Bhabe/Ceine/ELebensmittel/Dallergie|BTengo/Cuna/Dalergia/Ealimentaria|BHo/Cun'/Dallergia/Ealimentare|AУ меня/Eпищевая/Dаллергия|A我/B有/E食物/D过敏|E食物/Dアレルギー/Bあります|ATôi/Bbị/Ddị ứng/Ethực phẩm|BMay/Dallergy/Aako/Esa pagkain|AMui/Bgétir/Efodo
57 ASans/Balcool/Cs'il vous plaît|ANo/Balcohol/Cplease|AOhne/BAlkohol/Cbitte|ASin/Balcohol/Cpor favor|ASenza/Balcol/Cper favore|AБез/Bалкоголя/Cпожалуйста|C请/A不要/D加/B酒|Bアルコール/Aなし/Cお願いします|AKhông có/Bcồn/Clàm ơn|AWalang/Balak/Cpakiusap|AWiv-ut
58 APourrais/Bje/Cavoir/Dde l'/Eeau|ACould/B I/C have/D some/E water|AKönnte/Bich/Detwas/EWasser/Cbekommen|BMe/Apuede/Ctraer/Eagua|APotrei/Cavere/Ddell'/Eacqua|AМожно/Bмне/Eводы|A可以/C给/B我/D一些/E水|Eお水/Cいただけ/Aますか|ACho/Btôi/Cxin/Dít/Enước/Ađược không|AMaaari/Bakong/Cmakahingi/Etubig|Cgétir/Eo
59 AC'/Bétait/Cdélicieux|AThat/Bwas/Cdelicious|ADas/Bwar/Cköstlich|BEstaba/Cdelicioso|BEra/Cdelizioso|BБыло/Dочень/Cвкусно|D太/C好吃/B了|Dとても/Cおいし/Bかった|AMón ăn/Cngon/Dquá|DNapaka/Csarap
60 AL'/Baddition/Cs'il vous plaît|AThe/Bcheck/Cplease|ADie/BRechnung/Cbitte|ALa/Bcuenta/Cpor favor|AIl/Bconto/Cper favore|BСчёт/Cпожалуйста|C请/B结账|Bお会計/Cお願いします|DCho tôi xin/Bhóa đơn/Clàm ơn|DPahingi/Cpo/Bbill
61 ACombien/Bça/Ccoûte|AHow much/B this/C cost|AWie viel/Ckostet/Bdas|ACuánto/Ccuesta|AQuanto/Ccosta|AСколько/Bэто/Cстоит|B这个/A多少/C钱|Bこれ/Aいくら|BCái này/Cgiá/Abao nhiêu|AMagkano/Bito
62 AAvez/Bvous/Cune/Dautre/Etaille|FDo/B you/A have/Danother/Esize|AHaben/B Sie/Ceine/Dandere/EGröße|ATiene/Dotra/Etalla|AAvete/Cun'/Daltra/Etaglia|BУ Вас/Aесть/Dдругой/Eразмер|A有/D别的/E尺码/F吗|D別の/Eサイズ/Aあります/Fか|BBạn/A có/Ecỡ/Dkhác/Fkhông|AMay/Diba/Fba/Bkayong/Esukat
63 APuis/Bje/Cl'/Dessayer|ACan/B I/D try/C it/D on|AKann/B ich/C das/D anprobieren|APuedo/Dprobár/Cmelo|APosso/Dprovar/Clo|AМожно/Cэто/Dпримерить|B我/A可以/D试穿/E吗|D試着/Aしてもいい/Eですか|BTôi/A có thể/Dmặc thử/Ekhông|AMaaari/Bko/Eba/Citong/Disukat
64 AJe/Bregarde/Cseulement/Dmerci|AI/Cjust/Blooking/Dthanks|AIch/Bschaue/Cnur/Bum/Ddanke|CSolo/Bmirando/Dgracias|Csolo/Bdando un'occhiata/Dgrazie|AЯ/Cпросто/Bсмотрю/Dспасибо|A我/C只是/B看看/D谢谢|B見ている/Cだけ/Dありがとう/Eございます|ATôi/Cchỉ/Bxem/Cthôi/Dcảm ơn|BTumitingin/Clang/Aako/Dsalamat|AMui/BinBioyor
65 AJe/Bvais/Cprendre/Dcelui-ci|AI/B'll/Ctake/Dthis one|AIch/Cnehme/Ddas hier|CMe llevo/Deste|CPrendo/Dquesto|AЯ/Cвозьму/Dвот это|A我/C要/D这个|Dこれ/Cにします|ATôi/Bsẽ/Clấy/Dcái này|CKukunin/Ako/Dito|AMui/Bwil
66 APuis/Bje/Cpayer/Dpar/Ecarte|ACan/B I/C pay/D by/E card|AKann/B ich/D mit/E Karte/C bezahlen|APuedo/Cpagar/Dcon/Etarjeta|APosso/Cpagare/Dcon la/Ecarta|AМожно/Cоплатить/Eкартой|A可以/C刷/E卡/F吗|Eカード/Dで/C払/Aえます/Fか|BTôi/A có thể/Cthanh toán/D bằng/E thẻ/Fkhông|AMaaari/Bakong/Cmagbayad/Dgamit ang/Ekard
67 AAcceptez/Bvous/Cles/Despèces|B you/A accept/D cash|ANehmen/B Sie/D Bargeld/A an|AAcepta/Defectivo|AAccettate/Dcontanti|BВы/Aпринимаете/Dналичные|A收/D现金/E吗|D現金/A使えます/Eか|BBạn/A có nhận/Dtiền mặt/Ekhông|ATumatanggap/Bkayo/Dcash
68 APuis/Bje/Cavoir/Dun/Ereçu|ACould/B I/C have/D a/E receipt|AKann/B ich/D eine/E Quittung/C bekommen|BMe/Apuede/Cdar/Dun/Erecibo|APosso/Cavere/Duna/Ericevuta|AМожно/Cполучить/Eчек|A可以/C给/B我/D一张/E收据/F吗|Eレシート/Cいただけ/Aます/Fか|ACho/Btôi/Cxin/Ebiên lai/Ađược/Fkhông|AMaaari/Bakong/Cmakahingi/Eresibo
69 AAvez/Bvous/Cquelque chose/Dde moins/Echer|FDo/B you/A have/Canything/Dless/Eexpensive|AHaben/B Sie/Cetwas/EGünstigeres|ATiene/Calgo/Dmás/Ebarato|AAvete/Cqualcosa/Ddi meno/Ecaro|BУ Вас/Aесть/Cчто-нибудь/Eподешевле|A有/E便宜/D一点/F吗|Dもう少し/E安い/Cもの/Aあります/Fか|BBạn/A có/Cmón nào/Erẻ/Dhơn/Fkhông|AMay/Dmas/Emura/Bkayo
70 APuis/Bje/Cle/Dretourner|ACan/B I/D return/C it|AKann/B ich/C das/D zurückgeben|APuedo/Ddevolver/Clo|APosso/Drestituir/Clo|AМожно/Cэто/Dвернуть|A可以/D退货/E吗|D返品/Aできます/Eか|BTôi/A có thể/Dtrả lại/Cmón này/Ekhông|AMaaari/Bko/Eba/Citong/Disauli
71 AQuelle/Bheure/Cest-il|AWhat/Btime/Cis it|AWie/Bspät/Cist es|AQué/Bhora/Ces|AChe/Bore/Csono|AКоторый/Bчас|D现在/A几/B点|D今/A何/B時/Cです/Eか|DBây giờ/Clà/A mấy/Bgiờ|AAnong/Boras|Btimig
72 AQuel/Bjour/Csommes-nous|AWhat/Bday/Cis it/Dtoday|AWelcher/BTag/Cist/Dheute|AQué/Bdía/Ces/Dhoy|AChe/Bgiorno/Cè/Doggi|AКакой/Dсегодня/Bдень|D今天/B星期/A几|D今日/A何/B曜日/Cです/Eか|DHôm nay/Clà/A thứ mấy|AAnong/Baraw/Dngayon|BinLûmi
73 AC'/Best/Couvert/Daujourd'hui|BIs/A it/C open/D today|BIst/A es/D heute/C geöffnet|BEstá/Cabierto/Dhoy|BÈ/Caperto/Doggi|DСегодня/Cоткрыто|D今天/C营业/E吗|D今日/C営業しています/Eか|DHôm nay/Ccó mở cửa/Ekhông|CBukas/Eba/Aito/Dngayon|CwaRék
74 AÀ/Bquelle/Cheure/Dça/Eferme|BWhat/Ctime/Dit/Eclose|BWann/Eschließt/D es|AA/Bqué/Chora/Ecierra|AA/Bche/Cora/Echiude|AВо/Bсколько/Eзакрывается|B几/C点/E关门|B何/C時/Aに/E閉まります|BMấy/Cgiờ/Eđóng cửa|BAnong/Coras/Dito/Enagsasara|Ctimig/EgéfRékir
75 AJe/Bserai/Clà/Ddans/Edix/Fminutes|AI/B'll be/Cthere/Din/Eten/Fminutes|AIch/Bbin/Din/Ezehn/FMinuten/Cda|BEstaré/Callí/Ddentro de/Ediez/Fminutos|BSarò/Clì/Dtra/Edieci/Fminuti|AЯ/Bбуду/Cтам/Dчерез/Eдесять/Fминут|A我/E十/F分钟/D后/G到|E10/F分/D後に/G着きます|EMười/Fphút/Dnữa/Atôi/Bsẽ/Gđến|GDarating/Aako/Criyan/Dsa loob ng/Esampung/Fminuto|AMui/Bwil/Blar
76 AJ'/Barrive/Ctout de suite|AI/B'll be/Cright/D there|AIch/Bkomme/Csofort|BLlego/Censeguida|BArrivo/Csubito|AЯ/Cсейчас/Bприду|A我/C马上/B到|Cすぐに/B行きます|ATôi/Bđến/Cngay|BPapunta/Aako/Driyan|AMui/BinZalir
77 APouvons/Bnous/Cretrouver/Ddemain|ACan/B we/Cmeet/Dtomorrow|AKönnen/B wir/Dmorgen/Ctreffen|APodemos/Cquedar/Dmañana|APossiamo/Cvederci/Ddomani|BМы/Aможем/Cвстретиться/Dзавтра|B我们/D明天/A能/C见面|D明日/C会/Aえます|DNgày mai/Bchúng ta/A có thể/Cgặp nhau|AMaaari/Btayong/Cmagkita/Dbukas|Dtomoro
78 AJ'/Bai besoin/Cde plus/Dde/Etemps|AI/Bneed/Cmore/Etime|AIch/Bbrauche/Cmehr/EZeit|BNecesito/Cmás/Etiempo|BHo bisogno/Ddi/Cpiù/Etempo|AМне/Bнужно/Cбольше/Eвремени|A我/B需要/C多一点/E时间|Cもう少し/E時間/B必要|ATôi/Bcần/Cthêm/Ethời gian|BKailangan/Ako/Cpa/Eoras|AMui/Etimig
79 AIl/B est/Ctrop/Dtard/Epour/Fmoi|AIt/B's/Ctoo/Dlate/Efor/Fme|EFür/Fmich/Bist/Aes/Czu/Dspät|BEs/Cdemasiado/Dtarde/Epara/Fmí|EPer/Fme/Bè/Ctroppo/Dtardi|Fменя/Aэто/Cслишком/Dпоздно|E对/F我/E来说/C太/D晚|F私/Eには/D遅/Cすぎ|EĐối với/Ftôi/Dmuộn/Cquá|DHuli/Epara sa/Fakin
80 AQuand/Bcela/Ccommence|AWhen/Bit/Cstart|AWann/Cfängt/Bes/Can|ACuándo/Cempieza|AQuando/Ccomincia|AКогда/Bэто/Cначинается|A什么时候/C开始|Aいつ/C始まります|AKhi nào/Cbắt đầu|AKailan/Bito/Cmagsisimula
81 AJ'/Bai besoin/Cd'/Daide|AI/Bneed/Dhelp|AIch/Bbrauche/DHilfe|BNecesito/Dayuda|BHo bisogno/Cdi/Daiuto|AМне/Bнужна/Dпомощь|A我/B需要/D帮助|D助け/B必要|ATôi/Bcần/Dgiúp đỡ|BKailangan/Ako/Dtulong|AMui
82 APouvez/Bvous/Cm'/Daider|ACan/B you/D help/C me|AKönnen/B Sie/C mir/D helfen|APuede/Dayudar/Cme|APuò/Daiutar/Cmi|BВы/Aможете/Cмне/Dпомочь|B你/A能/D帮/C我|D手伝って/Aいただけます|BBạn/A có thể/Dgiúp/Ctôi/Akhông|AMaaari/Bninyo/Cakong/Dtulungan
83 AAppelez/Bles/Csecours/Ds'il vous plaît|DPlease/Acall/Cemergency services|ARufen/Dbitte/Bden/CRettungsdienst|ALlame/Cemergencias/Dpor favor|AChiami/Bi/Csoccorsi/Dper favore|DПожалуйста/Aвызовите/Cскорую помощь|D请/A叫/C急救人员|C救急車/A呼んで/Dください|DXin hãy/Agọi/Ccấp cứu|ATumawag/Dpo/Cserbisyong pang-emerhensiya
84 AOù/Bse trouve/Cl'/Dhôpital/Ele plus/Fproche|AWhere/B is/C the/E nearest/D hospital|AWo/Bist/Cdas/E nächste/D Krankenhaus|ADónde/Bestá/Cel/Dhospital/Emás/Fcercano|ADov/Bè/Cl'/Dospedale/Epiù/Fvicino|AГде/Eближайшая/Dбольница|E最近/D医院/B在/A哪里|E一番/F近い/D病院/Aどこ/Bです|DBệnh viện/Fgần/Enhất/Bở/Ađâu|ANasaan/Cang/Epinaka/Fmalapit/Dospital
85 AJe/Bne/Cme sens/Bpas/Dbien|AI/Bdon't/Cfeel/Dwell|AMir/Cgeht es/Bnicht/Dgut|BNo/Cme encuentro/Dbien|BNon/Cmi sento/Dbene|AЯ/Bплохо/Cсебя чувствую|A我/C身体/B不/D舒服|C具合/B悪い|ATôi/Cthấy/Bkhông/Dkhỏe|BHindi/Dmaganda/Cpakiramdam/Ako|AMui/Bno-/Dbono
86 AJ'/Bai/Cperdu/Dmon/Etéléphone|AI/Clost/Dmy/Ephone|AIch/Bhabe/Dmein/EHandy/Cverloren|BHe/Cperdido/Fel/Emóvil|BHo/Cperso/Fil/Etelefono|AЯ/Cпотерял/Eтелефон|D我的/E手机/C丢了|E携帯電話/Cなくしました|ATôi/Cbị mất/Eđiện thoại|CNawala/Etelepono/Dko|AMui/Bbif/D-sèlf
87 AMon/Bsac/Ca été/Dvolé|AMy/Bbag/Cwas/Dstolen|AMeine/BTasche/Cwurde/Dgestohlen|AMe/Chan/Drobado/Bbolso|AMi/Channo/Drubato/Bborsa|AУ меня/Dукрали/Bсумку|A我的/B包/C被/D偷了|Bかばん/D盗まれました|BTúi/Acủa tôi/Cbị/Dđánh cắp|DNinakaw/Bbag/Ako|A-sèlf/Cbif
88 AOù/Bsont/Cles/Dtoilettes|AWhere/B is/C the/D restroom|AWo/Bist/Cdie/DToilette|ADónde/Bestá/Cel/Dbaño|ADov/Bè/Cil/Dbagno|AГде/Dтуалет|D洗手间/B在/A哪里|Dお手洗い/Aどこ/Bです|DNhà vệ sinh/Bở/Ađâu|ANasaan/Cang/Dpalikuran
89 AEst-ce que/Btout/Cva/Dbien|CIs/Beverything/Dokay|CIst/Balles/Din Ordnung|CEstá/Btodo/Dbien|CVa/Btutto/Dbene|BВсё/Dв порядке|B一切/C都还/D好/A吗|D大丈夫/Cです/Aか|BMọi chuyện/Dổn/Achứ|DAyos/Aba/Blahat|BOl/Cési/Dbono
90 AMerci/Bpour/Cvotre/Daide|AThank/Fyou/Bfor/Cyour/Dhelp|ADanke/Bfür/CIhre/DHilfe|AGracias/Bpor/Csu/Dayuda|AGrazie/Bper/Cil suo/Daiuto|AСпасибо/Bза/Dпомощь|A谢谢/C你的/D帮助|D助けて/Aありがとう/Eございます|ACảm ơn/Cbạn/Dgiúp đỡ|ASalamat/Bsa/Dtulong/Cninyo
91 AQu'/Baimez/Cvous/Dfaire/Ependant/Fvotre/Gtemps/Hlibre|AWhat/I do/Cyou/Blike/Jto/Ddo/Ein/Fyour/Hfree/Gtime|AWas/Dmachen/C Sie/Bgern/Ein/FIhrer/HFrei/Gzeit|AQué/Cle/Bgusta/Dhacer/E en/Fsu/Gtiempo/Hlibre|ACosa/Cle/Bpiace/Dfare/Enel/Gtempo/Hlibero|AЧто/CВы/Bлюбите/Dделать/Eв/Hсвободное/Gвремя|C你/H空闲/E时/B喜欢/D做/A什么|H暇/Eなとき/A何/Dする/B好き|CBạn/Bthích/Dlàm/A gì/E lúc/Hrảnh|AAno/Bgusto/Cninyo/Dgawin/Esa/Hlibreng/Goras/Fninyo|AKe/Bamorir/Dmakar
92 AJ'/Baime/Cla/Dmusique/Eet/Fles/Glivres|AI/Blike/Dmusic/Eand/Gbooks|AIch/Bmag/DMusik/Eund/GBücher|BMe gustan/Cla/Dmúsica/Ey/Flos/Glibros|BMi piacciono/Cla/Dmusica/Ee/Fi/Glibri|BМне нравятся/Dмузыка/Eи/Gкниги|A我/B喜欢/D音乐/E和/G书|D音楽/Eと/G本/B好き|ATôi/Bthích/Dâm nhạc/Evà/Gsách|BMahilig/Aako/Dmusika/Eat/Fmga/Glibro|AMui/Bamoir
93 AQu'est-ce que/Bvous/Caimez/Dici|AWhat/B you/C like/Dabout this place|AWas/Cgefällt/B Ihnen/D hier|AQué/Ble/Cgusta/Dde este lugar|AChe cosa/Ble/Cpiace/Ddi questo posto|AЧто/BВам/Dздесь/Cнравится|B你/C喜欢/D这里/A什么|Dここ/Aどんなところ/C好き|BBạn/Cthích/Ađiều gì/Dở nơi này|AAno/Cnagustuhan/Bninyo/Drito|AKe/Camorir/Dici
94 AConnaissez/Bvous/Cun/Dendroit/Eagréable/Fà visiter|B you/A know/Ca/E nice/D place/Fto visit|AKennen/B Sie/Ceinen/Eschönen/DOrt/Fden man besuchen|AConoce/Calgún/Dsitio/Ebonito/Fpara visitar|AConosce/Cun/Ebel/Dposto/Fda visitare|BВы/Aзнаете/Eинтересное/Dместо/Fкоторое стоит посетить|B你/A知道/F值得去/E好/D地方|Eおすすめ/F観光/Dスポット|BBạn/A có biết/Dnơi nào/Ehay/Fđể tham quan|AMay alam/Bkayo/Emagandang/Dlugar/Fna puwedeng puntahan|Ebiu
95 AVoulez/Bvous/Cprendre/Dun/Ecafé|AWould/B you/A like/C get/E coffee|AMöchten/B Sie/D einen/E Kaffee/C trinken gehen|BLe/Aapetece/Ctomar/Dun/Ecafé|BLe/Ava di/Cprendere/Dun/Ecaffè|AХотите/Cвыпить/Eкофе|B你/A想/F一起/C喝/D杯/E咖啡|F一緒に/Eコーヒー/C飲み/Aませんか|BBạn/A có muốn/Cđi uống/Ecà phê|AGusto/Bninyong/Cmagkape|Ave
96 AJ'/Bai/Cpassé/Dun/Ebon/Fmoment|AI/Chad/Da/Egreat/Ftime|AIch/Chatte/Deine/Eschöne/FZeit|Bhe/Cpasado/Emuy bien|Cdivertito/Emolto|AЯ/Eотлично/Cпровёл/Fвремя|A我/C玩/E很开心|E楽しい/F時間/C過ごせました|ATôi/Cđã có/Dkhoảng/Fthời gian/Erất vui|Cenjoy/Aako|AMui/Bbif/Ebono/Ftimig
97 APouvons/Bnous/Crester/Den/Econtact|ACan/B we/Ckeep/Din/E touch|AKönnen/B wir/Din/EKontakt/Cbleiben|APodemos/Cseguir/Den/Econtacto|APossiamo/Crestare/Din/Econtatto|BМы/Aможем/Cоставаться/Dна/Eсвязи|B我们/A可以/C保持/E联系|Cこれからも/E連絡/C取り/A合えます|BChúng ta/A có thể/Cgiữ/Eliên lạc|APuwede/Btayong/Cmanatiling/E magkakontak
98 AVoici/Bmon/Cnuméro|AHere's/Bmy/Cnumber|AHier ist/Bmeine/CNummer|AEste es/Bmi/Cnúmero|AQuesto è/Bil mio/Cnumero|AВот/Bмой/Cномер|A这是/B我的/C电话号码|Aこれが/B私の/C電話番号|AĐây là/Csố điện thoại/Bcủa tôi|AHeto/Cnumero/Bko|B-sèlf
99 AÀ/Bla prochaine|ASee you/Bnext time|ABis zum/Bnächsten Mal|AHasta/Bla próxima|AAlla/Bprossima|AДо/Bследующего раза|B下次/A见|B今度|AHẹn gặp/Blần sau|AHanggang/Bsa muli
100 APrenez/Bsoin/Cde vous|ATake/Bcare|APassen/Cauf sich/Aauf|ACuíde/Cse|Aprenda/Bcura/Cdi sé|AБерегите/Cсебя|B保重|Cお体/B気をつけ/Aください|ABạn nhớ/Bgiữ gìn/Csức khỏe|BIngat/Ckayo
`;

  const alignments = new Map(rows.trim().split('\n').map(line => {
    const separator = line.indexOf(' ');
    const number = Number(line.slice(0, separator));
    const rules = line.slice(separator + 1).split('|');
    return [number, Object.fromEntries(rules.map((rule, index) => [languages[index], rule]))];
  }));

  const latinAlignments = {
    5: {
      zh:'BFēicháng/Agǎnxiè',
      ja:'BDōmo/Aarigatō/Dgozaimasu'
    }
  };

  // Resolve literal fragments against the displayed text. Keep all gaps and
  // punctuation verbatim, and never project a match onto a different string.
  function splitByRule(text, rule) {
    const plain = [{ meaning:'', text }];
    if (!rule || rule === '-') return plain;
    if (/^[A-Z]$/.test(rule)) return [{ meaning:rule, text }];

    const segments = [];
    let offset = 0;
    for (const fragment of rule.split('/')) {
      const meaning = fragment[0];
      const value = fragment.slice(1);
      const start = text.indexOf(value, offset);
      if (start === -1 || !value) return plain;
      if (start > offset) segments.push({ meaning:'', text:text.slice(offset, start) });
      segments.push({ meaning, text:value });
      offset = start + value.length;
    }
    if (offset < text.length) segments.push({ meaning:'', text:text.slice(offset) });
    return segments;
  }

  function getSourceColors(segments) {
    const colors = new Map();
    for (const { meaning } of segments) {
      if (meaning && !colors.has(meaning) && colors.size < palette.length) {
        colors.set(meaning, palette[colors.size]);
      }
    }
    return colors;
  }

  window.getPhraseHighlighting = (number, source, sourceText) => {
    const rules = alignments.get(number) || {};
    const sourceSegments = splitByRule(sourceText, rules[source]);
    const colors = getSourceColors(sourceSegments);
    const applyColors = segments => segments.map(({ meaning, text }) => ({
      group:colors.get(meaning) || '0',
      text
    }));

    return {
      source:applyColors(sourceSegments),
      translation(language, text) {
        return applyColors(splitByRule(text, rules[language]));
      },
      romanization(language, text, original) {
        if (language === 'ru') {
          const segments = splitByRule(original, rules.ru)
            .map(segment => ({ ...segment, text:window.romanizeRussian(segment.text) }));
          if (segments.map(segment => segment.text).join('') === text) return applyColors(segments);
        }
        return applyColors(splitByRule(text, latinAlignments[number]?.[language]));
      }
    };
  };
})();

