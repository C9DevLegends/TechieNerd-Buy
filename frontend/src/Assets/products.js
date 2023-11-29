import eva from './images/eva.png'
import yale from './images/yale.png'
import viva from './images/viva.png'
import bear33 from './images/33.png'
import amstel from './images/amstel.png'
import auntieB from './images/auntie-b-.png'
import babaAndMe from './images/baby-and-me-soap.png'
import belleful from './images/belleful.png'
import budweiser from './images/budweiser.png'
import candle from './images/candle.png'
import checkersCustard from './images/checkers-custard.png'
import closeUp from './images/close-up.png'
import colgate from './images/colgate.png'
import doganSugar from './images/dogan-sugar.png'
import golgenPanny from './images/golden-penny.png'
import goodMamaBig from './images/good-mama-big.png'
import goodMama from './images/good-mama.png'
import gulder from './images/gulder.png'
import heineken from './images/heineken.png'
import hero from './images/hero.png'
import holandia from './images/holandia-milk.png'
import hungryMan from './images/hungry-man.png'
import indomitable from './images/indomitable.png'
import ivory from './images/ivory.png'
import klin from './images/klin.png'
import life from './images/life.png'
import miloBig from './images/milo-big.png'
import miloSmall from './images/milo-small.png'
import mirinda from './images/mirinda.png'
import nittol from './images/nittol.png'
import nutriMilk from './images/nutri-milk.png'
import nutriYo from './images/nutri-yo.png'
import oralB from './images/oral-b.png'
import peakFilled from './images/peak-filled.png'
import peakFull from './images/peak-full.png'
import peakSachet from './images/peak-sachet.png'
import pepsi from './images/pepsi.png'
import star from './images/star.png'
import superPack from './images/super-pack.png'
import supremeBig from './images/supreme-big.png'
import supremeSmall from './images/supreme-small.png'
import threeCrowns from './images/three-crowns.png'
import tiger from './images/tiger.png'
import toothBrush from './images/tooth-brush.png'



const products = [
    {
        id: '01',
        productName: 'Good Mama Small',
        category: 'detergent',
        price: 100,
        imgUrl: goodMama,
        display: 'grocery'
    },
    {
        id: '02',
        productName: 'Good Mama Midium',
        category: 'detergent',
        price: 200,
        imgUrl: goodMama
    },
    {
        id: '03',
        productName: 'Good Mama Big',
        category: 'detergent',
        price: 1000,
        imgUrl: goodMamaBig
    },
    {
        id: '04',
        productName: 'Nitol',
        category: 'detergent',
        price: 200,
        imgUrl: nittol
    },
    {
        id: '05',
        productName: 'Klin Midium',
        category: 'detergent',
        price: 200,
        imgUrl: klin
    },
    {
        id: '06',
        productName: 'Ivory',
        category: 'soap',
        price: 350,
        imgUrl: ivory
    },
    {
        id: '09',
        productName: 'Baby & Me',
        category: 'soap',
        price: 300,
        imgUrl: babaAndMe,
        display: 'grocery'
    },
    {
        id: '08',
        productName: 'Viva',
        category: 'soap',
        price: 350,
        imgUrl: viva,
        display: 'favorite'
    },
    {
        id: '07',
        productName: 'Eva',
        category: 'soap',
        price: 400,
        imgUrl: eva
    },
    {
        id: '10',
        productName: 'Gulder',
        category: 'beer',
        price: 550,
        imgUrl: gulder
    },
    {
        id: '11',
        productName: 'Star',
        category: 'beer',
        price: 500,
        imgUrl: star,
        display: 'grocery'
    },
    {
        id: '12',
        productName: 'Heineken',
        category: 'beer',
        price: 700,
        imgUrl: heineken,
        display: 'favorite'

    },
    {
        id: '13',
        productName: 'Hero',
        category: 'beer',
        price: 400,
        imgUrl: hero
    },
    {
        id: '14',
        productName: 'Budweiser',
        category: 'beer',
        price: 600,
        imgUrl: budweiser
    },
    {
        id: '15',
        productName: 'Tiger',
        category: 'beer',
        price: 400,
        imgUrl: tiger
    },
    {
        id: '16',
        productName: '33',
        category: 'beer',
        price: 500,
        imgUrl: bear33
    },
    {
        id: '17',
        productName: 'Life',
        category: 'beer',
        price: 400,
        imgUrl: life
    },
    {
        id: '18',
        productName: 'pepsi',
        category: 'soft',
        price: 200,
        imgUrl: pepsi
    },
   
    {
        id: '19',
        productName: 'Mirind',
        category: 'soft',
        price: 200,
        imgUrl: mirinda
    },
   
    {
        id: '24',
        productName: 'Amstel',
        category: 'soft',
        price: 300,
        imgUrl: amstel
    },
   
    {
        id: '27',
        productName: 'Milo small',
        category: 'Beverages',
        price: 100,
        imgUrl: miloSmall
    },
    {
        id: '28',
        productName: 'Peak Full Cream',
        category: 'Beverages',
        price: 550,
        imgUrl: peakFull,
        badge: 'Upto %5',
        description: 'Packed with 28 Vitamins and Minerals including Vitamins A,D,C,B1 and B6',
        display: 'topBrand'
    },
    {
        id: '29',
        productName: 'Peak Filled Evap',
        category: 'Beverages',
        price: 400,
        imgUrl: peakFilled,
        display: 'grocery'
    },
    {
        id: '30',
        productName: 'Peak Sachet',
        category: 'Beverages',
        price: 120,
        imgUrl: peakSachet
    },
    {
        id: '31',
        productName: 'Three Crown',
        category: 'Beverages',
        price: 100,
        imgUrl: threeCrowns
    },
    {
        id: '32',
        productName: 'Milo Tea',
        category: 'Beverages',
        price: 1500,
        imgUrl: miloBig,
        badge: 'Upto %5',
        description: 'Made from natural goodness of malt, milk and cocoa. Enriched with Vitamins and Minerals',
        display: 'topBrand'
    },
    {
        id: '33',
        productName: 'Hollandia',
        category: 'Beverages',
        price: 250,
        imgUrl: holandia,
        display: 'grocery'
    },
    {
        id: '34',
        productName: 'Nutri Milk',
        category: 'Beverages',
        price: 300,
        imgUrl: nutriMilk,
        display: 'grocery'
    },
    {
        id: '35',
        productName: 'Nutri Yo',
        category: 'Beverages',
        price: 350,
        imgUrl: nutriYo,
        display: 'favorite'
    },
    {
        id: '36',
        productName: 'Suprem Small',
        category: 'noodles',
        price: 110,
        imgUrl: supremeSmall
    },
    {
        id: '37',
        productName: 'Suprem Big',
        category: 'noodles',
        price: 200,
        imgUrl: supremeBig
    },
    {
        id: '38',
        productName: 'Indomie Super Pack',
        category: 'noodles',
        price: 220,
        imgUrl: superPack
    },
    {
        id: '39',
        productName: 'Indomie Small pack',
        category: 'noodles',
        price: 130,
        imgUrl: indomitable,
        display: 'grocery'
        
    },
    {
        id: '40',
        productName: 'Indomie Hungry man ',
        category: 'noodles',
        price: 350,
        imgUrl: hungryMan
    },
    {
        id: '41',
        productName: 'Indomie Belleful',
        category: 'noodles',
        price: 500,
        imgUrl: belleful
    },
    {
        id: '42',
        productName: 'Golden penny',
        category: 'noodles',
        price: 600,
        imgUrl: golgenPanny,
        display: 'grocery'
    },
    {
        id: '43',
        productName: 'Aunty B',
        category: 'noodles',
        price: 500,
        imgUrl: auntieB,
        display: 'grocery'
    },
    {
        id: '44',
        productName: 'Dogans Sugar',
        category: 'general',
        price: 700,
        imgUrl: doganSugar,
        display: 'grocery',
        
    },
    {
        id: '45',
        productName: 'Close Up Small',
        category: 'general',
        price: 300,
        imgUrl: closeUp
    },
    {
        id: '46',
        productName: 'Close Up Big',
        category: 'general',
        price: 700,
        imgUrl: closeUp,
        display: 'grocery'
    },
    {
        id: '47',
        productName: 'Oral B',
        category: 'general',
        price: 800,
        imgUrl: oralB
    },
    {
        id: '48',
        productName: 'Colgate',
        category: 'general',
        price: 800,
        imgUrl: colgate
        
    },
    {
        id: '49',
        productName: 'Candle pack',
        category: 'general',
        price: 700,
        imgUrl: candle
    },
    {
        id: '50',
        productName: 'Cabin Biscuit',
        category: 'general',
        price: 600,
        imgUrl: yale,
        display: 'favorite'
    },
    {
        id: '51',
        productName: 'Checkers Custard',
        category: 'general',
        price: 2800,
        imgUrl: checkersCustard,
        display: 'grocery'
    },
    {
        id: '52',
        productName: 'Tooth Brush',
        category: 'general',
        price: 200,
        imgUrl: toothBrush

    }
    

];

export default products;