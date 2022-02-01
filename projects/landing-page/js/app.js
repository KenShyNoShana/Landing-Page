/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/

let sections = document.querySelectorAll("[data-nav]");
let navbar = document.getElementById("navbar__list");
let section = document.getElementsByClassName("landing__container");
let h2 = document.getElementsByTagName("h2");
let navLinks = document.getElementsByClassName("navbar__link");

/* creates li and a element, adds link to sections and styling class to a element*/

function createNav()
{
    let count = 1;
    for(let i = 0; i < sections.length; i++)
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.classList.add("navbar__link");
        //a.setAttribute("href", `#section${count}`);
        a.innerHTML = `Section ${count}`;
        li.appendChild(a);
        navbar.append(li);
        count += 1;
    }
}

/* helperfunction to check if an element is in viewport */


function isInViewPort(element)
{
    const rect = element.getBoundingClientRect();
    return(
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
    );
}



/* checks if section is in viewport, if so section recieves "your-active-class" and nav link revieves "active__section" CSS class
 * otherwise both of them are removed from the element */

document.addEventListener("scroll", function()
    {

        for(let i = 0; i < section.length; i++)
        {
            if(screen.width < 450)
            {
                if(isInViewPort(h2[i]))
                {
                    sections[i].classList.add("your-active-class");
                    navLinks[i].classList.add("active__section");
                }

                else
                {
                    sections[i].classList.remove("your-active-class");
                    navLinks[i].classList.remove("active__section");
                }
            }

            else if(isInViewPort(section[i]))
            {
                sections[i].classList.add("your-active-class");
                navLinks[i].classList.add("active__section");
            }

            else
            {
                sections[i].classList.remove("your-active-class");
                navLinks[i].classList.remove("active__section");
            }
        }

    })



createNav();

//creates smooth scrolling behaviour when nav link is clicked

const nav = document.getElementsByClassName("page__header")[0];

for(let i = 0; i < navLinks.length; i++)
{

    navLinks[i].addEventListener("click", function()
    {
        for(let j = 0; j < navLinks.length; j++)
        {
            section[j].classList.remove("scrolling__fix");
        }

        section[i].classList.add("scrolling__fix");
        section[i].scrollIntoView({block: "start", behavior: "smooth"});
        /*
        if(screen.width < 450)
        {
            // used so navbar doesnt hide heading of section
            section[i].classList.add("scrolling__fix");
            section[i].scrollIntoView({block: "start", behavior: "smooth"});

        }
        else
        {
            section[i].classList.add("scrolling__fix");
            section[i].scrollIntoView({behavior: "smooth"});
        }
        */
    });
}

/* hides nav if the user is scrolling down, shows again when user is scrolling up
 * initialY is undefined, because otherwise the navbar would be invisible when the website is reloaded in certain spots
 */
let initialY;
window.addEventListener("scroll", function()
{
    let yOffset = window.pageYOffset;

    if(yOffset > initialY)
    {
        nav.classList.add("hidden__nav");
    }
    else
    {
        nav.classList.remove("hidden__nav");
    }

    initialY = yOffset;
});

