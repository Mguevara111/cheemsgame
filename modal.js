export const Modal={
        render:(message,color,image)=> `<section style="background-color:${color}" class="modal">
            <div><button class="close-modal">Playm again!!</button></div>
            <img  src=${image} alt="cheems img">
            <p>${message}</p>`,
        
        afterrender:(callback)=>{
            let $closemodal=document.querySelector('.closemodal')
            $closemodal.addEventListener('click',()=>{
                location.reload();
            })
        }
        
}