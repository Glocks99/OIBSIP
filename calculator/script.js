window.addEventListener("DOMContentLoaded", () => {
    const temp_display = document.querySelector(".temp-display")
    const ans_display = document.querySelector(".answer-display")
    let disArray = []

    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", e => {
            if(e.target.innerHTML === "ans"){
                if(disArray.length !== 0){
                    const tempArr = disArray.join("")
                    const answer = eval(tempArr)
                    disArray = [answer]
                    temp_display.innerHTML = answer
                }
            }

            else if(e.target.innerHTML === "del"){
                disArray.pop()
                temp_display.innerHTML = disArray.join("")
                if(disArray.length === 0){
                    temp_display.innerHTML = 0
                    ans_display.innerHTML = 0
                }
            }

            // else if(e.target.innerHTML === "√"){
                
            // }

            else if(e.target.innerHTML === "clear"){
                disArray = []
                temp_display.innerHTML = 0
                ans_display.innerHTML = 0
            }

            else if(e.target.innerHTML === "Enter" || e.target.innerHTML === "="){
                const tempArr = disArray.join("")
                const answer = eval(tempArr)
                ans_display.innerHTML = answer
            }

            else {
                disArray.push(e.target.innerHTML)
                temp_display.innerHTML = disArray.join("")

            }

            
        })
    })

})