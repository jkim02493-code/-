import type { Locale } from "@/i18n/config";

export type Culture = "korea" | "china";
export type CollectionFilter = "all" | Culture;
export type ArtworkCategory = "celadon" | "buncheong" | "white" | "sancai" | "longquan" | "blueWhite";
export type ArtworkText = { title: string; period: string; alt: string; dimensions: string; description: string; material: string };
export type Artwork = { id: string; culture: Culture; category: ArtworkCategory; image: string; source: string; accession: string; translations: Record<Locale, ArtworkText> };

// Owner-managed catalog. These museum references are not Seikoudou inventory.
export const artworks: Artwork[] = [
  { id:"KR-REF-001", culture:"korea", category:"celadon", image:"/images/celadon.jpg", source:"https://www.metmuseum.org/art/collection/search/39590", accession:"27.119.11", translations: {
    en:{ title:"Celadon maebyeong", period:"Goryeo · Late 13th century", alt:"Pale green maebyeong vase inlaid with white cranes and clouds", dimensions:"H 29.2 × Ø 18.1 cm", description:"Cranes drift among clouds beneath a soft celadon glaze, following the generous curve of the vessel.", material:"Stoneware with inlaid design under celadon glaze" },
    ja:{ title:"青磁象嵌雲鶴文梅瓶", period:"高麗時代・13世紀後半", alt:"白い鶴と雲を象嵌した淡緑色の青磁梅瓶", dimensions:"高さ29.2 × 直径18.1 cm", description:"やわらかな青磁釉の下で、雲の間を舞う鶴。おおらかな器の曲線に沿って文様が広がります。", material:"青磁釉・象嵌装飾の炻器" },
    ko:{ title:"청자 상감운학문 매병", period:"고려시대 · 13세기 후반", alt:"흰 학과 구름을 상감한 은은한 녹색 청자 매병", dimensions:"높이 29.2 × 지름 18.1 cm", description:"은은한 청자 유약 아래, 구름 사이를 나는 학이 풍만한 기형의 곡선을 따라 펼쳐집니다.", material:"청자 유약 아래 상감으로 장식한 도자기" },
    zh:{ title:"青瓷镶嵌云鹤纹梅瓶", period:"高丽时期 · 13世纪晚期", alt:"饰有白色云鹤镶嵌纹的淡青色梅瓶", dimensions:"高29.2 × 直径18.1厘米", description:"温润的青釉之下，仙鹤穿行于云间，纹样沿着饱满的器身曲线舒展。", material:"施青釉的镶嵌纹炻器" }
  }},
  { id:"KR-REF-002", culture:"korea", category:"buncheong", image:"/images/buncheong.jpg", source:"https://www.metmuseum.org/art/collection/search/851660", accession:"2021.126", translations: {
    en:{ title:"Buncheong bottle", period:"Joseon · Late 15th–early 16th c.", alt:"Buncheong bottle with a flowering plant painted in iron-brown over white slip", dimensions:"H 25.4 cm", description:"A flowering plant, painted in iron-brown over white slip, gives the surface a lively, unhurried rhythm.", material:"Buncheong ware with white slip and iron-brown" },
    ja:{ title:"粉青沙器鉄絵草花文瓶", period:"朝鮮時代・15世紀後半〜16世紀初頭", alt:"白化粧の上に鉄絵で草花を描いた粉青沙器の瓶", dimensions:"高さ25.4 cm", description:"白化粧の上に鉄絵で描かれた草花が、器肌に生き生きとした、おおらかなリズムを添えます。", material:"白化粧・鉄絵の粉青沙器" },
    ko:{ title:"분청사기 철화 초화문 병", period:"조선시대 · 15세기 후반~16세기 초", alt:"백토 분장 위에 철화로 초화문을 그린 분청사기 병", dimensions:"높이 25.4 cm", description:"백토로 분장한 표면 위에 철화로 그린 풀꽃이 생동감 있고 여유로운 리듬을 전합니다.", material:"백토 분장과 철화 장식의 분청사기" },
    zh:{ title:"粉青沙器铁绘花草纹瓶", period:"朝鲜时期 · 15世纪晚期至16世纪初", alt:"在白色化妆土上以铁褐彩绘花草的粉青沙器瓶", dimensions:"高25.4厘米", description:"白色化妆土上的铁褐色花草纹，为器物表面增添了生动而从容的节奏。", material:"施白色化妆土与铁褐彩的粉青沙器" }
  }},
  { id:"KR-REF-003", culture:"korea", category:"white", image:"/images/porcelain.jpg", source:"https://www.metmuseum.org/art/collection/search/45432", accession:"1979.413.1", translations: {
    en:{ title:"Moon jar", period:"Joseon · Second half 18th century", alt:"Round Korean white porcelain moon jar", dimensions:"H 38.7 × Ø 33 cm", description:"An expansive white porcelain form, its gentle asymmetry offering a different balance from every angle.", material:"Porcelain" },
    ja:{ title:"白磁月壺", period:"朝鮮時代・18世紀後半", alt:"丸みを帯びた韓国白磁の月壺", dimensions:"高さ38.7 × 直径33 cm", description:"ゆったりとした白磁のかたち。わずかな非対称性が、見る角度ごとに異なる均衡を見せます。", material:"白磁" },
    ko:{ title:"백자 달항아리", period:"조선시대 · 18세기 후반", alt:"둥근 형태의 한국 백자 달항아리", dimensions:"높이 38.7 × 지름 33 cm", description:"넉넉한 백자의 형태에 깃든 부드러운 비대칭이 바라보는 각도마다 새로운 균형을 보여줍니다.", material:"백자" },
    zh:{ title:"白瓷月亮罐", period:"朝鲜时期 · 18世纪后半叶", alt:"圆润的韩国白瓷月亮罐", dimensions:"高38.7 × 直径33厘米", description:"丰盈的白瓷形体略带不对称之美，从不同角度欣赏，皆呈现独特的平衡。", material:"白瓷" }
  }},
  { id:"CN-REF-001", culture:"china", category:"sancai", image:"/images/chinese-tang-horse.jpg", source:"https://www.metmuseum.org/art/collection/search/42189", accession:"1991.253.12", translations: {
    en:{ title:"Sancai horse", period:"Tang dynasty · Late 7th–early 8th c.", alt:"Tang dynasty earthenware horse with amber green and cream sancai glaze", dimensions:"H 73.7 × W 81.3 × D 30.5 cm", description:"Amber, green, and cream glazes travel across a monumental horse whose alert stance captures the confidence of Tang court culture.", material:"Earthenware with three-color glaze and pigment" },
    ja:{ title:"三彩陶馬", period:"唐時代・7世紀後半〜8世紀前半", alt:"褐色・緑・白の三彩釉を施した唐時代の陶馬", dimensions:"高さ73.7 × 幅81.3 × 奥行30.5 cm", description:"褐色、緑、白の釉が堂々たる馬体を流れ、緊張感ある立ち姿に唐代宮廷文化の力強さが宿ります。", material:"三彩釉・顔料を施した陶器" },
    ko:{ title:"당삼채 도마", period:"당나라 · 7세기 후반~8세기 전반", alt:"갈색 녹색 백색의 삼채 유약을 입힌 당나라 도마", dimensions:"높이 73.7 × 너비 81.3 × 깊이 30.5 cm", description:"황갈색과 녹색, 크림색 유약이 당당한 말의 몸을 타고 흐르며 긴장감 있는 자세에 당대 궁정 문화의 기상을 담았습니다.", material:"삼채 유약과 안료로 장식한 도기" },
    zh:{ title:"唐三彩陶马", period:"唐代 · 7世纪晚期至8世纪前半叶", alt:"施褐绿白三彩釉的唐代陶马", dimensions:"高73.7 × 宽81.3 × 深30.5厘米", description:"褐、绿、乳白三色釉在雄健的马身上自然流淌，警觉的姿态凝聚着盛唐宫廷文化的气度。", material:"施三彩釉与彩绘的陶器" }
  }},
  { id:"CN-REF-002", culture:"china", category:"longquan", image:"/images/chinese-song-bowl.jpg", source:"https://www.metmuseum.org/art/collection/search/51047", accession:"34.113.10", translations: {
    en:{ title:"Longquan celadon bowl", period:"Song dynasty · 960–1279", alt:"Small Song dynasty Longquan bowl covered in a sea-green celadon glaze", dimensions:"H 8.6 × Ø 12.7 cm", description:"A deep sea-green glaze gathers softly around the restrained contours, revealing the Song ideal of balance through simplicity.", material:"Porcelaneous ware with Longquan celadon glaze" },
    ja:{ title:"龍泉窯青磁碗", period:"宋時代・960〜1279年", alt:"海緑色の青磁釉を施した宋時代の龍泉窯碗", dimensions:"高さ8.6 × 直径12.7 cm", description:"深い海緑色の釉が端正な輪郭を包み、簡潔な造形の中に宋代の均衡美を映し出します。", material:"龍泉窯青磁釉の磁質陶器" },
    ko:{ title:"용천요 청자 완", period:"송나라 · 960~1279년", alt:"바다빛 청자 유약을 입힌 송나라 용천요 완", dimensions:"높이 8.6 × 지름 12.7 cm", description:"깊은 바다빛 유약이 절제된 윤곽을 감싸며 단순함 속 균형을 추구한 송대 미감을 보여줍니다.", material:"용천요 청자 유약을 입힌 자기질 도기" },
    zh:{ title:"龙泉窑青瓷碗", period:"宋代 · 960—1279年", alt:"施海绿色青釉的宋代龙泉窑碗", dimensions:"高8.6 × 直径12.7厘米", description:"深沉的梅子青釉温润地包覆着克制的轮廓，于简约之中呈现宋代所崇尚的均衡之美。", material:"施龙泉青釉的瓷质器" }
  }},
  { id:"CN-REF-003", culture:"china", category:"blueWhite", image:"/images/chinese-ming-vase.jpg", source:"https://www.metmuseum.org/art/collection/search/50027", accession:"50.221.47", translations: {
    en:{ title:"Blue-and-white vase", period:"Ming dynasty · Before 1645", alt:"Ming porcelain vase painted with a cobalt blue floral landscape", dimensions:"H 19.1 cm", description:"Cobalt brushwork circles the compact form with flowers and rocky landscape, animated by the open white porcelain ground.", material:"Porcelain painted in underglaze blue" },
    ja:{ title:"青花花卉文瓶", period:"明時代・1645年以前", alt:"コバルトブルーで花卉と山水を描いた明時代の磁器瓶", dimensions:"高さ19.1 cm", description:"余白を生かした白磁の器面を、コバルトで描かれた花卉と岩景がめぐり、小ぶりな器に豊かな動きを与えます。", material:"染付の磁器" },
    ko:{ title:"청화백자 화훼문 병", period:"명나라 · 1645년 이전", alt:"코발트 청화로 꽃과 산수를 그린 명나라 백자 병", dimensions:"높이 19.1 cm", description:"여백을 살린 백자 표면을 코발트 청화의 꽃과 바위 풍경이 감싸며 작은 기형에 풍부한 움직임을 더합니다.", material:"코발트 안료로 청화 장식한 백자" },
    zh:{ title:"青花花卉纹瓶", period:"明代 · 1645年以前", alt:"以钴蓝描绘花卉山石的明代青花瓷瓶", dimensions:"高19.1厘米", description:"钴蓝笔触环绕小巧器身，花卉与山石在开阔的白瓷留白间舒展，富有流动的节奏。", material:"青花瓷" }
  }}
];
