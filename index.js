/*============toggle icon navbar================ */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*============scroll section active link================ */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    /** --------sticky navbar--------- */
    let header = document.querySelector('header'); // Change 'querySelectorAll' to 'querySelector'
    header.classList.toggle('sticky', window.scrollY > 100);

    /**=================remove toggle icon and navbar when click nav bar Link(scroll)==================**/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/** --------scroll reveal--------- */
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1,.about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p,.about-content', { origin: 'right' });

/** --------type js--------- */

var typed = new Typed('#multiple-text', {
    strings: ["Full Stack Developer", "Digital Marketor", "Cyber Security Expert"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelat: 1000,
    loop: true
});
/*SMTP Configuration  */
const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const contact = document.getElementById("contact");
const mess = document.getElementById("message");


function bodyMessage() {
    return `Subject:${subject.value}<br> Full Name:${fullName.value}<br> Email:${email.value}<br> Phone Number:${contact.value}<br> Message:${mess.value}<br>`;
}

function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "vikrantsaini190697@gmail.com",
        Password: "15A60DC9867732A97ACC06059AF988BC0370",
        To: 'vikrantsaini190697@gmail.com',
        From: " vikrantsaini190697@gmail.com",
        Subject: subject.value,
        Body: bodyMessage() // Call the function to get the message string
    }).then(
        result => {
            if (result === "OK" || (result && result.info === "OK")) {
                let timerInterval;
                Swal.fire({
                    title: "Auto close alert!",
                    html: "I will close in <b></b> milliseconds.",
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });
            }
        }
    );
}

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    await sendEmail();
});