const cursor = document.getElementById("customCursor");


document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`; 
    cursor.style.top = `${e.clientY}px`;  
}
)
;