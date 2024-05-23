let omr_form = document.getElementById("omr-form");
let omr_sheet_template = document.getElementById("omr-sheet-template");
let omr_sheet_container = document.getElementById("omr-sheet-container");
let url = "https://jsonplaceholder.typicode.com/posts/";
if (omr_form && omr_sheet_container && omr_sheet_template) {
    omr_form.addEventListener("submit", (e) => {
        e.preventDefault();
        omr_sheet_container.innerHTML = '';
        let select_class = document.getElementById("select-class").value;
        let select_exam = document.getElementById("select-exam").value;
        let input_total_number = document.getElementById("input-total-number").value;
        // console.log()
        for (let index = 0; index < input_total_number; index++) {
            // const clone_template = document.importNode(omr_sheet_template.content, true);
            const clone = omr_sheet_template.content.cloneNode(true);
            clone.querySelector(".className").textContent = "Class " + select_class;
            clone.querySelector(".examName").textContent = "Exam " + select_exam;
            clone.querySelector(".serialNumber").textContent = index + 1;
            
            omr_sheet_container.appendChild(clone);    
            let allFrontPage = document.getElementsByClassName("allFrontPage");
            Array.from(allFrontPage).forEach((e)=>{
                let demoQrCodeContainers = e.querySelectorAll(".demoQrCodeContainer")
                for (let i = 0; i < demoQrCodeContainers.length; i++) {
                    const element = demoQrCodeContainers[i];
                    element.getElementsByTagName("img")[0].remove();
                    let myurl = url+ Number(index+1).toString();
                    generateQrCode(element,myurl)         
                    element.getElementsByTagName("img")[0].style.marginBottom="10px";
                    element.getElementsByTagName("img")[0].style.marginLeft="auto";
                    element.getElementsByTagName("img")[0].style.marginRight="auto";
                    let canvas = element.getElementsByTagName("canvas");
                    for (let c = 0; c < canvas.length; c++) {
                        const single_canvas = canvas[c];
                        single_canvas.remove();
                        
                    }      
                }
            })
        }
    })
}


function generateQrCode(element,url,size=100,codeColor="#000000",CodeBgColor="#ffffff"){
    const qrcode = new QRCode(element, {
        text: url,
        width: size,
        height: size,
        colorDark: codeColor,
        colorLight: CodeBgColor
    })
}