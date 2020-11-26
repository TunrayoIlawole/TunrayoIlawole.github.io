const quotes = [
    {
        quote: "Two things are infinite: the universe and human stupidity; and i'm not sure about the universe.",
        author: "Albert Einstein"
    },
    {
        quote: "A man is a success if he gets up in the morning and gets to bed at night, and in between, he does what he wants to do.",
        author: "Bob Dylan"
    },
    {
        quote: "I believe in everything until it is disproved. So i believe in fairies, the myths, dragons. It all exists, even if it's in your mind. Who's to say that dreams and nigtmares aren't as real as the here and now.",
        author: "John Lennon"
    },
    {
        quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
        author: "Marie Curie"
    },
    {
        quote : "There is no easy walk to freedom anywhere, and many of us will have to pass through the valley of the shadow of death again and again, before we reach the mountaintop of our desires.",
        author: "Nelson Mandela"
    }
]


const domElements = {
    time: document.getElementById('time'),
    quote: document.querySelector('.quote'),
    author: document.querySelector('.author'),
    greeting: document.querySelector('.greeting'),
    timezone: document.querySelector('.timezone'),
    week: document.querySelector('.week-day'),
    year: document.querySelector('.weekday'),
    weekNum: document.querySelector('.week-num'),
    topCon: document.querySelector('.top-container'),
    bottomCon: document.querySelector('.bottom-container'),
    refresh: document.querySelector('.refresh-con'),
    toggler: document.querySelector('.toggle-button'),
    more: document.querySelector('.more'),
    arrow: document.querySelector('.arrow')
}

const changeQuote = () => {
    const rand = Math.floor(Math.random() * quotes.length);

    domElements.quote.textContent = quotes[rand].quote;
    domElements.author.textContent = quotes[rand].author;
}

const showAmPm = true;

// function to show the time
const showTime = () => {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12 hour format
    hour = hour % 12 || 12;

    // output time 
    domElements.time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

// Add zeroes to numbers that need it
function addZero(n) {
    return(parseInt(n, 10) < 10 ? '0' : '') + n;
}

// set background and greeting
const setBgGreet = () => {
    let today = new Date();

    hour = today.getHours();

    if (hour < 12) {
        // morning
        domElements.topCon.classList.add('morning');
        domElements.greeting.textContent = "🌝 GOOD MORNING";
    }
    else if (hour < 18) {
        // afternoon
        domElements.topCon.classList.add('afternoon');
        domElements.greeting.textContent = "🌞 GOOD AFTERNOON";
    }
    else {
        // evening
        domElements.topCon.classList.add('night');
        domElements.bottomCon.classList.add('night');
        domElements.greeting.textContent = "🌑 GOOD EVENING";
    }
}

const setTimezone = (dt) => {
    return /\((.*)\)/.exec(dt.toString())[1];
}

dt = new Date();
domElements.timezone.textContent = setTimezone(dt);

const setDay = () => {
    today = new Date();
    
    let day = today.getDay();
    domElements.week.textContent = day;

    let start = new Date(today.getFullYear(), 0, 0);
    let diff = (today - start) + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let dayWeek = Math.floor(diff / oneDay);

    domElements.year.textContent = dayWeek;
}

const weekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

const result = weekNumber(new Date());
domElements.weekNum.textContent = result[1];

domElements.refresh.addEventListener('click', changeQuote);

domElements.toggler.addEventListener('click', () => {
    domElements.bottomCon.classList.toggle('show');
    if(domElements.more.textContent === "More" || domElements.arrow.textContent === ">") {
        domElements.more.textContent = "Less";
        domElements.arrow.textContent = "<";
    } else {
        domElements.more.textContent = "More";
        domElements.arrow.textContent = ">";
    }
})

// Run 
showTime();
setBgGreet();
setDay();