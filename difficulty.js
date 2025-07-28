import { Modal } from "./modal.js";
import { comprueba } from "./cheemsgame.js";
import { reinicia } from "./cheemsgame.js";
export function difficulty(){
    let choose=['opaca','cubierta','mezclar','timer','colores']
    let $board=document.querySelector('.board');
    let $timer=document.getElementById('timer');
    let $soundi=document.querySelector('.soundi');
    let rand=Math.floor(Math.random()*choose.length);
    let cont=0;
    let setInterv;
    //console.log(rand)
    const opaca=()=>{
        $board.style.opacity='0.1';
    }

    const cubierta=()=>{
        $board.style.filter='blur(4px)'
    }

    const colores=()=>{
         $board.style.filter='invert(1)'
    }

    const timer=(time)=>{
        console.log('ejecuta timer')
        cont=time;
        setInterv=setInterval(()=>{
            cont--;
            console.log(cont)
            $timer.textContent=cont;
            $soundi.play();
            if(cont===0){
                console.log('termina intervalo')
                clearInterval(setInterv)
                $board.innerHTML=Modal.render('You lostm!!!','rgba(255, 0, 0,0.5)','./image/cheemstriste.png');
                Modal.afterrender(reinicia);
            }
        },1000)
        
    }
    //timer(5)
    switch(choose[rand]){
        case 'opaca':
            console.log('opaca')
            opaca();
            break;
        case 'cubierta':
            console.log('cubierta')
            cubierta();
            break;
        case 'mezclar':
            console.log('mezclar')
            comprueba(54)
            break;
        case 'timer':
            console.log('timer')
            timer(20);
            break;
        case 'colores':
            console.log('colores')
            colores()
            break;
        default:
            return;
    }
}