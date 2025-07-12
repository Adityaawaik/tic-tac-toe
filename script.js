let start = document.querySelector("#start")
// console.log(start)

let mainlayout = document.querySelector(".mainlayout")
// console.log(mainlayout)

let container = document.querySelector(".container")


start.addEventListener("click", () => {
    mainlayout.style.display = "none"
    container.style.display = "block"
})

//Step 1 first select all the boxes
let boxes = document.querySelectorAll(".boxes")
let winner = document.querySelector(".winner")
let reset = document.querySelector("#reset")
let newgame = document.querySelector("#newgame")
// console.log(boxes)

//Step2 apply "FOR EACH" on boxes as it give you a nodelist

let turnO = true
boxes.forEach((box) => {
    // console.log(box)
    box.addEventListener("click", () => {
        if(turnO){
            box.innerHTML = "O"
            turnO = false
        }else{
            box.innerHTML = "X"
            turnO = true
        }
        box.disabled = true
        winCheck()
    })
})


const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const winCheck = () => {

    let winnerFound = true
    for (const pattern of winPattern) { 
        let pos1Val = boxes[pattern[0]].innerHTML
        let pos2Val = boxes[pattern[1]].innerHTML
        let pos3Val = boxes[pattern[2]].innerHTML
        
        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                winner.innerHTML = `Congratulations winner is ${pos1Val}`
                disabledboxes()
            }
        }
    }
    let allFilled = [...boxes].every((box) => box.innerHTML !== "")
    if(winnerFound  && allFilled){
        winner.innerHTML = "It's DRAW"
    }
}


const disabledboxes = () => {
    for (const box of boxes) {
        box.disabled = true
    }
}

const enabledboxes = () => {
    for (const box of boxes) {
        box.disabled = false
        box.innerHTML = ""
        winner.innerHTML = ""
    }
}

const resetgame = () => {
    enabledboxes()
}

reset.addEventListener("click", resetgame)
newgame.addEventListener("click", resetgame)