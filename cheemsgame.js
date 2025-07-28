    import { difficulty } from "./difficulty.js";
    import { Modal } from "./modal.js";

    let $board=document.querySelector('.board');
    let myarray=[];
    let indexarray=[];
    let $fragmento=document.createDocumentFragment();
    let $range=document.getElementById('range');
    let $startbtn=document.getElementById('startbtn');
    let $selectArea=document.querySelector('.header-area');
    let $dragpart=document.querySelector('.drag-part');
    let $phrase=document.querySelector('.cheems-phrase');
    let $iconarea=document.querySelector('.icon-area');
    let $arrowup=document.querySelector('.up-arrow');
    let cont=0;
    let arraytotal;
    let card1=null,card2=null;
    let ind1=null,ind2=null;
    let $divinside;
    let conttowin,np;
    let control=false;
    let arrastre;
    function creaarray(num){
        //console.log('num',num)
        while(cont<2){
            for (let f=0;f<(num/2);f++){
                myarray.push(f)
            }
            cont++;
        }
        //console.log('myarray',myarray)
        creaarindex(num)
    }

    function creaarindex(num){
        arraytotal=Array(num).fill('');
       while(indexarray.length<num){
            let myindex=Math.floor(Math.random()*num)
               if(indexarray.includes(myindex)===false){
                    indexarray.push(myindex)
                }
       }
        
        //console.log('indexarray',indexarray)
       indexarray.forEach((el,index)=>{
            myarray.forEach((ele,i)=>{
                if(index===i){
                    arraytotal[el]=myarray[i]
                }
            })
            
       })
       
       //console.log('arraytotal',arraytotal)   //numeros creados
    }
    
    const arrayfill=()=>{
        arraytotal.forEach((el,index)=>{
            $divinside=document.createElement('div');
            $divinside.classList.add('divinside');
            $divinside.classList.add('tapa');
            $divinside.dataset.ind=index;
            $divinside.dataset.id=el;
            $fragmento.appendChild($divinside);
        })
        $board.appendChild($fragmento);
    }

    const quitchildren=()=>{
        if($board.children.length!==0){
           // console.log('tiene',$board.children.length)
        
        while($board.children.length!==0){
            $board.firstElementChild.remove()

        }
        }else{
            console.log('no tiene hijos')
        }
    }
    
    export const comprueba=()=>{
        //console.log($range.value)
        if($range.value==='0'){
            conttowin=20/2;
            creaarray(20)
        }
        if($range.value==='1'){
            conttowin=30/2;
            creaarray(30)
        }
        if($range.value==='2'){
            conttowin=54/2;
            creaarray(54)
        }
        $range.disabled=true;
        arrayfill();
    }

    const flistener=(e)=>{
        if(e.target.matches('#startbtn')){
            $startbtn.disabled=true;
            $selectArea.classList.add('quit-select-area')
            $iconarea.style.display='block'
            comprueba();
        }
        if(e.target.matches('.divinside')){
            
            e.target.classList.remove('tapa')
            e.target.classList.add(`card${e.target.dataset.id}`)
            if(card1===null){
                card1=e.target.dataset.id;
                ind1=e.target.dataset.ind;
               //console.log('pongo valor card1',card1,card2)
            }else if(card2===null){
                ind2=e.target.dataset.ind;
                card2=e.target.dataset.id;
               //console.log('pongo valor card2',card1,card2)
            }
            if(card1!==null && card2!==null){
                verificapares(ind1,ind2); 
            }
            
        }
        if(e.target.matches('#resetbtn')){
            //console.log('se borrara')
            reinicia();
        }
        if(e.target.matches('.cheems')){
            //console.log('nom puemde ser')
            //$phrase.textContent='homla'
            $iconarea.style.display='none';
            difficulty()
        }
        
    }

    

    const verificapares=(i1,i2)=>{
            //console.log('bloquea')
           $board.classList.add('blocked-interaction')
            np=new Promise(resolve=>{
                setTimeout(()=>{
                        if($board.children.length!==0){
                            $board.children[i1].classList.remove(`card${card1}`)
                            $board.children[i2].classList.remove(`card${card2}`)
                            $board.children[i1].classList.add('tapa')
                            $board.children[i2].classList.add('tapa')
                            $board.classList.remove('blocked-interaction')
                            resolve(control=true)
                        }
                        
                },1500)
                    
            })
        np.then(res=>{
            //console.log('llega a then',card1,card2)
            if(card1!==null && card2!==null){
                    if(card1===card2){
                        //console.log('iguales')
                        conttowin--;      //si llega a cero ganas
                        $board.children[i1].classList.remove('tapa')
                        $board.children[i2].classList.remove('tapa')
                        $board.children[i1].classList.add('equal')
                        $board.children[i2].classList.add('equal')
                        // $board.children[i1].classList.add('div-invisible')
                        // $board.children[i2].classList.add('div-invisible')
                        //console.log($board.children[i1].childNodes)
                        if(conttowin===0){
                            $board.innerHTML=Modal.render('You win!!!! Feli','rgba(0, 255, 0,0.5)','./image/cheemsfeliz.png')
                            //reinicia();
                        }
                    }
            }
            card1=null;
            card2=null;
            //console.log('ahora si')
            control=false;
        })



        //     if(card1!==null && card2!==null){
        //         if(card1===card2){
        //         conttowin--;      //si llega a cero ganas
        //         $board.children[i1].classList.add('div-invisible')
        //         $board.children[i2].classList.add('div-invisible')
        //         $board.classList.remove('blocked-interaction')
        //         if(conttowin===0){
        //             alert('victory')
        //             reinicia();
        //         }
        //     }else{
                
        //         //console.log('no iguales')
        //     }
        // }
    
        //     np.then(res=>{
        //         if(res){
        //             card1=null;
        //             card2=null;
        //             control=false;
                    
        //             console.log('ahora si')
        //         }
        //     })
        //     console.log(conttowin)
        
    }

    $arrowup.addEventListener('click',()=>{
        if(!$selectArea.classList.contains('quit-select-area')){
            $selectArea.classList.add('quit-select-area')
        }
        if($selectArea.classList.contains('touchstart')){
            $selectArea.classList.remove('touchstart')
        }
        
    })

    
    $dragpart.addEventListener('touchstart', (e)=>{
        console.log('touchstasrt')
        arrastre=true;
        // $selectArea.classList.add('touchstart')
    });
    
    $dragpart.addEventListener('touchmove',()=>{
        console.log('touchsmove')
        if(arrastre){
            $selectArea.classList.remove('quit-select-area')
            $selectArea.classList.add('touchstart')
        }  
            
    });
    
    $dragpart.addEventListener('touchend', ()=>{
        console.log('touchend')
    });
       
    document.addEventListener('click',flistener)

// document.addEventListener('DOMContentLoaded',()=>{
//     console.log('llama')
//     $board.innerHTML=Modal.render('lose','rgba(255, 0, 0,0.5)','./image/cheemstriste.png')
// })

   export function reinicia(){
        quitchildren();
            cont=0;
            myarray=[];
            arraytotal=[];
            indexarray=[];
            ind1=null;
            ind2=null;
            card1=null;
            card2=null;
            control=false;
            $range.disabled=false;
            $startbtn.disabled=false;
            $range.value='1';
            $board.innerHTML='';
            $board.style.filter='none';
            $board.style.opacity='1';
            $phrase.textContent='';
            $selectArea.classList.remove('touchstart')
            $selectArea.classList.remove('quit-select-area')
            if($board.classList.contains('blocked-interaction')){
                $board.classList.remove('blocked-interaction')
            }
    }